// node版本需大于8.5版本 
import {name,age } from './module.mjs'

console.log(name,age);

import fs from 'fs'

fs.writeFileSync('./foo.txt','es module working')

// import _ from  'lodash'
// console.log(_.camelCase('ES module'));


// import {camelCase} from 'lodash' // 不能使用这种方式载入第三方模块
import { writeFileSync } from 'fs'

