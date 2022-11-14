const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const server = express()

const  setupDevServer = require('./build/setup-dev-server')
server.use('/dist', express.static('./dist'))
// const renderer = require('vue-server-renderer').createRenderer()




const isProd = process.env.NODE_ENV === 'production'
let renderer
let onReady 
if (isProd) {
    const serverBunlder = require('./dist/vue-ssr-server-bundle.json')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = require('vue-server-renderer').createBundleRenderer(serverBunlder, {
        template: fs.readFileSync('./index.template.html', 'utf-8'),
        clientManifest
    })
} else {
    // 开发模式--监视打包构建 重新生成Renderer渲染器
    onReady = setupDevServer(server, (serverBunlder, clientManifest) => {
        renderer = require('vue-server-renderer').createBundleRenderer(serverBunlder, {
            template: fs.readFileSync('./index.template.html', 'utf-8'),
            clientManifest
        })
    })
}



// const app = new Vue({
//     template: `
//     <div id='app'>
//         <h1>{{message}}</h1>
//     </div>`,
//     data: {
//         message: 'hahaha'
//     }

// })

const render = (req, res) => {
    renderer.renderToString({
        title: '我的',
        meta: `<meta name='description' content='ddd'></meta>`
    }, (err, html) => {
        if (err) return res.status(500).end('Internet server Error')
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        res.end(html)
    })
}

server.get('/', isProd ? render : async (req, res) => {
    // 等待有渲染器以后 
    await onReady
    render(req, res)
})

server.listen(3000, () => {
    console.log('server running on port 3000');
})