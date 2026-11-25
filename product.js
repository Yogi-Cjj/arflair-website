const mainImage=document.querySelector('#gallery-main');
document.querySelectorAll('[data-gallery-image]').forEach(button=>button.addEventListener('click',()=>{mainImage.src=button.dataset.galleryImage;mainImage.alt=button.dataset.galleryAlt;document.querySelectorAll('[data-gallery-image]').forEach(item=>{const selected=item===button;item.classList.toggle('selected',selected);item.setAttribute('aria-pressed',String(selected))})}));
const imageViewer=document.querySelector('#product-image-viewer');
document.querySelector('#open-product-image').addEventListener('click',()=>{const image=imageViewer.querySelector('img');image.src=mainImage.src;image.alt=mainImage.alt;imageViewer.showModal()});
const productInquiry=document.querySelector('.product-inquiry-form');
productInquiry.addEventListener('submit',event=>{event.preventDefault();if(!productInquiry.reportValidity())return;const values=new FormData(productInquiry),query=new URLSearchParams();for(const key of ['interest','quantity','size']){const value=String(values.get(key)||'').trim();if(value)query.set(key,value)}location.href='quote.html?'+query.toString()});
const whatsapp=document.querySelector('.product-whatsapp');
function updateWhatsApp(){const data=new FormData(productInquiry);whatsapp.href='https://api.whatsapp.com/send/?phone=8618022093149&type=phone_number&app_absent=0&lang=en&text='+encodeURIComponent('Hi ArFlair, I would like to inquire about '+data.get('interest')+'.\nSize: '+(data.get('size')||'To be discussed'))}
productInquiry.addEventListener('input',updateWhatsApp);productInquiry.addEventListener('change',updateWhatsApp);updateWhatsApp();
imageViewer.querySelector('.close').addEventListener('click',()=>imageViewer.close());
imageViewer.addEventListener('click',event=>{if(event.target===imageViewer){const r=imageViewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)imageViewer.close()}});
