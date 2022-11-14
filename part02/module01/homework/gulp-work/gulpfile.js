// 实现这个项目的构建任务
const { src, dest ,watch,series,parallel} = require('gulp')
const del = require('del')
// const sass = require('gulp-sass')
// const babel = require('gulp-babel')
// const imagemin = require('gulp-imagemin')
// const swig = require('gulp-swig')
// const ifg = require('gulp-if')
// const useref = require('gulp-useref')
// const uglify = require('gulp-uglify')
// const cleanCss = require('gulp-clean-css')
const gulpLoadPlugins = require('gulp-load-plugins')
const plugins = gulpLoadPlugins()
// 
const browserSync = require('browser-sync')
const bs = browserSync.create()

const data = require('./package.json')

// 编译scss
const style = () => {
    return src('src/assets/styles/*.scss')
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest('dist/css'))
}

// 编译JS
const js = () => {
    return src('src/assets/scripts/*.js')
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('dist/js'))
}
// 处理图片
const img = () => {
    return src('src/assets/images/**')
        .pipe(plugins.imagemin())
        .pipe(dest('dist/img'))
}
// 处理字体
const font = () => {
    return src('src/assets/fonts/**')
        .pipe(plugins.imagemin())
        .pipe(dest('dist/font'))
}

// 拷贝静态资源
const extra = () => {
    return src('public/**')
        .pipe(dest('dist/public'))
}
// 处理HTML文件
const html  = ()=>{
    return src(['src/*.html','src/layouts/*.html','src/partials/*.html'])
        .pipe(plugins.swig({data:{pkg:data}}))
        .pipe(dest('dist'))
}

// 清除构建后的目录
const clean = () => {
    return del('dist')
}

const server = ()=>{
    watch('src/assets/styles/*.scss',style)
    watch('src/assets/scripts/*.js',js)
    watch(['src/assets/fonts/**','src/assets/images/**'],bs.reload)

    bs.init({
        notify:false,
        files:'dist',
        server:{
            baseDir:['dist','src','public'],
            routes:{
                '/node_modules':'node_modules'
            }
        }
    })
}

// 文件引用处理
const ref = ()=>{
    return src('dist/*.html')
        .pipe(plugins.useref({searchPath:['dist','.']}))
        .pipe(plugins.if(/\.js$/,plugins.uglify()))
        .pipe(plugins.if(/\.html$/,plugins.htmlmin({collapseWhitespace:true,minifyCSS:true,minifyJS:true})))
        .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
        .pipe(dest('dist'))
}

const develop = series(parallel(style,js,html),ref, server)
const build = series(clean,parallel(style,js,html,img,extra,font))
module.exports = {
    clean,
    develop,
    build
}