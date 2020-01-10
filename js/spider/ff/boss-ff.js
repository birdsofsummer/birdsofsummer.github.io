parse=(d)=>{
   table=".job-primary"
   t=find2(d)(table)
   if (is_empty(t)) return []
   qu=x=>`https://www.zhipin.com/wapi/zpgeek/view/job/card.json?`+new URLSearchParams(dataset1(x))
   td={
       title:[".job-title",text],
       data:['.name a',dataset1],
       url:[".name a",attr('href')],
       url1:['.name a',qu],
       money:[".red",text],
       info:[".info-primary p",child],
       company:['.company-text a',text],
       company_url:['.company-text a',attr('href')],
       company_desc:['.company-text p',text],
       hr:[".info-publis .name",child],
 //      detail:['.detail-bottom-text',text],
   }
   return t2=t.map(o=>each_v1(find_cb(o))(td))
}

main=async (n=9)=>{
    /https://www.zhipin.com/mobile/jobs.json?page=10&size=10000&query=%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88/
        u=`https://www.zhipin.com/c101280600/?query=%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88&page=@&ka=page-@`
        us=range(n).map(x=>u.replace('@',x+1))
        z=await gets(us)
        return z
}

parse_main=async (z)=>{
        r=z.map(parse).flat()
        console.log(r.length,":done!")
        for (let i of r){
            d=await get(i.url1)
            d1=JSON.parse(d)
            d2=html2text(d1.zpData.html)
            i.detail=d2
        }
        r1=group_by()(r)
        console.log(r1)
    // { go: 5, php: 13, node: 0, c: 22, ruby: 1, lua: 0, "前": 31, java: 71, python: 5
}

main()
parse_main(z)
