var userSqlMap = {
    add: 'INSERT INTO user(name,nick_name,birth,detail_address,sex)VALUES(?,?,?,?,?)',
    deleteById: 'delete from user where id = ?',
    update: 'update user set username=?, password=? where id=?',
    list: 'select * from user',
    getById: 'select * from user where id = ?'
};

module.exports = userSqlMap;
