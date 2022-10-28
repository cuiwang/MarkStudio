// 数据库连接助手
const mysql = require('mysql');

class DBHelper{
  // 获取数据库连接
  getConn(host,port,user,password,database){
    return mysql.createConnection({
      // 数据库连接配置
      host: host,
      port: port,
      user: user,
      password: password,
      database: database  // 数据库名
    });
  }

}

module.exports = DBHelper;