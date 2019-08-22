/*banner*/
/*
 */
/*banner*/

/*section*/
window.onload = function () {
	//ban请求
	function ban_img(callback) {
		console.log('ban_img load...');
		var ba = document.getElementById('ba');
		var xhr = new XMLHttpRequest();
		var url = '/index/ban';
		xhr.open('get', url, true);
		xhr.send(null);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				var data = JSON.parse(result);
				var innerHTML = `
				<div>
				<ul>`
				data.forEach((elem, i, arr) => {
					innerHTML += `
						<li>
						<a href="${elem.href}">
							<img src="../${elem.img}" title='${elem.title}'>
						</a>
					</li>
						`;
				});
				innerHTML += `
				</ul>
			</div>
			<a href="#">上一张</a>
			<a href="#">下一张</a>
			<div>
				<ul>
					<li><a href="#"></a></li>
					<li><a href="#"></a></li>
					<li><a href="#"></a></li>
					<li><a href="#"></a></li>
				</ul>
			</div>
				`;
				ba.innerHTML = innerHTML;
				callback();
			}
		}
	};
	//ban
	function banner() {
		console.log('ban_img run...');
		var ban_ul = document.querySelectorAll('.banner>div:first-child>ul')[0];
		var ban_btn = document.querySelectorAll('.banner>div:last-child>ul>li');
		var ban_prev = document.querySelectorAll('.banner>a')[0];
		var ban_next = document.querySelectorAll('.banner>a')[1];
		var offset = 0;
		var setTime = 2000;
		var ban_exp = '';
		var nowIdx = 0;
		var idx = 0;
		var ulStyle = ban_ul.style;
		ban_ul.style.left = 0 + 'px';
		ban_prev.onclick = function () {
			var nowPos = parseInt(ulStyle.left);
			if (nowPos >= 0) {
				ulStyle.left = -3000 + 'px';
			} else {
				ulStyle.left = (nowPos + 1000) + 'px';
			}
			nowIdx--;
			console.log('prev>>' + nowIdx % 4);
		};
		ban_next.onclick = function () {
			var nowPos = parseInt(ulStyle.left);
			if (nowPos <= -3000) {
				ulStyle.left = 0 + 'px';
			} else {
				ulStyle.left = (nowPos - 1000) + 'px';
			}
			nowIdx++;
			console.log('next>>' + nowIdx % 4);
		};

		function Marquee() {
			nowIdx++;
			ban_exp = document.querySelectorAll('.banner>div:last-child>ul>li');
			ban_exp.forEach(li => {
				li.style.background = '#fff';
			});
			ban_btn[idx].style.background = '#0aa1ed';
			ban_ul.style.transition = '.5s linear';
			ban_ul.style.left = idx * (-1000) + 'px';

			idx = nowIdx % 4;
			// console.log('>>' + idx);
		}
		var timer = setInterval(Marquee, setTime);
		for (var i = 0; i < ban_btn.length; i++) {
			(function (i, idx) {
				ban_btn[i].onmouseout = function () {
					ban_btn[i].style.background = '#fff';
					timer = setInterval(Marquee, setTime);
					console.log('<<<' + idx);
					return idx;
				}
				ban_btn[i].onmouseover = function () {
					clearInterval(timer);
					ban_exp.forEach(li => {
						li.style.background = '#fff';
					});
					ban_btn[i].style.background = '#0aa1ed';
					ban_ul.style.transition = '.5s linear';
					ban_ul.style.left = i * (-1000) + 'px';
					idx++;
				}
			})(i, idx);
		}
	};
	ban_img(banner);
	//1f请求
	(function () {
		var xhr = new XMLHttpRequest();
		var url = '/laptop/index';
		xhr.open('get', url, true);
		xhr.send(null);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				var data = JSON.parse(result);
				var div = document.getElementsByClassName('floor_content')[0];
				console.log(data);
				var innerHTML = '';
				for (var i = 0; i < 2; i++) {
					innerHTML += `<div class='hotsell'>
						<img id='img_even' src="../${data[i].pic}" alt="">
						<div>
							<p>${data[i].title}</p>
							<p>${data[i].details}</p>
							<p>￥${data[i].price.toFixed(2)}</p>
							<a href="../html/laptop/${data[i].href}">查看详情</a>
						</div>
					</div>`;
				}
				for (var i = 2; i < 6; i++) {
					if (i == 2) {
						innerHTML += `<div class='hotsell'>`;
					} else {
						innerHTML += `<div class='product'>`;
					}
					innerHTML += `<img src="../${data[i].pic}" alt="">
					<div>
						<p>${data[i].title}</p>
						<p>￥${data[i].price.toFixed(2)}</p>
						<a href="../html/laptop/${data[i].href}">查看详情</a>
					</div>
				</div>`;
				}
				div.innerHTML = innerHTML;
			}
		}
	}());
}

function onload_sec() {

}
/*section*/