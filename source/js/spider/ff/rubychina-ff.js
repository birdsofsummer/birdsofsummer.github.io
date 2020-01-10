get=x=>fetch(x).then(y=>y.text())
gets=uu=>Promise.all(uu.map(get))

parse=x=>[...x.querySelectorAll('[class*="topic-"]')].map(x=>{
     q=['.media-heading a[title]',".timeago",".info>.user-name",".media-right a"]
     let [l,t,user,count]=q.map(y=>x.querySelector(y))
     return  [l.title,l.href,t.title,user.dataset.name,count ? +count.innerText:0 ]
})
parse1=x=>{
    d=document.createElement('div');
    d.innerHTML=x;
    return parse(d)
}

main=async()=>{
    u=(n=100)=>Array(n).fill(0).map((x,i)=>`https://ruby-china.org/topics?page=${i+1}`)
    n=+document.querySelector('.page-item:nth-last-child(2)').innerText||60
	zz=await gets(u(n))
	vv=zz
        .map(parse1)
        .flat()
        .filter(([,t])=>/topics/.test(t))
        .sort((b,a)=>a[4]-b[4]>0)
    return vv
}
main()

//copy(JSON.stringify(vv,null,"\t"))


