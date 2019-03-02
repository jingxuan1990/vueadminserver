const express = require('express');
const router = express.Router();
const moment = require('moment');

// 数据连接池
const pool = require("../config/pool");

/**
 * 查询会员列表
 */
router.get('/:pageNum/:pageSize', function (req, res) {
    // 查询记录总数
    let totalSql = 'select count(*)  as total from user';
    pool.query(totalSql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let total = rows[0].total
        selectByPage(total, req, res)
    });

    // 分页查询
    function selectByPage(total, req, res) {
        // 页码
        let pageNum = parseInt(req.params.pageNum);
        // 页面大小
        let pageSize = parseInt(req.params.pageSize);
        // 计算sql的偏移量offset
        let offset = pageSize * (pageNum - 1);

        // 分页查询sql
        let sql = 'select id, name, nick_name, birth, address, sex, user_card, gmt_create, gmt_modified' +
            ' from user order by gmt_modified  desc limit ?,?';
        pool.query(sql, [offset, pageSize], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }

            let newList = [];
            for (let current of result) {
                if (current.birth) {
                    current.birth = moment(current.birth).format("YYYY-MM-DD");
                }

                if (current.gmt_create) {
                    current.gmt_create = moment(current.gmt_create).format("YYYY-MM-DD HH:mm:ss");
                }

                if (current.gmt_modified) {
                    current.gmt_modified = moment(current.gmt_modified).format("YYYY-MM-DD HH:mm:ss");
                }
                newList.push(current);
            }
            res.send({code: 20000, data: result, total: total, msg: "查询会员信息成功"});
        })
    }
});

/**
 * 根据ID查询会员信息
 */
router.get('/:id', function (req, res) {
    let sql = 'select id, name, nick_name, birth, address, sex, user_card from user ' +
        'were id = ?';
    let userId = req.id;
    pool.query(sql, [userId], (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        if (result.affectedRows > 0) {
            res.send({code: 20000, msg: "查询会员信息成功"});
        } else {
            res.send({code: -1, msg: "查询会员信息失败"});
        }
    })
});

/**
 * 根据ID删除会员信息
 */
router.delete('/:id', function (req, res) {
    let sql = 'delete from user where id = ?';
    let userId = parseInt(req.params.id);
    pool.query(sql, [userId], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.affectedRows > 0) {
            res.send({code: 20000, msg: "删除会员成功"});
        } else {
            res.send({code: -1, msg: "删除会员失败"});
        }
    })
});

/**
 * 创建会员
 */
router.post('/', function (req, res) {
    let user = req.body;

    let sql = 'INSERT INTO user (name,nick_name,birth,address,sex,user_card, gmt_create, gmt_modified)' +
        'VALUES(?, ?, ?, ?, ?, ?, ?, ?)'

    const formatBirth = moment(user.birth).format("YYYY-MM-DD")
    const gmt_create = moment().format("YYYY-MM-DD HH:mm:ss")
    pool.query(sql, [user.name, user.nick_name, formatBirth, user.address, user.sex, user.user_card
            , gmt_create, gmt_create],
        (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }

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
router.put('/', function (req, res) {
    let user = req.body;

    let sql = 'update user set name = ?,nick_name=?,birth=?, address=?, sex=?, user_card=?, gmt_modified=?' +
        'where id = ?'

    let formatBirth = moment(user.birth).format("YYYY-MM-DD")
    let gmtModified = moment().format("YYYY-MM-DD HH:mm:ss")
    let userId = parseInt(user.id);
    pool.query(sql, [user.name, user.nick_name, formatBirth, user.address, user.sex, user.user_card,
            gmtModified, userId],
        (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }

            if (result.affectedRows > 0) {
                res.send({code: 20000, msg: "修改会员成功"});
            } else {
                res.send({code: -1, msg: "修改会员失败"});
            }
        });
});

module.exports = router;
