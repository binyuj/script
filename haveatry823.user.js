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
// @include        https://github.com/*/compare/*
// @include        https://github.com/*/blob/*
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
			div[i].style.width = screen.width * 0.95 + "px";
		}
	}
	document.getElementById('js-repo-pjax-container').style.width='1240px';
	var frame = document.getElementsByClassName("frame");
	if (frame && frame.length) frame[0].style.width = screen.width * 0.95 + "px";
});


route("github", function(win){		
	var lis = document.getElementsByClassName("js-details-container");
	
	var getHash= function (url){
		var arr = url.toString().split("/commit/");
		return arr && arr.length == 2 ? arr[1].substring(0, 10) : ""	
	}
	var getPath = function (url){
		var arr = url.toString().split("/");
		arr.pop();
		arr[ arr.length -1 ] = "compare";
		return arr.join("/") + "/";
	}

	var clickEvent = function(event){
		var el = event.target;
		while(el.tagName != "LI"){ 
			el = el.parentNode;
		}	
		var selected = document.getElementsByClassName("cmp_selected");
		var newcolor = "red", oldcolor = "#333";
		var link = ((el.getElementsByClassName("commit-title"))[0].getElementsByTagName("a"))[0];

		if (selected.length <= 2){			
			link.style.color = link.style.color == newcolor  ? oldcolor : newcolor;
			if (selected.length == 2 && link.style.color == newcolor) {
				link.style.color = oldcolor;
				var reg = new RegExp("(\\s|^)cmp_selected(\\s|$)");
				link.className = link.className.replace(reg, " ");
			}
			if (link.style.color == newcolor){
				link.className += " cmp_selected";
			}else{
				var reg = new RegExp("(\\s|^)cmp_selected(\\s|$)");
				link.className = link.className.replace(reg, " ");
			}
		}
		selected = document.getElementsByClassName("cmp_selected");
		
		if (selected && selected.length == 2){
			var href1 = selected[0].getAttribute("href"), href2 = selected[1].getAttribute("href");
			var url = getPath(href1) + getHash(href2) + "..." + getHash(href1);
			document.getElementById("btn_viewcmp").setAttribute("href", url)
			return;
		}
	}


	if (lis && lis.length >0){
		for(var i=0; i< lis.length; i++){
			lis[i].addEventListener('click', clickEvent, true);
		}
		var cmp_button = document.createElement("a");
		cmp_button.id = "btn_viewcmp";		
		cmp_button.className = "minibutton";
		cmp_button.innerHTML = "View comparison";
		cmp_button.href = "#";
		cmp_button.style.marginLeft = "100px";
		cmp_button.target = "_blank";
		cmp_button.title = "请先点亮两个不同的提交，再点击本按钮来比较这两个提交的内容";
		var breadcrumb = document.getElementsByClassName("breadcrumb");
		breadcrumb[0].appendChild(cmp_button);		
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

