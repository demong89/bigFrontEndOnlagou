const times = 20;

let html = "";

for (let i = 0; i < times; i++) {
  html = `<div class='cs${i}'>${i}${html}</div>`;
}

document.body.innerHTML += html;

let queue = []; //  创建缓存样式的数组

let microTask; // 执行修改样式的微任务

const st = (style) => {
  // 合并样式
  // const style = queue.reduce((acc, cur) => ({ ...acc, ...cur }), {});
  for (let i = 0; i < times; i++) {
    const div = document.querySelector(`.cs${i}`);
    console.log("style:", style);
    for (let prop in style) {
      div.style[prop] = style[prop];
    }
  }

  console.log("x", style);

  // queue = [];

  microTask = null;
};

const setStyle = (style) => {
  // queue.push(style);
  st(style);
  // 创建微任务
  // if (!microTask) microTask = Promise.resolve().then(()=>st());
};

for (let i = 0; i < times; i++) {
  const style = {
    fontSize: (i % 12) + 12 + "px",
    color: i % 2 ? "red" : "green",
    margin: (i % 12) + 12 + "px",
  };

  const div = document.querySelector(`.cs${i}`);
  console.log("style:", style);
  for (let prop in style) {
    div.style[prop] = style[prop];
  }

  // setStyle(style);
}
