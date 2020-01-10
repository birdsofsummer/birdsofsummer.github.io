const fetch=require('node-fetch')
const cheerio = require('cheerio')
const R=require("ramda")
const stream = require('stream');
const fs = require('fs');

const write1=(n='example.txt',s="hello")=>{
    const file = fs.createWriteStream(n);
    file.write(s);
    file.end('');
    console.log(':)')
}

const HEADERS={
	"Host": "ruby-china.org",
	"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0",
	"Accept": "*/*",
	"Accept-Language": "en-US,en;q=0.5",
	"Accept-Encoding": "gzip, deflate, br",
	"Referer": "https://ruby-china.org/topics?page=2",
	"DNT": "1",
	"Connection": "keep-alive",
	"Cookie": "user_id=bnVsbA%3D%3D--9a85aab8132340e9dd22b93a3bdc8b7488e3ff65; _homeland_session=K5PCXPo104xltOxDFfwLSnzDrFFbF03mOgvCS9JXmqIEGgvXBA24wRhvcpuR74T0z9GmqZC0202dpRIbKiVJXC2EKA9FBaCXLgk%2BXqeGcRQEV0qaxuyzm7JF%2Ff0yDtSCN0eeUKBM0wJKJGva%2FJO7WthZcVxQwh7afH7upDLCuLpGDVvdtPL9m1oHm0N1cQp%2BH88hnugvwcwVbD26JyyzlXwoBT2RmcN9KPbBvbQDpG3CNdq7L3BFuBmJQi2DRM7aS3%2BXgl6rV7HLvvfq%2FIBE4n24t357kwHahQ%3D%3D--%2F4SS63qV7ctjGSNk--UjKWGcaxcvTr%2B1VlDcBi0w%3D%3D; _ga=GA1.2.2097212071.1556608273; _gid=GA1.2.1098504594.1556608273",
	"Pragma": "no-cache",
	"Cache-Control": "no-cache"
}

const get=u=>fetch(u,{headers:HEADERS}).then(x=>x.text())
const gets=(u=[])=>Promise.all(u.map(get))

const parse=(d)=>{
      $ = cheerio.load(d),
      tag='[class*="topic-"]'
 return $(tag).map(function(i, el) {
  let
     _t=$(this),
     q=['.media-heading a[title]',".timeago",".info>.user-name",".media-right a",".node"],
     [l,t,user,count,node]=q.map(x=>_t.find(x));
     return  {
         title:l.attr('title'),
         href: "https://ruby-china.org" + l.attr('href'),
         time: t.attr('title'),
         user:user.attr('data-name'),
         count:count ? +count.text():0,
         node:node.text(),
     }
    }).get()
}

const parse_index=(d)=>{
      $ = cheerio.load(d),
      tag=".page-item:nth-last-child(2) a"
      return +$(tag).text()
}

const main=async ()=>{
   const HOST=`https://ruby-china.org/topics`
   p0=await get(HOST)
   n=parse_index(p0)
   console.log(n)
   u=R.range(0,n||60).map((x,i)=>`${HOST}?page=${i+1}`)
   p=await gets(u)
   console.log('begin parse')
   r=p.map(parse).flat()
   r1=JSON.stringify(r,null,"\t")
   console.log('begin write json file')
   write1("ruby-china.json",r1)
}


main()
