const factoryDialog=document.querySelector('#factory-film-dialog'),factoryFilm=document.querySelector('#factory-film'),factoryPreview=document.querySelector('#factory-preview');
const watchFactory=document.querySelector('#watch-factory-film');
if(watchFactory?.tagName==='BUTTON')watchFactory.addEventListener('click',()=>{factoryPreview.pause();factoryDialog.showModal();factoryFilm.play().catch(()=>{})});
factoryDialog.addEventListener('close',()=>factoryFilm.pause());
factoryPreview.addEventListener('play',()=>factoryFilm.pause());
factoryDialog.querySelector('.close').addEventListener('click',()=>factoryDialog.close());
factoryDialog.addEventListener('click',event=>{if(event.target===factoryDialog){const r=factoryDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)factoryDialog.close()}});
