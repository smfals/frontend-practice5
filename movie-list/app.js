const nameInput = document.querySelector('#name-input');
const authorInput = document.querySelector('#author-input');
const addBtn = document.querySelector('#add-btn');
const errEl = document.querySelector('#err');
const listEl = document.querySelector('#list');

// ✅第3阶段改动1：启动时从localStorage读取，没有存档则为空数组
let movies = JSON.parse(localStorage.getItem('movies') || '[]');

// ✅第3阶段改动2：新增save保存函数
const save = () => localStorage.setItem('movies', JSON.stringify(movies));

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

  if(name.length <3){
    errEl.textContent = '电影名称至少3个字！';
    return;
  }

  movies.push({name, author});
  save(); // ✅第3阶段改动3：新增后保存
  nameInput.value='';
  authorInput.value='';
  render();
}

listEl.onclick = e=>{
  const i = Number(e.target.dataset.i);
  if(isNaN(i)) return;

  if(e.target.classList.contains('del')){
    movies.splice(i,1);
    save(); // ✅第3阶段改动4：删除后保存
    render();
  }else if(e.target.classList.contains('edit')){
    const newName = prompt("修改电影名称", movies[i].name);
    if(newName && newName.trim().length>=3){
      movies[i].name = newName.trim();
      save(); // ✅第3阶段改动5：编辑后保存
      render();
    }
  }
}

render();