/* 用户修改 */
var upd = {
    //动态显示替换头像
    fn_uploadImg: function (ele) {
        ele.onchange = function () {
            //console.log(avatar.value);
            var reader = new FileReader();
            reader.readAsDataURL(this.files[0]);
            reader.onloadend = function (e) {
                showImg.setAttribute('src', e.target.result);
            }
        }
    },
    //加载数据表格
    page_onload: function () {
        var url = location.search;
        var val = (url.split('='))[1];
        var oldUser;
        var xhr = new XMLHttpRequest();
        var url = '/user/detail?uid=' + val;
        xhr.open('get', url, true);
        xhr.send(null);
        var oForm = document.getElementById('list');
        var reflesh = this.fn_uploadImg.bind(upd);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                var data = JSON.parse(result);
                oldUser = data[0];
                list.innerHTML = '';
                var divContent = '<div>';
                for (var key in data[0]) {
                    if (key == 'uid') {
                        divContent += '<input type=\'hidden\' name=\'' + key + '\' value=\'' + data[0][key] + '\' />';
                    } else {
                        //添加显示图片
                        if (key == 'avatar') {

                            divContent += '<div><span>' + key +
                                ':</span><input type=\'file\' name=\'' + key + '\' value=\'' + data[0][key] + '\' /></div>';
                        } else {
                            divContent += '<div><span>' + key +
                                ':</span><input type=\'text\' name=\'' + key + '\' value=\'' + data[0][key] + '\' /></div>';
                        }
                    }
                }
                divContent += '</div>';
                divContent += '<div><img id=\'showImg\' src=\'' + data[0]["avatar"] + '\'></div>';
                divContent += '<input type=\'submit\' value=\'提交\' />';
                list.innerHTML = divContent;

                // this.fn_uploadImg(oForm.avatar).bind(upd);
                reflesh(oForm.avatar);
            }
        }
    },
    //左侧菜单栏
    
    fn_showUl: function (path) {
        //console.log(path);
        var menu_item=document.getElementsByClassName('menu_item');
        console.log('>1');
        for(let elem of menu_item){
            console.log('>2');
            elem.onclick=()=>{
                console.log('>3');
                    var bor=elem.nextElementSibling;
                    if(bor.className=='active'){
                        bor.className='';
                    }else{
                        console.log('>4');
                        for(var elem2 of menu_item){
                            elem2.nextElementSibling.className='';
                        }
                        bor.className='active';
                    }
            };
        }
        /*
        var oProd = document.getElementById('prod');
        var oUser = document.getElementById('user');
        var oOrder = document.getElementById('order');
        var oIndex = document.getElementById('index');
        var oFunc = document.getElementById('func');
        var oUl = '';
        var oArr = [];
        switch (path) {
            case 'prod':
                {
                    oUl = oProd;
                    oArr.push(oUser);
                    oArr.push(oOrder);
                    oArr.push(oIndex);
                    oArr.push(oFunc);
                    break;
                }
            case 'user':
                {
                    oUl = oUser;
                    oArr.push(oProd);
                    oArr.push(oOrder);
                    oArr.push(oIndex);
                    oArr.push(oFunc);
                    break;
                }
            case 'order':
                {
                    oUl = oOrder;
                    oArr.push(oUser);
                    oArr.push(oProd);
                    oArr.push(oIndex);
                    oArr.push(oFunc);
                    break;
                }
            case 'index':
                {
                    oUl = oIndex;
                    oArr.push(oUser);
                    oArr.push(oProd);
                    oArr.push(oOrder);
                    oArr.push(oFunc);
                    break;
                }
            case 'func':
                {
                    oUl = oFunc;
                    oArr.push(oUser);
                    oArr.push(oProd);
                    oArr.push(oOrder);
                    oArr.push(oIndex);
                    break;
                }
        }
        //alert('>>'+path);
        var oStyle = getComputedStyle(oUl);
        if (oStyle.display == 'none') {
            oUl.style.display = 'block';
            for (var key in oArr) {
                oArr[key].style.display = 'none';
            }
        } else {
            oUl.style.display = 'none';
        }*/
    },
    //删除数据操作
    fn_del: function (uid) {
        var bool = confirm('确定删除编号为：' + uid + ' 的数据？');
        if (bool) {
            var xhr = new XMLHttpRequest();
            var url = '/user/delete?uid=' + uid;
            xhr.open('get', url, true);
            xhr.send(null);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var msg = xhr.responseText;
                    alert(msg);
                    console.log(msg);
                    window.location.reload();
                }
            }
        }
    },
    //数据操作行为
    fn_operate: function (val, operate) {
        var url_current = window.location.href;
        var url_current = url_current.substring(url_current.indexOf('/', url_current.indexOf('/') + 2));
        console.log(url_current);
        var redirect_path = '/user/listpage';
        var url = './'
        if (url_current == redirect_path) {
            url = '../html/user/';
        }
        //var url='./user_detail.html?uid='+val;
        // console.log(val,operate)
        switch (operate) {
            case 'detail':
                {
                    url += 'user_detail.html?uid=' + val;
                    break;
                }
            case 'update':
                {
                    url += 'user_update.html?uid=' + val;
                    break;
                }
            case 'delete':
                {
                    url += 'user_delete.html?uid=' + val;
                    break;
                }
        }
        console.log(url);
        location.href = url;
    },
    //分页器
    fn_pages: function (page, count, router) {
        console.log('[user.fn_pages] pages start...');
        console.log('[user.fn_pages] page:'+page+' count:'+count+' router:'+router);
        var count = sel.value;
        var xhr = new XMLHttpRequest();
        var url = '/'+router+'/list?page=' + page + '&count=' + count;
        xhr.open('get', url, true);
        xhr.send(null);
        id_ul.innerHTML = '';
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //console.log('>>>');
                var result = xhr.responseText;
                var data = JSON.parse(result);
                // console.log(result);
               console.log(data);
                /*	list.innerHTML='<table border="solid 1px red" width="400px" id="tb">'
                    +'<tr>'
                    +'<th width="50px">编号</th>'
                    +'<th>用户名</th>'
                    +'<th>头像</th>'
                    +'<th>手机号码</th>'
                    +'<th>邮箱</th>'
                    +'<th>姓名</th>'
                    +'<th>性别</th>'
                    +'<th>操作</th>'
                    +'</tr>'
                    +'</table>';
                    
                    //console.log(data);
                    for(var key in data[1]){
                        tb.innerHTML+='<tr>'
                        +'<td>'+data[1][key].uid+'</td>'
                        +'<td>'+data[1][key].uname+'</td>'
                        +'<td>'+data[1][key].avatar+'</td>'
                        +'<td>'+data[1][key].phone+'</td>'
                        +'<td>'+data[1][key].email+'</td>'
                        +'<td>'+data[1][key].user_name+'</td>'
                        +'<td>'+data[1][key].gender+'</td>'
                        +'<td>'
                            +'<a href="javascript:fn_operate('+data[1][key].uid+',\'detail\')">详情</a>'
                            +'<a href="javascript:fn_operate('+data[1][key].uid+',\'update\')">修改</a>'
                            +'<a href="javascript:fn_del('+data[1][key].uid+')">删除</a>'
                        +'</td>'
                        +'</tr>';
                    }*/
                list.innerHTML = createTbUtil.createTable(data[0], data[2]);

                pagingUtil.pagingDevice(id_ul, page, sel.value, data[1][1].pages,router);
                /*	<!-- if(page>1){ -->
                        <!-- id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+(page-1)+','+sel.value+')\'>&lt;</a></li>' -->
                    <!-- }else{ -->
                        <!-- id_ul.innerHTML+='<li>&lt;</li>' -->
                    <!-- } -->
                    <!-- for(var i=1;i<=data[0][1].pages;i++){ -->
                        <!-- if(i==page){ -->
                            <!-- id_ul.innerHTML+='<li><span>&nbsp;'+i+'&nbsp;</span></li>'; -->
                        <!-- }else{ -->
                            <!-- id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+i+','+sel.value+')\'>&nbsp;'+i+'&nbsp;</a></li>'; -->
                        <!-- } -->
                    <!-- } -->
                    <!-- if(page<data[0][1].pages){ -->
                        <!-- id_ul.innerHTML+='<li><a href=\'javascript:fn_pages('+(page+1)+','+sel.value+')\'>&gt;</a></li>' -->
                    <!-- }else{ -->
                        <!-- id_ul.innerHTML+='<li>&gt;</li>' -->
                    <!-- } -->*/
            }
        }
        console.log('[user.fn_pages] pages end...');
    },
    //获取数据条数选择，并实现分页
    fn_sel: function (router) {
        var val = sel.value;
        upd.fn_pages(1, val, router);
        parent.funct(); //调用父页面声明在全局的函数；
        // console.log(parent_doc);
        // parent_doc.funct();
    }
};
/*    //获取左侧菜单栏的文档高度
    fn_getScroll: function () {/*
        let leftMenu = document.getElementById('leftMenu');
        let leftDoc = window.frames['leftMenu'].contentWindow.document;
        let menuIs = leftDoc.querySelectorAll('.menu_item');

        let leftH = leftDoc.documentElement.scrollHeight;
        let winH = window.screen.availHeight;
        let menuH = leftH < winH ? winH : leftH;
        leftMenu.style.height = menuH + 'px';
        leftDoc.documentElement.style.height=menuH + 'px';
       
        for (var elem of menuIs) {
            elem.onclick = () => {
                setTimeout(()=>{
                    leftH = leftDoc.documentElement.scrollHeight;
                    winH = window.screen.availHeight;
                    menuH = leftH < winH ? winH : leftH;
                    console.log('leftH:'+leftH,'winH:'+winH);
                    leftMenu.style.height = menuH + 'px';
                    leftDoc.documentElement.style.height=menuH + 'px';
                },0);
                
            };
        }
    }
};

// function fn_showUl(path) {

// }
*/
(function(){
    var menu_item=document.getElementsByClassName('menu_item');
        for(let elem of menu_item){
            elem.firstElementChild.onclick=()=>{
                    var bor=elem.nextElementSibling;
                    if(bor.className=='active'){
                        bor.className='';
                    }else{
                        for(var elem2 of menu_item){
                            elem2.nextElementSibling.className='';
                        }
                        bor.className='active';
                    }
            };
        }
})();