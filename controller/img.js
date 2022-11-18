const execSql = require('../mysql/execSql')

const uploadImg = (path) => {
    const sql = `insert into table_img(path) values('${path}')`
    return execSql(sql)
}

const getImgById = (id) => {
  const sql = `select * from table_img where _id = '${id}'`
  return execSql(sql)
}

const getImgByPath = (path) => {
  const sql = `select * from table_img where path = '${path}'`
  return execSql(sql)
}

module.exports = {
  uploadImg,
  getImgById,
  getImgByPath
}