/*nodejs 核心模块*/
const express = require('express'); //express模块
const bodyParser = require('body-parser'); // 解析post数据模块
const multer = require('multer'); // 文件上传模块
const fs = require('fs'); // 文件操作模块
/*自定义模块*/
const fileUpload = require('./modules/mc_fileUpload');
const fileIO = require('./modules/mc_fileIO');
const func = require('./modules/mc_func');

const dbInfoPath = './modules/dbInfo.json';
const mysql =require('mysql');
//const pool = func.dbConnect(dbInfoPath);

/*创建web服务器*/
var server = express();
server.listen(8888,()=>{
	console.log("server running ... http://localhost:8888");
});
/*设置静态资源目录*/
server.use(express.static('./public'));
//server.use(express.static('./test'));
/*使用中间件*/
server.use(bodyParser.urlencoded({}));

const pool = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',
  database: 'xz'
});

server.get('/admin', (req, res) => {
	res.redirect('html/admin.html');
});
/*导出数据库表及执行SQL路由*/
/*
	@param：sql-前端页面输入SQL语句；
	@param：path-数据库表导出路径及文件名；
*/
server.post('/sql', (req, res) => {
	var info = req.body;
	var sql = info.sql;
	var path = './output/frame/frame_' + info.path + '.csv';
	//console.log('>'+sql+'<>'+path+'<');
	if (sql == '') {
		res.send({
			code: 404,
			msg: 'SQL required'
		});
		return;
	}
	pool.query(sql, (err, result) => {
		console.log(sql);
		if (err) {
			res.send({
				code: 404,
				msg: err.message
			});
			return;
		}
		//console.log(result+'>'+path+'<');
		if (info.path != '') {
			console.log(typeof result);

			fileIO.outputToFile(result, path);
			res.send({
				code: 200,
				msg: '导出成功'
			});
			return;
		} else {
			res.send({
				code: 200,
				msg: 'SQL执行成功'
			});
			return;
		}
	});
});
// /*生成表原型路由*/
// /*
// 	@param：info-选择表原型参考文件csv；
// */
// var uploadfile = './upload/'
// createFolder(uploadfile);
// var upload = multer({
// 	storage: storage(uploadfile)
// });

// server.post('/file', upload.single('file'), (req, res) => {
// 	var info = req.file;
// 	//console.log('>>'+info);
// 	if (info == undefined) {
// 		res.send({
// 			code: 404,
// 			msg: 'file required'
// 		});
// 		return;
// 	}
// 	var srcpath = info.destination + info.originalname;
// 	//console.log('>'+srcpath);
// 	var savepath = __dirname + '\\class';
// 	var msg = fileIO.createProto(srcpath, savepath);
// 	//console.log('>'+msg);
// 	appendCode('./app.js', msg);
// 	res.send({
// 		code: 200,
// 		msg: '创建成功'
// 	});
// 	return;
// });
// /*在数据库创建表路由*/
// /*
// 	@param：path-指定（修改后）表框架路径；
// 	@param：tbname-指定在数据库创建的表名；
// */
// server.post('/db', (req, res) => {
// 	var info = req.body;
// 	var path = './output/frame/frame_' + info.path + '.csv';
// 	var tbname = info.tbname;
// 	if (path == '' || tbname == '') {
// 		res.send({
// 			code: 404,
// 			msg: 'path and tbname required'
// 		});
// 		return;
// 	}
// 	//console.log('>'+path+'<>'+tbname+'<');
// 	// var sql=createTable(path,tbname);
// 	var sql = '';
// 	pool.query(sql, (err, result) => {
// 		if (err) {
// 			res.send({
// 				code: 404,
// 				msg: err.message
// 			});
// 			return;
// 		}
// 		if (result.affectedRow <= 0) {
// 			res.send({
// 				code: 404,
// 				msg: '创建失败'
// 			});
// 			return;
// 		} else {
// 			res.send({
// 				code: 200,
// 				msg: '创建成功'
// 			});
// 			return;
// 		}
// 	});
// });

// server.post('/comment', (req, res) => {
// 	var info = req.body;
// 	//console.log(info);
// 	if (info.dbname == '' || info.tbname == '') {
// 		res.send({
// 			code: 404,
// 			msg: 'dbname or tbname required'
// 		});
// 		return;
// 	}
// 	var sql = 'SELECT COLUMN_NAME AS col_name, column_comment AS comment FROM INFORMATION_SCHEMA.Columns WHERE table_name=? AND table_schema=?;';
// 	pool.query(sql, [info.tbname, info.dbname], (err, result) => {
// 		if (err) {
// 			res.send({
// 				code: 404,
// 				msg: err.message
// 			});
// 			return;
// 		}
// 		if (result.length <= 0) {
// 			res.send({
// 				code: 404,
// 				msg: '查询无数据'
// 			});
// 			return;
// 		} else {
// 			outToFile(result, './output/comment/' + info.dbname + '_' + info.tbname + '.csv');
// 			res.send({
// 				code: 200,
// 				msg: '创建成功'
// 			});
// 			//console.log(typeof result);
// 			return;
// 		}
// 	});
// });


server.post('/dbinfo', (req, res) => {
	//dbname:xz tbname:xz_user
	var info = req.body;
	console.log('[admin./dbinfo] db file creating...');
	if (info.dbname == '' || info.tbname == '') {
		res.send({
			code: 404,
			msg: 'dbname or tbname required'
		});
		return;
	}

	var sql_tb_frame = 'DESC ' + info.dbname + '.' + info.tbname;
	var sql_tb_comment = 'SELECT COLUMN_NAME AS col_name, column_comment AS comment FROM INFORMATION_SCHEMA.Columns WHERE table_schema=\'' + info.dbname + '\' AND table_name=\'' + info.tbname + '\'';
	//SELECT COLUMN_NAME AS col_name, column_comment AS comment FROM INFORMATION_SCHEMA.Columns WHERE table_schema='' AND table_name=''
	var sql_tb_data = 'SELECT * FROM ' + info.dbname + '.' + info.tbname;

	var path_frame = './output/frame/frame_' + info.dbname + '_' + info.tbname + '.csv';
	var path_class = '';
	var path_comment = './output/comment/comment_' + info.dbname + '_' + info.tbname + '.csv';
	var path_data = './output/data/data_' + info.dbname + '_' + info.tbname + '.csv';
	var path_clientJs = './router/rout_' + info.tbname.substring(info.tbname.indexOf('_') + 1) + '.js';

	// var path_local='d:/temp1';
	// var path_frame = path_local+'/output/frame/frame_' + info.dbname + '_' + info.tbname + '.csv';
	// var path_class = '';
	// var path_comment = path_local+'/output/comment/comment_' + info.dbname + '_' + info.tbname + '.csv';
	// var path_data = path_local+'/output/data/data_' + info.dbname + '_' + info.tbname + '.csv';
	// var path_clientJs ='./router/rout_' + info.tbname.substring(info.tbname.indexOf('_') + 1) + '.js';

	var msg = [];
	var className = info.tbname.substring(info.tbname.indexOf('_') + 1);
	var clazz = className.substring(0, 1).toUpperCase() + className.substring(1);
	// 生成表框架
	var fn1 = function () {
		return new Promise((resolve, reject) => {
			//【为解决】当数据库中表不存在，但文件系统存在，无法执行；
			pool.query(sql_tb_frame, (err, result) => {
				var bool_frame = '';
				if (err) {
					msg.push({
						creatFrameErr: err.message
					});
				}
				try {
					if (result) {
						bool_frame = fileIO.outputToFile(result, path_frame);
					}
				} catch (err) {
					res.send({
						code: 'fn1_401',
						msg: err.message,
						tip: '查看数据库表是否存在'
					});
					return;
				}
				if (bool_frame) {
					msg.push({
						creatFrame: bool_frame
					});
				} else {
					msg.push({
						creatFrame: bool_frame
					});
				}
				resolve();
			});
		});
	}

	// 生成表原型
	var fn2 = function () {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				//console.log('fn2');
				var bool_append = '';
				var bool_proto = '';
				try {
					bool_proto = fileIO.createProto(path_frame);
				} catch (err) {
					res.send({
						code: 'fn2_400',
						msg: err.message
					});
					return;
				}
				if (bool_proto) {
					msg.push({
						creatProto: bool_proto
					});
				} else {
					msg.push({
						creatProto: bool_proto
					});
				}
				try {
					bool_append = fileIO.appendCode(path_clientJs, clazz, info.dbname, info.tbname);
				} catch (err) {
					res.send({
						code: 'fn2_401',
						msg: err.message
					});
					return;
				}
				if (bool_append) {
					msg.push({
						appendCode: bool_append
					});
				} else {
					msg.push({
						appendCode: bool_append
					});
				}
				resolve();
			}, 10);
		});
	}

	// 生成表字段注解
	var fn3 = function () {
		return new Promise((resolve, reject) => {
			pool.query(sql_tb_comment, [info.tbname, info.dbname], (err, result) => {
				//console.log('pool_3');
				var bool_comment = '';
				if (err) {
					msg.push({
						createCommentErr: err.message
					});
				}
				try {
					bool_comment = fileIO.outputToFile(result, path_comment);
				} catch (err) {
					res.send({
						code: 'fn3_400',
						msg: err.message
					});
					return;
				}
				if (bool_comment) {
					msg.push({
						createComment: bool_comment
					});
				} else {
					msg.push({
						createComment: bool_comment
					});
				}
				resolve();
			});
		});
	}

	// 导出表数据
	var fn4 = function () {
		return new Promise((resolve, reject) => {
			pool.query(sql_tb_data, (err, result) => {
				//console.log('pool_4');
				var bool_outputData = '';
				if (err) {
					msg.push({
						outputDataErr: err.message
					});
				}
				try {
					bool_outputData = fileIO.outputToFile(result, path_data);
				} catch (err) {
					res.send({
						code: 'fn4_400',
						msg: err.message
					});
					return;
				}
				if (bool_outputData) {
					msg.push({
						outputData: bool_outputData
					});
				} else {
					msg.push({
						outputData: bool_outputData
					});
				}
				resolve();
			});
		});
	}
	// 数据执行结果
	var fn5 = function () {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				//console.log('fn5');
				res.send(msg);
				resolve();
			}, 10);
		});
	}

	fn1().then(() => {
		return fn2();
	}).then(() => {
		return fn3();
	}).then(() => {
		return fn4();
	}).then(() => {
		return fn5();
	});
	/**/
});

server.post('/createdb', (req, res) => {
	var info = req.body;
	console.log(info);
	var sql = '';
	var path_frame = './output/frame/frame_' + info.dbname + '_' + info.tbname + '.csv';
	var path_comment = './output/comment/comment_' + info.dbname + '_' + info.tbname + '.csv';
	if (info.dbname == '' || info.tbname == '') {
		res.send({
			code: 401,
			msg: 'dbname or tbname required'
		});
		return;
	}
	try {
		sql = func.createTable(path_frame, path_comment, info.dbname);
	} catch (err) {
		res.send({
			code: 403,
			msg: err.message
		});
		return;
	}
	pool.query(sql, (err, result) => {
		if (err) {
			res.send({
				code: 402,
				msg: err.message
			});
			return;
		}
		if (result.affectedRow <= 0) {
			res.send({
				code: 404,
				msg: '创建' + info.dbname + '.' + info.tbname + '失败'
			});
			return;
		} else {
			res.send({
				code: 200,
				msg: '创建' + info.dbname + '.' + info.tbname + '成功'
			});
			return;
		}
	});
});

// 生成类路由器
server.post('/createRouter', (req, res) => {
	var info = req.body;
	console.log(info);
	var framepath = './modules/template/frame.template';
	var custompath = './modules/template/custom.template';
	var commonpath = './modules/template/';
	var indbpath = './modules/template/indb.template';
	var redirectpath = './modules/template/redirect.template';
	var filepath = './router/rout_' + info.tbname.substring(info.tbname.indexOf('_') + 1) + '.js';
	var condition = '';
	// console.log(filePath);
	try {
		// var bool=func.createRouter(info.dbname, info.tbname, path, filePath,condition);
		var bool_0 = func.createRout('', '', 'frame', '', '', framepath,'', filepath);
		func.createRout('', info.tbname, 'default', 'redirect', '', redirectpath,'', filepath);
		console.log('1')
		var count=0;
		for (let key in info) {
			var k = key.substring(0, key.indexOf('_') == -1 ? key.length : key.indexOf('_'));
			if (k == 'condition') {
				if (typeof info[k] == 'string') {
					console.log('2')
					var con = info[k].split(',');
					func.createRout(info.dbname, con[0], 'custom', '', con[1], custompath, con[2], filepath);
				} else {
					console.log('3')
					info[k].forEach((elem, i, arr) => {
						var con = arr[i].split(',');
						func.createRout(info.dbname, con[0], 'custom', '', con[1], custompath, con[2], filepath);
					});
				}
			} else {
				console.log('4')
				func.createRout(info.dbname, info[key], 'default', k, '', commonpath + k + '.template', '', filepath);
			}
		}
		if (bool_0) {
			res.send({
				code: 200,
				msg: 'create success'
			});
		}
	} catch (e) {
		res.send({
			code: 400,
			msg: e.message
		});
		return;
	}
});

// /*生成表原型路由*/
// /*
// 	@param：info-选择表原型参考文件csv；
// */
// var uploadfile = './upload/'
// createFolder(uploadfile);
// var upload = multer({
// 	storage: storage(uploadfile)
// });
// server.post('/indb', upload.single('file'), (req, res) => {
// 	var info = req.file;
// 	if (info == undefined) {
// 		res.send({
// 			code: 404,
// 			msg: 'file required'
// 		});
// 		return;
// 	}
// 	var className = info.filename.substring(info.filename.lastIndexOf('_') + 1, info.filename.lastIndexOf('.'));
// 	className = className.substring(0, 1).toUpperCase() + className.substring(1);
// 	console.log(className);
// 	var srcpath = info.destination + info.originalname;
// 	var proto_obj = './output/class/' + className + ';';
// 	console.log(eval(proto_obj));
// 	//console.log('>'+srcpath);
// 	//var savepath=__dirname+'\\class';
// 	//var msg=createObjPrototype(srcpath,savepath);
// 	//console.log('>'+msg);
// 	inFromFile(srcpath, );
// 	//	appendCode('./app.js',msg);
// 	/*	res.send({code:200,msg:'创建成功'});
// 		return;*/
// });