// ./markdown-loader.js

const marked = require('marked')
module.exports = source => {
    // console.log(source)  
    const HTML = marked(source)
    // 返回值就是最终被打包的内容
    // return `module.exports=${JSON.stringify(HTML)}`

    return HTML;
  }