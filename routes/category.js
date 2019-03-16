const express = require('express');
const router = express.Router();
const moment = require('moment');

// 数据连接池
const pool = require("../config/pool");
const mysql = require('mysql');

/**
 * 查询商品类型列表
 */
router.get('/', function (req, res) {
    pool.query('SELECT * FROM category', [], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "查询成功"});
    });
});

/**
 * 添加商品
 */
router.post('/', function (req, res) {
    const cname = req.body['cname'];
    const cid = 'N_' + Date.now();// 根据时间戳生产商品编号
    const insertSql = 'insert into category (cid, cname) values (?, ?)';
    pool.query(insertSql, [cid, cname], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "插入成功"});
    });
});

/**
 * 修改类型
 */
router.put('/', function (req, res) {
    const id = req.body['id'];
    const cName = req.body['cname'];
    let sql = 'update category set cname = ? where id = ?';
    pool.query(sql, [cName, id], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.affectedRows > 0) {
            res.send({code: 20000, msg: "更新成功"});
        } else {
            res.send({code: -1, msg: "更新失败"});
        }
    })
});


/**
 * 删除商品分类
 */
router.delete('/:id', function (req, res) {
    const id = parseInt(req.params['id']);
    pool.query('delete from category where id = ?', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "查询成功"});
    });
});

module.exports = router;
