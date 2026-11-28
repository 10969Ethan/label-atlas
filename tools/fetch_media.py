"""把設計師的人像、作品圖與維基百科原文下載進 repo，讓網站完全靜態。

在 GitHub Actions 執行（.github/workflows/fetch-media.yml）：
  python tools/fetch_media.py            # 只補還沒下載的
  python tools/fetch_media.py --force    # 全部重抓

產出：
  assets/designers/<id>/portrait.jpg、work-1.jpg…   圖片（最長邊 900px）
  designers.json                                     portrait / works 改指向本地檔，附授權資訊
  tools/wiki-src/<id>.json                           維基原文（撰寫人物誌用，不給網頁讀）
"""
import io, json, os, re, sys, time, unicodedata, urllib.parse, urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'designers.json')
IMG_DIR = os.path.join(ROOT, 'assets', 'designers')
WIKI_DIR = os.path.join(ROOT, 'tools', 'wiki-src')
UA = 'LabelAtlasBot/1.0 (https://github.com/10969Ethan/label-atlas; educational fashion-history site)'
FORCE = '--force' in sys.argv
NON_PHOTO = re.compile(r'stamps? of|by reginald gray|dunand|art doll|TIME Magazine Cover|signature|portrait painting|wax figure', re.I)


def get(url, binary=False, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                body = r.read()
            time.sleep(0.25)
            return body if binary else json.loads(body)
        except Exception as e:  # noqa: BLE001
            print('  retry', i + 1, url[:120], e)
            time.sleep(2 * (i + 1))
    return None


def plain(html):
    text = re.sub(r'<[^>]+>', '', str(html or ''))
    for a, b in (('&amp;', '&'), ('&quot;', '"'), ('&#39;', "'"), ('&lt;', '<'), ('&gt;', '>'), ('&nbsp;', ' ')):
        text = text.replace(a, b)
    return re.sub(r'\s+', ' ', text).strip()


def commons(params):
    q = {'action': 'query', 'format': 'json', 'prop': 'imageinfo', 'iiprop': 'url|extmetadata', 'iiurlwidth': '960', **params}
    j = get('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(q)) or {}
    pages = sorted((j.get('query') or {}).get('pages', {}).values(), key=lambda p: p.get('index', 0))
    out = []
    for p in pages:
        info = (p.get('imageinfo') or [None])[0]
        meta = (info or {}).get('extmetadata')
        if not info or not meta:
            continue
        lic = plain(meta.get('LicenseShortName', {}).get('value'))
        artist = plain(meta.get('Artist', {}).get('value') or meta.get('Credit', {}).get('value'))
        desc = plain(meta.get('ImageDescription', {}).get('value'))
        src = info.get('thumburl') or info.get('url')
        if not lic or not artist or not src or not info.get('descriptionurl', '').startswith('https:'):
            continue
        lic_url = meta.get('LicenseUrl', {}).get('value', '')
        out.append({'title': p['title'].removeprefix('File:'), 'remote': src, 'url': info['descriptionurl'],
                    'license': lic, 'artist': artist[:350], 'licenseUrl': lic_url if lic_url.startswith('https:') else '',
                    'desc': desc[:450]})
    return out


def qid_for(d):
    if d.get('qid'):
        return d['qid']
    s = get('https://en.wikipedia.org/api/rest_v1/page/summary/' + urllib.parse.quote(d['wiki'].replace(' ', '_')))
    return (s or {}).get('wikibase_item')


def find_portrait(d, qid):
    if d.get('collective'):
        return None
    old = d.get('portrait')
    if isinstance(old, dict) and old.get('url'):
        title = urllib.parse.unquote(old['url'].split('File:', 1)[-1]).replace('_', ' ')
        hit = commons({'titles': 'File:' + title})
        if hit:
            return hit[0]
    if not qid:
        return None
    ent = get('https://www.wikidata.org/w/api.php?' + urllib.parse.urlencode(
        {'action': 'wbgetentities', 'format': 'json', 'props': 'claims', 'ids': qid}))
    claims = (((ent or {}).get('entities') or {}).get(qid) or {}).get('claims') or {}
    if not any(c['mainsnak'].get('datavalue', {}).get('value', {}).get('id') == 'Q5' for c in claims.get('P31', [])):
        return None
    image = next((c['mainsnak'].get('datavalue', {}).get('value') for c in claims.get('P18', []) if c.get('rank') != 'deprecated'), None)
    if image and not NON_PHOTO.search(image):
        hit = commons({'titles': 'File:' + image})
        if hit:
            return hit[0]
    photos = commons({'generator': 'search', 'gsrsearch': f'haswbstatement:P180={qid} haswbstatement:P31=Q125191 filetype:bitmap',
                      'gsrnamespace': 6, 'gsrlimit': 4})
    return next((p for p in photos if not NON_PHOTO.search(p['title'])), None)


def norm(s):
    return unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()


def find_works(d):
    seen, out = set(), []
    garment = re.compile(r'(dress|costume|ensemble|coat|jacket|runway|fashion week|collection|fashion show|couture|garment|服裝|洋裝)', re.I)
    for term in ('runway', 'collection'):
        rows = commons({'generator': 'search', 'gsrsearch': f'"{d["name"]}" {term} filetype:bitmap', 'gsrnamespace': 6, 'gsrlimit': 12})
        for row in rows:
            name = row['title'].lower()
            text = (row['title'] + ' ' + row['desc']).lower()
            if row['title'] in d.get('rejectedWorks', []) or row['url'] in seen or re.search(r'portrait|headshot|logo|signature|selfie|red carpet', name) or not garment.search(text):
                continue
            if not any(norm(k) in norm(text) for k in (d['brand'], d['name'])):
                continue
            seen.add(row['url'])
            out.append(row)
            if len(out) == 4:
                return out
        if len(out) >= 2:
            break
    return out


def save_image(rec, folder, stem):
    raw = get(rec['remote'], binary=True)
    if not raw:
        return None
    try:
        im = Image.open(io.BytesIO(raw))
        im = im.convert('RGB')
        im.thumbnail((900, 900))
        os.makedirs(folder, exist_ok=True)
        path = os.path.join(folder, stem + '.jpg')
        im.save(path, 'JPEG', quality=82, optimize=True, progressive=True)
    except Exception as e:  # noqa: BLE001
        print('  bad image', rec['remote'][:100], e)
        return None
    rel = os.path.relpath(path, ROOT).replace(os.sep, '/')
    rec = {k: v for k, v in rec.items() if k != 'desc' or v}
    rec['src'] = rel
    return rec


def wiki_text(lang, title, variant=None):
    q = {'action': 'query', 'format': 'json', 'prop': 'extracts', 'explaintext': 1, 'redirects': 1, 'titles': title}
    if variant:
        q['variant'] = variant
    j = get(f'https://{lang}.wikipedia.org/w/api.php?' + urllib.parse.urlencode(q)) or {}
    page = next(iter((j.get('query') or {}).get('pages', {}).values()), {})
    return (page.get('extract') or '')[:16000]


def main():
    books = json.load(open(DATA, encoding='utf-8'))
    os.makedirs(WIKI_DIR, exist_ok=True)
    for n, d in enumerate(books, 1):
        print(f'[{n}/{len(books)}] {d["name"]}')
        folder = os.path.join(IMG_DIR, d['id'])
        done = isinstance(d.get('portrait'), dict) and str(d['portrait'].get('src', '')).startswith('assets/')
        qid = qid_for(d)
        if qid and not d.get('qid'):
            d['qid'] = qid

        if FORCE or not (done or d.get('portraitUnavailable')):
            p = find_portrait(d, qid)
            if p and p['title'] in d.get('rejectedPortraits', []):
                p = None
            saved = save_image(p, folder, 'portrait') if p else None
            if saved:
                d['portrait'] = saved
                d.pop('portraitUnavailable', None)
            elif not (isinstance(d.get('portrait'), dict) and d['portrait'].get('src', '').startswith('assets/')):
                d.pop('portrait', None)
                d['portraitUnavailable'] = True

        if FORCE or 'works' not in d:
            works = []
            for i, w in enumerate(find_works(d), 1):
                s = save_image(w, folder, f'work-{i}')
                if s:
                    works.append(s)
            d['works'] = works

        src_path = os.path.join(WIKI_DIR, d['id'] + '.json')
        if FORCE or not os.path.exists(src_path):
            en = wiki_text('en', d['wiki'])
            zh = wiki_text('zh', d['zhWiki'], 'zh-tw') if d.get('zhWiki') else ''
            json.dump({'id': d['id'], 'name': d['name'], 'en': en, 'zh': zh}, open(src_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

        if n % 10 == 0:
            json.dump(books, open(DATA, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(books, open(DATA, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('portraits', sum(1 for b in books if isinstance(b.get('portrait'), dict)), 'works', sum(len(b.get('works', [])) for b in books))


if __name__ == '__main__':
    main()
