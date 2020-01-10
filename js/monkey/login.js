const pick=({name,value})=>([name,value])
const serialize=f=>Object.fromEntries([...f].map(pick))
const serialize1=f=>encode(serialize(f))
const encode=(type="string")=>(o)=>{
   let j=JSON.stringify(o)
   let s=new URLSearchParams(o).toString()
    switch(type){
        case "json" :
           return j;
           breack;
        case "string":
           return s
           breack;
        default:
           return s;
    }
}
const serialize2=f=>[...f].map(({name,value})=>[name,value].join("=")).join("&")
const post=(u="",d={},type="string")=>fetch(u,{method:"POST",body:encode(type)(d)})
const encrp=Base64.encode
let config={
         "lt": "_c5803A18C-2242-2F92-8712-EB79C3653A34_kAAE01D70-7860-5317-9968-A7B0D2B15527",
         "_eventId": "submit",
          "continueLogin": "",
          "username": "0440050516017",
 //         "password": "19850127",
          "password":  "MTk4NTAxMjc=",
          "checkbox": "on"
}

const login=(d0=config)=>{
    let form=document.querySelector('form')
    let url=form.action;
    let d1 = serialize(form)
    let d={...d0,lt:d1.lt}
    post(url,d)

    //"sso_username_cookie=0440050516017; sso_password_cookie=19850127"
}

window.onload=()=>{login(config)}
/*
//    let pass=form.querySelector('#password')
//    let remember=form.querySelector('[name="checkbox"]')
//    let sub=document.querySelector("#formSubmitBtn")
//    pass.value="19850127"
//    form.submit()

curl http://idp.utsz.edu.cn/cas/remoteLogin\?service\=http%3A%2F%2F10.0.10.66%2Fsrun_cas.php |grep -i 'name="lt"'|grep -e "value="

"https://idp.utsz.edu.cn/cas/remoteLogin?service=http%3A%2F%2F10.0.10.66%2Fsrun_cas.php"
curl "https://idp.utsz.edu.cn/cas/remoteLogin?service=http%3A%2F%2F10.0.10.66%2Fsrun_cas.php" -d "lt=_c244E76E0-5285-5100-C24A-CA15BD16EA32_kB93DB7CE-6714-384D-2833-36F1FFF12BC1&_eventId=submit&continueLogin=&username=0440050516017&password=19850127&checkbox=on"
*/
