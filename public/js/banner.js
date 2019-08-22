/**
			 * [banner_basic 基于计时器原生js简单轮播切换]
			 * @param  {String} container_img [轮播存放图片的容器（ID）]
			 * @param  {String} fx            [轮播方向：left>往左；right>往右；top>往上；bottom>往下]
			 * @param  {Number} speed_step    [一张图片过场切换的步数]
			 * @param  {Number} time_step     [一张图片过场切换的步数耗时]
			 * @param  {Number} speed_posi    [图片间切换的步数与宽长比例]
			 * @param  {Number} time_posi     [图片间切换的步数耗时]
			 * @return {undefin}              [description]
			 * @version v1.0
			 */
			function banner_basic(container_img='',fx='left',speed_step=0,time_step=0,speed_posi=1,time_posi=1000){
				if(container_img==''){
					alert('请指定banner存放图片的容器');
					return;
				}
				var elem=document.getElementById(container_img);
				var wrap=window.getComputedStyle(elem,null);
				var imgArr=document.querySelectorAll('#'+container_img+' img');

				var $wid=parseInt(wrap.width);
				var $hig=parseInt(wrap.height);
				var $countImg=imgArr.length;
				//console.log(wrap);
				
				var innerSytle='';
				var time_in = '';
				var $newPos=0;
				var $height=0;
				var $width=0;

				var $widAlign=$wid*($countImg+2);
				var $higValign=$hig*($countImg+2);

				imgArr.forEach(img=>{
					img.style.display='block';
					img.style.float='none';
				});

				switch(fx){
					case 'left':{
						imgArr.forEach(img=>{
							img.style.display='block';
							img.style.float='left';
						});
						$newPos=0;
						innerSytle='width:'+$widAlign+'px;left:'+$newPos+'px;';
						elem.setAttribute('style',innerSytle);
						break;
					}
					case 'right':{
						imgArr.forEach(img=>{
							img.style.display='block';
							img.style.float='left';
						});
						$newPos=-($wid*($countImg)-1);
						innerSytle='width:'+$widAlign+'px;left:'+$newPos+'px;';
						elem.setAttribute('style',innerSytle);
						break;
					}
					case 'top':{
						$newPos=0;
						innerSytle='height:'+$higValign+'px;top:'+$newPos+'px;';
						elem.setAttribute('style',innerSytle);
						break;
					}
					case 'bottom':{
						$newPos=-$hig*($countImg-1);
						innerSytle='height:'+$higValign+'px;top:'+$newPos+'px;';
						elem.setAttribute('style',innerSytle);
						break;
					}
				}

				var timer_pos=setInterval(()=>{
					switch(fx){
					case 'left':{
						$newPos-=speed_posi*$wid;
						if($newPos<=-$wid*$countImg){
							$newPos=0;
						}
						var $newStep=$newPos+$wid;
	                    time_in=setInterval(() => {
	                    	console.log('int_left>'+$newPos+'>'+$newStep);
	                        $newStep-=speed_step;
	                        if ($newStep <= $newPos) {
	                            clearInterval(time_in);
	                        }
	                        innerSytle='width:'+$widAlign+'px;left:'+$newStep+'px;';
	                        elem.setAttribute('style',innerSytle);
	                    },time_step);
						break;
					}
					case 'right':{
						$newPos+=speed_posi*$wid;
						if($newPos>=$wid){
							$newPos=-$wid*(($countImg)-1);
						}
						var $newStep=$newPos-$wid;
	                    time_in=setInterval(() => {
	                    	console.log('int_left>'+$newPos+'>'+$newStep);
	                        $newStep+=speed_step;
	                        if ($newStep >= $newPos) {
	                            clearInterval(time_in);
	                        }
	                        innerSytle='width:'+$widAlign+'px;left:'+$newStep+'px;';
	                        elem.setAttribute('style',innerSytle);
	                    },time_step);
						break;
					}
					case 'top':{
						$newPos-=speed_posi*$hig;
						if($newPos<=-$hig*($countImg)){
							$newPos=0;
						}
						var $newStep=$newPos+$hig;
	                    time_in=setInterval(() => {
	                    	console.log('int_left>'+$newPos+'>'+$newStep);
	                        $newStep-=speed_step;
	                        if ($newStep <= $newPos) {
	                            clearInterval(time_in);
	                        }
	                        innerSytle='height:'+$higValign+'px;top:'+$newStep+'px;';
	                        elem.setAttribute('style',innerSytle);
	                    },time_step);
						break;
					}
					case 'bottom':{
						$newPos+=speed_posi*$hig;
						if($newPos>=$hig){
							$newPos=-$hig*($countImg-1);
						}
						var $newStep=$newPos-$hig;
	                    time_in=setInterval(() => {
	                    	console.log('int_left>'+$newPos+'>'+$newStep);
	                        $newStep+=speed_step;
	                        if ($newStep >= $newPos) {
	                            clearInterval(time_in);
	                        }
	                        innerSytle='height:'+$higValign+'px;top:'+$newStep+'px;';
	                        elem.setAttribute('style',innerSytle);
	                    },time_step);
						break;
					}
				}
				},time_posi);
			}

/**
 * 参考样式：
 * /*xn_ba_js_1_banner*/
/** 显示宽高 **
	.xn_ba_js_1_banner{width:100%;height:500px;visibility:hidden;overflow:hidden;position:relative;}
	.xn_ba_js_1_bigImg img {width:1920px;height:500px;border:0}
	.xn_ba_js_1_element{position:absolute;}
/** button **
	.xn_ba_js_1_btn{top:90%;cursor:pointer;position:relative;padding:0;margin:0 auto;}
	.xn_ba_js_1_btn li{float:left;list-style:none;padding:0;margin:0 20px;width:14px;height:14px;margin-left:0px;}
	.xn_ba_js_1_element_btn{background-image:url(http://1.rc.xiniu.com/rc/Banners/26069/images/xn_ba_js_1_rowBtn.png?d=20161109103933748);}
	.xn_ba_js_1_element_btn:hover,.xn_ba_js_1_element_btn_on{background-image:url(http://1.rc.xiniu.com/rc/Banners/26069/images/xn_ba_js_1_rowBtn_on.png?d=20161109103933748);}
/*end_xn_ba_js_1_banner*/
