const nameInput = document.querySelector('#name-input');
const authorInput = document.querySelector('#author-input');
const addBtn = document.querySelector('#add-btn');
const errEl = document.querySelector('#err');
const listEl = document.querySelector('#list');

let movies = [];

function render(){
  listEl.innerHTML = '';
  movies.forEach((m, idx)=>{
    const div = document.createElement('div');
    div.className = 'movie-item';
    div.innerHTML = `
      <div>名称：${m.name}</div>
      <div>导演：${m.author}</div>
      <button data-i="${idx}" class="edit">编辑</button>
      <button data-i="${idx}" class="del">删除</button>
    `;
    listEl.appendChild(div);
  })
}

addBtn.onclick = ()=>{
  const name = nameInput.value.trim();
  const author = authorInput.value.trim();
  errEl.textContent = '';

  // ✅输入校验：名称至少3个字符，红色提示（满足检查点6）
  if(name.length <3){
    errEl.textContent = '电影名称至少3个字！';
    return;
  }

  movies.push({name, author});
  nameInput.value='';
  authorInput.value='';
  render();
}

// ✅事件委托：父元素listEl统一处理编辑删除按钮（自主研究任务：事件委托）
listEl.onclick = e=>{
  const i = Number(e.target.dataset.i);
  if(isNaN(i)) return;

  if(e.target.classList.contains('del')){
    // 删除：splice删掉数组第i项
    movies.splice(i,1);
    render();
  }else if(e.target.classList.contains('edit')){
    const newName = prompt("修改电影名称", movies[i].name);
    if(newName && newName.trim().length>=3){
      movies[i].name = newName.trim();
      render();
    }
  }
}

render();