import { createApp } from './app'

// 服务端启动入口
export default context => {
    const { app } = createApp()

    return app
}