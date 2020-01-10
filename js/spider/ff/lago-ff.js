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

parse=(a)=>{
    s=a.filter(x=>x.code==0)
    hr=s.map(({content:{hrInfoMap:h, pageNo, positionResult, pageSize}})=>h).flat().reduce((acc,y)=>({...acc,...y}),{})
    job=s.map(({content:{hrInfoMap:h, pageNo, positionResult:{result:j}, pageSize}})=>j).flat()
    return {hr,job}
}

main=async (n=30)=>{
    u=`https://www.lagou.com/jobs/positionAjax.json?px=default&city=%E6%B7%B1%E5%9C%B3&needAddtionalResult=false`
    u=`https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false`
    d={first:false,pn:1,kd:"开发工程师"}
    us=range(n).map((x,i)=>({...d,pn:i}))
    data=await posts(us)
    d1=parse(data)
    job=d1.job
    types=['node','python','php','go','ruby','c','java','lua','前']
    r=Object.fromEntries(types.map(t=>[t,job.map(x=>x.positionName).filter(x=>new RegExp(t,"i").test(x)).length]))
    console.log(r)
    return d1
}



main()
