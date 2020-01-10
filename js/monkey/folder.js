// ==UserScript==
// @name show_collapse
// @description q
// @description:zh-TW
// @description:zh-HK
// @description:zh-CN
// @namespace q
// @version 1
// @author qing
// @match https://stedolan.github.io/jq/manual/*
// @run-at document-end
// @grant none
// @license none
// @supportURL none
// @date 2018-12-25
// @modified 2018-12-25
// ==/UserScript==
const add_style=(x)=>{
     const  cs=()=>document.head.appendChild(document.createElement('style'));
     let s= document.querySelector('style') ;
     let ss= s || cs();
     ss.innerHTML+=x;
}
const show_wrap=()=>{
    add_style('.collapse {display: block;}');
    add_style('body *:not(script) {/*display: block;*/overflow:visible;}');
}
const run=f=>a=>[...document.querySelectorAll(a)].map(f);
const ss=a=>document.querySelector(a)
const setclass=o=>(x="")=>ss(o).classList=x;
const add_style1=o=>(k,v)=>ss(o).setAttribute(k,v)
const remove=x=>x.remove();
const removes=run(remove);
const csdn=()=>{
    let arr='.pulllog-box,.tool-box,#dmp_ad_58,aside,#csdn-toolbar,.meau-gotop-box,.recommend-box,.recommend-right,.mask-dark,.fourth_column,iframe,info-div,.t0,.hide-article-box';
    removes(arr);
    setclass('#mainBox')('');
    add_style1('main')('style',"width:100%;");
    add_style('#mainBox,.container main, .pulllog main{width:1366px!important;}#article_content{height: 100%!important; overflow: visible!important;}main{width:100%;}')
}

const jianshu=()=>{
    let arr='#note-fixed-ad-container,.navbar,.follow-detail,.meta-bottom,#web-note-ad-1,.note-bottom';
    removes(arr);
    setclass('.post')('');
}
const baidu=()=>{
    add_style('#content_right{display:none}#content_left,.c-container{width: 100%;}');
	  let arr="#content_right";
    remove(arr);
    
}
window.onload=()=>{
    let z= {csdn,jianshu,show_wrap,baidu};
    let u=location.href;
    let a=['csdn','jianshu'];
    let h=x=>new RegExp(x).test(u)
    a.forEach(x=> h(x) ? z[x]() : z.show_wrap())
    baidu();
}
