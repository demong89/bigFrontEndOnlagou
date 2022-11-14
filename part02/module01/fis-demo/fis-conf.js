fis.match('*.{js,css,png}',{
    release:'/assets/$0'
})

// 安装 fis-parser-node-sass
fis.match('**/*.scss',{
    rExt:'.css',// 修改扩展名
    parser:fis.plugin('node-sass'),
    optimizer:fis.plugin('clean-css')//压缩
})

// 安装  fis-parser-babel-6.x
fis.match('**/*.js',{
    parser:fis.plugin('babel-6.x'),
    optimizer:fis.plugin('uglify-js')
})

