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

        let newList = [];
        for (let current of result) {
            if (current.gmt_create) {
                current.gmt_create = moment(current.gmt_create).format("YYYY-MM-DD HH:mm:ss");
            }

            if (current.gmt_modified) {
                current.gmt_modified = moment(current.gmt_modified).format("YYYY-MM-DD HH:mm:ss");
            }


            newList.push(current);
        }

        res.send({code: 20000, data: newList, msg: "查询成功"});
    });
});


/**
 * 创建管理员
 */
router.post('/', function (req, res) {
    const username = req.body['username'];
    const password = req.body['username'];
    const nick_name = req.body['nick_name'];
    const roleJson = JSON.stringify(req.body['roles']);
    const gmt_create = moment().format("YYYY-MM-DD HH:mm:ss");

    const insertSql = 'insert into admin_user (username, password, nick_name, role, gmt_create, gmt_modified)' +
        'values (?, ?, ? ,? ,? ,?)';
    pool.query(insertSql, [username, password, nick_name, roleJson, gmt_create, gmt_create],
        (err, result) => {
            if (err) {
                throw err;
            }
            res.send({code: 20000, data: result, msg: "创建管理员成功"});
        });
});

/**
 * 删除管理员
 */
router.delete('/:id', function (req, res) {
    const id = parseInt(req.params['id']);
    const delSql = 'delete from admin_user  where id = ?';
    pool.query(delSql, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "删除成功"});
    });
});

/**
 * 修改管理员
 */
router.put('/', function (req, res) {
    const id = parseInt(req.body['id']);
    const username = req.body['username'];
    const password = req.body['username'];
    const nick_name = req.body['nick_name'];
    const roleJson = JSON.stringify(req.body['roles']);
    let gmt_modified = moment().format("YYYY-MM-DD HH:mm:ss")

    let sql = 'update admin_user set username = ?, nick_name=?,password=?, role=?, gmt_modified=? where id = ?'
    pool.query(sql, [username, nick_name, password, roleJson, gmt_modified, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "修改管理员成功"});
    });
});

module.exports = router;
