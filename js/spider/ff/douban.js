const get=u=>fetch(u).then(x=>x.text())
const gets=(u=[])=>Promise.all(u.map(get))
const url_formator=(u,data=null)=>data ? u + new URLSearchParams(data)  : u;
const url_parser=(u)=>new URL(u);
const range=(s=0,n=1)=>Array(n-s).fill(0).map((x,i)=>s+i)
const url_gen=(u,n)=>range(1,n).map(x=>{
        let uu=u();
        uu.searchParams.set('start',x*100)
        return ""+uu
})
const filter=(html,selector)=>{
    let d=document.createElement('div');
     d.innerHTML=html;
    return d.querySelector(selector);
}

const get_next=async (total=0)=>{
       console.log(total)
       if (total==0) return
       let
            t='#comments',
            parse_page=(html)=>filter(html,t),
            coments_container=document.querySelector(t),
            insert=x=>coments_container.appendChild(x),
            u0=document.querySelector('.paginator a').href,
            u=()=>new URL(u0),
            next=url_gen(u,total),
            next_page=await gets(next),
            next_page1=next_page.map(parse_page);
        next_page1.map(insert)
        document.querySelector('.paginator').remove()
}

const  get_more=()=>{
    let total_link=document.querySelector('[data-total-page]')
    if (total_link == null)  {
        console.log('empty')
        return
    }else{
        let total=+total_link.dataset['totalPage']
        get_next(total)
    }
}
get_more()
