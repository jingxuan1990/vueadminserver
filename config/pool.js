const mysql = require("mysql");
var pool = mysql.createPool({
   host:"localhost",
   user:"root",
   password:"",
   database:"spa",
   port:3306,
   connectionLimit:10
});
module.exports = pool;
