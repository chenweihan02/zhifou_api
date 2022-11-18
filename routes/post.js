const express = require('express')
const { 
  getList, 
  getPost, 
  getPostTotalByColumnId, 
  getPostPageByColumnId, 
  createPost, 
  // uploadImg, 
  // getImg, 
  deletePost 
} = require('../controller/post')
const { successData, failData } = require('../model/resData')
const getData = require('../utils/getData')
const { currentTime } = require('../utils/getCurrentTime')
const multer = require("multer"); //引入Multer
const router = express.Router()
const app = express()
const fs = require('fs');
const path = require('path')
// 导入bodyParser插件，它帮助我们获取前端post请求传过来的参数
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended:false }))
 //接收到的文件放uploads文件夹
// const upload = multer({ dest: 'uploads/' })

// 文章列表
router.get('/list', async (req, res) => {
  const result = await getList().then(sqlData => {
    return successData(sqlData)
  }).catch(err => failData(err))
  res.send(result)
})

//===================================================

// cid/post/

router.get('/page', async (req, res) => {
  const cid = getData(req).get('cid')
  const currentPage = getData(req).get('currentPage')
  const pageSize = getData(req).get('pageSize')

  // console.log('post', cid, currentPage, pageSize)
  console.log('Page 分页', cid, currentPage, pageSize)
  if (cid == undefined || cid == null) return 

  let count;
  const temp = await getPostTotalByColumnId(cid)
    .then(sqlData => {
      // console.log('--------', sqlData.length)
      count = sqlData.length
    })

  const result = await getPostPageByColumnId(cid, currentPage, pageSize)
    .then(sqlData => {
      return successData({
        "count": count,
        "currentPage": currentPage,
        "pageSize": pageSize,
        "list": sqlData
      })
    })
  res.send(result)
})


// // 文章详情
// router.get('/detail', async (req, res) => {
//   const id = getData(req).get('id')
//   const result = await getPost(id).then(sqlData => {
//     if (sqlData.length > 0) {
//       return successData('item', sqlData[0])
//     }
//     return failData('该文章不存在!')
//   }).catch(err => failData(err))
//   res.send(result)
// })

// // 新建文章
// router.post('/create', async (req, res) => {
//   console.log('data', req.body)
//   const postData = req.body
//   const imgUrl = postData.imgUrl || ''
//   const editor = postData.editor || ''
//   const createTime = currentTime()
//   const result = await createPost({
//     ...postData,
//     imgUrl, 
//     editor,
//     createTime
//   }).then(() => {return successData('msg', '文章创建成功！',editor)}
//   ).catch(err => failData(err))

//   res.status(201).send(result)
// })

// //上传文件
// // 图片上传
// app.use(express.json());
//  //实现新增（上传图片）接口，post请求，参数为 icon ！！！

// router.post('/upload', upload.single('img'), (req, response) => {
//   // req.file得到前端发送回来的文件信息，
//   // req.body的到文件文本信息
//   const {file, body} = req 
//   console.log('upload', file, body)
//   //判断是否发送的是空文件回来
//   if (file == undefined) {
//       response.send({code:400,msg:'新增失败,参数缺失'})
//   } else {
//     var oldPath = file.destination + file.filename;
//     var newPath = file.destination+file.filename + file.originalname
//     let newName = file.filename + file.originalname
//     fs.rename(oldPath, newPath, function (err) {
//       if (err) {
//         throw err;
//       }
//       uploadImg(newName).then(() => {
//         response.send({code:1,msg:'新增成功',newName:newName})
//       })
//     });
//   }
// })

// //删除文章
// router.post('/delete',async(req,res) => {
//   let { id } = req.body
//   console.log('id', id)
//   const result = await deletePost(id).then(() => {
//     return successData('msg','文章删除成功')
//   }).catch(err => failData)
//   res.send(result)
//   console.log('result', result)
// })




module.exports = router
