const express = require('express')
const {
  getList,
  getColumn,
  getColumnPage
} = require('../controller/column')
const { successData, failData } = require('../model/resData')
const getData = require('../utils/getData')

const router = express.Router()

// 专栏列表
router.post('/list', async (req, res) => {
  const result = await getList().then(sqlData => {
    console.log('list', sqlData.length)
    return successData(sqlData)
  }).catch(err => failData(err))
  res.send(result)
})


/*

{
  "code": 1,
  "data": {
    "count": 3,
    "currentPage": "1",
    "pageSize": "3",
    "list": [
        {},
        {},
        {}
    ]
  },
  "successTime": "2022-11-16 14:24:47"
}

*/

// 获取所有的专栏，分页显示
router.get('/page', async (req, res) => {
  const currentPage = getData(req).get('currentPage')
  const pageSize = getData(req).get('pageSize')
  let count;
  const temp = await getList().then(sqlData => {
    count = sqlData.length
  })

  const result = await getColumnPage(currentPage, pageSize)
    .then(sqlData => {
      console.log('获取分页', currentPage, pageSize)
      return successData({
        "count": count,
        "currentPage": currentPage,
        "pageSize": pageSize,
        "list": sqlData
      })
    })
  res.send(result)
})

// // 专栏详情
// router.get('/', async (req, res) => {
//   const id = getData(req).get('id')
//   console.log('/ req',id)
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



// 专栏详情
router.get('/detail', async (req, res) => {
  const id = getData(req).get('id')
  console.log('detailreq',id)
  const result = id
  ? await getColumn(id).then(sqlData => {
    if (sqlData.length > 0) {
      return successData(sqlData[0])
    }
    return failData('该专栏不存在！')
  }).catch(err => failData(err))
  : failData('缺少唯一标识id, 无法获取专栏!')
  res.send(result)
})

module.exports = router
//===============================================================