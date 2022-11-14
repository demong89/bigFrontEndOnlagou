const commonConfig = require('./webpack.common')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')


module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'nosources-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // enable CSS Modules
                            modules: false,
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        usedExports: true,// 标记未引用代码
        minimize: true,//移除未使用代码
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
})