(()=>{
const track=document.querySelector('#review-carousel');if(!track)return;
const cards=[...track.querySelectorAll('.client-review')];
const prev=document.querySelector('.review-prev'),next=document.querySelector('.review-next');
const step=()=>cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).columnGap||0);
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function update(){prev.disabled=track.scrollLeft<3;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-3;}
prev.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:reduced()?'instant':'smooth'}));
next.addEventListener('click',()=>track.scrollBy({left:step(),behavior:reduced()?'instant':'smooth'}));
track.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(track);
track.addEventListener('keydown',e=>{if(e.target!==track)return;if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();track.scrollBy({left:(e.key==='ArrowRight'?1:-1)*step(),behavior:reduced()?'instant':'smooth'});}});
let startX=0,startScroll=0,pointer=null,dragging=false;
track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;startX=e.clientX;startScroll=track.scrollLeft;pointer=e.pointerId;dragging=false;});
track.addEventListener('pointermove',e=>{if(pointer!==e.pointerId)return;const dx=e.clientX-startX;if(!dragging&&Math.abs(dx)>6){dragging=true;track.classList.add('dragging');track.setPointerCapture(pointer);}if(dragging){e.preventDefault();track.scrollLeft=startScroll-dx;}});
function end(e){if(pointer!==e.pointerId)return;const didDrag=dragging;pointer=null;dragging=false;track.classList.remove('dragging');if(didDrag)track.scrollTo({left:Math.round(track.scrollLeft/step())*step(),behavior:reduced()?'instant':'smooth'});update();}
track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);update();
})();
