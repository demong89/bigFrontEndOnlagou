/**
 * @flow
 */


//  字面量类型
const a :'foo' = 'foo';
// 联合类型
const type:'success'|'warning'|'danger' = 'success'

const b :string | number = 100;

type StrORNum = string|number;
const c : StrORNum = 123;
// maybe类型 可以为空 ？
const gender : ?number = null 