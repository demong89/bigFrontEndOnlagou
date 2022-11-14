//Plop 入口文件，需要导出一个函数 接受一个plop对象 ，用于创建生成器任务

module.exports = plop =>{
    plop.setGenerator('component',{
        description:'create a component',
        prompts:[
            {
                type:'input',
                name:'name',
                message:'componet name',
                default:'MyComponent'
            }
        ],
        actions:[
            {
                type:'add',//添加文件
                path:'src/com/{{name}}//{{name}}.vue',
                templateFile:'plop-templates/components.hbs'
            }
        ]
    })
}