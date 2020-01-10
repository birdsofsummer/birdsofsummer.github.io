const diff=(a=[],b=[])=>a.filter(x=>!b.includes(x))
const text_res=(t="")=>new Response(t, { headers: { 'Content-Type': 'text/html' } })
const json_res=(t={})=>new Response(JSON.stringify(t), { headers: {'Content-type': 'application/json'} })
const save_to_cache=async (version='v1',req,res)=>{
   let c=await caches.open(version)
    c.put(req, res.clone())
}
const cache_res=async (req)=> (await caches.match(req)) || fetch(req)
const preload_res=e=>e.preloadResponse

const cache_first=async (version="v1",req)=>{
    let r1=await caches.match(req)
    if (r1) return r1
    let r2=await fetch(req)
    save_to_cache(version,req,r2)
    return r2
}

const clean_cache=async (whitelist = [])=>{
    let k0=await caches.keys()
    let k1=diff(k0,whitelist)
    return Promise.all(k1.map(x=>caches.delete(x)))

async function proxy(req) {
  const urlObj = new URL(req.url)
  const targetUrl = urlObj.searchParams.get('url')
  return fetch(targetUrl)
}
