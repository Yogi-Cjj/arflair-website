(()=>{
const search=document.querySelector('#faq-search');
const groups=[...document.querySelectorAll('.faq-group')];
const categories=[...document.querySelectorAll('[data-faq-category]')];
const count=document.querySelector('#faq-count'),reset=document.querySelector('#faq-reset'),empty=document.querySelector('#faq-empty');
let selected='all';
function render(){
 const term=search.value.trim().toLowerCase();let total=0;
 groups.forEach(group=>{let matches=0;group.querySelectorAll('.faq-item').forEach(item=>{const visible=(selected==='all'||group.dataset.group===selected)&&(!term||item.textContent.toLowerCase().includes(term));item.hidden=!visible;if(visible){matches++;total++}if(term)item.open=visible;else item.open=false});group.hidden=!matches});
 categories.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.faqCategory===selected)));
 count.textContent=total+' '+(total===1?'answer':'answers')+(term?' matching “'+search.value.trim()+'”':' to explore');empty.hidden=total>0;reset.hidden=selected==='all'&&!term;
}
function clear(){selected='all';search.value='';render()}
categories.forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.faqCategory;render()}));
search.addEventListener('input',render);
reset.addEventListener('click',clear);document.querySelector('#faq-show-all').addEventListener('click',clear);
document.querySelectorAll('[data-search-term]').forEach(button=>button.addEventListener('click',()=>{selected='all';search.value=button.dataset.searchTerm;render();search.focus()}));
})();
