const express = require('express')
const { uploadImg, getImg } = require('../controller/img')
const { successData, failData } = require('../model/resData')

const multer = require("multer"); //引入Multer

const router = express.Router()
const fs = require('fs');
const app = express()
const path = require('path')

// 导入bodyParser插件，它帮助我们获取前端post请求传过来的参数
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))
 //接收到的文件放uploads文件夹
const upload = multer({ dest: 'uploads/' })

// 图片上传
app.use(express.json())

router.post('/upload', upload.single('img'), (req, response) => {
  // req.file得到前端发送回来的文件信息，
  // req.body的到文件文本信息
  const {file, body} = req 
  // console.log('upload', file, body)
  //判断是否发送的是空文件回来
  if (file == undefined) {
      response.send({code:400,msg:'新增失败,参数缺失'})
  } else {
    var oldPath = file.destination + file.filename;
    var newPath = file.destination+file.filename + file.originalname
    let newName = file.filename + file.originalname
    fs.rename(oldPath, newPath, function (err) {
      if (err) { throw err; }
      uploadImg(newName).then(() => {
        response.send({code:1,msg:'新增成功',newName:newName})
      })
    });
  }
})


// // 获得图片
// router.get('/detail', async (req, res) => {
//   const id = getData(req).get('id')
//   console.log('detailreq',id)
//   const result = id
//   ? await getColumn(id).then(sqlData => {
//     if (sqlData.length > 0) {
//       return successData(sqlData[0])
//     }
//     return failData('该专栏不存在！')
//   }).catch(err => failData(err))
//   : failData('缺少唯一标识id, 无法获取专栏!')
//   res.send(result)
// })


module.exports = router