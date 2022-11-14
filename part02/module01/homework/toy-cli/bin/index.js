#! /usr/bin/env node 

// console.log('toy cli 入口文件');
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

// 命令行询问配置项
const {selectConfig} = require('./select.config') 

inquirer.prompt(selectConfig).then(answer => {
    const tmpl = path.join(process.cwd(),'template');
    const dist = process.cwd()
   
    fs.readdir(tmpl,(err,files)=>{
        if(err) throw err;
        files.forEach(file=>{
            // console.log(path.join(tmpl,file));
            ejs.renderFile(path.join(tmpl,file),answer,(renderErr,res)=>{
                if(renderErr) throw renderErr;
                let sonDir = path.join(dist,'dist')
                fs.mkdir(sonDir, {recursive: true}, (err) => {
                    if (err) throw err;
                    fs.writeFileSync(path.join(sonDir,file), res);
                });
            })
        })
    })
})