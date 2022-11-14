/**
 * @param {string} a 选择器表达式
 * @param {string} b 选择器表达式
 * @return {number} 返回权重差
 */
function compare(a, b) {
  let priority_a = 0;
  let priority_b = 0;

  priority_a = analysis(a)
  priority_b = analysis(b)
  console.log( priority_a-priority_b);
  return priority_a - priority_b;
}

function analysis(string) {
  let priority = 0
  const selectArr = string.split(' ')
  selectArr.forEach(item => {
    if (item === '+' || item === '>') {
    } else if (item.startsWith('#')) {
      priority += 1000
    } else if (item.startsWith('.')) {
     if (/^.[a-zA-Z]+$/.test(item)||(item.indexOf('::')===-1&&item.indexOf(':'!==-1))) {
      console.log(item);  
      priority += 100
      } else {
        priority += 10
      }
    } else if (item.indexOf('::') !== -1 || [':', '[', '::'].findIndex(f => item.indexOf(f) !== -1) === -1) {
      priority += 10
    } else if (item.indexOf('[') !== -1 && item.indexOf(']') !== -1 || item.indexOf(':') !== -1 && !item.indexOf('::') !== -1) {
      priority += 100
    }

  })
  return priority
}

// 验证用例：
compare('#container > .element', 'body > .element')// === 990;
compare('body', '.element') //=== -90;
compare('.element + .element::last-child', '.element:hover') //=== 10;
compare('input[type=text]', 'li:hover')// === 0;

