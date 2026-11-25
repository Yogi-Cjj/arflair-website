(()=>{if(document.getElementById('arflair-analytics'))return;const tag=document.createElement('script');tag.id='arflair-analytics';tag.async=true;tag.src='/analytics.js?v=20261125-whatsapp-en';document.head.append(tag)})();
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const params=new URLSearchParams(location.search);
const menu=document.querySelector('.shop-menu');
let openedByHover=false;
menu.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&!menu.open){openedByHover=true;menu.open=true}});
menu.querySelector('summary').addEventListener('click',e=>{if(e.detail>0&&openedByHover){e.preventDefault();openedByHover=false;menu.open=true}});
menu.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&!menu.contains(document.activeElement))menu.open=false});
menu.addEventListener('focusout',()=>setTimeout(()=>{if(!menu.contains(document.activeElement))menu.open=false},0));
menu.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.open=false;menu.querySelector('summary').focus()}});
document.addEventListener('click',e=>{if(!menu.contains(e.target))menu.open=false});
menu.querySelectorAll('a,button').forEach(el=>el.addEventListener('click',()=>{menu.open=false}));
document.querySelectorAll('[data-home-category]').forEach(a=>{a.href='index.html?category='+encodeURIComponent(a.dataset.homeCategory)+'#collection'});
const inquiry=document.querySelector('#inquiry');
function openInquiry(interest){const select=inquiry.querySelector('select');if(![...select.options].some(o=>o.value===interest))select.add(new Option(interest,interest));select.value=interest;document.querySelector('#form-status').textContent='';inquiry.showModal()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-inquiry]');if(b)openInquiry(b.dataset.inquiry)});
document.querySelectorAll('.close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
document.querySelector('#privacy').addEventListener('click',()=>document.querySelector('#privacy-dialog').showModal());
document.querySelector('#open-product-search').addEventListener('click',()=>{document.querySelector('#product-search-dialog').showModal();document.querySelector('#header-search-input').focus()});
document.querySelector('#header-search-form').addEventListener('submit',e=>{e.preventDefault();location.href='index.html?q='+encodeURIComponent(document.querySelector('#header-search-input').value.trim())+'#collection'});
document.querySelectorAll('[data-nav-dialog]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelector('#'+a.dataset.navDialog+'-dialog').showModal()}));
document.querySelectorAll('[data-view-season]').forEach(b=>b.addEventListener('click',()=>{location.href='index.html?season='+b.dataset.viewSeason+'#seasonal-showcase'}));
const inquiryForm=document.querySelector('#inquiry-form');
inquiryForm.querySelector('.form-intro').textContent='Prepare your project details, then review and send the message to our sales team in WhatsApp.';
inquiryForm.querySelector('button[type="submit"]').textContent='Prepare WhatsApp inquiry →';
function prepareWhatsAppInquiry(e){e.preventDefault();const data=new FormData(e.currentTarget);const brief='Hi ArFlair, I would like to discuss a project.\n\n'+[...data].map(([key,value])=>key.toUpperCase()+': '+String(value).trim()).join('\n')+'\n\nPlease advise on quotation and sample options.';const link=document.createElement('a');link.href='https://api.whatsapp.com/send/?phone=8618022093149&type=phone_number&app_absent=0&lang=en&text='+encodeURIComponent(brief);link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open WhatsApp →';const status=document.querySelector('#form-status');status.replaceChildren('Your message is ready. ',link,' Review it in WhatsApp and tap Send.');}
inquiryForm.addEventListener('submit',prepareWhatsAppInquiry);
const grid=document.querySelector('#journal-grid');
if(grid){
 const input=document.querySelector('#journal-search'),filters=[...document.querySelectorAll('[data-journal-category]')],count=document.querySelector('#journal-count'),pagination=document.querySelector('#journal-pagination');
 let stories=[],category=params.get('category')||'All stories',search=params.get('q')||'',page=Math.max(1,Number(params.get('page'))||1);
 if(!filters.some(b=>b.dataset.journalCategory===category))category='All stories';
 input.value=search;
 function draw(){
  const term=search.trim().toLowerCase();
  const filtered=stories.filter(p=>(category==='All stories'||p.category===category)&&(!term||(p.title+' '+p.intro+' '+p.category).toLowerCase().includes(term)));
  const pages=1;page=1;
  filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.journalCategory===category)));
  count.textContent=filtered.length+' '+(filtered.length===1?'story':'stories');
  const selected=filtered;
  grid.innerHTML=selected.length?selected.map(p=>`<article class="journal-card"><a class="journal-card-image" href="journal/${p.slug}.html" aria-label="Read ${escapeHTML(p.title)}"><img src="assets/${p.image}" alt="${escapeHTML(p.alt)}" loading="lazy"></a><div class="journal-card-copy"><p class="card-category">${escapeHTML(p.category)} <span>· ${p.minutes} min read</span></p><h3><a href="journal/${p.slug}.html">${escapeHTML(p.title)}</a></h3><p class="card-excerpt">${escapeHTML(p.intro)}</p><a class="journal-read" href="journal/${p.slug}.html">Read the story <span>↗</span></a></div></article>`).join(''):`<div class="journal-empty"><h3>No stories found.</h3><p>Try another topic or explore all our guides.</p><button class="button primary" id="reset-journal">Show all stories</button></div>`;
  pagination.innerHTML=pages>1?`<button data-page="${page-1}" ${page===1?'disabled':''} aria-label="Previous page">← Previous</button>`+Array.from({length:pages},(_,i)=>`<button data-page="${i+1}" ${page===i+1?'aria-current="page"':''} aria-label="Page ${i+1}">${i+1}</button>`).join('')+`<button data-page="${page+1}" ${page===pages?'disabled':''} aria-label="Next page">Next →</button>`:'';
  pagination.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>{page=Number(b.dataset.page);draw();document.querySelector('.library-top').scrollIntoView({behavior:'smooth',block:'start'})}));
  const reset=document.querySelector('#reset-journal');if(reset)reset.onclick=()=>{category='All stories';search='';input.value='';page=1;draw()};
  const state=new URLSearchParams();if(category!=='All stories')state.set('category',category);if(search)state.set('q',search);if(page>1)state.set('page',page);history.replaceState(null,'',location.pathname+(state.size?'?'+state.toString():'')+location.hash);
 }
 filters.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.journalCategory;page=1;draw()}));
 input.addEventListener('input',()=>{search=input.value;page=1;draw()});
 const embeddedData=document.querySelector('#journal-data');
 if(embeddedData){try{stories=JSON.parse(embeddedData.textContent);draw()}catch{count.textContent='Browse all articles below.'}}
 else fetch('blog-data.json?v=static-library-20261124').then(response=>{if(!response.ok)throw new Error('Could not load journal');return response.json()}).then(data=>{stories=data;draw()}).catch(()=>{count.textContent='Browse the available articles below.'});
}
