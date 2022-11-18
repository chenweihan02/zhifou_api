const express = require('express')
const column = require('./routes/column')
const post = require('./routes/post')
const user = require('./routes/user')
const img = require('./routes/img') // 

var path = require('path')
const PORT = 8081
const ROOT_PATH = '/api'
const app = express()

const { getImgById, getImgByPath } = require('./controller/img') //


// 设置允许跨域访问该服务
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
  next()
})
// 解析post请求的数据
app.use(express.json())

app.use(`${ROOT_PATH}/column`, column)
app.use(`${ROOT_PATH}/post`, post)
app.use(`${ROOT_PATH}/user`, user)
app.use(`${ROOT_PATH}/img`, img)

app.listen(PORT, () => {
  console.log('服务已启动:127.0.0.1:' + PORT)
})

app.get('/', (req, res)=>{
    res.send('Hello world');
});

app.get('/img/:pathname', function (req, res) {
  const pathname = req.params.pathname
  console.log('app get path', pathname)
  res.sendFile(path.join(__dirname, 'uploads/' + pathname));
  // console.log(__dirname)
})

// app.get('/img/:id', function (req, res) {
//   console.log('get xxx', req.params.id)
//   res.sendFile(path.join(__dirname, 'uploads/90d0f0c852811bf3d5a97678d2d5286362273756.jpg'));
//   // console.log(__dirname)
// })

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))

const getData = require('./utils/getData')
// 获得详情
app.get('/img', async (req, res) => {
  console.log('get yyy')
  const img_id = getData(req).get('id')
  const img_path = getData(req).get('path')
  let result
  res.send()
  // if (img_id !== undefined) {
  //   result = await getImgById(img_id).then(sqlData => {
  //     if (sqlData.length > 0) {
  //       return sqlData[0]
  //     }
  //     return '图片id不存在'
  //   })

  // } else if (img_path !== undefined ) {
  //   result = await getImgByPath(img_path).then(sqlData => {
  //     if (sqlData.length > 0) {
  //       return sqlData[0]
  //     }
  //     return '图片path不存在'
  //   })
  // }

  // if (result.path !== undefined) {
  //   res.sendFile(path.join(__dirname, 'uploads/' + result.path))
  // }
  

  // console.log('img req', id)
  // const result = id
  // ? await getImgById(id).then(sqlData => {
  //   if (sqlData.length > 0) {
  //     return sqlData[0]
  //     // return successData(sqlData[0])
  //   }
  //   return '该图片不存在！'
  // }).catch(err => failData(err))
  // : '缺少唯一图片id, 无法获取图片!'

  // console.log(result.path)
  // res.sendFile(path.join(__dirname, 'uploads/' + result.path))
  // res.send(result)
})


// app.post('/api/img',  async (req, response) => {
//   const newName = req.body.newName
//   console.log('xx', newName)
//   const id = await getImg(newName).then(sqlData => {
//     if (sqlData.length > 0) {
//       return sqlData[0]._id
//     }
//   }).catch(err => res.send(err))

//   console.log('app img id', id)

//   response.send((id).toString())
//   app.get(`/img/${id}`, function (req, res, next) {
//     console.log('app send get')
//     res.sendFile(path.join(__dirname, `uploads/${newName}`));
//   })
// })

