get_link=()=>[...document.querySelectorAll('img[src$=fw236]')]
    .map(x=>x.src)
    .map(x=>x.replace("_fw236","_fw658"))

get_all_link=()=>{
    d=new Set()
    get=()=>[...document.querySelectorAll("[src*='_fw236']")].map(x=>d.add(x.src))
    c=(y)=> {console.log(y);window.scrollTo(0,y);get()}
    c1=(y)=>setTimeout(()=>(y<45000 ? (c(y+100),c1(y+100)):null),1000)
    //copy([...d].join('\n'))
}


