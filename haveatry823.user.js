// ==UserScript==
// @version        1.0.0
// @author         haveatry823@qq.com
// @name           一些小脚本
// @namespace      https://github.com/haveatry823
// @description    百度贴吧自动签到当前贴吧，去贴吧顶部Banner广告, github看代码的时候宽屏显示等
// @downloadURL    https://github.com/haveatry823/script
// @updateURL      https://github.com/haveatry823/script
// @include        https://github.com/*/commit/*
// @include        https://github.com/*/blame/*
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f*
// @require		   https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

function withjQuery(callback){
	if(typeof(jQuery) == "undefined") {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";

		var cb = document.createElement("script");
		cb.type = "text/javascript";
		cb.textContent = "jQuery.noConflict();(" + callback.toString() + ")(jQuery, window);";
		script.addEventListener('load', function() { document.head.appendChild(cb);	});
		document.head.appendChild(script);
	} else {
		setTimeout(function() {
			callback(jQuery, typeof unsafeWindow === "undefined" ? window : unsafeWindow);
		}, 30);
	}
}

withjQuery(function($, window){
	function route(keyword, fn) {
		var url = window.location.href;
		if (typeof(keyword) == "string" && url.indexOf(keyword) != -1)  return fn();
		if (Object.prototype.toString.call(keyword) == "[object RegExp]" && keyword.test(url)) return fn();
	}

	route("github", function(){
		if ($("div.container").length) return $("div.container").width("90%");	
	});	
		
	route("tieba.baidu.com", function(){
		if ($("div.l_banner").length) $("div.l_banner").hide();
		if (PageData.is_sign_in == 0 && Sign_rank && Sign_rank.sign_add) setTimeout(function(){Sign_rank.sign_add()}, 1000);
	});
});
