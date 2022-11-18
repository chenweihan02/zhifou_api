const express = require('express')
const {
  login,
  validateEmail,
  register,
  getUser
} = require('../controller/user')

const {
  createColumn,
  getLastColumnId
} = require('../controller/column')



const { successData, failData } = require('../model/resData')
const { currentTime } = require('../utils/getCurrentTime')
const verify = require('../utils/verify')

const router = express.Router()

// 用户登录
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const result = await login(email, password).then(sqlData => {
    // 有匹配的数据
    if (sqlData.length >= 1) {
      // console.log(sqlData[0])
      const token = verify.setToken(sqlData[0])
      // return successData('token', token, '登录成功')
      // return successData('data', {
      //   'token': token
      // }, '请求成功' , sqlData[0].username)
      return successData({
        'token': token
      }, '登录成功')
    }
    return failData('账号或者密码错误！')
  }).catch(err => failData(err))
  //将登录成功或失败的结果发送给前端
  res.send(result)
})

// 用户信息
router.post('/current', async (req, res) => {
  // 解析token
  const token = req.headers['authorization']
  const data = await verify.getToken(token)
  .then(res => {
    const { _id, email, nickname, description, column_id, img_url } = res.userinfo
    // console.log('res', res)
    return successData({
      _id,
      email,
      nickname,
      description,
      column_id,
      img_url
    }, '请求成功')
  })
  .catch(err => failData(err))
  res.status(201).send(data)
// const {_id, username} = res.userinfo
//   res.send({_id, username})
})

///===============================================================================

// 用户注册
router.post('/register', async (req, res) => {
  // email nickname password
  if ((Object.keys({...req.body})).length !== 3) {
    console.log('校验字段失败')
    res.send()
    return 
  }

  const { email, nickname } = req.body
  // console.log('email-'+email+'-')
  let t_res
  const t = await validateEmail(email).then(sqlData => {
    t_res = sqlData
    if (sqlData.length > 0) {
      console.log('该邮箱已注册')
      return failData('该邮箱已注册')
    }
  })
  if (t_res.length > 0) {
    res.send(t)
    return 
  }

  let columnId

  // console.log('register nickname', nickname)
  await createColumn(nickname)

  const tmp = await getLastColumnId().then(sqlData => {
    columnId = sqlData[0]['max(_id)']
  })

  // console.log('register 校验成功')
  const result = await register({ ...req.body }, columnId).then(() => {
    return successData({}, '注册成功')
  }).catch(err => failData(err))
  res.send(result)
})

// 验证邮箱是否存在
router.post('/validate', async (req, res) => {
  const { email } = req.body
  const result = await validateEmail(email).then(sqlData => {
    if (sqlData.length > 0) {
      return failData('该邮箱已注册！')
    }
    return successData({}, '验证通过！')
  }).catch(err => failData(err))
  res.send(result)
})



// 获取所有用户信息
router.get('/info', async (req, res) => {
  const result = await getUser().then(sqlData => {
    return successData(sqlData)
  }).catch(err => failData(err))
  res.send(result)
})


module.exports = router
