const webpack = require('webpack')
const path = require('path')

const devMiddle = require('webpack-dev-middleware');
module.exports = (server, cb) => {
   
    let ready
    const onReady = new Promise(r => ready = r)
    let serverBunlder
    let clientManifest

    const update = () => {
        if (serverBunlder && clientManifest) {
            ready()
            cb(serverBunlder, clientManifest)
        }
    }
    console.log('update1');
    // 监视构建 template
    update()
    // template = fs.readFileSync(path.resolve(__dirname,'../index.template.html'),'utf-8')
    // // fs.watch
    // // fs.watchFile

    // // chokidar 监视文件改变 npm 包
    // chokidar.watch(path).on('change',()=>{
    // 文件改变
    // update()
    // })
    const serverConfig = require('./webpack.server.config')
    const serverCompiler = webpack(serverConfig)
    const servedev = devMiddle(serverCompiler, {
        // logLevel: 'silent' // 关闭日志输出
    })
    serverCompiler.hooks.done.tap('server', () => {
        serverBunlder = JSON.parse(
            servedev.fileSystem.readFileSync(
                path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'), 'utf-8'))
                console.log('update2');
        update()
    })
    // serverCompiler.watch({},(err, stats)=>{
    //     if(err) throw err
    //     if(stats.hasErrors()) return // 打包结果中有错误
    //     serverBunlder = JSON.parse(
    //         fs.readFileSync(
    //             path.resolve(__dirname,'../dist/vue-ssr-server-bundle.json'),'utf-8'))

    //     update()
    // })
    // memfs 基于内存的文件操作系统 webpack  
    // webpack-dev-middleware

    const clientConfig = require('./webpack.client.config')
    const clientCompiler = webpack(clientConfig)
    const clientdev = devMiddle(clientCompiler, {
        // logLevel: 'silent' // 关闭日志输出
        publicPath: clientConfig.output.publicPath
    })
    clientCompiler.hooks.done.tap('client', () => {
        clientBunlder = JSON.parse(
            clientdev.fileSystem.readFileSync(
                path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'), 'utf-8'))
                console.log('update');
                update()
    })

    server.use(clientdev)
    // 客户端资源构建
    return onReady
}