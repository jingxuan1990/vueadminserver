const express = require('express');
const router = express.Router();

const moment = require('moment');

// 数据连接池
const pool = require("../config/pool");


/**
 * 创建todo
 */
router.post('/', function (req, res) {
    const content = req.body['content'];
    let gmtCreate = moment().format("YYYY-MM-DD HH:mm:ss");
    const status = 0; //默认值

    const insertSql = 'insert into todo(content, status, gmt_create, gmt_modified) ' +
        'values (?, ?, ?, ?) ';
    pool.query(insertSql, [content, status, gmtCreate, gmtCreate],
        (err, result) => {
            if (err) {
                throw err;
            }
            res.send({code: 20000, data: result, msg: "创建成功"});
        });
});

/**
 * 查询doto list
 */
router.get('/list', function (req, res) {
    const querySql = 'SELECT * FROM todo order by status asc, gmt_create desc limit 8'
    pool.query(querySql, [], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "查询成功"});
    })
});

/**
 * 修改todo
 */
router.put('/', function (req, res) {
    const id = parseInt(req.body['id']);
    const content = req.body['text'];
    const updateSql = 'update todo set content=? where id =?'
    pool.query(updateSql, [content, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "修改成功"});
    })
});

/**
 * 删除todo
 */
router.delete('/:id', function (req, res) {
    const id = parseInt(req.params['id']);
    const updateSql = 'delete from todo where id =?'
    pool.query(updateSql, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "删除成功"});
    })
});

/**
 * 完成todo
 */
router.put('/status', function (req, res) {
    const id = parseInt(req.body['id']);
    const status = req.body['done'] ? 0 : 1;

    console.log('status=' + status)

    const updateSql = 'update todo set status=? where id =?'
    pool.query(updateSql, [status, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({code: 20000, data: result, msg: "修改成功"});
    })
});

module.exports = router;
