const express = require('express');
const router = express.Router();
const moment = require('moment');

// 数据连接池
const pool = require("../config/pool");


/**
 * 查询所有订单
 */
router.get('/list', function (req, res) {
    // 查询记录总数
    let totalSql = 'select count(*)  as total from order_info';
    pool.query(totalSql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let total = rows[0].total
        // console.log('json=' + JSON.stringify(req.query))
        selectByPage(total, req, res)
    });

    // 分页查询
    function selectByPage(total, req, res) {
        // 页码
        let pageNum = parseInt(req.query['pageNum']);
        // 页面大小
        let pageSize = parseInt(req.query['pageSize']);
        // 计算sql的偏移量offset
        let offset = pageSize * (pageNum - 1);

        // 分页查询sql
        let sql = 'select * from order_info order by modify_time  desc limit ?,?';
        pool.query(sql, [offset, pageSize], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }
            res.send({code: 20000, data: result, total: total, msg: "查询成功"});
        })
    }
});

/**
 * 查询所有订单
 */
router.get('/list_top10', function (req, res) {
    let totalSql = 'select * from order_info  order by modify_time limit 5';
    pool.query(totalSql, [], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "查询成功"});
    });
});


/**
 * 删除订单
 */
router.post('/delete', function (req, res) {
    const ids = req.query['ids'];
    if (ids.length > 0) {
        let delSql = 'delete from order_info where id in ( ' + ids + ')';
        pool.query(delSql, [], (err, rows) => {
            console.log("delResult=" + JSON.stringify(rows))
        });
    }
    res.send({code: 20000, data: null, msg: "删除成功"});
});

/**
 * 订单发货
 */
router.post('/update/delivery', function (req, res) {
    // console.log('req=' + JSON.stringify(req.body));

    const reqArray = req.body;
    for (const current of reqArray) {
        const orderId = current['orderId'];
        const deliverySn = current['deliverySn'];
        const deliveryCompany = current['deliveryCompany'];
        const nowTime = moment().format("YYYY-MM-DD HH:mm:ss")

        const updateSql = 'update order_info set status=2, delivery_sn =?, delivery_company=?, modify_time=?, delivery_time=? where id = ?';
        pool.query(updateSql, [deliverySn, deliveryCompany, nowTime, nowTime, orderId], (err, rows) => {
            if (err) {
                throw  err;
            }
            console.log("发货结果：" + JSON.stringify(rows))
        });
    }
    res.send({code: 20000, data: true, msg: "发货成功"});
});


/**
 * 关闭订单
 */
router.post('/update/close', function (req, res) {
    const idStr = req.query['ids'];
    const note = req.query['note'];
    const nowTime = moment().format("YYYY-MM-DD HH:mm:ss")

    const idArray = idStr.split(',');
    for (const id of idArray) {
        const updateSql = 'update order_info set status=4, note=?, modify_time=? where id = ?';
        pool.query(updateSql, [note, nowTime, id], (err, rows) => {
            if (err) {
                throw  err;
            }
            console.log("关闭订单结果：" + JSON.stringify(rows))
        });
    }
    res.send({code: 20000, data: true, msg: "关闭成功"});
});


module.exports = router;
