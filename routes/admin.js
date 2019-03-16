const express = require('express');
const router = express.Router();
const moment = require('moment');
// 数据连接池
const pool = require("../config/pool");


/**
 * 查询所有管理员
 */
router.get('/', function (req, res) {
    pool.query('SELECT * FROM admin_user', [], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "查询成功"});
    });
});


module.exports = router;
