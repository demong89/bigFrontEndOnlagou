const express = require('express')
const fs = require('fs')
const template = require('art-template')
const app = express()

app.get('/',(req,res)=>{
  const templateStr = fs.readFileSync('./index.html','utf-8')
  const data = JSON.parse(fs.readFileSync('./data.json','utf-8'))
  const html = template.render(templateStr,data)
  res.send(html)
})

app.listen(3000,()=>{
  console.log('server running...');
})
