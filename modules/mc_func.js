const fs = require('fs');
const mysql = require('mysql');

var func = {
    //创建建表SQL语句
    createTable: function (path_frame, path_comment, dbname) {
        /**
         * @param path_frame:表框架路径；
         * @param path_comment:表注解路径；
         * @param dbname/tbname:数据库名/表名；
         * @param data_frame:表框架元数据；
         * @param data_comment:表注解元数据；
         * @param array_frame:表框架数据数组；
         * @param array_comment:表注解数据数组；
         * @param tararr:表框架二维数组；
         * @param comarr:表注解二维数组；
         * @param sql:SQL语句；
         */
        console.log('[mc_func.createTable] running ... ');
        console.log('[mc_func.createTable] path_frame:' + path_frame);
        console.log('[mc_func.createTable] path_comment:' + path_comment);
        console.log('[mc_func.createTable] dbname:' + dbname);


        console.log('[mc_func.createTable] readFile start....');
        var data_frame = fs.readFileSync(path_frame);
        var data_comment = fs.readFileSync(path_comment);

        console.log('[mc_func.createTable] data_frame:' + data_frame);
        console.log('[mc_func.createTable] data_comment:' + data_comment);
        console.log('[mc_func.createTable] readFile end....');
        var tablename = path_frame.substring(path_frame.indexOf('_', path_frame.indexOf('_') + 1) + 1, path_frame.lastIndexOf('.'));

        var array_frame = data_frame.toString().split('\r\n');
        var array_comment = data_comment.toString().split('\r\n');
        //转为二维数组；
        var tararr = [];
        var comarr = [];
        for (var i = 0, arr = []; i < array_frame.length - 1; i++) {
            arr = array_frame[i].split(',');
            tararr.push(arr);
        }
        for (var i = 0, arr = []; i < array_comment.length - 1; i++) {
            arr = array_comment[i].split(',');
            comarr.push(arr);
        }
        //将表框架中decimal之间的分隔符变更为‘，’；
        for (var n = 0; n < tararr.length; n++) {
            var str = tararr[n][1];
            if (str.substring(0, 7) == 'decimal') {
                tararr[n][1] = str.substring(0, str.indexOf('_')) + ',' + str.substring(str.indexOf('_') + 1)
            }
        }
        //组装sql语句
        //tararr[Field,Type,Null,Key,Default,Extra]
        var sql = 'CREATE TABLE ' + dbname + '.' + tablename + ' (\r\n';
        var end = ')ENGINE=InnoDB DEFAULT CHARSET=utf8';
        var col_ex = '';
        for (var k = 1; k < tararr.length; k++) {
            var col = '\t';
            //组装 Field Type Null 字段
            for (var i = 0; i < 3; i++) {
                if (i == 2) {
                    if (tararr[k][i] == 'NO') {
                        col += 'NOT NULL ';
                    } else {
                        col += ' ';
                    }
                } else {
                    col += tararr[k][i] + ' ';
                }
            }
            //组装 Key 字段
            if (tararr[k][3] == '') {
                col_ex += '';
            } else if (tararr[k][3] == 'PRI') {
                col_ex = 'PRIMARY KEY(' + tararr[k][0] + ')\r\n';
            }
            if (tararr[k][3] == 'UNI') {
                col += 'UNIQUE ';
            }
            //组装 Default 字段
            if (tararr[k][4] == 'null') {
                if (tararr[k][2] == 'NO') {
                    col += '';
                } else {
                    col += 'DEFAULT NULL';
                }
            } else {
                col += 'DEFAULT ' + tararr[k][4];
            }
            //组装 Extra 字段
            if (tararr[k][5] == '') {
                col += '';
            } else {
                col += tararr[k][5].toUpperCase();
            }
            //组装 Comment 字段
            if (tararr[k][6] === undefined) {
                col += ' COMMENT \'' + comarr[k][1] + '\',\r\n';
            } else if (tararr[k][6] == '') {
                col += ' COMMENT \'' + tararr[k][0].toUpperCase() + '\',\r\n';
            } else {
                col += ' COMMENT \'' + tararr[k][6] + '\',\r\n';
            }
            sql += col;
        }
        console.log('[mc_func.createTable] end ... ');
        return sql + col_ex + end;
    },
    //获取数据库连接池
    dbConnect: function (dbInfo) {
        // var data=fs.readFileSync(dbInfoPath).toString();
        // return mysql.createPool(JSON.parse(data));
        return mysql.createPool(dbInfo);
    },
    //创建路由器
    createRouter: function (dbname, tbname, template, filepath) {
        var str = fs.readFileSync(template).toString();
        var $class = tbname.substring(tbname.indexOf('_') + 1, tbname.indexOf('_') + 2).toUpperCase() + tbname.substring(tbname.indexOf('_') + 2);
        var $path = $class.toLowerCase();
        var $id = tbname.substring(tbname.lastIndexOf('_') + 1, tbname.lastIndexOf('_') + 2) + 'id';
        // console.log($class, $path, $id);
        str = str.replace(/%dbname%/g, dbname);
        str = str.replace(/%tbname%/g, tbname);
        str = str.replace(/%class%/g, $class);
        str = str.replace(/%path%/g, $path);
        str = str.replace(/%tbid%/g, $id);
        fs.writeFileSync(filepath, str);
        return true;
    },
    //创建路由器
    /**
     * func:frame/default/custom
     * con:list/reg/login/detail/delete/redirect/update/indb
     * condition:where...
     * template:templatepath
     * filepath
     *
     */
    createRout: function (dbname, tbname, func, con, condition, template, url, filepath) {
        switch (func) {
            case 'frame':
                var filestr = fs.readFileSync(template).toString();
                fs.writeFileSync(filepath, filestr);
                break;
            case 'default':
                switch (con) {
                    case 'redirect':
                        var filetmp = fs.readFileSync(template).toString();
                        var $class = tbname.substring(tbname.indexOf('_') + 1, tbname.indexOf('_') + 2).toUpperCase() + tbname.substring(tbname.indexOf('_') + 2);
                        var $path = $class.toLowerCase();
                        filetmp = filetmp.replace(/%path%/g, $path);
                        fs.appendFileSync(filepath, filetmp);
                        break;
                    case 'list':
                        var filetmp = fs.readFileSync(template).toString();
                        filetmp = filetmp.replace(/%dbname%/g, dbname);
                        filetmp = filetmp.replace(/%tbname%/g, tbname);
                        filetmp = filetmp.replace(/%url%/g, url);
                        fs.appendFileSync(filepath, filetmp);
                        break;
                    case 'reg':
                        var filetmp = fs.readFileSync(template).toString();
                        filetmp = filetmp.replace(/%dbname%/g, dbname);
                        filetmp = filetmp.replace(/%tbname%/g, tbname);
                        filetmp = filetmp.replace(/%url%/g, url);
                        fs.appendFileSync(filepath, filetmp);
                        break;
                    case 'login':
                        var filetmp = fs.readFileSync(template).toString();
                        filetmp = filetmp.replace(/%dbname%/g, dbname);
                        filetmp = filetmp.replace(/%tbname%/g, tbname);
                        fs.appendFileSync(filepath, filetmp);
                        break;
                    case 'detail':
                        var filetmp = fs.readFileSync(template).toString();
                        var $id = tbname.substring(tbname.lastIndexOf('_') + 1, tbname.lastIndexOf('_') + 2) + 'id';
                        filetmp = filetmp.replace(/%dbname%/g, dbname);
                        filetmp = filetmp.replace(/%tbname%/g, tbname);
                        filetmp = filetmp.replace(/%tbid%/g, $id);
                        filetmp = filetmp.replace(/%url%/g, url);
                        fs.appendFileSync(filepath, filetmp);
                        break;
                    case 'update':
                        var filetmp = fs.readFileSync(template).toString();
                        var $class = tbname.substring(tbname.indexOf('_') + 1, tbname.indexOf('_') + 2).toUpperCase() + tbname.substring(tbname.indexOf('_') + 2);
                        var $path = $class.toLowerCase();
                        var $id = tbname.substring(tbname.lastIndexOf('_') + 1, tbname.lastIndexOf('_') + 2) + 'id';
                        filetmp = filetmp.replace(/%dbname%/g, dbname);
                        filetmp = filetmp.replace(/%tbname%/g, tbname);
                        filetmp = filetmp.replace(/%path%/g, $path);
                        filetmp = filetmp.replace(/%tbid%/g, $id);
                        filetmp = filetmp.replace(/%url%/g, url);
                        fs.appendFileSync(filepath, filetmp);
                        break;
                    case 'delete':
                        var filetmp = fs.readFileSync(template).toString();
                        var $id = tbname.substring(tbname.lastIndexOf('_') + 1, tbname.lastIndexOf('_') + 2) + 'id';
                        filetmp = filetmp.replace(/%dbname%/g, dbname);
                        filetmp = filetmp.replace(/%tbname%/g, tbname);
                        filetmp = filetmp.replace(/%tbid%/g, $id);
                        filetmp = filetmp.replace(/%url%/g, url);
                        fs.appendFileSync(filepath, filetmp);
                        break;
                    case 'indb':
                        var filetmp = fs.readFileSync(template).toString();
                        filetmp = filetmp.replace(/%dbname%/g, dbname);
                        filetmp = filetmp.replace(/%tbname%/g, tbname);
                        filetmp = filetmp.replace(/%url%/g, url);
                        fs.appendFileSync(filepath, filetmp);
                        break;
                }
                break;
            case 'custom':
                var filetmp = fs.readFileSync(template).toString();
                var arr = [];
                filetmp = filetmp.replace(/%dbname%/g, dbname);
                filetmp = filetmp.replace(/%tbname%/g, tbname);
                filetmp = filetmp.replace(/%condition%/g, condition);
                filetmp = filetmp.replace(/%arr%/g, arr);
                filetmp = filetmp.replace(/%url%/g, url);
                fs.appendFileSync(filepath, filetmp);
                break;
        }
        return true;
    }
};
/*
var dbname = 'xz';
var tbname = 'xz_index_user';
var template = './modules/template/router.template';
var clazz = 'User';
func.createRouter(dbname, tbname, template);

/**/
module.exports = func;