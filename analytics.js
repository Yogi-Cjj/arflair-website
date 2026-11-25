(()=>{
  if(window.arflairAnalyticsReady)return;
  window.arflairAnalyticsReady=true;
  const measurementId='G-WD5BTEHC5Y';
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
  function cleanUrl(value){
    try{const parsed=new URL(value,location.href);return parsed.origin+parsed.pathname}catch{return ''}
  }
  const pageLocation=cleanUrl(location.href);
  window.gtag('js',new Date());
  window.gtag('config',measurementId,{
    page_location:pageLocation,
    page_referrer:document.referrer?cleanUrl(document.referrer):'',
    allow_google_signals:false,
    allow_ad_personalization_signals:false
  });
  const tag=document.createElement('script');
  tag.async=true;
  tag.src='https://www.googletagmanager.com/gtag/js?id='+measurementId;
  document.head.append(tag);
  function track(name,parameters={}){
    window.gtag('event',name,{send_to:measurementId,page_location:pageLocation,...parameters});
  }
  const formIds=new Set(['home-quote-form','product-quote-form','quote-request-form','inquiry-form']);
  const startedForms=new WeakSet();
  document.addEventListener('input',event=>{
    const form=event.target.form;
    if(!form||!formIds.has(form.id)||startedForms.has(form))return;
    startedForms.add(form);
    track('inquiry_start',{form_id:form.id});
  });
  document.addEventListener('submit',event=>{
    const form=event.target;
    if(!formIds.has(form.id)||!form.checkValidity())return;
    setTimeout(()=>{
      const previewId={
        'home-quote-form':'home-quote-ready',
        'product-quote-form':'product-quote-preview',
        'quote-request-form':'quote-ready'
      }[form.id];
      const preview=previewId?document.getElementById(previewId):null;
      const ready=preview?!preview.hidden:!!document.querySelector('#form-status a[href^="https://wa.me/"]');
      if(ready)track('inquiry_preview',{form_id:form.id});
    },0);
  },true);
  let quoteNavigationPending=false;
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');
    if(link){
      let target;
      try{target=new URL(link.href,location.href)}catch{return}
      const placement=link.closest('#product-quote-preview,#quote-ready,#home-quote-ready,#form-status')?'inquiry_preview':link.closest('header')?'header':link.closest('footer')?'footer':link.classList.contains('arflair-float')?'floating':'content';
      if((target.protocol==='https:'||target.protocol==='http:')&&['wa.me','api.whatsapp.com','web.whatsapp.com'].includes(target.hostname)){
        track('whatsapp_click',{placement});
      }else if(target.protocol==='mailto:'){
        track('email_click',{placement});
      }else if(target.origin===location.origin&&target.pathname==='/quote.html'){
        if(!link.hasAttribute('data-track-quote-navigation')||event.defaultPrevented||
          event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||
          (link.target&&link.target!=='_self')||link.hasAttribute('download')){
          track('quote_click',{placement});
          return;
        }
        event.preventDefault();
        if(quoteNavigationPending)return;
        quoteNavigationPending=true;
        let navigated=false;
        const navigate=()=>{
          if(navigated)return;
          navigated=true;
          quoteNavigationPending=false;
          clearTimeout(fallback);
          location.assign(target.href);
        };
        const fallback=setTimeout(navigate,300);
        track('quote_click',{placement,event_callback:navigate,event_timeout:300});
      }
      return;
    }
    if(event.target.closest('[data-inquiry]'))track('inquiry_open');
  },true);
  if(document.querySelector('.product-hero-title')){
    track('product_view',{product_slug:location.pathname.split('/').pop().replace(/\.html$/,'')});
  }
})();