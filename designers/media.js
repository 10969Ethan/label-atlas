const memory=new Map(), week=7*86400000;
export async function cached(key,fn){
 const k='label-atlas-designers-v3:'+key;
 if(memory.has(k))return memory.get(k);
 try{const hit=JSON.parse(localStorage.getItem(k));if(hit?.until>Date.now())return hit.value}catch{}
 const task=fn().then(value=>{try{localStorage.setItem(k,JSON.stringify({value,until:Date.now()+(value?.length===0||value===null?3600000:week)}))}catch{}return value}).catch(error=>{memory.delete(k);throw error});
 memory.set(k,task);return task;
}
const get=async url=>{const r=await fetch(url,{signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error(String(r.status));return r.json()};
function plain(value){return new DOMParser().parseFromString(String(value||''),'text/html').body.textContent.trim()}
function https(url){try{return new URL(url).protocol==='https:'?url:''}catch{return ''}}
async function commons(params){
 const u=new URL('https://commons.wikimedia.org/w/api.php');
 u.search=new URLSearchParams({action:'query',origin:'*',format:'json',prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'680',...params});
 return Object.values((await get(u)).query?.pages||{}).map(p=>{
 const i=p.imageinfo?.[0],m=i?.extmetadata;if(!i||!m)return null;
 const license=plain(m.LicenseShortName?.value),artist=plain(m.Artist?.value||m.Credit?.value),desc=plain(m.ImageDescription?.value);
 if(!license||!artist||!https(i.descriptionurl)||!https(i.thumburl||i.url))return null;
 return {title:p.title.replace(/^File:/,''),src:i.thumburl||i.url,url:i.descriptionurl,license,artist:artist.slice(0,350),licenseUrl:https(m.LicenseUrl?.value),desc:desc.slice(0,450)};
 }).filter(Boolean)
}
export function portrait(d){return cached('portrait:'+d.id,async()=>{
 if(d.collective||d.portraitUnavailable)return null;
 if(d.portrait)return d.portrait;
 const summary=await get('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(d.wiki));

 if(!summary.wikibase_item)return null;
 return entityPortrait(summary.wikibase_item);
}).then(m=>m||d.portrait||null).catch(()=>d.portrait||null)}
export async function entityPortrait(qid){
 const u='https://www.wikidata.org/w/api.php?origin=*&action=wbgetentities&format=json&props=claims&ids='+encodeURIComponent(qid);
 const claims=(await get(u)).entities?.[qid]?.claims;
 if(!claims?.P31?.some(i=>i.mainsnak.datavalue?.value?.id==='Q5'))return null;
 const image=claims.P18?.find(i=>i.rank!=='deprecated')?.mainsnak.datavalue?.value;
 const nonPhoto=/stamps? of|by reginald gray|dunand|art doll|TIME Magazine Cover|signature|portrait painting|wax figure/i;
 if(image&&!nonPhoto.test(image)){
  const record=(await commons({titles:'File:'+image}))[0];
  if(record)return record;
 }
 const photos=await commons({generator:'search',gsrsearch:'haswbstatement:P180='+qid+' haswbstatement:P31=Q125191 filetype:bitmap',gsrnamespace:6,gsrlimit:4});
 return photos.find(record=>!nonPhoto.test(record.title))||null;
}

export function gallery(d){return cached('works:'+d.id,async()=>{
 const seen=new Set(),out=[];
 for(const term of ['runway','collection']){
 const rows=await commons({generator:'search',gsrsearch:'"'+d.name+'" '+term+' filetype:bitmap',gsrnamespace:6,gsrlimit:12});
 for(const row of rows){const name=row.title.toLowerCase(),text=(row.title+' '+row.desc).toLowerCase();
 if(seen.has(row.url)||/portrait|headshot|logo|signature|selfie|red carpet/.test(name)||!/(dress|costume|ensemble|coat|jacket|runway|fashion week|collection|fashion show|couture|garment|服裝|洋裝)/i.test(text))continue;
 const norm=s=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();if(![d.brand,d.name].some(k=>norm(text).includes(norm(k))))continue;
 seen.add(row.url);out.push(row);if(out.length===4)return out;
 }if(out.length>=2)break;
 }return out;
})}
