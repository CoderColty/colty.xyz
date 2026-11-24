document.querySelectorAll('.icon').forEach(icon=>{ icon.addEventListener('dblclick',()=>openIcon(icon.dataset.window)); });
function openIcon(type){
  if(type==='info'){ desktop.addWindow(new Window('About Colty', `\n      <h2>Colty</h2><hr>\n      <div class='links'>\n        <a href='' target='_blank'>Email</a>\n        <a href='' target='_blank'>GitHub</a>\n        <a href='' target='_blank'>LinkedIn</a>\n        <a href='' target='_blank'>Instagram</a>\n      </div><footer>© 2025 Colty.xyz</footer>\n    `,140,80)); }
  if(type==='email'){ desktop.addWindow(new Window('Email', `<p>Contact:</p><div class='links'><a href='mailto:'>you@colty.xyz</a></div>`,180,120)); }
  if(type==='github'){ desktop.addWindow(new Window('GitHub', `<p>GitHub placeholder</p><iframe src='' width='100%' height='220'></iframe>`,220,160)); }
  if(type==='linkedin'){ desktop.addWindow(new Window('LinkedIn', `<p>LinkedIn placeholder</p><iframe src='' width='100%' height='220'></iframe>`,240,180)); }
  if(type==='instagram'){ desktop.addWindow(new Window('Instagram', `<p>Instagram placeholder</p><iframe src='' width='100%' height='220'></iframe>`,260,200)); }
  if(type==='notes'){
    desktop.addWindow(new Window('Notes', `<textarea class="note" id="notesArea" placeholder="Type notes here..."></textarea><div><button id="saveNotes">Save</button></div>`,300,120));
    setTimeout(()=>{ const ta = document.getElementById('notesArea'); const btn = document.getElementById('saveNotes'); if(ta){ ta.value = localStorage.getItem('colty_notes')||''; btn.addEventListener('click', ()=>{ localStorage.setItem('colty_notes', ta.value); btn.textContent='Saved'; setTimeout(()=>btn.textContent='Save',900); }); } },50);
  }
  if(type==='tools'){ desktop.addWindow(new Window('Tools', `<p>Tools placeholder - add utilities here.</p>`,320,140)); }
  if(type==='planner'){
    desktop.addWindow(new Window('Planner', `\n      <div class="task-list" id="taskList" contenteditable="true" placeholder="Type tasks..."></div>\n      <div style="margin-top:8px"><button id="saveTasks">Save Tasks</button></div>\n    `,340,160));
    setTimeout(()=>{ const t = document.getElementById('taskList'); const b = document.getElementById('saveTasks'); if(t){ t.innerHTML = localStorage.getItem('colty_tasks')||'<p>- Example task</p>'; b.addEventListener('click', ()=>{ localStorage.setItem('colty_tasks', t.innerHTML); b.textContent='Saved'; setTimeout(()=>b.textContent='Save Tasks',900); }); } },50);
  }
}
