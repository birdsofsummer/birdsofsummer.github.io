import {
    attr,
    //attr,
    child,
    child1,
    dataset1,
    dataset2,
    find,
    find1,
    find2,
    find_all,
    find_cb,
    finds_cb,
    html,
    html2text,
    link,
    src,
    text,
    text2dom,
} from "./dom.js"

imort {
    curl_heads,
    gbk,
    get,
    gets,
    get_gbk,
    gets_gbk,
    post,
    posts,
    posts1,
} from "./http.js"
import {tail} from "q.js"



parse=(d)=>{
   table= "#resultList .el"
   t=find2(d)(table)
   if (is_empty(t)) return []
   t1=tail(t)
   td= {
         "id": ['.t1 [name="delivery_jobid"]',x=>+x.value],
         "title": [".t1 a[title]",x=>x.innerHTML.replace("\n","").trim()],
         "url": [".t1 a[title]",x=>x.href],
         "company":[".t2 a[title]",x=>x.title],
         "area":  [".t3",x=>x.innerText],
         "money":[".t4",x=>x.innerText],
         "date":  [".t5",x=>x.innerHTML],
   }
   return t2=t1.map(o=>each_v1(find_cb(o))(td))
}

main=async(n=500)=>{
    u=`https://search.51job.com/list/040000,000000,0000,00,9,99,%25E5%25BC%2580%25E5%258F%2591%25E5%25B7%25A5%25E7%25A8%258B%25E5%25B8%2588,2,@.html?lang=c&stype=&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&providesalary=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea=00&from=&welfare=`
    u1=Array(n).fill(0).map((x,i)=>u.replace("@",i))
    z=await gets(u1)
    r=z.map(parse).flat()
    r1=group_by()(r)
    console.log(r.length,":done!")
    console.log(r1)
//
//    Object { go: 95, php: 766, node: 56, c: 1805, ruby: 11, lua: 13, "前": 2424, java: 3293, python: 176 }
}

main(400)
