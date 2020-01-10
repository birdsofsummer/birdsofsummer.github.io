

['BAIDUID', 'BDCBID', 'BDORZ', 'BDSVRBFE', 'BDUSS', 'BD_LAST_QID', 'BD_UPN', 'BIDUPSID', 'CPROID', 'HISTORY', 'HMACCOUNT', 'HOSUPPORT', 'H_PS_645EC', 'ISBID', 'ISUS', 'LOCALGX', 'ORIGIN', 'PANPSC', 'PANWEB', 'PMS_JT', 'PSTM', 'PS_REFER', 'PTOKEN', 'SCRC', 'STOKEN', 'TIEBAUID', 'TIEBA_USERTYPE', 'UBI', 'ULOG_UID', '__bsi', 'ab_jid', 'bdime', 'bdshare_firstime', 'bdv_right_ad_poster', 'cflag', 'ctid', 'mkey', 'pan_login_way', 'pcsett', 'phoenix_login', 'pplogid', 'recommendTime', 'rsst_session', 'sug', 'sugstore', 'webpok', ]


[ "BAIDUID", "BIDUPSID", "PSTM", "TIEBA_USERTYPE", "bdshare_firstime", "Hm_lvt_98b9d8c2fd6608d564bf2ac2ae642948", "TIEBAUID", "MCITY", "pgv_pvi", "delPer", "H_PS_PSSID", "PSINO", "BDUSS", "STOKEN", "Hm_lpvt_98b9d8c2fd6608d564bf2ac2ae642948", "BDRCVFR[feWj1Vr5u3D]", "rpln_guide", "wise_device", "LONGID", "showCardBeforeSign" ]

a=~/.mozilla/firefox/pm3rzzzp.default/cookies.sqlite
sqlite3 $a "select value from moz_cookies where baseDomain='baidu.com' and name='BDUSS';"


'https://tieba.baidu.com/index.html?traceid='
'https://tieba.baidu.com/f?kw=%E5%BC%A0%E4%BF%A1%E5%93%B2&fr=index'
<a rel="noopener" data-fid="133" target="_blank" href="/f?kw=%E5%BC%A0%E4%BF%A1%E5%93%B2&amp;fr=index" title="张信哲" class="u-f-item unsign">张信哲<span class="forum_level lv11"></span></a>

let tieba=[...document.querySelectorAll('.unsign')].map(x=>x.href);
let tieba_name=tieba.map(x=>decodeURIComponent(x.match(/kw=(.*)&fr/)[1]));
curl 'https://tieba.baidu.com/sign/add'
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:65.0) Gecko/20100101 Firefox/65.0'
    -H 'Accept: application/json, text/javascript, */*; q=0.01'
    -H 'Accept-Language: zh-CN,en-US;q=0.7,en;q=0.3'
    -H 'Referer: https://tieba.baidu.com/f?kw=lineageos&fr=index&fp=0&ie=utf-8'
    -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8'
    -H 'X-Requested-With: XMLHttpRequest'
    -H 'Connection: keep-alive'
    -H 'Pragma: no-cache'
    -H 'Cache-Control: no-cache'
    -H 'Cookie:  BDUSS=lUxcWR4eHkxLW9HODZxbU4tWkJldy03RVpBNEx4WXF-QkU3NVkzU2FScng1Rk5jQVFBQUFBJCQAAAAAAAAAAAEAAABOPZAAY9Chw7FfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPFXLFzxVyxca; STOKEN=e6e3af87d049096595066c4c6a32824d1cad01095ff1749354fee18256f599de; '
    --compressed
    --data 'ie=utf-8&kw=lineageos&tbs=ab9f870c10a1b0101546411928'

curl 'https://tieba.baidu.com/sign/add'  --data 'ie=utf-8&kw=lineageos&tbs=ab9f870c10a1b0101546411928'
{"no":0,"error":"","data":{"errno":0,"errmsg":"success","sign_version":2,"is_block":0,"finfo":{"forum_info":{"forum_id":24593294,"forum_name":"lineageos"},"current_rank_info":{"sign_count":452}},"uinfo":{"user_id":9452878,"is_sign_in":1,"user_sign_rank":452,"sign_time":1546411951,"cont_sign_num":1,"total_sign_num":1,"cout_total_sing_num":1,"hun_sign_num":0,"total_resign_num":0,"is_org_name":0}}}
{"no":1101,"error":"\u4eb2\uff0c\u4f60\u4e4b\u524d\u5df2\u7ecf\u7b7e\u8fc7\u4e86","data":""}



curl 'https://tieba.baidu.com/tbmall/onekeySignin1' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:65.0) Gecko/20100101 Firefox/65.0' -H 'Accept: */*' -H 'Accept-Language: zh-CN,en-US;q=0.7,en;q=0.3' --compressed -H 'Referer: https://tieba.baidu.com/index.html?traceid=' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' -H 'Cookie: BAIDUID=BB5C2C0188C463E44499DBF53DE7AD32:FG=1; BIDUPSID=BB5C2C0188C463E44499DBF53DE7AD32; PSTM=1536740738; TIEBA_USERTYPE=6f0cc0f46ae00dd75f100b89; bdshare_firstime=1536826396728; Hm_lvt_98b9d8c2fd6608d564bf2ac2ae642948=1545902530,1546081604,1546087472,1546410554; TIEBAUID=51214246822a8a92730a71b3; MCITY=-340%3A; pgv_pvi=3679584256; delPer=0; H_PS_PSSID=26523_1464_21082_28205_28131_26350_27244; PSINO=6; BDUSS=lUxcWR4eHkxLW9HODZxbU4tWkJldy03RVpBNEx4WXF-QkU3NVkzU2FScng1Rk5jQVFBQUFBJCQAAAAAAAAAAAEAAABOPZAAY9Chw7FfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPFXLFzxVyxca; STOKEN=e6e3af87d049096595066c4c6a32824d1cad01095ff1749354fee18256f599de; Hm_lpvt_98b9d8c2fd6608d564bf2ac2ae642948=1546410554; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' --data 'ie=utf-8&tbs=2e213fcce21ec3d11546410546'

{"no":0,"error":"success","data":{"signedForumAmount":16,"signedForumAmountFail":0,"unsignedForumAmount":3,"vipExtraSignedForumAmount":3,"forum_list":[{"forum_id":133,"forum_name":"\u5f20\u4fe1\u54f2","is_sign_in":1,"level_id":11,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":171829,"forum_name":"\u9f99\u82af","is_sign_in":1,"level_id":11,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":2603499,"forum_name":"\u6c49\u670d\u5236\u4f5c\u7814\u4e60","is_sign_in":1,"level_id":10,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":217247,"forum_name":"\u6c49\u670d","is_sign_in":1,"level_id":10,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":575985,"forum_name":"kindle","is_sign_in":1,"level_id":9,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":3312930,"forum_name":"\u90a3\u5e74\u90a3\u5154\u90a3\u4e9b\u4e8b\u513f","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":175636,"forum_name":"\u5f20\u7eaf\u5982","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":343205,"forum_name":"dwing","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":416282,"forum_name":"\u9a91\u884c","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":10377,"forum_name":"\u8df3\u7ef3","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":13379083,"forum_name":"\u4e1c\u98ce\u5feb\u9012","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":124936,"forum_name":"\u822a\u6a21","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":139226,"forum_name":"diy","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":208889,"forum_name":"\u624b\u7ed8","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":1089593,"forum_name":"\u79e6\u65f6\u660e\u6708","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}},{"forum_id":607204,"forum_name":"\u5927\u79e6\u5e1d\u56fd","is_sign_in":1,"level_id":7,"cont_sign_num":1,"loyalty_score":{"normal_score":2,"high_score":14}}],"gradeNoVip":32,"gradeVip":266}}
