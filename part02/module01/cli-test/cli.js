#! /usr/bin/env node 

// Node cli 应用入口文件必须有这样的文件头
// 如果是Linux或者macOS系统下还需要修改此文件的读写权限为 755
// 具体就是通过chmod 755 cli.js 修改

// console.log('cli working');

// 脚手架的工作过程

// 1、通过命令行交互询问用户问题
// 2、根据用户回答生成文件
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:'Project name ?'
    }
]).then(answer =>{
    console.log(answer);
    // 模板路径
    const temlDir = path.join(__dirname,'templates')
    // 输出路径
    const distDir = process.cwd();

    fs.readdir(temlDir,(err,files)=>{
        if(err) throw err;
        files.forEach(file=>{
            // 通过模板引擎渲染文件
            ejs.renderFile(path.join(temlDir,file),answer,(err,res)=>{
                if(err) throw err;
                fs.writeFileSync(path.join(distDir,file),res)
            })
        })
    })
})


