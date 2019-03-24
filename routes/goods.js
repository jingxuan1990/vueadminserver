const express = require('express');
const router = express.Router();
const moment = require('moment');

// 数据连接池
const pool = require("../config/pool");
const md5 = require('md5');


module.exports = router;

/**
 * 添加商品详情
 */
router.post('/', function (req, res) {
    console.log(JSON.stringify(req.body))

    const title = req.body['title'];
    const subtitle = req.body['subtitle'];
    const desc = req.body['desc'];
    const noid = 'S' + md5(Date.now());
    const price = req.body['price'];
    const count = req.body['count'];
    const integral = req.body['integral'];
    const status = (req.body['status'] === true) ? 1: 0;
    const checkedServices = JSON.stringify(req.body['checkedServices']);
    const detailTitle = req.body['detailTitle'];
    const detailDesc = req.body['detailDesc'];
    const sepc = req.body['sepc'];
    const goodType = req.body['goodType'];

    const insertSql = 'INSERT INTO goods\n' +
        '(title,\n' +
        'subtitle,\n' +
        'descr,\n' +
        'noid,\n' +
        'price,\n' +
        'count,\n' +
        'integral,\n' +
        'status,\n' +
        'checkedServices,\n' +
        'detailTitle,\n' +
        'detailDesc,\n' +
        'sepc, goodType)\n' +
        'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)\n';

    pool.query(insertSql, [title, subtitle, desc, noid, price, count,
        integral, status, checkedServices, detailTitle, detailDesc, sepc, goodType
    ], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "插入成功"});
    });
});
