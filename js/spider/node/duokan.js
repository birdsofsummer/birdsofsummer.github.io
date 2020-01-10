const { parse_cookie1, } =require("q.js")
Cookie=parse_cookie1()


data_formator=(data={})=>({
     ...Cookie,
    "book_id": "890236e589da467c81f487a461262a57",
    "ch": "49PXVQ",
    "allow_discount": "1",
    "device_id": "D900GQTDMN877RWP",
    "app_id": "web",
    "token": "5DJMnr_Cp_yfSgF-4_A_8t7hzD_myugOHhQIOhD1dbb_j-9uNelb3MqKleN2bUQZ",
    "user_id": "1000037785742",
     ...data,
})
h_formator=(h={})=>({
	"Host": "www.duokan.com",
	"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0",
	"Accept": "application/json, text/javascript, */*; q=0.01",
	"Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
	"Accept-Encoding": "gzip, deflate",
	"Referer": "http://www.duokan.com/book/183487",
	"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
	"X-Requested-With": "XMLHttpRequest",
	"Content-Length": "198",
	"DNT": "1",
	"Connection": "keep-alive",
	"Cookie": "device_id=D900GQTDMN877RWP; app_id=web; bdshare_firstime=1556157805488; channel=49PXVQ; Hm_lvt_1c932f22da573f2870e8ab565f4ff9cb=1556157809,1556192369; wx_open_id=oEwaN0VYDH3BhuvmvHRyRvqNWWUM; user_id=1000037785742; token=5DJMnr_Cp_yfSgF-4_A_8t7hzD_myugOHhQIOhD1dbb_j-9uNelb3MqKleN2bUQZ; userId=5DJMnr_Cp_yfSgF-4_A_8t7hzD_myugOHhQIOhD1dbb_j-9uNelb3MqKleN2bUQZ; last_uid=5DJMnr_Cp_yfSgF-4_A_8t7hzD_myugOHhQIOhD1dbb_j-9uNelb3MqKleN2bUQZ; last_user=1000037785742; reader_preference=horizontal; Hm_lpvt_1c932f22da573f2870e8ab565f4ff9cb=1556199479",
	"Pragma": "no-cache",
	"Cache-Control": "no-cache",
    ...h,
})

const post=(u="http://www.duokan.com/store/v0/payment/book/create")=>(d="")=>fetch(u,{
    method:"POST",
    body:new URLSearchParams(data_formator({"book_id":d}))+"",
    headers:h_formator(),
}).then(x=>x.json()).then(console.log)

myposts1=ids=>Promise.all(ids.map(post()))
