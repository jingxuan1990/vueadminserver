const express = require("express");
const bodyParser = require('body-parser');
const formidable = require("formidable");
const fs = require("fs");

const app = express();
app.use(express.static("public"));

// 用json格式解析请求体
app.use(bodyParser.json());

//跨域访问配置
//1:加载模块cors
const cors = require("cors");
//2:配置cors
app.use(cors({
    origin: ["http://127.0.0.1:9527",
        "http://localhost:9527"],//允许列表
    credentials: true   //是否验证
}));

//3:加载第三方模块express-session
const session = require("express-session");

//4:配置模块
app.use(session({
    secret: "128位随机字符串", //安全令牌--计算sessionID
    resave: false,   //请求保存  无需每次重新设置
    saveUninitialized: true, //初始化
    cookie: {
        maxAge: 1000 * 60 * 60 * 24  //session保存时间  1天
    }
}));

// 统一配置路由
const users = require('./routes/users');
const roles = require('./routes/roles');
app.use('/users', users);
app.use('/roles', roles);

// 运行端口号
app.listen(8888);
