/*nodejs 核心模块*/
const express = require('express'); //express模块
const bodyParser = require('body-parser'); // 解析post数据模块
const cors = require('cors');
/*自定义模块*/
const fileUpload = require('./modules/mc_fileUpload');
const fileIO = require('./modules/mc_fileIO');
const func = require('./modules/mc_func');
/*路由*/
const supplyRouter = require('./router/rout_08v110');

/*创建web服务器*/
var server = express();
server.listen(8977, () => {
    console.log("server running ... http://192.168.5.178:8977");
});
/*设置静态资源目录*/
server.use(express.static('./public'));
//server.use(express.static('./test'));
/*使用中间件*/
server.use(bodyParser.urlencoded({}));

server.use(cors({
    origin: ['http://localhost:8081',
        'http://192.168.5.186:8081',
        'http://localhost:8077',
        'http://192.168.5.212:8077',
        'http://192.168.5.223:8077'
    ],
    credentials: true
}))

//挂载路由器
server.use('/supply', supplyRouter);