const nameInput = document.querySelector('#name-input');
const authorInput = document.querySelector('#author-input');
const addBtn = document.querySelector('#add-btn');
const errEl = document.querySelector('#err');
const listEl = document.querySelector('#list');

// 初始空数组，还没读localStorage
let movies = [];

// 渲染函数：先清空，遍历数组生成元素
function render(){
  listEl.innerHTML = '';
  movies.forEach((m, idx)=>{
    const div = document.createElement('div');
    div.className = 'movie-item';
    div.innerHTML = `
      <div>名称：${m.name}</div>
      <div>导演：${m.author}</div>
    `;
    listEl.appendChild(div);
  })
}

// 新增
addBtn.onclick = ()=>{
  const name = nameInput.value.trim();
  const author = authorInput.value.trim();
  errEl.textContent = '';

  movies.push({name, author});
  nameInput.value='';
  authorInput.value='';
  render();
}

render();