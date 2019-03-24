const express = require('express');
const router = express.Router();
const moment = require('moment');

// 数据连接池
const pool = require("../config/pool");
const md5 = require('md5');


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
    const status = (req.body['status'] === true) ? 1 : 0;
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

/**
 * 查询所有商品
 * [{
          goodsTypeName: '111',
          goodsTypeId: 10,
          goodsCount: 10,
          goods: [
            { id: 1, title: '水疗标题1', desc: '这里是描述', price: 20 },
            { id: 2, title: '水疗标题2', desc: '这里是描述2', price: 21 }
          ]
        },{}],
 */
router.get('/', function (req, res) {
    const querySql = 'select a.id as goodsTypeId, a.cname as goodsTypeName,  count(b.id) as goodsCount\n' +
        'from category a left join (\n' +
        '\tselect * from goods\n' +
        ')b on a.id = b.goodType\n' +
        'group by a.id';

    const subSql = 'select id, title, descr, price from goods where goodType = ?';

    pool.query(querySql, [], (err, result) => {
        if (err) {
            throw err;
        }

        const retArray = []
        let count = 0;
        for (const current of result) {
            const goodsTypeId = current['goodsTypeId']
            pool.query(subSql, [goodsTypeId], (err, subResult) => {
                current['goods'] = subResult
                retArray.push(current)
                count++;
                if (count === result.length) {
                    // console.log('result=' + JSON.stringify(retArray))
                    res.send({code: 20000, data: retArray, msg: "查询成功"});
                }
            })
        }




        // res.send({code: 20000, data: result, msg: "查询成功"});
    });

})

module.exports = router;
