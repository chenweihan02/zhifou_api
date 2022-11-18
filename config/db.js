/* 
  数据库配置
*/
const env = process.env.NODE_ENV

let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
   // host: 'localhost',    // 主机
    host: '47.104.13.50',
    port: '3306',         // 端口
    database: 'zhifou',  // 数据库名
    user: 'zhifou',         // 用户
    password: 'zhifou'    // 密码
  }
}

if (env === 'production') {

}

module.exports = { MYSQL_CONF }
