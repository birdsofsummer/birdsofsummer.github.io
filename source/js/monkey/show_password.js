// ==UserScript==
// @name     show_password
// @version  1
// @grant    none
// ==/UserScript==
// @match        *://*
// @match        *://*.baidu.com//*




const load1=(src)=>{
 	let s=document.createElement('script')
  s.src=src;
  document.head.append(s)
}
const loads=()=>{
  let a=[
  `https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js`,
  `https://cn.rx.js.org/user/script/0-Rx.js`,
  `https://cn.rx.js.org/user/script/10-rxjs-spy.js`,
  //`https://cdn.bootcss.com/rxjs/6.4.0/rxjs.umd.min.js`,
  `https://cdn.bootcss.com/lodash.js/4.17.11/lodash.core.js`,
  `https://cdn.bootcss.com/ramda/0.26.1/ramda.min.js`,
  `https://cdn.bootcss.com/immutable/4.0.0-rc.12/immutable.min.js`,
  `https://cdn.bootcss.com/d3/5.9.1/d3.min.js`,
  `https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js`,
  `https://cdn.bootcss.com/three.js/r83/three.min.js`,
  `https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js`,
  `https://cdn.bootcss.com/socket.io/2.2.0/socket.io.dev.js`,
  `https://cdn.bootcss.com/typescript/3.3.3/typescript.min.js`,
  `https://cdn.bootcss.com/pixi.js/5.0.0-rc/pixi.min.js`,
  `https://cdn.bootcss.com/rxdb/8.0.5/rxdb.browserify.min.js`,
  `https://cdn.bootcss.com/linq.js/2.2.0.2/linq.min.js`,
  `https://cdn.bootcss.com/linq.js/2.2.0.2/jquery.linq.min.js`,
  `https://cdn.bootcss.com/tensorflow/1.0.0-alpha2/tf.min.js`,
  `https://cdn.bootcss.com/angular.js/2.0.0-beta.17/angular2-all.umd.dev.js`,
  `https://cdn.bootcss.com/vue/2.6.4/vue.min.js`,
  `https://cdn.bootcss.com/backbone.js/1.3.3/backbone-min.js`,
  `https://cdn.bootcss.com/react/16.8.1/umd/react.production.min.js`,
  ]
  a.map(load1)
}

const show=(x)=>x.type="text"
const showall=()=>{
 	[...document.querySelectorAll('[type="password"]')].map(show)
}

const listen=(target,cb)=>{
  Rx.Observable.fromEvent(target, 'click')
  .scan(count => count + 1, 0)
  .subscribe(cb);

}
const init=()=>{
  loads();

  const cb=(x="cccc")=>{
    console.log(Date.now())
    console.log(x)
  	showall()
  }
  const body = document.querySelector('body');
  setTimeout(()=>listen(body,cb),10000)
  addEventListener('click',cb)
}

window.onload=init


