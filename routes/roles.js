const express = require('express');
const router = express.Router();
const moment = require('moment');
// 数据连接池
const pool = require("../config/pool");


/**
 * 查询所有角色
 */
router.get('/', function (req, res) {
    pool.query('SELECT * FROM role', [], (err, result) => {
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

        res.send({code: 20000, data: result, msg: "查询角色列表成功"});
    });
});

/**
 * 根据id查询角色
 */
router.get('/:id', function (req, res) {
    let id = parseInt(req.params.id);
    pool.query('SELECT * FROM role where id=?', [id], (err, result) => {
        if (err) {
            throw err;
        }

        res.send({code: 20000, data: result, msg: "查询角色列表成功"});
    });
});

/**
 * 创建角色权限
 */
router.post('/', function (req, res) {
    const body = req.body;
    console.log('body=' + JSON.stringify(body));

    let gmtCreate = moment().format("YYYY-MM-DD HH:mm:ss");
    let role_name = req.body['role_name'];
    let jsonString = JSON.stringify(req.body['permission_urls']);

    const insertSql = 'INSERT INTO role (role_name, permission_url, gmt_create, gmt_modified) VALUES (?,?, ?, ?);'
    pool.query(insertSql, [role_name, jsonString, gmtCreate, gmtCreate], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "增加角色成功"});
    });

});

/**
 * 根据ID删除
 */
router.delete('/:id', function (req, res) {
    let sql = 'delete from role where id = ?';
    let userId = parseInt(req.params.id);
    pool.query(sql, [userId], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.affectedRows > 0) {
            res.send({code: 20000, msg: "删除成功"});
        } else {
            res.send({code: -1, msg: "删除失败"});
        }
    })
});

/**
 * 修改角色
 */
router.put('/', function (req, res) {
    const id = req.body['id'];
    const roleName = req.body['role_name'];
    const permissionJsonString = JSON.stringify(req.body['permission_urls']);

    let sql = 'update role set role_name = ?, permission_url = ?, gmt_modified=now() where id = ?';
    pool.query(sql, [roleName, permissionJsonString, id], (err, result) => {
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


module.exports = router;
