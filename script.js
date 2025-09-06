const ding = new Audio('Ding.mp3');


function playDing() {
  ding.currentTime = 0;
  ding.play();
}

const errorAudio = new Audio('Error.mp3');
function playError() {
  errorAudio.currentTime = 0;
  errorAudio.play();
}

function openWin(id){
  playDing();
  const win = document.getElementById(id);
  win.style.display='block';
  let content = '';
  if(id === 'projects') {
    content = `
      <div style="text-align:center;padding:32px 0;">
        <div style="font-size:20px;font-weight:600;margin-bottom:18px;">Bombsweeper (Minesweeper)</div>
        <a href="https://bombsweeper.w3spaces.com/minesweeper.html" target="_blank" class="project-btn">Play Bombsweeper</a>
      </div>
    `;
  } else if(id === 'links') {
    content = `
      <div style='text-align:center;padding:32px 0;'>
        <a href="https://discord.gg/A8ccP4c27K" target="_blank" class="project-btn" style="background:linear-gradient(90deg,#5865F2 60%,#7289da 100%);margin-bottom:10px;">Join Discord Server</a>
      </div>
    `;
  } else {
    content = `This is ${id} content.`;
  }
  win.innerHTML = `<div class='window-header'>${id}<button onclick=\"this.parentElement.parentElement.style.display='none';playError();\">✖</button></div><div class='window-content'>${content}</div>`;
  win.className='window';
  win.style.top = (100 + Math.random()*200) + 'px';
  win.style.left = (100 + Math.random()*200) + 'px';
  makeDraggable(win);
  bringToFront(win);
}

function openSite(url){
  playDing();
  const newWin = document.createElement('div');
  newWin.className = 'window';
  newWin.style.display='block';
  newWin.style.top = (100 + Math.random()*200) + 'px';
  newWin.style.left = (100 + Math.random()*200) + 'px';
  newWin.innerHTML = `
    <div class="window-header">${url} <button class="close-btn" onclick="this.parentElement.parentElement.remove();playError();">✖</button></div>
    <div class="window-content">
      <iframe src="${url}" width="100%" height="300" style="border:none;"></iframe>
    </div>`;
  document.body.appendChild(newWin);
  makeDraggable(newWin);
  bringToFront(newWin);
}

function bringToFront(el){
  const maxZ = Math.max(...Array.from(document.querySelectorAll('.window')).map(e=>+e.style.zIndex||0));
  el.style.zIndex = maxZ+1;
}

function makeDraggable(win){
  const header = win.querySelector('.window-header');
  let offsetX, offsetY, dragging=false;
  header.addEventListener('mousedown', e=>{
    if(e.target.tagName==='BUTTON') return;
    dragging=true;
    offsetX=e.clientX - win.offsetLeft;
    offsetY=e.clientY - win.offsetTop;
    bringToFront(win);
  });
  document.addEventListener('mousemove', e=>{
    if(dragging){
      win.style.left = (e.clientX-offsetX)+"px";
      win.style.top = (e.clientY-offsetY)+"px";
    }
  });
  document.addEventListener('mouseup', ()=>dragging=false);
}

// Attach playDing to all .menu-item
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', playDing, {capture:true});
  });
});
