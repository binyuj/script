// ==UserScript==
// @version        1.0.0
// @author         haveatry823@qq.com
// @name           一些小脚本
// @namespace      https://github.com/haveatry823
// @description    百度贴吧自动签到当前贴吧，去贴吧顶部Banner广告, github看代码的时候宽屏显示等
// @downloadURL    https://github.com/haveatry823/script
// @updateURL      https://github.com/haveatry823/script
// @include        https://github.com/*/commit/*
// @include        https://github.com/*/commits/*
// @include        https://github.com/*/blame/*
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f*
// ==/UserScript==


function route(keyword, fn) {
	var win = typeof unsafeWindow === "undefined" ? window : unsafeWindow
	if (win.location.href.indexOf(keyword) === -1) return;
	var cb = document.createElement("script");
	cb.type = "text/javascript";
	cb.textContent = "(" + fn.toString() + ")();";
	document.head.appendChild(cb);
}

route("github", function(win){		
	var div = document.getElementsByClassName("container");
	if (div && div.length >0){
		for(var i=0; i< div.length; i++){
			div[i].style.width = screen.width * 0.9 + "px";
		}
	}
});	
	
route("tieba.baidu.com", function(){
	//屏蔽Banner广告
	var div = document.getElementsByClassName("l_banner");
	if (div && div.length == 1) div[0].style.display = "none";

	//屏蔽签名
	var imgs = document.getElementsByClassName("j_user_sign");
	var lines = document.getElementsByClassName("d_sign_split");	
	if (imgs && imgs.length >0){
		for(var i=0; i< imgs.length; i++){
			imgs[i].style.display = "none";
		}
	}
	if (lines && lines.length >0){
		for(var i=0; i< lines.length; i++){
			lines[i].style.display = "none";
		}
	}	
	document.getElementById("aside_ad").style.display = "none";
	if (window["PageData"] && window["PageData"].is_sign_in == 0 && window["Sign_rank"] && window["Sign_rank"].sign_add) window["Sign_rank"].sign_add();		
});

