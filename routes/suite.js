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


/**
 * 创建套间
 */
router.post('/', function (req, res) {
    // 获取请求参数
    const name = req.body['name'];
    const status = parseInt(req.body['status']);
    const type = req.body['type'];

    // 自动生成noid
    const noId = 'N' + randomNum(100, 999);
    // 当前时间
    let gmtCreate = moment().format("YYYY-MM-DD HH:mm:ss");

    const sql = 'insert into suite (noid, name, status, type, gmt_create, gmt_modified)' +
        ' values(?, ?, ?, ?, ?, ?)'
    pool.query(sql, [noId, name, status, type, gmtCreate, gmtCreate], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "创建成功"});
    });
});

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}



/**
 * 修改套间
 */
router.put('/', function (req, res) {
    // 获取请求参数
    console.log('body'  + JSON.stringify(req.body))

    const suiteId = req.body['id']; // 套间ID
    const remark = req.body['remark']; // 备注
    const userNum = req.body['use_num']; // 使用人数
    const phone = req.body['phone']; // 预约人手机号
    const username = req.body['username']; // 预约人姓名
    const bookingSartTime = req.body['booking_sart_time']; // 预约开始时间
    const bookingEndTime = req.body['booking_end_time']; // 预约结束时间
    const zhanStartTime = req.body['zhan_start_time']; // 占用开始时间
    const zhanEndTime = req.body['booking_end_time']; // 占用结束时间
    const status = req.body['status']; // 套间状态

});


module.exports = router;
