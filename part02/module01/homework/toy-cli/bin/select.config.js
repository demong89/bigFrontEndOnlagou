module.exports.selectConfig = [
    {
        type:'input',
        name:'name',
        message:'your username or email:'
    },
    {
        type:'password',
        name:'password',
        message:'your password:'
    },
    {
        type:'confirm',
        name:'remeberpwd',
        message:'是否记住密码(Y/N):'
    },
    {
        type:'list',
        name:'sex',
        message:'选择性别:',
        choices:['男','女','未知'],
        filter:function(val){
            if(val==='男'){
                return 0
            }else if(val==='女'){
                return 1
            }else{
                return -1
            }
        }
    },
    {
        type:'checkbox',
        name:'rabbit',
        message:'选择爱好:',
        choices:[
            '爬山',
            '篮球',
            '足球',
            '羽毛球',
            '球球'
        ],
        // pageSize: 3// 设置行数
    }
]