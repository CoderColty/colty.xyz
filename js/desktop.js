class Desktop {
  constructor(el){
    this.el = el;
    this.windows = [];
    this.taskbarEl = document.getElementById('taskbar-items');
    this.zTop = 100;
  }
  addWindow(win){
    this.windows.push(win);
    this.el.appendChild(win.el);
    const btn = document.createElement('div');
    btn.className='taskbar-item';
    btn.textContent = win.title;
    this.taskbarEl.appendChild(btn);
    win.taskbarBtn = btn;
    btn.addEventListener('click',()=>{
      if(win.minimized) win.restore(); else win.minimize();
    });
    win.el.addEventListener('mousedown',()=>this.focus(win));
    this.focus(win);
  }
  focus(win){
    this.windows.forEach(w=>w.el.style.zIndex='');
    win.el.style.zIndex = ++this.zTop;
    this.windows.forEach(w=>w.taskbarBtn && w.taskbarBtn.classList.remove('active'));
    win.taskbarBtn && win.taskbarBtn.classList.add('active');
  }
}
class Window {
  constructor(title,html,x=120,y=80){
    this.title=title;this.html=html;this.x=x;this.y=y;this.minimized=false;this.maximized=false;this.create();
  }
  create(){
    this.el = document.createElement('div');
    this.el.className='window';
    this.el.style.left = this.x+'px';
    this.el.style.top = this.y+'px';
    this.el.innerHTML = `\n      <div class='title-bar'><span>${this.title}</span><div class='btns'>\n        <div class='title-button' data-action='min'>_</div>\n        <div class='title-button' data-action='max'>▢</div>\n        <div class='title-button' data-action='close'>X</div>\n      </div></div>\n      <div class='window-body'>${this.html}</div>`;
    this.bind();
  }
  bind(){
    this.el.querySelector('[data-action=min]').addEventListener('click',()=>this.minimize());
    this.el.querySelector('[data-action=max]').addEventListener('click',()=>this.toggleMax());
    this.el.querySelector('[data-action=close]').addEventListener('click',()=>this.close());
    const title = this.el.querySelector('.title-bar');
    let down=false,ox=0,oy=0;
    title.addEventListener('mousedown',(e)=>{ if(this.maximized) return; down=true; ox=e.clientX - this.el.offsetLeft; oy=e.clientY - this.el.offsetTop; desktop.focus(this); });
    document.addEventListener('mouseup',()=>down=false);
    document.addEventListener('mousemove',(e)=>{ if(!down) return; this.el.style.left=(e.clientX-ox)+'px'; this.el.style.top=(e.clientY-oy)+'px'; });
  }
  minimize(){ if(this.minimized){ this.el.style.display='block'; this.minimized=false; this.taskbarBtn.classList.add('active'); } else { this.el.style.display='none'; this.minimized=true; this.taskbarBtn.classList.remove('active'); } }
  restore(){ this.el.style.display='block'; this.minimized=false; this.taskbarBtn.classList.add('active'); }
  toggleMax(){ if(!this.maximized){ this._prev={left:this.el.style.left,top:this.el.style.top,width:this.el.style.width,height:this.el.style.height}; Object.assign(this.el.style,{left:'0px',top:'0px',width:'100vw',height:'calc(100vh - 34px)'}); } else { Object.assign(this.el.style,this._prev); } this.maximized=!this.maximized; }
  close(){ this.el.remove(); this.taskbarBtn && this.taskbarBtn.remove(); }
}
