/*
 * @Name: 分页器——pagingUtil
 * @Description: 
 * @Author: evan leong
 * @Invoke: pagingUtil.pagingDevice(params)
 * @Current Version: [v1.0]
 * @Params: [inUl]-<ul>标签中的id属性
 * @Params: [currentPag]-当前页面
 * @Params: [selectValue]-<select>标签中每页显示数据
 * @Params: [dataPages]-数据的总页数
 * @Methods: pagingDevice(idUl,currentPage,selectValue,dataPages)-创建分页器，并将innerHTML代码返回到前端页面；
 * @Modify Version: [null]
 * @Bug: [null]
 * @Date: 2019-02-21 17:13:16
 * @LastEditTime: 2019-03-19 19:10:13
 */

var pagingUtil={
	pagingDevice:function(idUl,currentPage,selectValue,dataPages,clazz){
		// 当前页往前或往后项数；
		var num=2; 
		clazz='\"'+clazz+'\"';
		// 判断是否定义
		if(typeof(idUl)==='undefined'){
			console.log(idUl+' is not defined');
		}else if(document.getElementById(idUl.id)==null){
			console.log(idUl+' is not a id name');
		}else{
			// 初始化
			idUl.innerHTML='';
			// 当前页不是首页时，可用上一页和首页；当前页是首页时，上一页失效；
			if(currentPage>1){
				idUl.innerHTML+='<li><a href=\'javascript:upd.fn_pages('+(currentPage-1)+','+selectValue+','+clazz+')\'>上一页</a></li>';
				idUl.innerHTML+='<li><a href=\'javascript:upd.fn_pages(1,'+selectValue+','+clazz+')\'>&nbsp;1&nbsp;</a></li>';
			}else{
				idUl.innerHTML+='<li>上一页</li>'
			}
			// 当前页为首页之后或尾页之前的2页以上时，超过2页的以省略号表示；并只显示包括当前页的前一页与后一页；
			if((currentPage-num)>=1){
				if((currentPage-num)>1){
					idUl.innerHTML+='<li>...</li>';
				}
				idUl.innerHTML+='<li><a href=\'javascript:upd.fn_pages('+(currentPage-1)+','+selectValue+','+clazz+')\'>'+(currentPage-1)+'</a></li>';
			}
			idUl.innerHTML+='<li><span>&nbsp;'+currentPage+'&nbsp;</span></li>';
			if((currentPage+num)<=dataPages){
				idUl.innerHTML+='<li><a href=\'javascript:upd.fn_pages('+(currentPage+1)+','+selectValue+','+clazz+')\'>'+(currentPage+1)+'</a></li>';	
				if((currentPage+num)<dataPages){
					idUl.innerHTML+='<li>...</li>';
				}
			}
			// 当前页不是尾页时，可用下一页和尾页；当前页是尾页时，下一页失效；
			if(currentPage<dataPages){
				idUl.innerHTML+='<li><a href=\'javascript:upd.fn_pages('+dataPages+','+selectValue+','+clazz+')\'>&nbsp;'+dataPages+'&nbsp;</a></li>';
				idUl.innerHTML+='<li><a href=\'javascript:upd.fn_pages('+(currentPage+1)+','+selectValue+','+clazz+')\'>下一页</a></li>'
			}else{
				idUl.innerHTML+='<li>下一页</li>'
			}
			// 消除浮动
			idUl.innerHTML+='<div style=\'clear:both;\'></div>';
		}
	}
}
