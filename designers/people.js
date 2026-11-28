// 在品牌研究書裡顯示相關設計師（靜態版：讀 designers.json，不呼叫外部 API）。
// 由首頁 import('./designers/people.js') 載入，圖片路徑以首頁為基準。
let books;
const load=()=>books||(books=fetch('designers.json').then(r=>r.json()).catch(()=>[]));
const norm=s=>String(s||'').normalize('NFKD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9぀-鿿]/g,'');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export async function showPeople(mount,info){
 if(!mount)return;
 const k=norm(info?.query||info?.name||'');if(!k)return;
 const list=(await load()).filter(b=>String(b.brand).split('/').some(x=>norm(x)===k)||norm(b.name)===k||norm(b.zh)===k).slice(0,4);
 if(!list.length){mount.replaceChildren();return}
 mount.innerHTML='<div class="mini">PEOPLE / 相關設計師</div><div class="people-cards" style="display:flex;flex-wrap:wrap;gap:14px;margin:10px 0 22px">'+list.map(b=>{
  const m=!b.portraitUnavailable&&b.portrait?.src?b.portrait:null;
  return '<a href="designers/#designer/'+esc(b.id)+'" style="display:flex;gap:12px;align-items:center;max-width:320px;text-decoration:none;color:inherit;border:1px solid #d8d3c7;padding:10px 14px 10px 10px">'+
   (m?'<img src="'+esc(m.src)+'" alt="'+esc(b.name)+'" loading="lazy" style="width:64px;height:80px;object-fit:cover">':'<span style="width:64px;height:80px;display:grid;place-items:center;background:#25332b;color:#f4efe4;font-size:20px">'+esc(b.name.split(/\s+/).slice(0,2).map(x=>x[0]).join(''))+'</span>')+
   '<span><strong>'+esc(b.zh||b.name)+'</strong><br><small>'+esc(b.name)+' · '+esc(b.brand)+'</small><br><small>閱讀人物誌 →</small>'+(m?'<br><small style="opacity:.7">'+esc(String(m.artist).slice(0,40))+' · '+esc(m.license)+'</small>':'')+'</span></a>'}).join('')+'</div>';
}
