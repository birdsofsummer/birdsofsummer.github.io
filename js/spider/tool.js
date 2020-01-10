// JavaScript Document

/**
*	工具类
*	2014/5/19
*/

/*
 * 设置不加载jQuerymobile 默认loadding 
 */
if($.widget)
	$.widget('mobile.loader',{});


//公共ajax锁
var pending = false;

/*
*	ajax 
*	
*	@Parameters
*		functionCode：		functionCode
*		data：				参数		
*		successCallback：	成功回调函数
*		failedCallback：		失败回调函数
*		errorCallback：		异常回调函数
*		isShow：				是否需要展示loading效果
*		isAsynchronous		是否需要同步
*
*/
function doAjax(functionCode, data, successCallback, failedCallback, errorCallback, isShow, isAsynchronous,callBack,pendings){
	if(functionCode === undefined){
		return false;
	}
	if(pendings){
		if(pending){
			return false;
		}else{
			pending = true;
		}
	}
	if(isShow){
		showLoginWaitCurr();
	}
	if(isNull(isAsynchronous)){
		isAsynchronous = false;
	};
	if(typeof data=="object"){
		data =JSON.stringify(data);
	}else{
		data = "{"+data+"}";
	}
	
	//获取sessionStorage里ajax请求路径和activeType
	var activityType = sessionId = '', url='',outTime=60000, obj = {};
	sessionId = isNull(sessionStorage.sessionId)?'':sessionStorage.sessionId;
	if(isNull(sessionStorage.toolsObj)){
		url = '';
	}else{
		obj = JSON.parse(sessionStorage.toolsObj);
		activityType = isNull(obj.activityType)?'':obj.activityType;
		url = isNull(obj.ajaxUrl)?'':obj.ajaxUrl;
		outTime = isNull(obj.outTime)?outTime:parseInt(obj.outTime);
	}
	
	var param = '{'+
				'"headerInfo": { '+
					(isNull(activityType)?'':'"activityType":"'+activityType+'",')+
					(isNull(sessionId)?'':'"sessionId":"'+sessionId+'",')+
					'"functionCode": "'+functionCode+'"'+
				'},'+
				'"requestContent":' +
					data +
			'}';
	$.ajax({
		type:'POST',
		url:url,
		async:isAsynchronous,
		data:param,
		dataType:'json',
		timeout:outTime,      // 超时45秒
		success:function(data){
			pending = false;
			if(data){
				if(data.headerInfo.to404 && data.headerInfo.to404===true){
					window.location.href = 'https://www.189.cn/client/wap/common/page/error_404.html?errorCode=20001';
					return false;
				}else{
					if(data.headerInfo.code == 'W_0000'){
						if(data.responseContent.serviceCode == '0'){
							data.message = data.headerInfo.message;
						}else{
							data.message = data.responseContent.serviceMessage;
							//增加callback
							if(callBack){
								if(callBack(data) == false){
									if(isShow){
										hideLoginWaitCurr();
									}
									return false;
								}
							}
						}
					}else{
						data.message = data.headerInfo.message;
						//增加callback
						if(callBack){
							if(callBack(data) == false){
								if(isShow){
									hideLoginWaitCurr();
								}
								return false;
							}
						}
					}
				}
				if(successCallback)
					successCallback(data);
				
			}else{
				if(failedCallback)
					failedCallback(data);
			}
			if(isShow){
				hideLoginWaitCurr();
			}
		},
		complete : function(XMLHttpRequest,status){
			pending = false;
			var data = {};
			data.message = '系统繁忙，再试一次吧 ！';
			data.status = status;
			if(status=='timeout'){
	　　　　　  		failedCallback(data);
				hideLoginWaitCurr();
	　　　　	}else if(status=='error'){
	　　　　		errorCallback(data);
				hideLoginWaitCurr();
	　　　　	}
	　　	}
	});
}


/* 
*	是否满足手机号码的要求
*   @Parameters
*     isPhoneNumber(phoneNum);//true
*     var phoneText=10000000000;
*     isPhoneNumber(phoneText);//false
*
* */
function isPhoneNumber(obj) {
	var phoneID = /^((13|14|15|16|17|18|19)){1}\d{9}$/;
	if(!phoneID.test(obj)){
	    return false;
	}else{
		return true;
	}
}

/* 是否满足电信手机号码的要求
*
* @Parameters
* 获取对象验证是否满足regu规则
* (strMobile.search(re)!=-1//search()中无法检索到返回-1
* var s=strMobile.substring(0,3);//截取strMobile的前三位
*       substring(start,end)
*       substring 方法返回的子串包括 start 处的字符，但不包括 end 处的字符。
*       如果 start 与 end 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。
*       如果 start 比 end 大，那么该方法在提取子串之前会先交换这两个参数。
*       如果 start 或 end 为负数，那么它将被替换为 0。
*
* if (num =='10649'&&strMobile.length==13){
* “天翼物联”业务是基于中国电信机器通信专用号码（通信号码为10649，使用位长13位）
*
*
* */
function isTelecomPhone(obj) {
    var strMobile=obj;
	var regu =/1[3-9]+\d{9}/;
	var re = new RegExp(regu);
	if (strMobile.length!=0){
		if (strMobile.search(re)!=-1) {
			var s=strMobile.substring(0,3);
			if(s=="133"||s=="153"||s=="189"||s=="180"||s=="181"||s=="177"||s=="171"||s=="173"||s=="199"||s=="191"){
				return true;
			}else{
				return false;
			}
		}else{
			var num = strMobile.substring(0,5);
			if (num =='10649'&&strMobile.length==13){
				return true;
			}else{
				return false;
			}
		}
	} 
}

/*
 * 是不是电话号码
 *  @Parameters
 *   obj:手机号
 */
function isPhone(obj){
    var strPhone=obj;
	var phoneRegWithArea1 = /^(\d){7,12}$/; 
	if (strPhone.length!=0){
		if(phoneRegWithArea1.test(strPhone)){
			  return true; 
		}else{
			  return false; 
		}
  	}
}

/*
 * 是不是邮编
 *  @Parameters
 *   obj:邮编
 */
function isPostCode(postCode){
	var re= /^[0-9]{6}$/;
	if(re.test(postCode)){
		return true;
	}else{
		return false;
	}
}
/*
 * 是不是邮箱
 *  @Parameters
 *   obj:邮箱
 */
function isEmail(obj){
	var patrn;
	patrn=/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; 
	if (!patrn.exec(obj)) {
		return false; 
	}
	return true;
} 


/*
 * 是不是为空
 *  @Parameters
 *   str：字符串或对象
 */
function isNull(str){
    str = $.trim(str);
    if(!str || str=="" || str=="null" || str=="undefined")
        return true;
    return false;
}

/*
 * 判断身份证号码
 * num：身份证号码
 * isNew:是不是新的标准 true，默认为false
 */
function isIDCardNum(num,isNew){
	if(isNew){
		if(num.length != 18){
			return '输入的身份证号长度不对，或者号码不符合规定！<br>18位号码末位可以为数字或X。';
		}
	}
	num = num.toUpperCase();
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)))
	{
		return '输入的身份证号长度不对，或者号码不符合规定！<br>15位号码应全为数字，18位号码末位可以为数字或X。';
	}
	//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	//下面分别分析出生日期和校验位
	var len, re;
	len = num.length;
	if (len == 15)
	{
		re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var arrSplit = num.match(re);
		
		//检查生日日期是否正确
		var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay)
		{
			return '输入的身份证号里出生日期不对！';
		}
		else
		{
			//将15位身份证转成18位
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0, i;
			num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
			for(i = 0; i < 17; i ++)
			{
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			num += arrCh[nTemp % 11];
			return true;
		}
	}
	if (len == 18)
	{
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		var arrSplit = num.match(re);
		
		//检查生日日期是否正确
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay)
		{
			return '输入的身份证号里出生日期不对！';
		}
		else
		{
			//检验18位身份证的校验码是否正确。
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0, i;
			for(i = 0; i < 17; i ++)
			{
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != num.substr(17, 1))
			{
				//$("#tip").html('18位身份证的校验码不正确！应该为：' + valnum);
				return '18位身份证的校验码不正确！';
			}
			return true;
		}
	}
	return '18位身份证的校验码不正确！';
}

/*
*
* 截取字符串长度
*
* @Parameters
* str  需要传入的字符串
* number 需要的目标字符串位数
* count  不包括点的字符串长度数
* var str = "gfhjjuikoilolili";
* str.part(str,5,5);//gfhjj..
*
* */
String.prototype.part=function(str,number,count){
	 if(str.length>number){
		 return str=str.substring(0,count)+"..";
	 }else{
		 return str;
	 }
}

/*
 * 获取字符串中所有的数字
 * str:字符串
 */
String.prototype.getNum = function(str){
	if(!isNull(str)){
		return str.replace(/[^0-9]/ig,"");
	}else{
		return str;
	}
}
/*
 * 替换所有
 * str:字符串
 */
String.prototype.replaceAll = function(s1,s2) { 
	return this.replace(new RegExp(s1,"gm"),s2); 
}
/*
 *	去除字符串两边的空格
 *
 *	@Parameters
 *    var str="         aabbcc            ";
 *   str.trim();//aabbcc
 *    var atr="  a  b c          ";
 *    atr.trim();//a  b c
 *
 */
String.prototype.trim = function(){   
	return this.replace(/(^\s*)|(\s*$)/g, "");   
}


/*
 * 展示loading框
 */
function showLoginWaitCurr(top,left){
	var page = $('body');
	if(isNull(page.find('#loginWait')) || page.find('#loginWait').length <= 4 200 0){ var loadinghtml="\
			<div name="a" style="position:fixed;width:100%;height:100%;top:0;display:none;z-index:10001;background-color:rgba(0,0,0,0);" id="loginWait">\
			<div style="position:absolute;height:100%;width:100%;">\
			<div id="loadding" style="position:absolute;width:140px;height:80px;border-radius:8px;-webkit-box-shadow: rgb(236, 236, 236) 0px 1px 1px;background:rgba(255, 255, 255,0.8);text-align:center;top:45%;line-height:0;">\
			<img src="https://www.189.cn/client/wap/common/images/load.gif" style="position:relative;top:29%;width:25%;"></div>\
			</div>\
			</div>" ; page.append(loadinghtml); } page.find("#loadding").css("left",$("body").width() 2-70); 页面初始化让loadding居中 page.find('#loginwait').css("top",top); page.find('#loginwait').show(); * 隐藏loading框 function hideloginwaitcurr(){ $('body').find("#loginwait").hide(); *页面跳转 @parameters allowsamepagetransition（布尔值，默认：false） 默认情况下，changepage() 会忽略跳转到已活动的页面的请求。如果把这项设为true,会使之执行。 开发者应该注意有些页面的转场会假定一个跳转页面的请求中来自的页面和目标的页面是不同的，所以不会有转场动画。 showloadmsg（布尔值，默认：true） 设定加载外部页面时是否显示loading信息。 transition（字符串，默认：$.mobile.defaultpagetransition）使用显示的页面时，过渡。 changepage(url) { showloginwaitcurr(); $.mobile.changepage(url,{transition:'none',showloadmsg:false,allowsamepagetransition:true}); hideloginwaitcurr(); 公用添加点击事件 addclick($('#targetbutton'), function(){ alert('提交'); }) addclick(target,func){ target.off('click').on("click", func); 公用添加事件 fun:要执行的事件 name:事件名称 click、change等 默认click $.fn.addeventfun="function(fun,name){" name="isNull(name)?'click':name;" return $(this).off(name).on(name,fun); ** 判断当前日期是否为月末最后一天 islastday(){ 当年年月日及完整时间戳 day ,month ,year ,servicedate ,getdate 获取相应头 xhr="new" xmlhttprequest(); xhr.open("head",location.href,true); xhr.onreadystatechange="function(){" if( xhr.readystate="=" && xhr.status="=" ){ servicedate="xhr.getResponseHeader("Date");" if(isnull(servicedate)){ getdate="new" date(servicedate); year="getDate.getFullYear();" month="getDate.getMonth()+1;" todate="new" date(year,month,0); 是月末 if(todate.getdate()="=" day){ $('#end_month').show(); 显示 addclick($("#end_month_close"),function(){ $('#end_month').hide(); 关闭 }); addclick($("#end_month_sure"),function(){ 不是月末 }else{ 隐藏 xhr.send(null); 根据服务器时间返回当前日期对象 func 回调函数 date_time t多次请求更新时间 getserverdate(func,t){ ,date_time="{},hrefStr='';" timestr="new" date().gettime(); if(isnull(t)){ t="timeStr;" if((location.href).indexof('?')>0){
		hrefStr=location.href+'&t='+(t || '');
	}else{
		hrefStr=location.href+'?t='+(t || '');
	}
	xhr.open("GET",hrefStr,true);
	xhr.onreadystatechange=function(){
		if( xhr.readyState == 4 && xhr.status == 200 ){
			serviceDate = xhr.getResponseHeader("Date");
			if(isNull(serviceDate)){
				serviceDate = xhr.getResponseHeader("last-modified");
			}
			getDate=new Date(serviceDate);
			date_time={
				'year' :getDate.getFullYear(),
				'month' :getDate.getMonth()+1,
				'day' :getDate.getDate(),
				'hours' :getDate.getHours(),
				'minutes' :getDate.getMinutes(),
				'seconds' :getDate.getSeconds()
			};
			if(func)func(date_time,getDate,serviceDate);		//执行回调函数
		}
	}
	xhr.send(null);
}

/**
 * 弹窗前调用关闭content滚动条
 */
function openBoxBefore(){
	 $.mobile.activePage.css({'height':'100%','overflow':'hidden'});
}
/**
 * 关闭弹窗之前打开content滚动条
 */
function closeBoxBefore(){
	$.mobile.activePage.css({'height':'auto','overflow-y':'auto'});
}

//判断当前设备是否为移动端
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		return true;
	} else {
		return false;
	}
}
/**
 * 公用返回按钮
 * var opt = {
 *			cla:'backBtn',
 *			url:'https://www.189.cn/client/wap/common/images/icon_back.png',
 *			imgCla:''
 *	}
 */
function goBack(set){
	var opt = {
			cla:'backBtn',
			url:'https://www.189.cn/client/wap/common/images/icon_back.png',
			imgCla:'',
			callback:null //点击返回按钮回调函数 lrj 20171124
	}
	$.extend(opt,set);
	var content = $.mobile.activePage.children('[data-role=content]');
	if(content.children('.'+opt.cla).length ===0){
		var html = '<div class="'+opt.cla+'"><img width="45px" class="'+opt.imgCla+'" src="'+opt.url+'"></div>';
		content.append(html);
		//点击返回按钮回调函数 lrj 20171124
		$(content.children('.'+opt.cla)).off('click').on('click',function(){
			if(!isNull(opt.callback) && typeof opt.callback === 'function') {
				opt.callback();
			} else {
				history.back();
			}
		});
	}
}
/**
 * 公用回顶部按钮
 */
function goTop(){
 	var page = $.mobile.activePage;
 	page.find('.toTopBtn').remove();
 	var html = '<div class="toTopBtn" onclick="goTopAnimate();"><img width="45px" src="https://www.189.cn/client/wap/common/images/icon_backTop.png"></div>';
 	page.find('[data-role=content]').append(html);
 	$(document).off("scroll").on("scroll",function(){
		if ($(window).scrollTop()>100){
			page.find(".toTopBtn").fadeIn(1500);
		}else{
			page.find(".toTopBtn").fadeOut(1500);
		}
	});
}
function goTopAnimate(){
	$('body,html').animate({scrollTop:0},1000);
}
//调用安卓分享
function onShare(){
	//获取sessionStorage里toolsObj
	if(isNull(sessionStorage.toolsObj)){
		return false;
	}else{
		var toolsObj  = JSON.parse(sessionStorage.toolsObj);
		if(isNull(toolsObj.share)){
			return false;
		}else{
			if(toolsObj.share.isShare == '1'){
				var title = toolsObj.share.title;
				var content = toolsObj.share.content;
				var url = toolsObj.share.url;
				var imgurl = toolsObj.share.imgurl || '';
				if(isNull(url)){
					doAjax('getShareUrlPJ','',function(data){
						if(data.headerInfo.code === 'W_0000' && data.responseContent.serviceCode == '0'){
							url = data.responseContent.shareUrl;
							toolsObj.share.url = url;
							sessionStorage.setItem('toolsObj',JSON.stringify(toolsObj));
							if(toolsObj.share.zdsinfo){
								CtclientJS.share(title, content, imgurl, url, toolsObj.share.zdsinfo);
							}else{
								CtclientJS.share(title, content, imgurl, url);
							}
						}
					},function(){},function(){},false,true);
				}else{
					if(toolsObj.share.zdsinfo){
						CtclientJS.share(title, content, imgurl, url, toolsObj.share.zdsinfo);
					}else{
						CtclientJS.share(title, content, imgurl, url);
					}
				}
			}else{
				return false;
			}
		}
	}
}
//调用IOS分享
function share(title,content,imgurl,weburl,zdsinfo){
	if(zdsinfo){
		window.location.href="objc://share?title="+encodeURIComponent(title)+"&content="+encodeURIComponent(content)+"&imgurl="+encodeURIComponent(imgurl)+"&weburl="+encodeURIComponent(weburl) +"&zdsinfo="+encodeURIComponent(zdsinfo);
	}else{
		window.location.href="objc://share?title="+encodeURIComponent(title)+"&content="+encodeURIComponent(content)+"&imgurl="+encodeURIComponent(imgurl)+"&weburl="+encodeURIComponent(weburl);
	}
}
function iOnShare(){
	//获取sessionStorage里toolsObj
	if(isNull(sessionStorage.toolsObj)){
		return '';
	}else{
		var toolsObj  = JSON.parse(sessionStorage.toolsObj);
		if(isNull(toolsObj.share)){
			return '';
		}else{
			if(toolsObj.share.isShare == '1'){
				var title = toolsObj.share.title;
				var content = toolsObj.share.content;
				var url = toolsObj.share.url;
				var imgurl = toolsObj.share.imgurl || '';
				if(isNull(url)){
					doAjax('getShareUrlPJ','',function(data){
						if(data.headerInfo.code === 'W_0000' && data.responseContent.serviceCode == '0'){
							url = data.responseContent.shareUrl;
							toolsObj.share.url = url;
							sessionStorage.setItem('toolsObj',JSON.stringify(toolsObj));
							share(title, content, imgurl, url,toolsObj.share.zdsinfo);
						}
					},function(){},function(){},false,true);
				}else{
					share(title, content, imgurl, url,toolsObj.share.zdsinfo);
				}
			}else{
				return '';
			}
		}
	}
	return "successed";
}
/*
* 茌真铭 2014/6/24
* 编写支付链接组建 --初始版本
* 茌真铭 2014/6/25
* 修改支付组建版本
* 增加input 增加input value 属性 增加点击事件回调 可重写当前点击事件0
* 增加传入options.url 若url不为空 ，则覆盖默认参数，不再调用接口	2015-07-23
*/
var BankList = {};
//生产支付地址

//var payUrlString = "http://wapzt.189.cn/pay/onlinePay.do?";
//var payUrlString = "http://cservice.client.189.cn:8080/pay/onlinePay.do?";
//准生产支付地址
//var payUrlString = "http://118.85.207.85:9118/pay/onlinePay.do?";
(function (BankList) {
	var urlFunCode = '';
   var overall = function (options) {
	   urlFunCode = options.urlFunCode;
       _this = this;
       this.defaultSettings = {
           divId: "", //添加div的地址
           url:isNull(options.url)?_this.url():'', //银行地址生产地址：http://cservice.client.189.cn:8080；准生产地址：http://118.85.207.85:9118
           userId: "",//用户id
           id: "",//订单id
           name:"立即支付",
           type:"button",
           payType:"2000101",
           html:'div',
           style: "width:100%;height:100%;",//iframe样式
           class:"commonButton_green",//iframe	class样式名称
		   urlFunCode:'',//添加项目获取支付地址接口的functionsCode (必传)
           on:{
           	click:_this.click
           }
       };
       this.options = $.extend(this.defaultSettings, options);
   };
   /**
    * 绘图
    */
   overall.prototype.render = function () {
   	//_this.defaultSettings.url=_this.url();
       if (_this.defaultSettings.divId != "" && _this.defaultSettings.divId != null) {
       	 $(_this.defaultSettings.divId).html(null);
           var html='<'+_this.defaultsettings.html+' style="'+_this.defaultSettings.style+'" userurl="'+_this.defaultSettings.url+'userid=' +_this.defaultSettings.userId+'&id='+_this.defaultSettings.id+'&type='+_this.defaultSettings.payType+'" type="'+_this.defaultSettings.type+'" value="'+_this.defaultSettings.name+'" data-role="none" class="'+_this.defaultSettings.class+'">'+_this.defaultSettings.name+'</'+_this.defaultsettings.html+'>';
           $(_this.defaultSettings.divId).append(html);
           $(_this.defaultSettings.divId).find(_this.defaultSettings.html).data("order",_this);
           $(_this.defaultSettings.divId).find(_this.defaultSettings.html).click(function(){
           	_this.defaultSettings.on.click.call($(this).data("order"));
           });
       }
   };
   /**
    * 事件回调
    */
   overall.prototype.click=function(){
   	var __this=this;
   	window.location.href=__this.defaultSettings.url+'userid='+__this.defaultSettings.userId+'&id='+__this.defaultSettings.id+'&type='+__this.defaultSettings.payType;
   };
   overall.prototype.url=function(){
	var url="";
	var prams_fee={
			type:1
	}
   doAjax(urlFunCode,prams_fee,function success(data) {
		if(!isNull(data.responseContent)){
			if(!isNull(data.responseContent.payUrl)){
				url=data.responseContent.payUrl;
			}else if(!isNull(data.responseContent.LinkPay)){
				url=data.responseContent.LinkPay;
			}
		}
    }, function successError(data) {}, function error(data) {},true,false);
    return url+"?";
   }
   BankList.overall = overall;
})(BankList);

/*
 * 获取手机类型
 * return 1: IOS 2: Android 3:wap
 */
function getPhoneType(){
	//跳转卖场
	var sUserAgent = navigator.userAgent; 
	var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
	var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
	var bIsiPhone = sUserAgent.toLowerCase().match(/iphone/i) == "iphone";
	var bIsiPod = sUserAgent.toLowerCase().match(/ipod/i) == "ipod";
	var bIsiPad = sUserAgent.toLowerCase().match(/ipad/i) == "ipad";
	if (isLinux) {
		if(bIsAndroid){ //android
			return 2;		
		}else{
			return 3;
		}
	}else if(bIsiPhone || bIsiPod ||bIsiPad){ //ios
		return 1;
	}else{
		return 3;
	}
}

/*
 * IOS goLink方法
 * linkType:2 静态链接,不需要转码 20171010 lrj
 *IOS方式跳转，全部编码   20180511 by lxc
 * ios暂不支持backLink
 */
function goLink(linkType,Link,backLink){
	if(isNull(backLink)) {
		backLink = '';
	}
	window.location.href ="objc://goLink?linkType="+encodeURIComponent(linkType)+"&Link="+encodeURIComponent(Link)+"&backLink="+encodeURIComponent(backLink);
}

/**
 * 20171010 lrj
 * Android goLink方法
 * linkType:2 静态链接,不需要转码
 */
function goLinkForAndroid(linkType,link,backLink){
	if(isNull(backLink)) {
		backLink = '';
	}
	if(linkType == '2') {
		CtclientJS.goLink(linkType,link,backLink);
	} else {
		CtclientJS.goLink(linkType,encodeURIComponent(link),backLink);
	}
}

/***
 * 2015-07-20
 * 显示订单详情公用组件
 * settings 传入的参数和样式
 * getHtml	返回最终生成的html
 * 
 */
var orderDetail = {};
(function(){
	/*
	 * 详情对象
	 */
	orderDetail = function(options){
		var _othis = this;
		/*
		 * 入参
		 */
		_othis.settings = {
			params:{},																//参数列表 eg 普通样式 > 订单号码  71864187643871965142	突出文字样式 > #w#100#b#元
			hasDivBg: true,															//是否有竖线
			divBgIndex:0,															//竖线位置 从0开始 默认为第一个位置
			cssType:'style',														//样式控制类型  默认 style  可传 class
			divBgSty: 'background:url(#img#) no-repeat -1.5% 0;',					//背景图片样式
			divBgImg: 'https://www.189.cn/client/wap/common/images/line_v2.png',		//图片地址
			Separator: '：',															//分隔符
			divLine: 'padding:0.5rem 1rem 0.5rem;',						//每行的div样式
			pRight: 'float:left;word-break:break-word; line-height:1rem;font-size:0.8rem;width:11.5rem;',//p标签样式 > 左侧
			pLeft: 'float:left;word-break:break-word; line-height:1rem;font-size:0.8rem;width:5rem;',//p标签样式 > 右侧
			spanBold: 'color:#F88100;font-weight:bold;',							//突出显示的文字样式
			contentHtml:'',															//内容html
			func:'html',																//方法名
			contentTemplHtml:'<div orderdetail="orderdetail" csstype="#divLine#">'+
				'<p csstype="#pLeft#">#key##Separator#</p><p csstype="#pRight#">#val#</p>'+
				'<div style="clear:both;"></div></div>',							//每行模板 
			showBefore: function(){},  	
			callBack: function(){}
		};
		$.extend(_othis.settings,options);
		//初始化竖线	若显示竖线，则替换图片链接 否则不做
		if(_othis.settings.hasDivBg){
				_othis.settings.imgHtml = (_othis.settings.cssType == 'style')?_othis.settings.divBgSty.replace('#img#',_othis.settings.divBgImg):(' '+_othis.settings.divBgSty);
		}else{
			_othis.settings.imgHtml = ''
		}
		//分隔符
		var contentTemplHtml = '';
		//遍历参数对象并根据模板生成相应的html
		var isFirst = 0;//定义一个起始位置，用来标记竖线所在的位置 从0 开始
		$.each(_othis.settings.params,function(i,n){
			_othis.settings.contentHtml += _othis.settings.contentTemplHtml.replace('#divLine#',(isFirst == _othis.settings.divBgIndex)?(_othis.settings.divLine +_othis.settings.imgHtml):_othis.settings.divLine)
											.replace('#pLeft#',_othis.settings.pLeft)
											.replace('#pRight#',_othis.settings.pRight)
											.replace('#key#',i)
											.replace('#val#',n)
											.replace('#b#','<span '+_othis.settings.csstype+'="'+_othis.settings.spanBold+'">')
											.replace('#b#','</span>');
			isFirst++;
		});
		/*
		 * getHtml
		 * 方法
		 * 返回生成的html
		 * _othis.settings.contentHtml	内容
		 */
		_othis.getHtml = function(){
			_othis.settings.showBefore();
			$('div[orderdetail="orderdetail"]').remove();			//每次显示之前清空元素，防止元素重复生成
			return _othis.settings.contentHtml.replaceAll('#Separator#',_othis.settings.Separator)
												.replaceAll('cssType',_othis.settings.cssType);
		}
		/*
		 * _othis.settings.target
		 * jquery 对象不为空，切func不为空，显示html
		 */
		if(_othis.settings.target && _othis.settings.target.length > 0){
			_othis.settings.callBack();
			if(_othis.settings.func){
				//_othis.settings.func 不为空
				_othis.settings.target[_othis.settings.func](_othis.getHtml());
			}else{
				//默认html拼到页面元素
				_othis.settings.target.html(_othis.getHtml());
			}
		}		
	};
})();
/*
 * 验证码按钮公用组件
 */
var randomBtn = {};
(function(){
	/*
	 * 验证码对象
	 */
	randomBtn = function(options){
		var _rthis = this;
		this.settings = {
				target:[],//jQuery 对象
				style:'', //按钮样式
				btnClass:'commonButton_yellow',//按钮class
				reClass:'commonRandom_load',   //倒计时 样式
				html:'获取验证码',				   //按钮初始化html
				reHtml:'重新获取',				   //失败或倒计时结束
				loadHtml:'#random#',		   //倒计时hmtl 
				funCode:'',					   //请求functionCode
				param:'',					   //请求入参
				isLoadding:true,			   //是否显示loadding框
				sucCode:'W_0000',			   //正确时code码
				time:60,					   //倒计时时间
				callBack:function(){},		   //返回后事件
				defClick:true,				   //是否默认绑定倒计时
				before:null
		};
		$.extend(this.settings,options);
		
		/*
		 * 获取验证码
		 */
		this.getRandom = function(_this){
			btnHelp.getRandom(_this);
		}
		
		var btnHelp = {
				//验证码接口锁
				randomLock:false,
				//获取验证码
				getRandom:function(_this){
					if(isNull(_rthis.settings.funCode)){
						var data = {
								headerInfo:{
									code:'1',
									message:'functionCode is Null'
								},
								responseContent:{}
						};
						_rthis.settings.callBack(data);
					}else{
						//判断有无校验函数
						if(_rthis.settings.before){
							if(_rthis.settings.before() === false){
								return false;
							}
						}
						
						if(btnHelp.randomLock == true){
							return false;
						}else{
							btnHelp.randomLock = true;
						}
						_this = $(_this);
						doAjax(_rthis.settings.funCode,_rthis.settings.param,function(data){
							_rthis.settings.callBack(data);
							if(data.headerInfo.code === _rthis.settings.sucCode){
								//判断底层是否有成功返回
								if(data.responseContent.serviceCode == '0'){
									var count = _rthis.settings.time;
									_this.html(_rthis.settings.loadHtml.replace('#random#',count)).addClass(_rthis.settings.reClass);
									//开始倒计时验证码
									btnHelp.randomTimer = setInterval(function(){
										if(count == 0){
											btnHelp.randomLock = false;
											clearInterval(btnHelp.randomTimer);
											_this.html(_rthis.settings.reHtml).removeClass(_rthis.settings.reClass);
										}else{
											count--;
											_this.html(_rthis.settings.loadHtml.replace('#random#',count));
										}
									},1000);
								}
								//调用底层失败 重新获取
								else{
									btnHelp.randomLock = false;
									_this.html(_rthis.settings.reHtml);
								}
							}
							//调用后台失败 重新获取
							else{
								btnHelp.randomLock = false;
								_this.html(_rthis.settings.reHtml);
							}
						},function(data){
							btnHelp.randomLock = false;
							//解决ajax失败页面报错的问题 lrj 20180320
							data.headerInfo={
										code:'error_1',
										message:'系统繁忙，再试一次吧 ！'
									};
							data.responseContent={};
							_rthis.settings.callBack(data);
							_this.html(_rthis.settings.reHtml);
						},function(data){
							btnHelp.randomLock = false;
							//解决ajax失败页面报错的问题 lrj 20180320
							data.headerInfo={
										code:'error_2',
										message:'系统繁忙，再试一次吧 ！'
									};
							data.responseContent={};
							_rthis.settings.callBack(data);
							_this.html(_rthis.settings.reHtml);
						},_rthis.settings.isLoadding,true);
					}
				},
				//开始画按钮
				draw:function(){
					if(isNull(_rthis.settings.target) || _rthis.settings.target.length == 0){
						var data = {
								headerInfo:{
									code:'2',
									message:'target is Null'
								}
						};
						_rthis.settings.callBack(data);
					}else{
						_rthis.settings.target.addClass(_rthis.settings.btnClass).html(_rthis.settings.html).attr('style',_rthis.settings.style);
						if(_rthis.settings.defClick == true){
							_rthis.settings.target.addEventFun(function(e){
								btnHelp.getRandom(this);
							});
						}
					}
				}
		}
		btnHelp.draw();
	}
})();
/*
 * 公用绑定左右滑动事件
 */
(function(){
	$.fn.swipeToLeft = function(fun){
		swipeHlper.left(this,fun);
		return $(this);
	}
	$.fn.swipeToRight = function(fun){
		swipeHlper.right(this,fun);
		return $(this);
	}
	
	var swipeHlper = {
			swipe:function(_this,fun,action){
				if(getPhoneType() === 1 || getPhoneType() === 3){
					$(_this).on("swipe"+action,fun);
				}else{
					var startPos = touch = {};
			                _this[0].removeEventListener('touchstart',function(event){

			                    if(startPos&&!$.isEmptyObject(startPos)){     //如果startPos不是一个空对象那么 清空里面保存的坐标点位和移动标识
			                        startPos = {
			                            x: null,
			                            y: null,
			                            time: null,
			                            moveFlag:false
			                        };
			                    }
			                });
					_this[0].addEventListener('touchstart',function(event){
						 touch = event.changedTouches[0];
						 startPos = {                                 // 取第一个touch的坐标值
			                        x: touch.pageX,
			                        y: touch.pageY,
			                        time: +new Date,
			                        moveFlag:true
			                   	};
					});
					_this[0].addEventListener('touchmove',function(event){
						var touch = event.changedTouches[0];
						var endPos = {
						           x: touch.pageX - startPos.x,
						           y: touch.pageY - startPos.y
						       };
						var duration = +new Date - startPos.time;    // 滑动的持续时间
						if(Math.abs(endPos.y) < 12){
							//获取纵坐标的绝对值， 小于12 阻止默认事件
							event.preventDefault();
							if (Number(duration) > 100 && startPos.moveFlag) {
								if(action == 'right' && endPos.x > 50){
									startPos.moveFlag = false;
									fun();
								}else if(action == 'left' && endPos.x < -50){
									startPos.moveFlag = false;
									fun();
								}else{
								}
							}
						}else{
							//大于12 不阻止默认事件  上下滚动
						}
					});
				}
			},
			right:function(_this,fun){
				this.swipe(_this,fun,'right');
			},
			left:function(_this,fun){
				this.swipe(_this,fun,'left');
			}
	}
})()

/*
 * 公用弹窗组件（笑脸）
 */
var Popup = null;
(function(){
	Popup = function(opt){
		this.opt = {
			version:1,					//弹窗版本
			content:'',					//内容html
			conCla:'',					//内容样式
			conStyle:'',				//内容style
			poCla:'common_bombBox',		//小窗样式
			popStyle:'',	//弹窗style
			popCla:'common_popUp',		//弹窗框样式
			id:'',    	   				//弹出框Content id
			baseId:'popup',				//弹出框id
			//弹出框标题
			titleSmail:0,				//默认笑脸；  0笑脸，1哭脸
			titleImgUrl:['https://www.189.cn/client/wap/common/images/icon_qr.png',		//笑脸
			             'https://www.189.cn/client/wap/common/images/icon_cry.png'],	//哭脸
			titlecla:'common_Smile',	//笑脸样式
			//弹出框关闭按钮
			closeUse:true,				//是否展示关闭按钮
			closeImgUrl:'https://www.189.cn/client/wap/upgradePath/images/up_closebtn.png',//关闭图片
			closeCla:'common_closebtn',	//关闭按钮样式
			closeClick:null
		};
		$.extend(this.opt,opt);
		/*
		 * 显示弹窗
		 */
		this.show = function(s){
			openBoxBefore();
			var p = $('#'+this.opt.baseId);
			p.height($(window).height()+30);
			if(this.opt.version === 1){
				if(isNull(this.opt.conStyle)){
					p.children('div[data-type=box]').children('div[data-type=content]').attr('style','padding:0.25rem 0;overflow:hidden;');
				}else{
					p.children('div[data-type=box]').children('div[data-type=content]').attr('style',this.opt.conStyle)
				}
				p.show().children('#title'+this.opt.titleSmail).show().siblings().hide();
				p.find('#'+this.opt.id).show().siblings().hide();
			}else{
				p.show().children('#'+this.opt.id).show().siblings().hide();
			}
			if(s)s();
		}
		/*
		 * 关闭弹窗
		 */
		this.hide = function(h){
			closeBoxBefore();
			$('#'+this.opt.baseId).hide();
			if(h)h();
		}
		/*
		 * 开始绘制弹窗
		 */
		this.draw = function(){
			var base = $('#'+this.opt.baseId);
			if(base.length === 0){
				var html = '<div id="'+this.opt.baseId+'" class="'+this.opt.popCla+'" style="'+this.opt.popStyle+'"></div>';
				$('body').append(html);
				base = $('#'+this.opt.baseId);
			}
			var box = base.children('[data-type=box]');//弹窗
			if(box.length === 0){
				var html = '<div data-type="box" class="'+this.opt.poCla+'"></div>';
				base.append(html);
				box = base.children('[data-type=box]');//弹窗
			}
			//弹窗头部
			var title = box.children('[data-type=title]');
			if(title.length === 0){
				var html = '\
					<div data-type="title" id="title'+this.opt.titleSmail+'">\
						<img class="'+this.opt.titlecla+'" src="'+this.opt.titleImgUrl[this.opt.titleSmail]+'">\
						<img class="'+this.opt.closeCla+'" src="'+this.opt.closeImgUrl+'">\
					</div>\
					<div data-type="content"></div>';
				box.append(html);
				title = box.children('[data-type=title]');
			}
			//弹窗内容部分
			var content = box.children('[data-type=content]');
			if(content.children(isNull(this.opt.id)?null:'#'+this.opt.id).length === 0){
				content.append(this.opt.content);
			}
			if(this.opt.closeUse === true){
				var _this = this;
				title.children('.'+this.opt.closeCla).show().addEventFun(function(){
						if(_this.opt.closeClick){
							_this.opt.closeClick();
						}else{
							_this.hide();
						}
				});
			}else{
				title.children('.'+this.opt.closeCla).hide();
			}
		}
		/*
		 * 新版绘制弹窗
		 */
		this.newDraw = function(){
			var opt = this.opt;//bese框id
			var base = $('#'+opt.baseId);
			if(base.length === 0){
				base = $('<div>',{
					id:opt.baseId,
					class:opt.popCla,
					style:opt.popStyle
				});
				$('body').append(base);
			}
			var box = base.children('#'+opt.id);//弹窗
			if(box.length === 0){
				box = $('<div>',{
					class:opt.poCla,
					id:opt.id
				});
				//弹窗头部
				var html = '\
					<div data-type="title">\
						<img class="'+this.opt.titlecla+'" src="'+this.opt.titleImgUrl[this.opt.titleSmail]+'">\
						<img class="'+this.opt.closeCla+'" src="'+this.opt.closeImgUrl+'">\
					</div>\
					<div data-type="content">'+opt.content+'</div>';
				box.html(html);
				var title = box.children('[data-type=title]');
				//弹窗内容部分
				if(opt.closeUse === true){
					var _this = this;
					title.children('.'+this.opt.closeCla).show().addEventFun(function(){
						if(opt.closeClick){
							opt.closeClick();
						}else{
							_this.hide();
						}
					});
				}else{
					title.children('.'+this.opt.closeCla).hide();
				}
				base.append(box);
			}
		}
		//判断弹窗版本
		if(this.opt.version === 1){
			this.draw();
		}else{
			this.newDraw();
		}
		this.hide();
	}
}($))
var Carousel = function(opt){
	//默认数据
	this.setting = {
		dCla:'wap_banner',
		uCla:'wap_bannerU',
		point:true,
		pCla:'wap_bannerPoint',
		target:null,
		montage:'html',
		data:[],
		stepFun:function(){},
		autoRun:true,
		autoRunAction:'left',
		stepTime:3000,
		dId:'',
		stepPoint:true,
		pointMove:true,
		imgLoadMethod:0  //0不需要 1定高加载 2 按图片高度居中加载
	};
	//初始化参数
	this.init = function(){
		this.setting.dId = 'b'+(+new Date());
		$.extend(this.setting,opt);
		this.draw();
		if(this.setting.autoRun){
			this.startRun();
		}
	}
	this.getId=function(){
		return this.setting.dId;
	}
	//自动轮播定时器
	this.autoTimer = null;
	//开始自动轮播
	this.startRun = function(){
		var _this = this;
		this.autoTimer = setInterval(function(){
			_this.swipe(_this.setting.autoRunAction);
		},this.setting.stepTime);
	}
	//停止自动轮播
	this.stopRun = function(){
		clearInterval(this.autoTimer);
	}
	//绘制轮播
	this.draw = function(){
		if(this.setting.target){
			this.setting.target[this.setting.montage](this.getHtml());
			var ul = $('#'+this.setting.dId).children('ul:first');
			var _this = this;
			ul.width(ul.parent().width()*this.setting.data.length);
			ul.children().width(ul.parent().width());
			this.imgLoad[this.setting.imgLoadMethod](ul);
			//判断当前元素个数 如果小于或等于1，强行自动停止轮播并且解绑滑动事件
			if(this.setting.data.length > 1){
				ul.swipeToLeft(function(){
					_this.swipe('left');
				});
				ul.swipeToRight(function(){
					_this.swipe('right');
				});
			}else{
				this.setting.autoRun = false;
			}
		}
	}
	//返回拼接轮播html
	this.getHtml = function(){
		var _this = this,
		lis = [],
		point = [],
		html = [];
		$.each(this.setting.data,function(i,n){
			//支持格式["图片链接1","图片链接2"],[{"url":"图片链接1"},{"url":"图片链接2"}]兼容性添加 lrj 20180713
			if(typeof n == 'string') {
				html = '<img src="'+((i == 0)?n:'')+'" img_src="'+((i != 0)?n:'')+'">';
			} else if(n.html){
				html = n.html;
			}else{
				html = '<img src="'+((i == 0)?n.url:'')+'" img_src="'+((i != 0)?n.url:'')+'">'
			}
			lis.push($('<li>',{
				data:n.data || n,
				html:html
			}));
			point.push($('</li><li>',{class:i == 0?'curPoint':''}));
		});
		html = [];
		html.push($('<ul>',{
			html:lis,
			class:_this.setting.uCla
		}));
		if(this.setting.point){
			html.push($('<ul>',{
				html:point,
				class:'wap_bannerPoint'
			}));
		}
		html = $('<div>',{
			id:_this.setting.dId,
			class:_this.setting.dCla,
			html:html
		});
		return html;
	}
	//轮播事件
	this.swipe = function(action){
		if(this.setting.data.length <= 1){ return false; } var div="$('#'+this.setting.dId);" ul="div.children('ul:first');" if(!ul.is(':animated')){ wid="div.width();" _this="this;" max="this.setting.data.length;" index="ul.children('li').index();" if(action="='left'){" index++; }else index--; if(index < 0){ - 1; max){ nextsrc="ul.children('li').eq(index).find("img");" if(!nextsrc.attr("src") || nextsrc.attr("src")="=" ""){ nextsrc.attr({ src: nextsrc.attr("img_src") , img_src: ""}); ul.children('ul').eq(index).fadein(300); 'left'){ ul.animate({left:'-="+wid+" px'},500,'linear',function(){ $(this).css('left','0px').children(':first').appendto($(this)); if(_this.setting.steppoint && _this.setting.pointmove){ _this.culpoint(action,ul.next()); _this.setting.stepfun(action); }); }else{ ul.children(':last').prependto(ul); ul.css({left:-wid+'px'}); ul.animate({left:'+="+wid+" 计算亮点位置 this.culpoint="function(action,ul){" ul.children('li:eq('+index+')').addclass('curpoint').siblings().removeclass('curpoint'); 加载图片方式 this.imgload="[" function(ul){ ul.find('img').width('100%'); }, aimginfos="[];//图片集合" oimginfo="{};//单个图片" imgcount="0;" ul.find('img').on('load',function(){ iwidth:$(this).width(), iheight:$(this).height() }; aimginfos.push(oimginfo); imgcount++; if(imgcount="=" this.setting.data.length){ aimginfos.sort(function(a,b){return a.iheight>b.iHeight?1:-1});	//排序，从小到大
					oImgInfo = (aImgInfos.length%2 === 0) ? aImgInfos[aImgInfos.length/2] : aImgInfos[(aImgInfos.length-1)/2];	//获取图片高度区间
					var bHeight = oImgInfo.iHeight/(oImgInfo.iWidth/$(window).width());
					ul.children('li').height(bHeight);
					ul.find('img').css({width:'100%',height:bHeight});
				}
			});
		},
		function(ul){
			var bwh = {
				w : ul.children('li').width(),
				h : ul.children('li').height()
			};
			ul.find('img').on('load',function(){
				if($(this).height() > bwh.h && $(this).width() < bwh.w){
					$(this).height('100%');
				}else if($(this).width() > bwh.w && $(this).height() < bwh.h){
					$(this).width('100%');
				}else{
					var wRatio = $(this).width()/bwh.w;
					var hRatio = $(this).height()/bwh.h;
					if(wRatio > hRatio){
						$(this).width('100%');
					}else{
						$(this).height('100%');
					}
				}
			});
		}
	];
	this.init();
}
/*
*获取自电商用户信息失败错误弹窗
*日期：2015-8-26
* param = {
*	cla:
*	param:
*	error:{
*		suc:function(){},
*		fail:function(){}
*	}
*}
*/

function zdsGetUserInfo(param){
	var _this = this;
	this.zds = null;
	if($('#aggregate_headPortrait').length == 0){
		var cla = '\
			.aggregate_headPortrait{overflow:hidden;width:20%;border-radius:50%;color:#fff;font-size:1.5rem;box-shadow:0 0 0 3px #fff;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;}\
			.aggregate_headPortrait>img{width:100%;}\
		';
		$('body').prepend($('<style>',{
			html:cla,
			id:'aggregate_headPortrait'
		}));
	}
	this.opt = {
		functionCode:'selfEcUserinfo',			//调用接口functionCode
		target:null,				  	//目标对象
		meth:'replaceWith',			  	//替换方法（html,append,prepend,after,before）
		cla:'',						//头像样式
		param:{},					//调用接口入参
		bgColor:['#fbe370','#ffae71','#f29780','#f2a3b2','#b097cf','#9ca7d6','#99d1cd','#94e185','#d7f153'],//头像背景随机颜色组
		error:{						//接口返回异常
			goOn:null,				//继续按钮事件
			stop:null,				//放弃按钮事件
			call:null				//只要接口异常就会调用
			},
		succ:null,					//成功事件
		loadError:errorTo404		  		//跳转404
	}
	$.extend(_this.opt,param);
	doAjax(_this.opt.functionCode,_this.opt.param,function(data){
		if(data.headerInfo.code === 'W_0000' && data.responseContent.serviceCode === '0'){
			var html = null;
			if(data.responseContent.portraitUrl){
				html = $('<img>',{
					src:data.responseContent.portraitUrl
				});
			}else{
				html = data.responseContent.userName;
			}
			if(_this.opt.target){
				if($('#userPic').length == 0){
					var style = data.responseContent.userName.length>1?'font-size:1.5rem;':'font-size:1.6rem;';
						style += 'background-color:'+_this.opt.bgColor[Math.floor(Math.random()*9)]+';';
					_this.opt.target[_this.opt.meth]($('<div>',{
						id:'userPic',
						html:html,
						class:'aggregate_headPortrait '+_this.opt.cla,
						style:style
					}));
					$('#userPic').height(function(){
						return $(this).width();
					});
					if(_this.opt.succ){
						_this.opt.succ();
					}
				}
			}
		}else{
			_this.zdsBox = new zdsError(_this.opt.error.goOn,_this.opt.error.stop);
			if(_this.opt.error.call){
				_this.opt.error.call(data);
			}
		}
	},function(data){
		_this.zdsBox = new zdsError(_this.opt.error.goOn,_this.opt.error.stop);
		if(_this.opt.error.call){
			_this.opt.error.call(data);
		}
	},function(data){
		_this.zdsBox = new zdsError(_this.opt.error.goOn,_this.opt.error.stop);
		if(_this.opt.error.call){
			_this.opt.error.call(data);
		}
	},true,true,_this.opt.loadError);
}
/*
*自电商获取信息失败弹窗
*日期：2015-8-26
*param:goOn（继续按钮）stop（放弃）
*/
function zdsError(goOn,stop){
	var _this = this;
	if($('#onlineRetailersIndex_maskBox').length == 0){
		var cla='\
			.onlineRetailersIndex_mask{width:100%;height:100%;position:absolute;top:0;left:0;background:rgba(0,0,0,0.6);z-index:100}\
			.onlineRetailersIndex_content{width:90%;position:absolute;top:30%;left:5%;}\
			.onlineRetailersIndex_content>ul>li:first-child{width:40%;float:left;}\
			.onlineRetailersIndex_content>ul>li:first-child>img{width:100%;}\
			.onlineRetailersIndex_content>ul>li:last-child{width:58%;float:right;margin-top:1rem;}\
			.onlineRetailersIndex_content>ul>li:last-child>img{width:100%;}\
			.onlineRetailersIndex_content>ul>li:last-child>p>span{display:inline-block;width:48%;margin-top:1rem;}\
			.onlineRetailersIndex_content>ul>li:last-child>p>span:first-child{float:left;}\
			.onlineRetailersIndex_content>ul>li:last-child>p>span:last-child{float:right;}\
		';
		var html = '\
			<div class="onlineRetailersIndex_mask">\
				<div class="onlineRetailersIndex_content">\
					<ul class="clerafix">\
						<li><img src="https://www.189.cn/client/wap/selfOnlineRetailers/images/cry.png"/></li>\
						<li>\
							<img src="https://www.189.cn/client/wap/selfOnlineRetailers/images/talk.png"/>\
							<p class="clerafix">\
								<span id="onlineRetailersGoOn" class="commonButton_yellow">继续</span>\
								<span class="commonButton_yellow">放弃</span>\
							</p>\
						</li>\
					</ul>\
				</div>\
			</div>\
		';
		$('body').prepend($('<style>',{
			html:cla,
			id:'onlineRetailersIndex_maskStyle'
		})).append($('<div>',{
			id:'onlineRetailersIndex_maskBox',
			html:html
		}));
		$('#onlineRetailersGoOn').addEventFun(function(){
			_this.hide();
			goOn();
		}).next().addEventFun(function(){
			_this.hide();
			stop();
		});
	}
	this.show = function(){
		openBoxBefore();
		$('#onlineRetailersIndex_maskBox').show();
	}
	this.hide = function(){
		closeBoxBefore();
		$('#onlineRetailersIndex_maskBox').hide();
	}
	this.show();
}
/*
*自电商错误跳转404页面
*/
function errorTo404(data,codes){
	var errCode = ['1','2','3','W_0001','W_0002','W_0004','W_0005','W_0006','W_0007','W_0008','W_0009'];
	if(codes){
		errCode = errCode.concat(codes);
	}
	if(errCode.indexOf(data.headerInfo.code)>-1 || errCode.indexOf(data.responseContent.serviceCode)>-1){
		window.location.href = 'https://www.189.cn/client/wap/common/page/error_404.html?errorCode=20001';
		return false;
	}
}
/*
* 获取自电商分享语富文本
* param 分享对象
*zds = {
*	title:{
*		count:'20',
*		tip:''
*		}
*	content:[],
*	tip:[]
*}
*/
function getZdsShare(zds){
	var html = '';
	html += '<div style="text-align:center;font-size:0.8rem;"><span style="font-size:2.4rem;font-weight:bold;color:#FB8900;">'+zds.title.count+'</span>&nbsp;&nbsp;'+zds.title.tip+'</div>';
	html += '<div style="line-height:1.3rem;text-align:center;font-size:1.1rem;font-weight:bold;">';
	$.each(zds.content,function(i,n){
		html +=(i==0?'':'<br/>')+n;
	});
	html += '</div>';
	html += '<div style="line-height:1.1rem;text-align:center;font-size:0.7rem;color:#818181;padding-top:0.3rem;">';
	$.each(zds.tip,function(i,n){
		html +=(i==0?'':'<br/>')+n;
	});
	html += '</div>';
	return html;
}
/*
*截取路径中参数
*key:sessionStorage中存储key，（非必传）
*href：当前路径href;（非必传）
*isRoot:是否直接存sessionStorage节点下（非必传）
*/
function getParam(key,href,isRoot){
	href = href?href.split('?')[1]:window.location.search.slice(1);
	if(href){
		var param = {};
		$.each(href.split('&'),function(i,n){
			param[n.split('=')[0]] = n.split('=')[1];
		});
		if(key){
			window.sessionStorage[key] = JSON.stringify(param);
		}else if(isRoot){
			$.each(param,function(i,n){
				window.sessionStorage[i] = n;
			});
		}
		return param;
	}
	return '';
}


/**
 * 2015-09-15
 * 添加给版本号替换.
 * 入参 version
 * eg：5.3.0 替换为 50300
 * @param version
 * @returns
 */
function rpVersion(version){
	if(version){
		if(version.indexOf('.') > -1){
			if(version.length > 5){
				version = version.slice(0,5);
			}
			version = version.replace(/\./g,'0');
		}
	}
	return version;
}

/**
*过滤输入框中的的标签，不执行脚本
*
*/
function xssCheck(str,reg){
    return str ? str.replace(reg || /[<>](?:(lt|gt\d+);)?/g,
    	function (a, b) {
	        if(b){
	            return a;
	        }else{
	            return {
	                '<':'&lt;',
	              //s  '&':'&amp;',
	              //  '"':'&quot;',
	                '>':'&gt;'
	              //  "'":'&#39;',
	            }[a]
	        }
    }) : '';
}

/**
**
**获取obj对象中输入框的值，并执行xss的校验。
*obj：例如，$("#divId")/$(".cssId")等
*/
function getInputVal(obj){
	return xssCheck($.trim(obj.val()));
}

/**
 * 2017-05-11
 * 弹窗错误提示 start
 * thh
 * 入参 object :{
 *	 err        ：错误信息,
 *	 times      :错误信息显示时间  默认2s
 *	 errTipMask :蒙版样式
 *	 errTipCont :误信息样式
 *	 afterClose：错误信息隐藏后执行事件 例子:function(){…}
 * 	 isNotClose:是否不隐藏错误信息 true不隐藏
 *
 * 
 */
function showErrorPop(opt) {
	$('#errorTipMask').remove();
	var _this = this;
	_this.opt = {
		err:'',										//错误提示
		times:2000,									//错误信息显示时间  默认2s
		errTipMask:'errTipMask',					//蒙版样式
		errTipCont:'errTipCont', 					//错误信息样式
		afterClose:function(){},					//错误信息隐藏后执行事件 例子:function(){…}
		isNotClose:false							//是否不隐藏错误信息 true不隐藏
	};
	var set={};										//thh 2017.10.9  定义传参可以为只传错误语
	if(typeof(opt) == "object"){									
		set = opt;									//对象类型时重置传过来的所有设置值
	}else{
		set.err = opt;								//当为非对象类型 只重置错误提示		
	}
	$.extend(_this.opt,set);
	//默认隐藏错误提示
	if(_this.opt.isNotClose !== true){
		_this.opt.isNotClose=false;
	}
	//错误消息显示时间 默认为2000
	if(isNull(_this.opt.times) || _this.opt.times <0){
		_this.opt.times=2000;
	}
	//判断错误提示是不是为空，空则不提示
	var htmls='';
	htmls = '<div id="errorTipMask" class="'+_this.opt.errTipMask+'">\
		<div id="errorTipContent" class="'+_this.opt.errTipCont+'">\
			'+_this.opt.err+'\
		</div>\
	</div>';
	$('body').append(htmls);
	if(!_this.opt.isNotClose){					 		//不传时间默认不隐藏
		setTimeout(function(){
			$('#errorTipMask').hide();				    //定时器 times 隐藏
			_this.opt.afterClose();        		   		//错误隐藏以后执行事件
		},
		_this.opt.times)
	}
}
/********错误弹窗公共 end ************/

/**
 * 判断是否为UC浏览器(仅适用于移动设备) lrj 20170912
 */
function isUCBrowser(){
	var userAgent = navigator.userAgent.toLowerCase();
	var isUCFlag = userAgent.match(/ucbrowser/i) == 'ucbrowser';
	if(isUCFlag) {
		return true;
	} else {
		return false;
	}
}

/**
 * 地址弹窗插件 start lrj 20171013
 * 入参：
 * version: 弹窗版本
 * baseId: 弹出框id,默认common_address_popup
 * closeClick: 蒙版点击时事件执行方法，默认null
 * ulClass: ul 自定义class
 * columnNum: 显示列数，默认为3
 */
var AddressPopup = {};
(function(){
	AddressPopup = function (opt) {
		var _this = this;
		this.opt = {
			version:1,					//弹窗版本
			baseId:'common_address_popup',				//弹出框id
			closeClick:null,
			ulClass:'', //ul class
			columnNum:3 //显示列数，默认为3
		};
		$.extend(this.opt,opt);
		var popupHtml ='<div class="common_address_wrap"><div class="common_address">';
		if(this.opt.columnNum == 1) {
			popupHtml += '<ul class="common_address_column common_address_one_column common_address_first_column '+this.opt.ulClass+'"></ul>';
		} else if(this.opt.columnNum == 2) {
			popupHtml += '<ul class="common_address_column common_address_two_column common_address_first_column '+this.opt.ulClass+'"></ul>\
				        	<ul class="common_address_column common_address_two_column common_address_second_column '+this.opt.ulClass+'"></ul>';
		} else if(this.opt.columnNum == 3) {
			popupHtml += '<ul class="common_address_column common_address_three_column common_address_first_column '+this.opt.ulClass+'"></ul>\
				        	<ul class="common_address_column common_address_three_column common_address_second_column '+this.opt.ulClass+'"></ul>\
				        	<ul class="common_address_column common_address_three_column common_address_third_column '+this.opt.ulClass+'"></ul>';
		} else {
			return;
		}
		popupHtml += '</div><div class="common_address_mask"></div></div>';
		$('#'+this.opt.baseId).html(popupHtml).hide();//填充页面内容

		//点击取消冒泡
		$('#'+this.opt.baseId).off('click').on("click",'li',function(){
			return false;
		});

		//关闭蒙层
		$('#'+this.opt.baseId+' .common_address_mask').addEventFun(function(event){
			$(this).parent().parent().hide();
			closeBoxBefore();
			if(_this.opt.closeClick)_this.opt.closeClick();
			return false;
		});
	}
})();
/** 地址弹窗插件 end lrj 20171013*/
/*
*页面location跳转
*   @Parameters
*   url 默认是相对路径,使用window.location.origin+url拼接跳转；如果flag为true,则直接跳转，不拼接window.location.origin
*   flag false是本项目地址，true 其他项目地址。
*   url 的规范必须带有/目录。 例如   /webapp下的文件夹名称/文件路径
*	如果不兼容 origin,使用 protocol+//+host获取域名
*	by lxc 2017-11-23
* */
function locationPage(url,flag){
	showLoginWaitCurr();
	var fullHref = "";
	if(flag){
		fullHref=url;
	}else{
		if(!isNull(window.location.origin)){
			fullHref=window.location.origin+url;
		}else{
			fullHref = window.location.protocol+"//"+window.location.host+url;
		}
	}
	window.location.href=fullHref;
	hideLoginWaitCurr();
}

/**
 * lrj 20180816
 * 需引入https://www.189.cn/client/wap/common/js/aes.js
 * 加密
 * @param word 需加密信息
 * @param key 秘钥
 * @returns {*}
 */
function encrypt(word,_key){
    var key = CryptoJS.enc.Utf8.parse(_key || 'telecom_wap_2018');
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

/**
 * 需引入https://www.189.cn/client/wap/common/js/aes.js
 * 解密
 * @param word 需解密信息
 * @param key 秘钥
 * @returns {*}
 */
function decrypt(word,_key){
	var key = CryptoJS.enc.Utf8.parse(_key || 'telecom_wap_2018');
	var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

/**
 * 20180907 lrj
 * return true: 微信内 ，false: 微信外
 */
function isWeiXin(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/micromessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}
/**
 * 20181010 用来判断是否是在欢go客户端内打开
 * return : 1 android客户端，2  ios客户端，0  wap页面
 */
function isClient(){
	var u = navigator.userAgent.toLocaleLowerCase(); //获取页面来源并转换成小写
	var isAndroid = u.indexOf('android') > -1 && u.indexOf('ctclient') > -1; //android终端
	var isiOS = u.indexOf('ios') > -1 && u.indexOf('ctclient') > -1; //ios终端
	if(isAndroid){
		return 1; //安卓
	} else if(isiOS){
		return 2;  //ios 
	} else {
		return 0; // wap
	}
}

//显示弹框,背景不回到顶部 lrj 20181105
(function($){
    var otherFlag = isOtherBrowser();
    //特殊浏览器，不完全支持
    function isOtherBrowser(){
        var userAgent = navigator.userAgent.toLowerCase();
        if(userAgent.match(/android/i) == "android" && userAgent.match(/qqbrowser/i) == "qqbrowser") {
            return true;
        }
        return false;
    }
    function plugTouchStart(e){
        var _this = e.data.ele,
            touch = e.originalEvent.targetTouches[0];
        _this.data('pointY', touch.pageY);
    }
    function plugTouchMove(e){
        var _this = e.data.ele,
            touch = e.originalEvent.targetTouches[0],
            scrollTop = _this.scrollTop(),                                          //弹框元素的滚动条高度
            isBottom = (scrollTop + _this[0].clientHeight >= _this[0].scrollHeight),//弹框元素的滚动条是否在底部
            target = e.data.scrollEle ? ($(e.target).hasClass(e.data.scrollEle) ? $(e.target) : $(e.target).parents('.'+e.data.scrollEle))  : '',     //是否存在scrollEle的滚动元素
            tarScrollTop = 0,                                 //scrollEle元素的滚动条高度
            isTarBottom = true,                               //scrollEle元素的滚动条是否在底部
            isScrollUp = (touch.pageY > _this.data('pointY'));//是否向上滚动
        if(target.length !== 0){
            tarScrollTop = target.scrollTop();
            isTarBottom = (tarScrollTop + target[0].clientHeight >= target[0].scrollHeight);
        }
        if((scrollTop <= 0 && isScrollUp && tarScrollTop <= 0) || (isBottom && !isScrollUp && isTarBottom)){
            //滚动条在顶部，不允许向上滑动，滚动条在底部，不允许向下滑动
            return false;
        }
        e.stopPropagation();
    }
    //禁用滚动
    $.fn.dealShow = function(scrollEle){
        var _this = this;
        _this.scrollTop(0);
        scrollEle && $('.' + scrollEle).scrollTop(0);
        $('body').css({'overflow':'hidden'});
        _this.off('touchstart', plugTouchStart).on('touchstart', {'ele': _this, 'scrollEle': scrollEle}, plugTouchStart);
        _this.off('touchmove', plugTouchMove).on('touchmove', {'ele': _this, 'scrollEle': scrollEle}, plugTouchMove);
        return _this;
    };
    //打开页面滚动
    $.fn.dealHide = function(){
        $('body').css({'overflow' : 'auto'});
        return this;
    };
    //eles 遮罩层元素
    window.popUpBoxPlug = function(eles){
        //弹框遮罩层不允许滚动
        (eles || $('.popUpBoxPlugMask')).on('touchmove',function(e){
            e.preventDefault();
        });
    };
})(jQuery);</style></=></div></ul></ul></li></div></div></=>