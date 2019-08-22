window.onload = function () {
    //请求数据  
    (function () {
        var urlParams = new URLSearchParams(location.search);
        var lid = location.search.substring(location.search.indexOf('=')+1);
        var container_1 = document.getElementsByClassName('info')[0];
        var container_2 = document.getElementsByClassName('info')[1];
        
        var xhr = new XMLHttpRequest();
        var url = '/laptop/detail?lid='+lid;
        xhr.open('get', url, true);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                var data = JSON.parse(result)[0];
                console.log(data);
                console.log(data.price);
                var innerHTML = '';
                innerHTML += `
			<p>${data.title}</p>
			<p>${data.subtitle}</p>
			<div>
				<p>
					<span>学员售价：</span>
					<span>￥${data.price.toFixed(2)}</span>
				</p>
				<p>
					<span>服务承诺：</span>
					<span>${data.promise}</span>
				</p>
			</div>
			<p>
				<span>客服：</span>
				<span>联系客服</span>
				<img src="../../imgs/product_detail/kefuf.gif">
			</p>
			<div>
				<span>规格：</span>
				<p>
					<a href="#">${data.spec}</a>
				</p>
			</div>
			<p>
				<span>数量：</span>
				<button>-</button>
				<input type="text" name="" value="1">
				<button>+</button>
			</p>
			<p>
				<a href="#">立即购买</a>
				<a href="#">
					<img src="../../imgs/product_detail/product_detail_img7.png">
					<span>加入购物车</span>
				</a>
				<a href="#">
					<img src="../../imgs/product_detail/product_detail_img6.png">
					<span>收藏</span>
				</a>
			</p>
                `;

                container_1.innerHTML = innerHTML;
                innerHTML='';
                innerHTML+=`
                <div>
					<p>
						<span>规格参数</span>
						<img src="../../imgs/product_detail/product_detail_icon_1.png">
					</p>
					<ul>
						<li>
							<span>商品名称：${data.lname}</span>
						</li>
						<li>
							<span>系统：${data.os}</span>
						</li>
						<li>
							<span>内存容量：${data.memory}</span>
						</li>
						<li>
							<span>分辨率：${data.resolution}</span>
						</li>
						<li>
							<span>显卡型号：${data.video_card}</span>
						</li>
						<li>
							<span>处理器：${data.cpu}</span>
						</li>
						<li>
							<span>显存容量：${data.video_memory}</span>
						</li>
						<li>
							<span>分类：${data.category}</span>
						</li>
						<li>
							<span>硬盘容量:${data.disk}</span>
						</li>
					</ul>
				</div>
				<div>
					<p>
						<span>商品介绍</span>
						<img src="../../imgs/product_detail/product_detail_icon_4.png">
					</p>
					<img src="../../imgs/product/detail/57b15612N81dc489d.jpg">
					<p>技术规格请前往 www.apple.com/cn/macbook-air/specs.html 查看完整内容。</p>
				</div>
				<div>
					<p>
						<span>售后保障</span>
						<img src="../../imgs/product_detail/product_detail_icon_3.png">
					</p>
					<div>
						<p>
							<img src="../../imgs/product_detail/product_detail_img16.png">
							<span>正品保障</span>
						</p>
						<p>达内学子商城向您保证所售商品均为正品行货，达内自营商品开具机打发票或电子发票。</p>
					</div>
					<div>
						<p>
							<img src="../../imgs/product_detail/product_detail_img16.png">
							<span>全国联保</span>
						</p>
						<p>凭质保证书及达内商城发票，可享受全国联保服务，与您亲临商场选购的商品享受相同的质量保证。达内商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！
							注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</p>
					</div>
				</div>
				<div>
					<p>
						<span>包装清单</span>
						<img src="../../imgs/product_detail/product_detail_icon_2.png">
					</p>
					<p>笔记本 x1 适配器 x1 电源线 x1 电池 x1 说明书（电子版）x1 备注：笔记本电脑的背面只会标注此电脑的系列，例如： XPS 13-9360 ，
						如果您需要核实此电脑的具体配置型号是否与达内页面相符，可电话咨询达内厂商：800-858-2969</p>
				</div>
                `;
                container_2.innerHTML=innerHTML;
            }
        };
    }());


    //轮播
    (function () {
        var ban_ul = document.querySelectorAll('.banner>div>ul')[0];
        var ban_li = document.querySelectorAll('.banner>ul li');

        var pre_img = document.querySelectorAll('.preview img')[0];
        var pre_li = document.querySelectorAll('.preview li');

        var wrap = document.getElementsByClassName('banner')[0];
        var ban_ul1 = document.getElementById('ul1');
        var ban_ul2 = document.getElementById('ul2');

        ban_ul1.style.left = 0 + 'px';
        ban_ul2.style.left = 1000 + 'px';

        function Marquee() {
            var ul1 = parseInt(ban_ul1.style.left);
            var ul2 = parseInt(ban_ul2.style.left);
            if (ul1 <= -1000) {
                ul1 = 1000;
            }
            if (ul2 <= -1000) {
                ul2 = 1000;
            }
            ul1 -= 1;
            ul2 -= 1;
            ban_ul1.style.left = ul1 + 'px';
            ban_ul2.style.left = ul2 + 'px';

        }
        var timer2 = setInterval(Marquee, 20);

        wrap.onmouseout = function () {
            timer2 = setInterval(Marquee, 20);
        };
        wrap.onmouseover = function () {
            clearInterval(timer2);
        };
    }());
}