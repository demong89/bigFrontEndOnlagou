// console.log(require);// 加载模块函数
// console.log(module);// 模块对象
// console.log(exports); // 导出对象别名
// console.log(__filename);// 当前文件的绝对路径
// console.log(__dirname); // 当前文件所在目录

// console.log(import.meta.url)
import {fileURLToPath} from 'url'
import {dirname} from 'path'

// const __filename =  fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename)
// console.log(__filename,__dirname);
