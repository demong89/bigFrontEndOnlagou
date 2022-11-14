const  commonConfig =  require('./webpack.common')
const merge = require('webpack-merge')

const path = require('path')


module.exports = merge(commonConfig,{
    mode:'development',
    devtool:'cheap-module-eval-source-map',
    module:{
        rules:[
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: 'eslint-loader',
                enforce:'pre'
              },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        // open: true,
        hot: true
    }
})