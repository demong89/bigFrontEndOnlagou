import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'


export default{
    // input:'src/index.js',
    // input:['src/index.js','src/album.js'],
    input:{
        foo:'src/index.js',
        bar:'src/album.js'
    },
    output:{
        dir:'dist',
        format:'cjs'

    },
    plugins:[
        json(),
        resolve(),
        commonjs()
    ]
}