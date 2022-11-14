const data = [{
  id: 'node1',
  type: 'div',
  className: 'section1',
  children: [{
    id: 'node2',
    type: 'div',
    className: 'text',
    children: [{
      id: 'node3',
      type: 'span',
      content: '说明文字',
      onClick: () => {
        console.log(123)
      }
    }, {
      id: 'node4',
      type: 'i',
      className: 'icon-font-example'
    }]
  }]
}, {
  id: 'node5',
  type: 'div',
  className: 'section1',
  children: [{
    id: 'node6',
    type: 'input',
    className: 'custom-input'
  }]
}]

// result
{/* <div id="node1" class="section1">
    <div id="node2" class="text">
        <span id="node3">说明文字</span>
        <i id="node4" class="icon-font-example"></i>
    </div>
</div>
<div id="node5" class="section2">
    <input id="node6" class="custom-input" />
</div> */}


function renderTree(data) {
  let tree;

  // aa(data)
  // console.log(aa(data));
  tree =  aa(data)
  return tree;
}

const aa = (arr) => {
  const arr1 = arr.map(item => {
    let id = '', className = '';
    if (!item.type) throw new Error('no Types')
    if (item.id) id = `id="${item.id}"`
    if (item.className) className = `class="${item.className}"`
    if(item.children){
      return `<${item.type} ${id} ${className}>${aa(item.children)}</${item.type}>`
    }
    return `<${item.type} ${id} ${className}>${item.content ? item.content : ''}</${item.type}>`
  })
  return arr1.join('')
}


const app = document.querySelector('app')
console.log(document.getElementById('#app'));
// console.log(renderTree(data));
let renderData = renderTree(data)
console.log(renderData,app);
app.innerHTML = renderData