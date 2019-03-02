const express = require('express');
const router = express.Router();
const moment = require('moment');

// 数据连接池
const pool = require("../config/pool");

/**
 * 查询会员列表
 */
router.get('/', function (req, res) {
    res.send('hello world');
});

/**
 * 根据ID查询会员信息
 */
router.get('/:id', function (req, res) {

});

/**
 * 根据ID删除会员信息
 */
router.delete('/:id', function (req, res) {

});

/**
 * 创建会员
 */
router.post('/', function (req, res) {
    let user = req.body;

    console.log('create user request body=' + JSON.stringify(user))

    let sql = 'INSERT INTO user (name,nick_name,birth,address,sex,user_card, gmt_create, gmt_modified)' +
        'VALUES(?, ?, ?, ?, ?, ?, ?, ?)'

    const formatBirth = moment(user.birth).format("YYYY-MM-DD")
    const gmt_create = moment().format("YYYY-MM-DD HH:mm:ss")
    pool.query(sql, [user.name, user.nick_name, formatBirth, user.address, user.sex, user.user_card
            , gmt_create, gmt_create],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            ;
            if (result.affectedRows > 0) {
                res.send({code: 20000, msg: "增加会员成功"});
            } else {
                res.send({code: -1, msg: "增加会员失败"});
            }
        });
});

/**
 * 根据ID更新会员
 */
router.put('/:id', function (req, res) {

});

module.exports = router;
