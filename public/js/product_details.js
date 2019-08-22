var ban_ul = document.querySelectorAll('.banner>div>ul')[0];
var ban_li = document.querySelectorAll('.banner>ul li');

var pre_img = document.querySelectorAll('.preview img')[0];
var pre_li = document.querySelectorAll('.preview li');

var wrap=document.getElementsByClassName('banner')[0];
var ban_ul1=document.getElementById('ul1');
var ban_ul2=document.getElementById('ul2');

ban_ul1.style.left=0+'px';
ban_ul2.style.left=1000+'px';

function Marquee(){
	var ul1=parseInt(ban_ul1.style.left);
	var ul2=parseInt(ban_ul2.style.left);
	if(ul1<=-1000){
		ul1=1000;
	}
	if(ul2<=-1000){
		ul2=1000;
	}
	ul1-=1;
	ul2-=1;
	ban_ul1.style.left=ul1+'px';
	ban_ul2.style.left=ul2+'px';

}
var timer2 = setInterval(Marquee, 20);

wrap.onmouseout=function(){
	timer2 = setInterval(Marquee, 20);
};
wrap.onmouseover=function(){
	clearInterval(timer2);
};




/*
function Marquee() {
	var ban_li = document.querySelectorAll('.banner>ul li');
	var ul_li = document.createElement('li');
	ban_li[4].innerHTML = ban_li[0].innerHTML;
	ul_li.innerHTML = ban_li[1].innerHTML;
	ban_ul.appendChild(ul_li);

	if (ban_ul.childElementCount > 5) {
		ban_ul.removeChild(ban_ul.childNodes[1]);
		if (ban_ul.childNodes[1].nodeName == '#text') {
			ban_ul.removeChild(ban_ul.childNodes[1]);
		}
	}
}

// var timer2=setTimeout(Marquee,2000);
*/









/*


var ban_ul = document.querySelectorAll('.banner>ul')[0];
var ban_li = document.querySelectorAll('.banner>ul li');

var pre_img = document.querySelectorAll('.preview img')[0];
var pre_li = document.querySelectorAll('.preview li');

//function fn_1(){
/*
for(var key in pre_li){
	(function(i){
		pre_li[i].onclick=function(){
			var Isrc=document.querySelectorAll('.preview>ul>li img')[i].src;
			var img_path='../..'+Isrc.substring(Isrc.indexOf('/imgs'));
			pre_img.src=img_path;
			return;
		}
	})(key);
}



var flag = 0;
var count = 0;
//console.log(ban_li.length);
*
function Marquee() {
	//flag = count % 5;
	//flag=2;
	//ban_ul.style.left = ((-250)) + 'px';
	//count++;
	//console.log(ban_ul.childNodes[1]);
	var fn1 = function () {
		return new Promise((resolve) => {
			
			var ban_li = document.querySelectorAll('.banner>div>ul li');
			var ul_li = document.createElement('li');
			ban_li[4].innerHTML=ban_li[0].innerHTML;
			ul_li.innerHTML = ban_li[1].innerHTML;
			console.log(ban_li[0].innerHTML);
			ban_ul.appendChild(ul_li);
			console.log('--->>');
			resolve();
		});
	};
	var fn2 = function () {
		return new Promise((resolve) => {
			if (ban_ul.childElementCount > 5) {
				ban_ul.removeChild(ban_ul.childNodes[1]);
				if (ban_ul.childNodes[1].nodeName == '#text') {
					ban_ul.removeChild(ban_ul.childNodes[1]);
				}
				//console.log(ban_ul.childElementCount);
				console.log('<<');
				resolve();
			}
		});
	}
	fn1().then(() => {
		return fn2();
	});
}
var timer2 = setInterval(Marquee, 1000);/*
// var timer2=setTimeout(Marquee,2000);*/