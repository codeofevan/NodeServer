// 分页器-version 1
/*for(var i=page,count=1;i<data[0][1].pages;i++){
	if(i==page){
		id_ul.innerHTML+='<li><span>&nbsp;'+i+'&nbsp;</span></li>';
	}else if(i+2<data[0][1].pages&&count<3){
		id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+i+','+sel.value+')\'>&nbsp;'+i+'&nbsp;</a></li>';
		count++;
	}else if(count==3){
		id_ul.innerHTML+='<li><span>...</span></li>';
		count=4;
	}else if(i==data[0][1].pages&&count){
		id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+i+','+sel.value+')\'>&nbsp;'+i+'&nbsp;</a></li>';
	}else{
		continue;
	}
}*/

// 分页器-version 2
/*for(var i=page;i<data[0][1].pages;i++){
	
	var fromPage=3;
	if((page-2)>=1){
		if((page-2)>1){
			id_ul.innerHTML+='<li>...</li>';
		}
		id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+(page-2)+','+sel.value+')\'>'+(page-2)+'</a></li>';
		id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+(page-1)+','+sel.value+')\'>'+(page-1)+'</a></li>';
	}else if((page-2)>=1){
		id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+(page-1)+','+sel.value+')\'>'+(page-1)+'</a></li>';
	}
	id_ul.innerHTML+='<li><span>&nbsp;'+page+'&nbsp;</span></li>';
	
	if((page+2)<=data[0][1].pages){
		id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+(page+1)+','+sel.value+')\'>'+(page+1)+'</a></li>';	
		id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+(page+2)+','+sel.value+')\'>'+(page+2)+'</a></li>';
		if((page+2)<data[0][1].pages){
			id_ul.innerHTML+='<li>...</li>';
		}
	}else if((page+2)<=data[0][1].pages){
		id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+(page+1)+','+sel.value+')\'>'+(page+1)+'</a></li>';
	}
}*/


// 页面跳转
/*<h1>首页</h1><br>

<input type="text" name="username" />
<input type="button" name="" value="post" onclick="fn()"/>

<h3>用户操作</h3>
<ul>
	<li><a href='/html/user/user_reg.html'>用户注册</a></li>
	<li><a href='/html/user/user_login.html'>用户登陆</a></li>
	<li><a href='/html/user/user_list.html'>用户列表</a></li>
	<li><a href='/html/user/user_delete.html'>用户详情</a></li>
	<li><a href='/html/user/user_update.html'>用户修改</a></li>
	<li><a href='/html/user/user_delete.html'>用户删除</a></li>
	<li><a href='/user/output'>导出用户表</a></li>
</ul>

<h3>商品操作</h3>
<ul>
	<li><a href='/html/product/prod_add.html'>商品添加</a></li>
	<li><a href='/html/product/prod_list.html'>商品列表</a></li>
	<li><a href='/html/product/prod_delete.html'>商品详情</a></li>
	<li><a href='/html/product/prod_update.html'>商品修改</a></li>
	<li><a href='/html/product/prod_delete.html'>商品删除</a></li>
	<li><a href='/prod/output'>导出商品表</a></li>
</ul>

<div id='list'></div>

<h3>数据库操作【谨慎】</h3>
1、导入数据到数据库：<br>
<form action='/indb' method='post' enctype='multipart/form-data'>
	选择数据文件：<input type='file' name='file'/><br>
	<input type='submit' value='导入'>
</form>*/

