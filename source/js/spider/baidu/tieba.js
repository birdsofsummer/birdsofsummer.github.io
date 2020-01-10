const Koa = require('koa')
const convert = require('koa-convert')
const router = require('koa-router')();
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const Keygrip = require("keygrip")
const cheerio = require('cheerio');


const axios=require('axios')
const ff=[
    ['User-Agent','Mozilla/5.0 (X11; Linux x86_64; rv:65.0) Gecko/20100101 Firefox/65.0'],
    ['Accept','application/json, text/javascript, */*; q=0.01'],
    ['Accept-Language','zh-CN,en-US;q=0.7,en;q=0.3'],
    ['Referer','https://tieba.baidu.com/?fr=index&fp=0&ie=utf-8'],
    ['Content-Type','application/x-www-form-urlencoded; charset=UTF-8'],
    ['X-Requested-With','XMLHttpRequest'],
    ['Connection','keep-alive'],
    ['Pragma','no-cache'],
    ['Cache-Control','no-cache'],
]
ff.forEach(([k,v])=>axios.defaults.headers[k]=v)
axios.defaults.withCredentials=true

const redis = require("redis"), client = redis.createClient();
const sqlite3 = require('sqlite3').verbose();
const cookie_parser=require('cookie-parser');

const say=x=>y=>console.log(x,y)
    client.on("error", say('redis_error'));
const cookies=new Map()
const  init_cookie=()=>{
    const DB='/root/.mozilla/firefox/pm3rzzzp.default/cookies.sqlite'
    var db = new sqlite3.Database(DB);
    db.serialize(function() {
      /*
      db.run("CREATE TABLE lorem (info TEXT)");
      var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (var i = 0; i < 10; i++) {
          stmt.run("Ipsum " + i);
      }
      stmt.finalize();
*/
    const sql=`select name,value from moz_cookies where baseDomain='baidu.com' Order by name asc;`
      db.each(sql, function(err, {name,value}) {
          //client.set(name,value, redis.print);
          //    client.get(k, async(err, reply)=> {
          //});
const  ks=  [ "BAIDUID", "BIDUPSID", "PSTM", "TIEBA_USERTYPE", "bdshare_firstime", "Hm_lvt_98b9d8c2fd6608d564bf2ac2ae642948", "TIEBAUID", "MCITY", "pgv_pvi", "BDUSS", "STOKEN", "rpln_guide", "showCardBeforeSign", "Hm_lpvt_98b9d8c2fd6608d564bf2ac2ae642948" ]
        if (ks.includes(name)){
          cookies.set(name,value);
        }
      });
    });
    db.close();
}
init_cookie();
const app = new Koa()
app.keys = ['im a newer secret', 'i like turtle'];

const set_cookie=async (ctx,next)=>{
     for (let [k,v] of cookies.entries()) {
        ctx.cookies.set(k, v, { signed: false,maxAge:720000000});
     }
    const s=[...cookies.entries()].map(x=>x.join('=')).join('; ');
    axios.defaults.headers['Cookie']=s
    await next()
}


const log=async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
}

//app.use(bodyParser())
app.use(set_cookie)
app.use(log)

router.get('/users', async (ctx, next) => {
      ctx.response.body =`<p>user list</p>`;
})
router.get('/users/:id', async (ctx, next) => {
      const {id}=ctx.params
      ctx.response.body =`<p>${id}</p>`;
})

const encode=o=>JSON.stringify(o);
const onkey=()=>{
    let u='https://tieba.baidu.com/tbmall/onekeySignin1'
        d='ie=utf-8&tbs=2e213fcce21ec3d11546410546'
      return axios.post(u,d)
}
const home=()=>{
//        let uu=`https://tieba.baidu.com/index.html`
//        let uu=`http://tieba.baidu.com/f/like/mylike`
        let uu='http://localhost:81/echo.php'
        return axios.get(uu)
}
const sign=async id=>{
      const params = new URLSearchParams();
      params.append('ie','utf-8');
      params.append('kw',id);
      return await axios.post('https://tieba.baidu.com/sign/add',params)
}

router.get('/i/:id', async (ctx, next) => {
      const {id}=ctx.params
      let d=await sign(id)
      say('dddd')(d)
      ctx.response.body =encode(d.data);
})


const map2str=m=>{

}
router.get('/', async (ctx, next) => {
//        const {url,request,query:query0,querystring:querystring0} = ctx;
//        const {query,querystring,body}=request;
         let u1=await home()
         const {data}=u1;
         say('a')(u1)
    /*
          const $=cheerio.load(data);
         //   ctx.state.user=data;
          cc=new Map();
          const link=$('a').each(function(i, elem) {
              const {title,href}=this.attribs;
              title && /kw/.test(href) && cc.set(title,href)
          })
          let ttt=[...cc];
          //let r1=await Promise.all(ttt.map(([k,v])=>sign(k)))
          //let r2=await onkey();
          //console.log(r2);
          ctx.response.body =`<ul><li>`
        +ttt.map(([k,v])=>`<a href=${v}/>${k} `).join('</li><li>')
        +'</li></ul>';

*/
          ctx.response.body=data
})

router.get('/a', async (ctx, next) => {
        ctx.response.body =`
        <form method="post" action="/">
            <input name="user" placeholder="user"/>
            <button type="submit" value="submit" />
        </form>`;

})
router.redirect('/login', 'sign-in');



var forums = new Router({
  prefix: '/f'
});
forums.get('/',async(ctx,next)=>{
    const q=ctx.req._parsedUrl.search
    const qq=new URLSearchParams(q)
    t=qq.get('kw')
    ctx.response.body = `<a onclick=fetch("/i/${t}")>${t}<a>`
})
var posts = new Router();
posts.get('/', (ctx, next) => {
    ctx.response.body = '<h1>ffffff</h1>'
});
posts.get('/:pid', (ctx, next) => {
    let d=JSON.stringify(ctx.params);
    ctx.response.body = `<h1>${d}</h1>`
});
forums.use('/:fid/posts', posts.routes(), posts.allowedMethods());


app.use(router.routes())
app.use(forums.routes())
app.on('error', (err,ctx) => {
  //log.error('server error', err,ctx)
  say(err)(ctx)
});
app.listen(3000)

