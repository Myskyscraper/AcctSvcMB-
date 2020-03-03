// mui.init({
// 	swipeBack: true
// 	// 启用右滑关闭功能
// });
Date.prototype.format = function (format) {
	var args = {
		"y+": this.getFullYear(),
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),  //quarter 
		"S+": this.getMilliseconds()
	};
	for (var i in args) {
		var n = args[i];
		if (new RegExp("(" + i + ")").test(format)) {
			var len = RegExp.$1.length;
			var fil = "";
			for (var j = 0; j < len; j++) {
				fil += "0";
			}
			format = format.replace(RegExp.$1, (fil + n).substr(("" + n).length));
		}
	}
	return format;
};
export const ccbskObj={
    isDebug:false,
    chars:['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    startTime:'',
    setupWebViewJavascriptBridge:function(callback){
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            WebViewJavascriptBridge.init(function (message, responseCallback) {
                responseCallback(data);
            });
            callback(WebViewJavascriptBridge);
        }, false);
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    },
    showCCBSKMsg:function(respCode, respMsg, msg) {
        var msg = msg + ":" + respCode + "\n" + respMsg;
        window.WebViewJavascriptBridge.callHandler('invoke', { "action": "showToast", "msg": msg }, function (responseData) { });
    },
    // showErrHtmlMsg:function(code, msg){
    //     this.debugData(msg + "|" + code);
    //     var html = "<font color='red'>尊敬的客户，现在无法处理您的请求！<br>";
    //     if (code != '') {
    //         html += "错误码 :" + code + "<br>";
    //     }
    //     html += "错误信息: " + msg + "</font>";
    //     var el = document.getElementById('ccb-content');
    //     //el.innerHTML = "";
    //     li = document.getElementById('err-id');
    //     if (li) {
    //     } else {
    //         li = document.createElement('div');
    //         li.id = 'err-id';
    //         li.className = 'mui-table-view-cell';
    //         el.appendChild(li);
    //     }
    //     li.innerHTML = html;
    //     var eh = document.getElementById('ccb-header');
    //     eh.innerHTML = "";
    //     li1 = document.createElement('h1');
    //     li1.className = 'mui-title';
    //     li1.innerHTML = "错误提示";
    //     eh.appendChild(li1);
    // },
    // showHtmlMsg:function(code, msg){
    //     this.debugData(msg + "|>" + code);
    //     var html = "<caption>";
    //     html += msg + "</caption>";
    //     var el = document.getElementById('ccb-content');
    //     //el.innerHTML='';
    //     li = document.getElementById('info-id');
    //     if (li) {

    //     } else {
    //         li = document.createElement('div');
    //         li.id = 'info-id';
    //         li.className = 'mui-table-view-cell';
    //         el.appendChild(li);
    //     }
    //     li.innerHTML = html;
    // },
    // debugJsonData:function(msg, respData) {
    //     if (this.isDebug) {
    //         alert(msg + "\n" + JSON.stringify(respData));
    //     }
    // },
    // debugData:function(msg, respData) {
    //     if (this.isDebug) {
    //         alert(msg + "\n" + respData);
    //     }
    // },
    // genID:function(){
    //     var length = 36;
	//     return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
    // },
    isnull:function(value){
        if (typeof value == "undefined" || value == null || value == "") {
            return true;
        }
        return false;
    },
    // showCardNo:function(cardno) {
    //     if (this.isnull(cardno)) {
    //         return "";
    //     }
    //     len = cardno.length;
    //     // len = cardno.length;
    //     if (len < 10) {
    //         return cardno;
    //     }
    //     var start = cardno.substring(0, 4);
    //     var end = cardno.substring(len - 4, len);
    //     return start + "****" + end;
    // },
    // showTime:function(time) {
    //     if (this.isnull(time)) {
    //         return "";
    //     }
    //     len = time.length;
    //     // len = cardno.length;
    //     if (len != 6) {
    //         return time;
    //     }
    //     var hour = time.substring(0, 2);
    //     var min = time.substring(2, 4);
    //     var sec = time.substring(4, 6);
    //     return hour + ":" + min + ":" + sec;
    // },
    // showIDNum:function(cardno) {
    //     len = cardno.length;
    //     if (len <= 10) {
    //         // alert("卡号长度不正确");
    //         return cardno;
    //     }
    //     var start = cardno.substring(0, 4);
    //     var end = cardno.substring(len - 4, len);
    //     //alert(start+"****"+end);
    //     return start + "****" + end;
    // },
    randomMixed:function(n){
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += ccbskObj.chars[id];
        }
        return res;
    },
    generateRqsJrnlNo:function() {
        return new Date().format("yyyyMMddhhmmssSSS") + this.randomMixed(15);
    },
    closeCurrWindows:function() {
        window.WebViewJavascriptBridge.callHandler(
            'invoke', { "action": "closeWebView" }, function (responseData) {
                // alert(JSON.stringify(responseData));
                // 				mui.alert("数据正在加载中，请加载完成后点击！", "", function() {
                // 				return;
                // 			});
            }
        );
    },
    checkTimeOut:function() {
        if (this.isnull(this.startTime)) {
            this.startTime = new Date();
            return true;
        }
        var currTime = new Date();
        var dateDiff = currTime.getTime() - this.startTime.getTime();
        if (dateDiff >= 300000) {//超过五分钟，超时
            // if(dateDiff>=10000){//测试时，改为10秒超时
            mui.alert("由于您长时间未操作，系统超时，请重新登录！", "系统超时", function () {
                this.closeCurrWindows();
            });
            return false;
        } else {
            this.startTime = new Date();
            return true;
        }
    },
    formatAmount:function(val) {
        if (this.isnull(val)) {
            return "0.00";
        }
        return this.formatMoney(val, 1);
    },
    formatMoney:function(s, type) {
        if (/[^0-9\.]/.test(s))
            return "0.00";
        if (s == null || s == "null" || s == "")
            return "0.00";
        s = s.toString().replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
            s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        if (type == 0) {
            var a = s.split(".");
            if (a[1] == "00") {
                s = a[0];
            }
        }
        return s;
    },
    checkPhone:function(phone) {
        var reg = /^\d{11}$/;
        if (!(reg.test(phone))) {
            return false;
        }
        return true;
    },
    // goToTimeOutPage:function(rqs_Jrnl_No) {//跳转超时页面
    //     //先清空，在赋值
    //     localStorage.removeItem("errInfo");
    //     var data = {
    //         errInfo: "流水号：" + rqs_Jrnl_No
    //     };
    //     var d = JSON.stringify(data);
    //     localStorage.setItem("errInfo", d);
    //     console.log("测试是否能拿到路由",_this.$router)
    // },
    // getRqsJrnlNo:function() {
    //     // debugJsonData("h5view", respData);
    //     //如果第三方没有传入第三方流水号，使用我们自己生成的流水号
    //     if (this.isnull(respData.Rqs_Jrnl_No)) {
    //         rqs_Jrnl_No = this.generateRqsJrnlNo();
    //     } else {
    //         rqs_Jrnl_No = respData.Rqs_Jrnl_No;
    //     }
    //     return rqs_Jrnl_No;
    // },
    getWeek(dateString) {
        var date;
        if (this.isnull(dateString) || dateString.length != 8) {
            return "";
        } else {
            // var dateArray = dateString.split("-");
            month = dateString.substring(4, 6);
            month = parseInt(month) - 1;
            date = new Date(dateString.substring(0, 4), month, dateString.substring(6, 8));
        }
        //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
        //return "星期" + weeks[date.getDay()];
        return "周" + "日一二三四五六".charAt(date.getDay());
    },
    hideMblPhNo:function(mblPhNo) {
        if (this.isnull(mblPhNo)) {
            return "";
        }
        if (mblPhNo.length != 11) {
            mui.alert("您输入的手机号信息错误，请重新输入");
        }
        len = mblPhNo.length;
        // len = cardno.length;
        var start = mblPhNo.substring(0, 3);
        var end = mblPhNo.substring(len - 4, len);
        return start + "****" + end;
    }



}

/**
* 根据日期字符串获取星期几
* @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
* @returns {String}
*/
