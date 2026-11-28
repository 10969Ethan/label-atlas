// 靜態版：人像與作品圖都已下載到 assets/designers/，由 tools/fetch_media.py 產生，不再即時呼叫維基 API。
const local=m=>m&&m.src?{...m,src:/^https?:/.test(m.src)?m.src:'../'+m.src}:null;
export async function cached(key,fn){return fn()}
export async function portrait(d){
 if(d.collective||d.portraitUnavailable)return null;
 return local(d.portrait);
}
export async function gallery(d){return (d.works||[]).map(local).filter(Boolean)}
