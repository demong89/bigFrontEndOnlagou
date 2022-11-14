/**  此文件作为generator的核心入口 
* 需要导出一个继承自Yeoman Generator的类型
* Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
* 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，如文件写入
*/

const Generator = require('yeoman-generator')

module.exports = class extends Generator{
    // Yeoman在询问用户环节会自动调用该方法
    // 该方法中可以调用父类的prompt方法发出对用户的命令行询问
    prompting(){
        return this.prompt([
            {
                type:'input',
                name:'name',
                message:'your project name',
                default:this.appname // appname 为项目生成目录名称
            }
        ]).then(answers=>{
            // 用户输入
            this.answers = answers;
        })
    }
    writing(){
        // this.fs.write(this.destinationPath('temp.txt'),Math.random().toString())

        // 通过模板的方式写入文件到目标目录
        const tmpl = this.templatePath('bar.txt')
        const output = this.destinationPath('bar.txt')
        // const context = {title:'模板文件名称',success:false}
        const context = this.answers;
        this.fs.copyTpl(tmpl,output,context)
    }
}


