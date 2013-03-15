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
// ==/UserScript==

setTimeout(function(){
	function route(keyword, fn) {
		if (window.location.href.indexOf(keyword) !== -1) fn();
	}

	function $(exp){
		if (/^#.+$/.test(exp)) return document.getElementById(exp.replace("#",""));
		if (/^\..+$/.test(exp)) return document.getElementsByClassName(exp.replace(".",""));
		return null
	}

	route("github", function(){		
		var div = $(".container")
		if (div && div.length >0){
			for(var i=0; i< div.length; i++){
				div[i].style.width = screen.width * 0.9 + "px";
			}
		}
	});	
		
	route("tieba.baidu.com", function(){
		var div = $(".l_banner")
		if (div && div.length == 1) div[0].style.display = "none";
		if (window["PageData"] && window["PageData"].is_sign_in == 0 && window["Sign_rank"] && window["Sign_rank"].sign_add) window["Sign_rank"].sign_add();		
	});
},300);
