const fs = require('fs');
const multer = require('multer');


const fileUpload = {
    //构建目录
    createFolder: function (folderPath) {
        /**
         * @param folderPath:文件目录
         */
        var path_src=folderPath.substring(0,folderPath.indexOf('/')+1);
        var path_arr = folderPath.substring(folderPath.indexOf('/')).split('/');
        for (var key = 1; key < path_arr.length - 1; key++) {
            path_src += path_arr[key] + '/';
            if (!fs.existsSync(path_src)) {
                fs.mkdirSync(path_src);
                console.log('[mc_fileIO.createFolder] created folder '+path_src);
            }
        }
        return;
    },
    //构建仓库
    multerStorage: function (uploadFolder) {
        // 以原文件名保存
        /*
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, uploadFolder);
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });/**/
        //* 字段名+当前时间作为文件名
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, uploadFolder);
            },
            filename: function (req, file, cb) {
                str = file.fieldname + '-' + Date.now();
                cb(null, str);
            }
        }); /**/
    }
}

module.exports = fileUpload;