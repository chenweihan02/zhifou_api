const execSql = require('../mysql/execSql')

// 获取专栏列表
const getList = () => {
  const sql = 'select * from table_column'
  return execSql(sql)
}

// 通过id获取对应专栏
const getColumn = (id) => {
  const sql = `select * from table_column where _id = '${id}'`
  return execSql(sql)
}

// 获取分页
const getColumnPage = (currentPage, pageSize) => {
  let sql = `select * from table_column`
  sql += ` limit ${pageSize * (currentPage - 1)} , ${pageSize}`
  console.log('sql', sql)
  return execSql(sql)
}

// 新建一个空白专栏
const createColumn = (nickname) => {
  const sql = `insert into table_column (title, description, img_url) values('${nickname}的专栏', '${nickname}的简介', '')`
  return execSql(sql)
}

const getLastColumnId = () => {
  const sql = `select max(_id) from table_column`
  return execSql(sql)
}


module.exports = {
  getList,
  getColumn,
  getColumnPage,
  createColumn,
  getLastColumnId
}

//========================================================================
