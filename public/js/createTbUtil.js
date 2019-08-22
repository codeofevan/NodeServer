/*
 * @Name: 页面数据拼接表格——createTbUtil
 * @Description: 
 * @Author: evan leong
 * @Invoke: createTbUtil.createTable(data_th,data_td)
 * @Current Version: [v1.2]
 * @Params: [comment]-数据库表格表头数组；
 * @Params: [data]-数据库表格数据数组；
 * @Methods: [createTable(comment,data)]-将数据拼接成innerHTML字符串，返回到页面；
 * @Modify Version: [v1.1]-添加图片显示；
 * @Modify Version: [v1.2]-变更数据库提取头像图片的路径，无需进行截取，直接提取即可；
 * @Bug: [b1]-数据在页面刷新后会出现丢失（有数据未渲染到页面）的情况，推测可能原因，表头字符串拼接属于同步代码，数据字符串凭借属于异步代码；
 * @Date: 2019-02-21 17:13:16
 * @LastEditTime: 2019-03-15 20:15:54
 */

var innerHTML = '';
var arr_id = [];
var createTbUtil = {
	createTable: function (comment, data) {
		if (data) {
			innerHTML = '<table><thead><tr>';
			arr_id = function () {
				var arr = [];
				for (var key in comment) {
					innerHTML += '<th>' + comment[key] + '</th>';
					arr.push(key);
				}
				return arr;
			}();
			innerHTML += '<th>操作</th></thead><tbody>';

			for (var key_data in data) {
				innerHTML += '<tr>';
				for (var key in data[key_data]) {
					if (key == 'avatar') {
						//version 1.1
						//innerHTML+='<td>'+'<img src=\''+data[key_data][key].substring(data[key_data][key].indexOf('/',3))+'\'>'+'</td>';
						//version 1.2
						innerHTML += '<td>' + '<img src=\'' + data[key_data][key] + '\'>' + '</td>';
					} else {
						innerHTML += '<td>' + data[key_data][key] + '</td>';
					}

				}
				innerHTML += '<td>' +
					'<a href="javascript:upd.fn_operate(' + data[key_data][arr_id[0]] + ',\'detail\')">详情</a>' +
					'<a href="javascript:upd.fn_operate(' + data[key_data][arr_id[0]] + ',\'update\')">修改</a>' +
					'<a href="javascript:upd.fn_del(' + data[key_data][arr_id[0]] + ')">删除</a>' +
					'</td>';
			}
			innerHTML += '</tr>';
			innerHTML += '</tr></tbody></table>';
			return innerHTML;
		}
	}
}

/*实例*

var data={{
	uid:123,
	uname:123
},{
	uid:123,
	uname:123
}
}
var str=func_ctb('../../output/comment/xz_tb_user2.csv',data);
console.log(str);
/**/