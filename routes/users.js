const express = require('express');
const router = express.Router();
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

});

/**
 * 根据ID更新会员
 */
router.put('/:id', function (req, res) {

});

module.exports = router;
