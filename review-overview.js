
document.querySelectorAll('[data-review-source]').forEach(group=>{
 const slides=[...group.querySelectorAll('[data-review-slide]')];
 const previous=group.querySelector('[data-review-previous]');
 const next=group.querySelector('[data-review-next]');
 const status=group.querySelector('[data-review-position]');
 let current=0;
 const show=index=>{
  current=Math.max(0,Math.min(slides.length-1,index));
  slides.forEach((slide,i)=>{
   const active=i===current;
   slide.dataset.active=String(active);
   slide.setAttribute('aria-hidden',String(!active));
   slide.inert=!active;
  });
  previous.disabled=current===0;
  next.disabled=current===slides.length-1;
  status.textContent=(current+1)+' / '+slides.length;
 };
 previous.addEventListener('click',()=>show(current-1));
 next.addEventListener('click',()=>show(current+1));
 show(0);
});
