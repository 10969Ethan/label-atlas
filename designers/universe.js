// 設計師宇宙：把人物誌排成環繞的書牆（CSS 3D），不需要任何外部函式庫。
// 介面與 atlas.js 約定：universe(container, books, {select, open}) → {filter, focus, motion}
const local=m=>m&&m.src?(/^https?:/.test(m.src)?m.src:'../'+m.src):'';
const initials=n=>n.split(/\s+/).slice(0,2).map(x=>x[0]).join('');

export function universe(root,books,{select,open}){
 root.innerHTML='';
 const stage=document.createElement('div');stage.className='uv-stage';
 const ring=document.createElement('div');ring.className='uv-ring';stage.append(ring);root.append(stage);
 const style=document.createElement('style');style.textContent=`
 .uv-stage{position:absolute;inset:28px 0 118px;perspective:1100px;perspective-origin:50% 42%;cursor:grab;touch-action:pan-y;user-select:none}
 .uv-stage.drag{cursor:grabbing}
 .uv-ring{position:absolute;left:50%;top:50%;transform-style:preserve-3d;will-change:transform}
 .uv-card{position:absolute;left:-58px;top:-78px;width:116px;height:156px;border:0;padding:0;border-radius:6px;overflow:hidden;background:#1b2433;color:#f4efe4;cursor:pointer;box-shadow:0 10px 30px #0008;backface-visibility:hidden;transition:opacity .3s,filter .3s,outline-color .2s;outline:2px solid transparent;outline-offset:3px;font:inherit}
 .uv-card img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.85)}
 .uv-card .ini{display:grid;place-items:center;height:100%;font:600 30px Georgia,serif;letter-spacing:.06em;background:linear-gradient(160deg,#34534e,#1b2433)}
 .uv-card span{position:absolute;left:0;right:0;bottom:0;padding:16px 7px 6px;font-size:11px;line-height:1.3;text-align:left;background:linear-gradient(transparent,#000c)}
 .uv-card.on{outline-color:#e8d6a8}
 .uv-card.off{opacity:0;pointer-events:none}
 .uv-hint{position:absolute;right:14px;top:10px;font-size:12px;color:#f4efe4aa;letter-spacing:.08em;pointer-events:none}
 @media(max-width:600px){.uv-card{left:-44px;top:-60px;width:88px;height:120px}.uv-stage{perspective:800px}}`;
 root.append(style);
 const hint=document.createElement('div');hint.className='uv-hint';hint.textContent='拖曳或用 ← → 環視，點人像翻開人物誌';root.append(hint);

 const cards=new Map();
 for(const b of books){
  const c=document.createElement('button');c.type='button';c.className='uv-card';c.setAttribute('aria-label',`${b.zh||b.name}（${b.brand}），翻開人物誌`);
  const src=!b.collective&&!b.portraitUnavailable?local(b.portrait):'';
  if(src){const img=document.createElement('img');img.src=src;img.alt='';img.loading='lazy';img.onerror=()=>img.replaceWith(Object.assign(document.createElement('div'),{className:'ini',textContent:initials(b.name)}));c.append(img)}
  else c.append(Object.assign(document.createElement('div'),{className:'ini',textContent:initials(b.name)}));
  const lab=document.createElement('span');lab.textContent=`${b.zh||b.name}｜${b.brand}`;c.append(lab);
  c.onclick=()=>{if(moved)return;focusOn(b);open(b)};
  c.onfocus=()=>{focusOn(b)};
  ring.append(c);cards.set(b.id,{b,c,angle:0});
 }

 let visible=books.slice(),rot=0,target=0,quiet=false,current=null,drag=null,moved=false,raf=0,step=10;
 function layout(){
  const n=visible.length||1,rows=n>16?2:1,per=Math.ceil(n/rows);
  step=360/per;const w=innerWidth<600?96:126,radius=Math.max(260,per*w/(2*Math.PI));
  for(const {c} of cards.values())c.classList.add('off');
  visible.forEach((b,i)=>{const e=cards.get(b.id),row=Math.floor(i/per),col=i%per,a=col*step+(row%2?step/2:0),y=(row-(rows-1)/2)*(innerWidth<600?128:166);
   e.angle=a;e.row=row;e.c.classList.remove('off');e.c.style.transform=`rotateY(${a}deg) translateZ(${radius}px) translateY(${y}px)`});
  ring.style.setProperty('--r',radius);ring.dataset.radius=radius;
 }
 function front(){ // 最接近正前方的人（同角度時取上排）
  let best=null,dist=1e9,row=9;
  for(const b of visible){const e=cards.get(b.id);const d=Math.abs((((e.angle+rot)%360)+540)%360-180);if(d<dist-.01||(Math.abs(d-dist)<.01&&e.row<row)){dist=d;best=b;row=e.row}}
  return best;
 }
 function paint(){
  const r=+ring.dataset.radius||400;ring.style.transform=`translateZ(${-r}px) rotateY(${rot}deg)`;
  const f=front();if(f&&f!==current){current=f;for(const {c} of cards.values())c.classList.remove('on');cards.get(f.id).c.classList.add('on');select(f)}
 }
 function loop(){raf=0;if(!drag){if(!quiet&&Math.abs(target-rot)<.05)target-=.04;rot+=(target-rot)*.08}paint();if(document.contains(root))raf=requestAnimationFrame(loop)}
 function focusOn(b){const e=cards.get(b.id);if(!e)return;let t=-e.angle;while(t-rot>180)t-=360;while(t-rot<-180)t+=360;target=t;if(quiet){rot=t;paint()}}

 stage.addEventListener('pointerdown',e=>{drag={x:e.clientX,r:rot};moved=false;stage.classList.add('drag');stage.setPointerCapture(e.pointerId)});
 stage.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>4)moved=true;rot=drag.r+dx*.25;target=rot;paint()});
 const end=()=>{if(!drag)return;drag=null;stage.classList.remove('drag');target=Math.round(rot/step)*step;setTimeout(()=>{moved=false},0)};
 stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);
 root.tabIndex=0;root.setAttribute('aria-label','設計師宇宙，用左右方向鍵環視');
 root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){target+=step;e.preventDefault()}if(e.key==='ArrowRight'){target-=step;e.preventDefault()}if(e.key==='Enter'&&current){open(current)}});
 addEventListener('resize',()=>{layout();paint()});
 layout();paint();raf=requestAnimationFrame(loop);

 return{
  filter(ids){const set=new Set(ids);visible=books.filter(b=>set.has(b.id));layout();current=null;paint()},
  focus(b){focusOn(b)},
  motion(reduced){quiet=!!reduced;if(quiet)target=rot}
 };
}
