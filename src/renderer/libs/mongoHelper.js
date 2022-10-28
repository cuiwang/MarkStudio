const MongoClient = require('mongodb').MongoClient

class MongoHelper {

  //connection = null
  //host = ''
  //port = ''
  //user = ''
  //password = ''
  //database = ''
  //table = ''

  //const uri =`mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
  constructor(host, port,user,password,database,table) {
    this.host = host
    this.port = port
    this.user = user
    this.password = password
    this.database = database
    this.table = table
  }

  // 获取数据库连接
  async getConn() {
    let url = `mongodb://${this.host}:${this.port}/`
    if (this.user && this.password){
      // const url = 'mongodb://admin:123456@localhost:27017/'; 有密码连接方式 admin 表示用户名，123456 表示密码
      url = `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/`
    }
    // Connect the client to the server
    return MongoClient.connect(url)
  }

}

module.exports = MongoHelper