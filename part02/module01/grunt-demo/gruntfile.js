/**
 * grunt 的入口文件
 * 用于定义一些需要grunt自动执行的任务
 * 需要导出一个函数 此函数有一个grunt参数，
 * 内部提供一些创建任务时可以用的的API
 * 
 */
const sass = require('sass')

const loadGruntTasks = require('load-grunt-task')

module.exports = grunt =>{
    grunt.initConfig({
        babel:{
            options:{
                presets:['@babel/preset-env']
            },
            main:{
                files:{
                    'dist/js/app.js':'src/js/app.js'
                }
            }
        },
        watch:{
            js:{
                files:['src/js/*.js'],
                tasks:['babel']
            },
            css:{
                files:['src/scss/*.scss'],
                tasks:['sass']
            }
        }
    })
    loadGruntTasks(grunt)

    // grunt.initConfig({
    //     sass:{
    //         options:{
    //             sourceMap:true,
    //             implementation:sass
    //         },
    //         main:{
    //             files:{
    //                 'dist/css/main.css':'src/scss/main.scss'
    //             }
    //         }
    //     }
    // })
    // grunt.loadNpmTasks('grunt-sass')


    grunt.registerTask('foo',()=>{
        console.log('hello grunt');
        
    })
    grunt.registerTask('bar','任务描述',()=>{
        console.log('hello grunt bar');
        
    })
    // grunt.registerTask('default',()=>{
    //     console.log('默认任务');
    // })

    // grunt.registerTask('default',['foo','bar'])

    // 异步任务
    grunt.registerTask('async-task',function(){
        const done = this.async();
        setTimeout(()=>{
            console.log('async task');
            done()
        },1000)
    })

    // 任务失败
    grunt.registerTask('bad',()=>{
        console.log('任务失败');
        return false
    })
    // 任务失败后的任务列表不执行  可以用过--force命令强制执行
    grunt.registerTask('default',['foo','bad','bar'])
    // 异步任务失败
    grunt.registerTask('async-bad',function(){
        const done = this.async();
        setTimeout(()=>{
            console.log('async bad');
            done(false)
        },1000)
    })

    // 配置方法
    // grunt.initConfig({
    //     foo:'bar'
    // })
    // grunt.registerTask('config',()=>{
    //     console.log(grunt.config('foo'));
        
    // })

    // 多目标任务 options不会当做子任务 而是配置 子任务的option会覆盖上层的options
    // grunt.initConfig({
    //     build:{
    //         options:{
    //             foo:'foo'
    //         },
    //         js:1,
    //         css:{
    //             options:{
    //                 foo:'bar'
    //             }
    //         }
    //     }
    // })
    // grunt.registerMultiTask('build',function(){
    //     console.log(this.options());
    //     console.log(`target:${this.target},data:${this.data}`);
    // })

    // 插件的使用
    grunt.initConfig({
        clean:{
            // temp:'temp/app.js',
            // temp:'temp/*.js',
            temp:'temp/**'
        }
    })
    grunt.loadNpmTasks('grunt-contrib-clean')

}