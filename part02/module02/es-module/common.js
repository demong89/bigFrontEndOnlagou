// module.exports = {
//     foo:"commonjs exports"
// }


exports.foo = 'commonjs exports'

const mod = require('./05-esm-common.mjs')// node 原生环境不允许这种导入