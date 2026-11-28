"""洗滌保養頁的材質佐證圖片：從維基共享資源搜尋候選圖，下載到 assets/care/candidates/。

  python tools/fetch_care_images.py          # 在 GitHub Actions 執行
人工挑選後，選中的圖片記在 data/care-images.json，未選的候選圖會刪除。
"""
import io, json, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'care', 'candidates')
META = os.path.join(ROOT, 'tools', 'care-candidates.json')
UA = 'LabelAtlasBot/1.0 (https://github.com/10969Ethan/label-atlas; educational fashion-history site)'
PER = 6

Q = {
 'cotton': ['cotton t-shirt', 'cotton shirt garment', 'cotton fabric texture'],
 'linen': ['linen shirt', 'linen fabric texture', 'linen garment'],
 'wool': ['wool sweater', 'wool jumper knitwear', 'woollen garment'],
 'cashmere': ['cashmere sweater', 'cashmere scarf', 'cashmere wool'],
 'silk': ['silk blouse', 'silk scarf', 'silk fabric'],
 'denim': ['jeans denim close-up', 'selvedge denim', 'denim jeans'],
 'polyester': ['polyester sportswear', 'polar fleece jacket', 'sports jersey'],
 'nylon': ['nylon jacket', 'windbreaker jacket', 'nylon fabric'],
 'rayon': ['rayon dress', 'viscose fabric', 'rayon fabric'],
 'acrylic': ['acrylic yarn', 'knit beanie hat', 'acrylic sweater'],
 'down': ['down jacket', 'puffer jacket', 'down feathers jacket'],
 'shell': ['rain jacket hiking', 'hardshell jacket', 'waterproof jacket'],
 'knit': ['knitted cardigan', 'hand knitted sweater', 'knitwear'],
 'tailored': ['suit jacket', 'blazer jacket', 'tailored suit'],
 'leather': ['leather jacket', 'leather shoes', 'full grain leather'],
 'suede': ['suede shoes', 'suede jacket', 'suede leather'],
 'nubuck': ['nubuck', 'nubuck leather boots', 'nubuck shoes'],
 'patent': ['patent leather shoes', 'patent leather', 'patent leather bag'],
 'faux-leather': ['artificial leather', 'faux leather', 'synthetic leather'],
 'label': ['clothing care label', 'care label laundry symbols', 'textile label composition', 'garment label wool', 'care instructions label'],
}
BAD = re.compile(r'logo|icon|svg|map|diagram|portrait of|painting|drawing|stamp|coat of arms|flag', re.I)


def get(url, binary=False):
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=30) as r:
                body = r.read()
            time.sleep(0.25)
            return body if binary else json.loads(body)
        except Exception as e:  # noqa: BLE001
            print('  retry', e); time.sleep(2 * (i + 1))
    return None


def plain(h):
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', str(h or ''))).strip()


def search(term):
    q = {'action': 'query', 'format': 'json', 'generator': 'search', 'gsrsearch': term + ' filetype:bitmap', 'gsrnamespace': 6,
         'gsrlimit': 12, 'prop': 'imageinfo', 'iiprop': 'url|extmetadata|size', 'iiurlwidth': '960'}
    j = get('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(q)) or {}
    pages = sorted((j.get('query') or {}).get('pages', {}).values(), key=lambda p: p.get('index', 0))
    for p in pages:
        info = (p.get('imageinfo') or [None])[0]
        m = (info or {}).get('extmetadata') or {}
        lic, artist = plain(m.get('LicenseShortName', {}).get('value')), plain(m.get('Artist', {}).get('value') or m.get('Credit', {}).get('value'))
        if not info or not lic or not artist or BAD.search(p['title']) or info.get('width', 0) < 500:
            continue
        yield {'title': p['title'].removeprefix('File:'), 'remote': info.get('thumburl') or info['url'], 'url': info['descriptionurl'],
               'license': lic, 'artist': artist[:200], 'licenseUrl': (m.get('LicenseUrl', {}).get('value') or ''),
               'desc': plain(m.get('ImageDescription', {}).get('value'))[:300]}


def main():
    meta = {}
    for key, terms in Q.items():
        print('==', key)
        seen, got = set(), []
        for t in terms:
            for r in search(t):
                if r['url'] in seen or len(got) >= PER * (2 if key == 'label' else 1):
                    continue
                seen.add(r['url'])
                raw = get(r['remote'], binary=True)
                if not raw:
                    continue
                try:
                    im = Image.open(io.BytesIO(raw)).convert('RGB'); im.thumbnail((900, 900))
                    os.makedirs(os.path.join(OUT, key), exist_ok=True)
                    path = os.path.join(OUT, key, f'{len(got) + 1}.jpg'); im.save(path, 'JPEG', quality=80, optimize=True)
                except Exception as e:  # noqa: BLE001
                    print('  bad', e); continue
                r['src'] = os.path.relpath(path, ROOT).replace(os.sep, '/')
                got.append(r)
        meta[key] = got
        print('  ', len(got))
    json.dump(meta, open(META, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
