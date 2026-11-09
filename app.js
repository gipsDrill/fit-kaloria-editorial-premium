'use strict';
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!motion.matches&&'IntersectionObserver' in window){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
const toggle=document.querySelector('.menu-toggle'), menu=toggle&&document.getElementById(toggle.getAttribute('aria-controls')), backdrop=document.querySelector('.menu-backdrop');
function closeMenu(focus=false){if(!menu)return;menu.hidden=true;toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');if(backdrop)backdrop.hidden=true;if(focus)toggle.focus();}
if(toggle&&menu){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';if(open)closeMenu(true);else{menu.hidden=false;toggle.setAttribute('aria-expanded','true');if(backdrop){backdrop.hidden=false;document.body.classList.add('menu-open');}menu.querySelector('a')?.focus();}});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));backdrop?.addEventListener('click',()=>closeMenu(true));document.addEventListener('keydown',e=>{if(menu.hidden)return;if(e.key==='Escape')closeMenu(true);if(e.key==='Tab'&&backdrop){const links=[toggle,...menu.querySelectorAll('a,button')];const first=links[0],last=links[links.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});window.addEventListener('resize',()=>{if(!backdrop&&window.innerWidth>780)closeMenu()});}
document.querySelectorAll('.copy-email').forEach(btn=>btn.addEventListener('click',async()=>{const status=btn.nextElementSibling;try{await navigator.clipboard.writeText('karolina.wiaderek.dietetyk@gmail.com');status.textContent='Adres e-mail został skopiowany.';}catch{status.textContent='Zaznacz i skopiuj adres e-mail widoczny powyżej.';}}));
const slides=[...document.querySelectorAll('.hero-slide')],controls=[...document.querySelectorAll('[data-slide]')],pause=document.querySelector('.pause-slides');let active=0,paused=motion.matches,timer;
function showSlide(i){active=i;document.querySelector('.editorial-hero')?.classList.toggle('is-portrait',slides[i].classList.contains('portrait-slide'));slides.forEach((s,j)=>{s.classList.toggle('active',j===i);s.setAttribute('aria-hidden',String(j!==i))});controls.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));}
function stop(){clearInterval(timer)}
function start(){stop();if(!paused&&!document.hidden&&slides.length>1)timer=setInterval(()=>showSlide((active+1)%slides.length),4500)}
function pauseLabel(){if(pause){pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Wznów pokaz zdjęć':'Zatrzymaj pokaz zdjęć')}}
controls.forEach((b,i)=>b.addEventListener('click',()=>{showSlide(i);paused=true;stop();pauseLabel()}));pause?.addEventListener('click',()=>{paused=!paused;pauseLabel();start()});motion.addEventListener('change',e=>{if(e.matches){paused=true;pauseLabel();stop();document.documentElement.classList.remove('js-motion')}});document.addEventListener('visibilitychange',start);pauseLabel();start();

// Keep the adjacent service photograph in sync with the expanded item.
const serviceAssets=[{"src":"consultation-premium.jpg","alt":"Ilustracja konsultacji dietetycznej i wspólnego omawiania nawyków","width":1400,"height":933},{"src":"weight.jpg","alt":"Jabłko, miarka i waga — ilustracja redukcji masy ciała"},{"src":"clinical-premium.jpg","alt":"Ilustracja analizy żywieniowej z wykresami i świeżymi produktami","width":1400,"height":933},{"src":"mealplan.jpg","alt":"Przykładowe kompozycje posiłków w szklanych pojemnikach"},{"src":"online-purple.jpg","alt":"Ilustracja konsultacji online z portretem Karoliny w fioletowym garniturze"},{"src":"habits-tracker.jpg","alt":"Dzienniczek obserwacji nawyków: woda, posiłki i warzywa"}];
const serviceRows=[...document.querySelectorAll('.service-row')];
const servicePreview=document.getElementById('service-preview');
let serviceImageRequest=0;
function updateServicePhoto(index){
 if(!servicePreview)return;
 const asset=serviceAssets[index],request=++serviceImageRequest;
 const loaded=new Image();
 loaded.onload=()=>{
  if(request!==serviceImageRequest)return;
  servicePreview.getAnimations().forEach(animation=>animation.cancel());
  servicePreview.src=asset.src;servicePreview.alt=asset.alt;
  servicePreview.width=asset.width||(asset.portrait?2048:1200);servicePreview.height=asset.height||(asset.portrait?2048:800);
  servicePreview.dataset.portrait=String(!!asset.portrait);
  if(!motion.matches&&typeof servicePreview.animate==='function')servicePreview.animate([{opacity:.25},{opacity:1}],{duration:420,easing:'ease-out'});
 };
 loaded.src=asset.src;
}
serviceRows.forEach((row,index)=>row.addEventListener('toggle',()=>{
 if(!row.open)return;
 serviceRows.forEach(other=>{if(other!==row)other.open=false});
 updateServicePhoto(index);
}));

const persistentHeader=document.querySelector('.editorial-header');
if(persistentHeader){let pending=false;const updateHeader=()=>{persistentHeader.classList.toggle('is-scrolled',window.scrollY>45);pending=false;};updateHeader();window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(updateHeader);}},{passive:true});}
