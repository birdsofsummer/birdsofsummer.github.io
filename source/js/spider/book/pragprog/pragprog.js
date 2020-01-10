attr=c=>Object.fromEntries([...c.attributes].map(x=>[x.name,x.value]))
attr1=(s,v={})=>{
    let v1={...v,...attr(s)}
    if (s.hasChildNodes()){
        for (let i of s.children){
            return attr1(i,v1)
        }
    }
    return v1
}
get_name=u=>new URL(u).pathname.split('/')[2]
vis=x=>x.style.display != 'none'
download_link=(name)=>`http://media.pragprog.com/titles/${name}/code/${name}-code.tgz`

parse_name=u=>{
  u1=new URL(u)
  name=u1.pathname.split('/')[2]
  downlaod=download_link(name)
  return  { name,downlaod, href:u1, tag:[], }
}

parse_li=a=>({
        ...attr1(a),
        name:a.querySelector('h4').innerText,
        price:a.querySelector('h5').innerText,
})


b=(f=x=>true)=> [...document.querySelectorAll('.book-cover-list li')]
.filter(f)
.map(x=>get_name(x.children[0].href))
.sort()

get_books=()=>Object.fromEntries([...document.querySelectorAll('.book-cover-list li')]
    .map(parse_li)
    .map(x=>({...x,...parse_name(x.href)}))
    .map(x=>[x.name,x]))

init=()=>{
    books=get_books();
    s=document.querySelector('[name="title_filter_params[category]"]')
    s.addEventListener('change',()=>{
        d=s.value
        b(vis).forEach(x=>books[x].tag.push(d))
    })
}

init();
