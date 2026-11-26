(()=>{if(document.getElementById('arflair-analytics'))return;const tag=document.createElement('script');tag.id='arflair-analytics';tag.async=true;tag.src='/analytics.js?v=20261125-whatsapp-en';document.head.append(tag)})();
const quoteForm=document.querySelector('#quote-request-form');
const ready=document.querySelector('#quote-ready');
const fields=quoteForm.elements;
const productOptions=new URLSearchParams(location.search);

function quoteSourcePath(){
  if(productOptions.get('quote_source')==='plaster_guide'){
    return '/journal/wholesale-plaster-casting-powder.html';
  }
  if(!document.referrer)return location.pathname;
  const referrer=new URL(document.referrer);
  if(referrer.origin!==location.origin)return location.pathname;
  return /^\/(?:journal\/)?[a-z0-9-]+\.html$|^\/$/.test(referrer.pathname)
    ?referrer.pathname
    :location.pathname;
}
let references=[],preparedBrief='';
const fileInput=document.querySelector('#quote-files');
const fileList=document.querySelector('#quote-file-list');
const fileError=document.querySelector('#quote-file-error');
function refreshSummary(){document.querySelector('#summary-product').textContent=fields.product.value||'Not selected yet';document.querySelector('#summary-quantity').textContent=fields.quantity.value.trim()||'To be confirmed';document.querySelector('#summary-packaging').textContent=fields.packaging.value;}
quoteForm.addEventListener('input',refreshSummary);quoteForm.addEventListener('change',refreshSummary);
function renderFiles(){fileList.replaceChildren();references.forEach((file,index)=>{const li=document.createElement('li'),name=document.createElement('span'),remove=document.createElement('button');name.textContent=file.name+' · '+(file.size/1024/1024<.1?Math.ceil(file.size/1024)+' KB':(file.size/1024/1024).toFixed(1)+' MB');remove.type='button';remove.textContent='×';remove.setAttribute('aria-label','Remove '+file.name);remove.addEventListener('click',()=>{references.splice(index,1);renderFiles()});li.append(name,remove);fileList.append(li)});}
fileInput.addEventListener('change',()=>{const errors=[];for(const file of fileInput.files){if(!/\.(png|jpe?g|webp|pdf)$/i.test(file.name)){errors.push(file.name+': choose a PNG, JPG, WebP or PDF file.');continue}if(file.size>10*1024*1024){errors.push(file.name+': the maximum file size is 10 MB.');continue}if(references.some(f=>f.name===file.name&&f.size===file.size))continue;if(references.length>=5){errors.push('You can prepare up to 5 reference files.');continue}references.push(file)}fileError.textContent=errors.join(' ');fileInput.value='';renderFiles()});
quoteForm.addEventListener('submit',e=>{e.preventDefault();if(!quoteForm.reportValidity())return;const data=new FormData(quoteForm);const value=k=>String(data.get(k)||'').trim();const lines=["Hi ArFlair, I'd like to request a quote.",'Website inquiry: '+quoteSourcePath(),'','CONTACT','Name: '+value('name'),'Company / brand: '+(value('company')||'Not specified'),'Email: '+value('email'),'WhatsApp / phone: '+(value('phone')||'Not specified'),'Country / region: '+value('country'),'','PROJECT','Inquiry type: '+value('projecttype'),'Product: '+value('product'),'Estimated quantity: '+value('quantity'),'Packaging: '+value('packaging'),'Project stage: '+value('stage'),'Delivery destination: '+(value('destination')||'To be discussed'),'Target timeline: '+(value('timeline')||'To be discussed')];if(value('details'))lines.push('','Additional details:',value('details'));if(value('reference'))lines.push('','Reference link: '+value('reference'));if(references.length)lines.push('','Reference files to attach in chat:',...references.map(f=>'• '+f.name));if(data.has('confidentiality'))lines.push('','Please discuss confidentiality with me before I share design files.');lines.push('','Please advise on suitable products, quotation details and sample options.');preparedBrief=lines.join('\n');document.querySelector('#quote-brief-preview').value=preparedBrief;document.querySelector('#quote-whatsapp-link').href='https://api.whatsapp.com/send/?phone=8618022093149&type=phone_number&app_absent=0&lang=en&text='+encodeURIComponent(preparedBrief);document.querySelector('#quote-email-link').href='mailto:sales@arflairresin.com?subject='+encodeURIComponent('ArFlair quote request: '+(value('product')||'resin project'))+'&body='+encodeURIComponent(preparedBrief);document.querySelector('#quote-attachment-reminder').textContent=references.length?'Remember to attach '+references.length+' reference file'+(references.length===1?'':'s')+' in WhatsApp. Your files have not been uploaded.':'Your request has not been sent. Choose WhatsApp or email, then complete the send step.';quoteForm.hidden=true;ready.hidden=false;ready.focus();ready.scrollIntoView({behavior:'smooth',block:'start'});});
document.querySelector('#quote-edit').addEventListener('click',()=>{ready.hidden=true;quoteForm.hidden=false;fields.product.focus();document.querySelector('.quote-form-heading').scrollIntoView({behavior:'smooth',block:'start'})});
document.querySelector('#quote-download').addEventListener('click',()=>{if(!preparedBrief)return;const url=URL.createObjectURL(new Blob([preparedBrief],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='arflair-quote-request.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
const prefill=productOptions.get('interest');
if(prefill==='Private Label / OEM / ODM'){fields.projecttype.value='Private Label / OEM / ODM';fields.packaging.value='Private-label packaging';fields.details.required=true;document.querySelector('#quote-custom-required').hidden=false;fields.details.placeholder='Describe your private-label resin or DIY kit requirements, preferred pack sizes, labels, packaging artwork and kit contents…'}else if(prefill){const known=[...fields.product.options].find(o=>o.value.toLowerCase()===prefill.toLowerCase());if(known)fields.product.value=known.value;else{fields.product.value='Multiple Products / Custom Project';fields.details.value=prefill.slice(0,2500)}}
const requestedQuantity=productOptions.get('quantity');
if(requestedQuantity&&/^\d{1,9}$/.test(requestedQuantity)&&Number(requestedQuantity)>0)fields.quantity.value=requestedQuantity;
const requestedSize=(productOptions.get('size')||'').trim().slice(0,120);
if(requestedSize)fields.details.value+=(fields.details.value?'\n':'')+'Preferred size: '+requestedSize;
refreshSummary();
