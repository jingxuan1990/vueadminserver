const express = require('express');
const router = express.Router();

// 数据连接池
const pool = require("../config/pool");


/**
 * 修改订单设置
 */
router.put('/', function (req, res) {
    const id = parseInt(req.body['id']);
    const flashOrderOverTime = parseInt(req.body['flashOrderOverTime']);
    const normalOrderOverTime = parseInt(req.body['normalOrderOverTime']);
    const confirmOverTime = parseInt(req.body['confirmOverTime']);
    const finishOverTime = parseInt(req.body['finishOverTime']);
    const commentOverTime = parseInt(req.body['commentOverTime']);

    const updateSql = 'update order_setting set flashOrderOverTime=?,normalOrderOverTime=?,confirmOverTime=?,' +
        'finishOverTime=?,commentOverTime=? where id=?'

    pool.query(updateSql, [flashOrderOverTime, normalOrderOverTime, confirmOverTime,
        finishOverTime, commentOverTime, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "修改成功"});
    });
});

/**
 * 查询订单设置
 */
router.get('/id/:id', function (req, res) {
    const id = parseInt(req.params['id'])
    const querySql = 'SELECT * FROM order_setting where id=?'
    pool.query(querySql, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "查询成功"});
    })
});

module.exports = router;
