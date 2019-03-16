const express = require('express');
const router = express.Router();
const moment = require('moment');

// 数据连接池
const pool = require("../config/pool");
const mysql = require('mysql');

/**
 * 查询套间列表
 */
router.get('/', function (req, res) {
    pool.query('SELECT * FROM suite', [], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "查询成功"});
    });
});


module.exports = router;
