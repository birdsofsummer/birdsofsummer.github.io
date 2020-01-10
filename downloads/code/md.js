const cp=x=>JSON.parse(JSON.stringify(x))
const head=(o=[])=>Object.keys(o[0])
const sep=(o=[])=>Object.keys(o[0]).fill("-")
const chunk=(c=[],cols=4)=>c.map((x,y,z)=>y%cols==0 ? z.slice(y,y+cols):null).filter(x=>x)
const arr2md=(c=[],cols=4)=>{
   let d=chunk(c,cols)
   return [head(d),sep(d),...d]
          .map(x=>x.join('|'))
          .join('\n')
}
const json2md=(o=[],)=>{
    d=o.map(x=>Object.values(x))
    return [head(o),sep(o),...d].map(x=>x.join("|")).join("\n")
}
