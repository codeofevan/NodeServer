const fs = require('fs');

const fileIO = {
    //创建文件目录
    createFolder: function (folderPath) {
        /**
         * @param folderPath:文件目录
         */
        console.log('[mc_fileIO.createFolder] creating folder...');
        var path_src = folderPath.substring(0, folderPath.indexOf('/') + 1);
        var path_arr = folderPath.substring(folderPath.indexOf('/')).split('/');
        for (var key = 1; key < path_arr.length - 1; key++) {
            path_src += path_arr[key] + '/';
            if (!fs.existsSync(path_src)) {
                fs.mkdirSync(path_src);
                console.log('[mc_fileIO.createFolder] created folder ' + path_src);
            }
        }
        console.log('[mc_fileIO.createFolder] create folder end');
        return;
    },
    //从文件读取数据到程序
    inputFromFile: function (path, proto_obj = '') {
        /**
         * @param path:文件的路径（服务器中的相对路径）；
         * @param proto_obj:在读取表数据（data）时，需要指定对应表字段的类原型；读取注解数据（comment）时，不需指定；
         * @param arr:存放数据的数组；
         * @param data:文件中读取过来的元数据，可指定数据字符集（encoding）；
         * @param str:对元数据按换行符（\r\n）进行分割，返回数据数组对象；
         * 
         */
        var arr = [];
        var data = fs.readFileSync(path, {
            encoding: 'utf8'
        });
        var str = data.toString().split('\r\n');
        // 读取注解数据并返回JSON对象
        if (proto_obj == '') {
            console.log('[mc_fileIO.inputFromFile] '+path+' read comment running...');
            var ret = '{';
            for (var key in str) {
                ret += '"' + str[key].split(',')[0] + '":"' + str[key].split(',')[1] + '",';
            }
            ret = ret.substring(0, ret.lastIndexOf(','));
            ret += '}';
            ret = JSON.parse(ret);
            for (var key in ret) {
                if (ret[key] == 'comment' || key == '') {
                    delete ret[key];
                }
            }
            console.log('[mc_fileIO.inputFromFile] read comment end...');
            console.log(ret);
            return ret;
            // 读取表数据并返回数据数组对象
        } else {
            console.log('[mc_fileIO.inputFromFile] read data running...');
            for (var i = 1; i < str.length - 1; i++) {
                var obj = new proto_obj();
                var col = str[i].split(',');
                var k = 1;
                for (var key in obj) {
                    obj[key] = col[k];
                    k++;
                }
                arr.push(obj);
            }
            console.log('[mc_fileIO.inputFromFile] read data end...');
            return arr;
        }
    },
    //将数据输出到文件中
    outputToFile: function (dataArr, filePath) {
        /**
         * @param dataArr:数据库查询后的数据集（result[{...},{...},...]);
         * @param filePath:数据输出到文件中的文件路径；
         */
        //创建目录
        this.createFolder(filePath);
        //查找并替换字段中decimal中的'，'，便于切割；
        console.log('[mc_fileIO.outputToFile] running... ');
        console.log('[mc_fileIO.outputToFile] dataArr:' + dataArr);
        var search_msg = 'decimal';
        for (var key in dataArr) {
            //如果数据内容为注解（comment），则不执行；
            if (dataArr[key].Type != undefined) {
                var bool_arr = (dataArr[key].Type).search(search_msg);
                if (bool_arr >= 0) {
                    dataArr[key].Type = dataArr[key].Type.replace(',', '_');
                }
            }
        };
        // 将数据库表字段写出到文件
        var column = '';
        for (var key in dataArr[0]) {
            column += key + ',';
        }
        var keyword = column.substring(0, column.length - 1);
        console.log('[mc_fileIO.outputToFile] writting... ');
        fs.writeFileSync(filePath, keyword + '\r\n', {
            encoding: 'utf8'
        });
        console.log('[mc_fileIO.outputToFile] writen file to ' + filePath);
        // 将数据库表数据写出到文件中
        for (var i = 0; i < dataArr.length; i++) {
            var col_value = '';
            for (var key in dataArr[i]) {
                col_value += String(dataArr[i][key]) + ',';
            }
            var value = col_value.substring(0, col_value.length - 1);
            fs.appendFileSync(filePath, value + '\r\n', {
                encoding: 'utf8'
            });
        }
        console.log('[mc_fileIO.outputToFile] writen end');
        return true;
    },
    //在文件中追加代码
    appendCode: function (filePath, clazz, dbname, tbname) {
        /**
         * @param filePath:文件路径；
         * @param clazz:类原型；
         * @param dbname/tbname：数据库名/表名；
         * @param des_1:指定文件中需要添加代码的第一个位置点；
         * @param des_2:指定文件中需要添加代码的第二个位置点；
         * @param backUpPath:追加代码的文件未添加状态时的备份目录；
         * @param metadata:具体文件中的代码（元数据）；
         * @param data:文件内容；
         * @param bool_des_1:查找第一个位置点是否已存在需要添加的代码；
         * @param bool_des_2:查找第二个位置点是否已存在需要添加的代码；
         * 
         */
        var des_1 = '/*append_point_1*/';
        var des_2 = '/*append_point_2*/';
        // var backUpPath = '../output/backup';
        var backUpPath = __dirname.substring(0, __dirname.lastIndexOf('\\')) + '/output/backup';
        var metadata = fs.readFileSync(filePath);
        var data = metadata.toString();

        var bool_des_1 = data.search(`const ${clazz} = require`);
        var bool_des_2 = data.search(`var tbname =`);
        var date = new Date();

        this.createFolder(backUpPath);
        //备份文件
        fs.writeFileSync(backUpPath + '\\bk_' + date.getTime() + '_' + filePath.substring(filePath.lastIndexOf('/') + 1), data);
        //位置点一
        if (bool_des_1 < 0) {
            var code = `const ${clazz} = require('./output/class/${clazz}');`;
            var str_start = data.substring(0, data.lastIndexOf(des_1));
            var str_end = data.substring(data.lastIndexOf(des_1));
            var str_tar = str_start + code + '\r\n' + str_end;
            fs.writeFileSync(filePath, str_tar);
        }
        //再次载入文件
        metadata = fs.readFileSync(filePath);
        data = metadata.toString();
        //位置点二
        if (bool_des_2 < 0) {
            var code = `var dbname = '${dbname}';
var tbname = '${tbname}';`;
            var str_start = data.substring(0, data.lastIndexOf(des_2));
            var str_end = data.substring(data.lastIndexOf(des_2));
            var str_tar = str_start + code + '\r\n' + str_end;
            fs.writeFileSync(filePath, str_tar);
        }
        return true;
    },
    //生成类原型文件
    createProto: function (filePath) {
        /**
         * @param filePath:表框架文件（csv）所在的目录；
         * @param metadata:表框架元数据；
         * @param pri_sym:主键存在标志；
         * @param data:框架数据数组['Field,Type,...','uid,int,...',...]；
         * @param tararr:二维数组[['Field','Type',...],['uid','int',...],...]；
         * @param srcarr:一维数组['Field,uid,...','Type,int,...',...]；
         * @param str:类原型代码；
         */
        var metadata = fs.readFileSync(filePath);
        var data = metadata.toString().split('\r\n');
        var pri_sym = 0;
        //数组转二维
        var tararr = [];
        for (var i = 0, arr_1 = []; i < data.length - 1; i++) {
            arr_1 = data[i].split(',');
            tararr.push(arr_1);
        }
        //判断是否存在主键；存在则主键字段不写进类原型中；
        if (tararr.length > 1) {
            pri_sym = tararr[1][3] == 'PRI' ? 1 : 0;
        }
        //数组转一维
        var srcarr = [];
        for (var i1 = 0, arr_2 = []; i1 < tararr[0].length; i1++) {
            for (var j = 0; j < tararr.length; j++) {
                arr_2.push(tararr[j][i1]);
            }
            srcarr.push(arr_2.toString());
            arr_2.length = 0;
        }
        //截取字段名并存到arr数组中
        var arr = srcarr[0].split(',');
        arr = arr.slice(1, arr.length);
        //在文件路径中截取文件名并且将首字母变成大写
        var filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
        filename = filename.substring(filename.lastIndexOf('_') + 1);
        filename = (filename.substring(0, 1)).toUpperCase() + filename.substring(1);

        var str = 'class ' + filename + '{\r\n\tconstructor(';
        for (var i2 = pri_sym, param = ''; i2 < arr.length; i2++) {
            param = arr[i2];
            str += param + ',';
        }
        str = str.substring(0, str.length - 1);
        str += '){\r\n';
        for (var i3 = pri_sym, param2 = ''; i3 < arr.length; i3++) {
            param2 = arr[i3];
            str += '\t\tthis.' + arr[i3] + '=' + arr[i3] + ';\r\n';
        }
        str += '\t}\r\n}\r\n';
        str += 'module.exports=' + filename + ';';

        fs.writeFileSync('./output/class/' + filename + '.js', str);

        //var msg='原型文件生成：'+savepath+'\\'+filename+'.js';
        //console.log(msg);
        return true;
    },
    //删除文件
    delFile: function (filePath) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return;
    }
};
module.exports = fileIO;