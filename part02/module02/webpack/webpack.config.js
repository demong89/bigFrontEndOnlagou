const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


class MyPlugin {
    apply(compiler) {
        console.log('自定义插件');
        compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation  -->此次打包的上下文
            for (const key in compilation.assets) {
                //    console.log(key);
                //    console.log(compilation.assets[key].source());
                if (key.endsWith('.js')) {
                    const content = compilation.assets[key].source();
                    const withOutComment = content.replace(/\/\*\*+\*\//g,'')
                    compilation.assets[key] = {
                        source:()=>withOutComment,
                        size:()=>withOutComment.length
                    }
                }
            }
        })
    }
}

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    // entry:{
    //     index:'src/index.js',
    //     album:'src/album.js'
    // },
    // output: {
    //     filename: '[name].[hash].js',
    //     path: path.join(__dirname, 'output'),// 必须是绝对路径
    // },
    devServer:{
        hot:true,
        contentBase:'src',
        proxy:{
            '/api':{
                target:'https://api.github.com',
                pathRewrite:{
                    '^/api':''
                },
                changeOrigin:true
            }
        }
    },
    devtool:"source-map",
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output'),// 必须是绝对路径
        // publicPath: 'output/'
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                // 直接使用相对路径
                use: ['html-loader', './markdown-loader']
            },
            // {
            //     test: /\.html$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attributes: {
            //                 list: [
            //                     {
            //                         tag: 'img',
            //                         attribute: 'src',
            //                         type: 'src',
            //                     },
            //                     {
            //                         tag: 'a',
            //                         attribute: 'href',
            //                         type: 'src',
            //                     }
            //                 ]
            //             }
            //         }
            //     }
            // },
            {
                test: /\.js$/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env',{modules:false}]]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024
                    }
                }
            }
        ]
    },
    optimization:{
        usedExports:true,// 标记未引用代码
        minimize:true,//移除未使用代码
        concatenateModules:true,//尽可能合并模块
        sideEffects:true,//副作用
        splitChunks:{
            chunks:'all'
        },
        minimizer:[
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '标题',
            meta: {
                viewport: 'width=device-width'
            },
            template: './index.html',
            // chunks:['index']
        }),
        new CopyWebpackPlugin({
            patterns: [
                'src/1.png'
            ],
        }),
        new MyPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            API_BASE_URL:'"http://exmple.com"'
        }),
        new MiniCssExtractPlugin(),
    ]
}