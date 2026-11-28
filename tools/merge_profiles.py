"""把 tools/profiles/*.json 的人物誌合併進 designers.json。

  python3 tools/merge_profiles.py

每個檔案是 {設計師 id: 人物誌}；欄位與 designers.json 既有的 profile 相同：
story, context, contributions[], tags[], language, country, life, influence,
timeline[{year,text}], links[{id,text}], quote{zh,original}（可省略）。
"""
import glob, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'designers.json')
METHOD = '依維基百科、品牌與媒體等公開資料整理撰寫，整理日期 2026.11.28'

books = json.load(open(DATA, encoding='utf-8'))
ids = {b['id'] for b in books}
profiles = {}
for f in sorted(glob.glob(os.path.join(ROOT, 'tools', 'profiles', '*.json'))):
    profiles.update(json.load(open(f, encoding='utf-8')))

for key, p in profiles.items():
    if key not in ids:
        raise SystemExit(f'未知的設計師 id：{key}')
    p.pop('collectiveNote', None)
    p['links'] = [l for l in p.get('links', []) if l['id'] in ids and l['id'] != key]
    p.setdefault('method', METHOD)
for b in books:
    if b['id'] in profiles:
        b['profile'] = profiles[b['id']]

json.dump(books, open(DATA, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('人物誌', sum('profile' in b for b in books), '/', len(books))
