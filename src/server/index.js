const Mock = require('mockjs');
const express = require('express');
const app = express(function () { })

// 解决跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

/** *****接口*******/

// 新闻列表接口
app.get('/data', function (req, res) {
  const { num } = req.query
  return res.send(getNewList(num))
})

/** *****数据模拟*******/

// 根据传入的参数 生成新闻列表
function getNewList(num = 10) {
  return Mock.mock({
    [`list|${num}`]: [{
      // ID 自增
      'id|+1': 1,
      // 标题
      title: '@ctitle(10,25)',
      // 图片
      image: "@image('60x60', '#4A7BF7', 'hello')",
      // 访问人数 自然数0-99999
      reads: '@natural(0,99999)',
      // 点赞人数 自然数0-99999
      loves: '@natural(0,99999)',
      // 发布时间 日期格式
      date: '@date("yyyy-MM-dd")'
    }]
  })
}

// 开起服务
const port = 9000
app.listen(port, () => {
  console.log(
    `service started successfully and running at: \n- Local: http://localhost:${port}/ `)
})
