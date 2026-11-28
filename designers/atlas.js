import {portrait,gallery,cached} from './media.js';
const $=s=>document.querySelector(s),el=(tag,text,cl)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cl)n.className=cl;return n};
const books=await fetch('../designers.json').then(r=>r.json());
const regions=['全部','亞洲','韓國','歐洲','美洲'],colors=['#424356','#34534e','#534460','#554a33','#5e413d'];
let region='全部',filtered=books,selected,reading,space,openTimer,serial=0,quiet=matchMedia('(prefers-reduced-motion:reduce)').matches;
const dialog=$('#reader'),sky=$('#sky'),systemMotion=matchMedia('(prefers-reduced-motion:reduce)');
const link=(text,url)=>{const a=el('a',text);a.href=url;a.rel='noopener noreferrer';a.target='_blank';return a};
function credit(parent,m){parent.replaceChildren(link(m.artist+' ／ '+m.license+' ／ Wikimedia Commons',m.url));if(m.licenseUrl)parent.append(' · ',link('授權條款',m.licenseUrl))}
function initials(d){return el('div',d.name.split(/\s+/).slice(0,2).map(x=>x[0]).join(''),'initials')}
function mediaFigure(d,m,hero){const f=el('figure'),cap=el('figcaption');if(!m){f.append(initials(d));cap.textContent=hero?(d.collective?'設計團隊':'暫無可核實授權的人像'):'暫無可核實授權的作品圖片';f.append(cap);return f}const img=el('img');img.alt=hero?d.name:m.title;img.src=m.src;img.onerror=()=>img.replaceWith(initials(d));f.append(img);if(!hero){const name=m.title.replace(/\.[a-z]+$/i,'').replaceAll('_',' ');cap.append(el('strong',name));cap.append(el('p',m.caption||('這張影像收錄於 '+d.brand+' 的作品圖輯。可從衣身輪廓、布面垂墜與人物比例觀察造型，拍攝場合與作品資料以原始圖檔說明為準。')))}const by=el('span');credit(by,m);cap.append(by);f.append(cap);return f}
function select(d,fly=false){
 selected=d;$('#focus-brand').textContent=d?.brand||'沒有相符的書';$('#focus-name').textContent=d?d.zh+' ／ '+d.name:'';$('#focus-region').textContent=d?d.region+'星區':'';$('#read').disabled=!d;$('#cover-credit').replaceChildren();
 if(d){if(fly)space?.focus(d);portrait(d).then(m=>{if(m&&selected===d)credit($('#cover-credit'),m)}).catch(()=>{})}
}
for(const r of regions){const b=el('button',r);b.onclick=()=>{region=r;filter()};$('#regions').append(b)}
for(let year=1900;year<=2020;year+=10){const o=el('option',year+' 年代');o.value=year;$('#era').append(o)}
const normal=s=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[\s.・-]/g,'');
for(const d of books){const o=el('option');o.value=d.name;o.label=d.zh+' ／ '+d.brand;$('#suggestions').append(o)}
function filter(){
 const decade=+$('#era').value;filtered=books.filter(b=>(region==='全部'||b.region===region)&&(!decade||b.decades.includes(decade)));
 [...$('#regions').children].forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===region)));sky.style.setProperty('--nebula',colors[regions.indexOf(region)]);
 space?.filter(filtered.map(b=>b.id));$('#status').textContent=filtered.length+' 本人物誌 · 拖曳環視，點書翻閱';$('#index').replaceChildren();
 filtered.forEach(b=>{const button=el('button',b.brand);button.append(el('small',b.zh+' ／ '+b.name));button.onclick=()=>{select(b,true);openBook(b)};$('#index').append(button)});select(filtered[0]);
}
$('#era').onchange=filter;$('#find').onsubmit=e=>{e.preventDefault();const q=normal($('#query').value.trim());if(!q)return;const d=books.find(b=>[b.name,b.zh,b.brand].some(s=>normal(s)===q))||books.find(b=>[b.name,b.zh,b.brand].some(s=>normal(s).includes(q)));if(!d){$('#status').textContent='找不到符合的名字，請試試英文原名。';return}if(!filtered.includes(d)){region='全部';$('#era').value='';filter()}select(d,true);$('#status').textContent='已定位 '+d.brand+' ／ '+d.name};
function setMotion(){const value=quiet||systemMotion.matches;$('#motion').setAttribute('aria-pressed',String(value));space?.motion(value)}
systemMotion.onchange=setMotion;$('#motion').onclick=()=>{quiet=!quiet;setMotion()};
function openBook(d){clearTimeout(openTimer);if(!d)return;sky.classList.add('opening');openTimer=setTimeout(()=>{sky.classList.remove('opening');location.hash='designer/'+d.id},quiet||systemMotion.matches?0:380)}
$('#read').onclick=()=>openBook(selected);
function closeBook(){location.hash='universe'}
$('#close').onclick=$('#home').onclick=closeBook;dialog.oncancel=e=>{e.preventDefault();closeBook()};
function turn(delta){const i=books.indexOf(reading);location.hash='designer/'+books[(i+delta+books.length)%books.length].id}
$('#prev').onclick=()=>turn(-1);$('#next').onclick=()=>turn(1);
function section(target,heading,text){if(!text)return;target.append(el('h3',heading),el('p',text))}
function bodyFor(d,p,parent){
 parent.replaceChildren();const spread=el('div',null,'spread'),left=el('section'),right=el('section');
 section(left,d.collective?'團隊的故事':'他／她的故事',p.story);section(left,'時代背景',p.context);
 if(p.contributions?.length){right.append(el('h3','關鍵貢獻'));const ul=el('ul');p.contributions.forEach(c=>ul.append(el('li',c)));right.append(ul)}
 if(p.tags?.length||p.language){right.append(el('h3','設計語言'));(p.tags||[]).forEach(t=>right.append(el('span',t,'tag')));if(p.language)right.append(el('p',p.language))}
 spread.append(left,right);parent.append(spread);
 section(parent,'影響與傳承',p.influence);const rel=el('div',null,'related');for(const l of p.links||[]){const other=books.find(b=>b.id===l.id);if(!other)continue;const b=el('button',other.brand+' ／ '+other.name);b.title=l.text;b.onclick=()=>location.hash='designer/'+other.id;rel.append(b)}parent.append(rel);
 if(p.timeline?.length){parent.append(el('h3','年表'));const ol=el('ol');p.timeline.forEach(e=>ol.append(el('li',e.year+' 年　'+e.text)));parent.append(ol)}
 if(p.quote?.zh){const q=el('blockquote','「'+p.quote.zh+'」');q.append(el('small','　中文意譯 · '));q.append(link('查看原文出處',d.source||wiki(d)));parent.append(q)}
}
const wiki=d=>'https://en.wikipedia.org/wiki/'+encodeURIComponent(d.wiki.replaceAll(' ','_'));
async function render(d){
 const seq=++serial;reading=d;if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
 const pages=$('#pages');pages.replaceChildren();const hero=el('section',null,'hero'),top=el('div'),meta=el('p',d.brand,'metadata'),photo=el('div',null,'skeleton');
 top.append(el('small',d.region+' ／ '+(d.collective?'設計團隊':'設計師')),el('h2',d.name),el('h3',d.zh),meta);hero.append(top,photo);const body=el('article'),works=el('div',null,'gallery'),sources=el('div',null,'sources');sources.append('資料來源　',link(d.sourceLabel||'英文維基百科',d.source||wiki(d)));if(d.zhWiki)sources.append(link('中文維基百科','https://zh.wikipedia.org/wiki/'+encodeURIComponent(d.zhWiki)));if(d.profile?.method)sources.append(el('small','　'+d.profile.method+'　'));if(d.en||d.excerpt)sources.append(link('百科內容採 CC BY-SA 4.0，本文經整理與節錄','https://creativecommons.org/licenses/by-sa/4.0/'));
 pages.append(hero,body,el('h3','代表作品'),works,sources);works.append(el('div',null,'skeleton'),el('div',null,'skeleton'));
 const base=d.profile||{story:d.excerpt?.split(/\n==/)[0]?.slice(0,900)||d.note||''};bodyFor(d,base,body);
 portrait(d).catch(()=>null).then(m=>{if(seq===serial)photo.replaceWith(mediaFigure(d,m,true))});
 gallery(d).catch(()=>[]).then(items=>{if(seq===serial)works.replaceChildren(...(items.length?items:[null]).map(m=>mediaFigure(d,m,false)))});
 const display=p=>{bodyFor(d,p,body);meta.textContent=[p.country,p.life,d.brand].filter(Boolean).join('　／　')};
 if(d.profile)display(d.profile);
}
function route(){const id=location.hash.replace(/^#designer\//,'');const d=books.find(x=>x.id===id);if(d){render(d);return}++serial;if(dialog.open)dialog.close()}
filter();setMotion();route();window.addEventListener('hashchange',route);
try{const m=await import('./universe.js');space=m.universe($('#space'),books,{select,open:openBook});space.filter(filtered.map(x=>x.id));setMotion()}catch{$('#directory').open=true;$('#status').textContent='可透過下方人物索引、星區與搜尋來翻閱人物誌。'}
