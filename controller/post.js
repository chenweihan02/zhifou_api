const execSql = require('../mysql/execSql')

// 获取文章列表
const getList = () => {
  const sql = 'select * from table_post'
  return execSql(sql)
}
/*
post 中有column_id 和 author_id
column_id: 主要用于查看该文章属于哪个专栏
author_id: 主要用于判断该用户能否修改这个专栏。

column中没有 author_id
user中有 column的id

创建文章时，user可以提供 column_id 和author_id
*/
// 通过column_id 获取文章列表

// 通过获取所有的文章，然后filter 过滤。

// const getSameColumnPostList = (column_id) => {
//   const sql = `select * from table_post where column_id = '${column_id}'`
//   return execSql(sql)
// }

const getPostTotalByColumnId = (cid) => {
  const sql = `select * from table_post where column_id = ${cid}`
  return execSql(sql)
}

const getPostPageByColumnId = (cid,currentPage, pageSize) => {
  let sql = `select * from table_post `
  sql += ` where column_id = ${cid}`
  sql += ` limit ${pageSize * (currentPage - 1)} , ${pageSize}`
  return execSql(sql)
}


// 创建文章
const createPost = ({author_id, column_id, title, excerpt, content, img_url, created_time}) => {
  // const sql = `insert into table_post(title, content, imgUrl, editor, createtime, columnid) values('${title}', '${content}', '${imgUrl}', '${editor}', '${createTime}', '${columnId}')`
  let sql = `insert into table_post(author_id, column_id, title, excerpt, content, img_url, created_time)`
  sql += ` values('${author_id}', '${column_id}', '${title}', '${excerpt}', '${content}', '${img_url}', '${created_time}')`
  return execSql(sql)
}


// 通过id获取对应文章
const getPost = (id) => {
  const sql = `select * from table_post where _id = '${id}'`
  return execSql(sql)
}


// ========================================================================





const deletePost = (id) => {
  const sql = `delete from table_post where _id = '${id}'`
  return execSql(sql)
}


// //上传图片
// const uploadImg = (path) => {
//   // const sql = `insert into comic(newPath,oldPath) values('${newPath}','${oldPath}')`
//   // const sql = `insert into comic(path) values('${path}')`
//   const sql = `insert into table_img(path) values('${path}')`
//   return execSql(sql)
// }

// const getImg = (name) => {
//   console.log('name',name)
//   console.log('name2',`'${name}'`);
//   // const sql = `select * from comic where path = '${name}'`
//   const sql = `select * from table_img where path = '${name}'`
//   return execSql(sql)
// }

module.exports = {
  getList,
  getPostTotalByColumnId,
  getPostPageByColumnId,
  getPost,
  createPost,
  // uploadImg,
  // getImg,
  deletePost
}
