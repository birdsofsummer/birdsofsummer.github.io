//`https://piaofang.maoyan.com/rankings/year`
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
} from "dom.js"

make_dict=()=>{
    h=find(document)('.navBar h1')
    d=pipe([find_all(document),map(text),flat,uniq])(".cs")
    h.innerText=d.join('')
    h.classList="cs"
    h.style.fontSize='9em'
    d1="56830.29417" // 肉眼识别...
    dict=zip(c,[...d1])
 //   h.remove()
    return dict
}

main=()=>{
    dict=make_dict()
    format_no=cs=>+[...cs].map(x=>dict[x]).join('')
    parse_row=a=>{
        find_txt=x=>a.querySelector(x) ? a.querySelector(x).innerText:""
        let [no,name,time]=['.col0','.first-line','.second-line'].map(find_txt)
        let [m1,m2,people]=['.col2 .cs','.col3 .cs','.col4 .cs'].map(find_txt).map(format_no)
        return{ no: +no,name,time, m1,m2, people, }
    }
    rows=find_all('ul.row')
    rows1=tail(rows)
    data=rows1.map(parse_row)
}
