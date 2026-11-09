
// Native, verified Facebook video embeds. No scraping, tokens or background sync.
(()=>{
 const items=[...document.querySelectorAll('.fb-post-video')];
 const allowed=new Set(['1071474369213543','1094443916688878','1142449098470374']);
 const mount=item=>{
   const host=item.querySelector('.fb-post-player');
   if(!item.open){host.replaceChildren();delete host.dataset.width;return;}
   const video=new URL(item.dataset.video);const match=video.pathname.match(/^\/reel\/(\d+)\/$/);
   if(video.origin!=='https://www.facebook.com'||!match||!allowed.has(match[1]))return;
   const width=Math.floor(host.getBoundingClientRect().width);if(width<180)return;
   if(host.dataset.width===String(width))return;
   const height=Math.round(width*476/267);
   const url=new URL('https://www.facebook.com/plugins/video.php');
   url.search=new URLSearchParams({href:video.href,show_text:'false',width:String(width),height:String(height),t:'0'}).toString();
   const frame=document.createElement('iframe');frame.src=url.href;frame.title=item.dataset.title+' — wpis Fit Kaloria na Facebooku';frame.width=String(width);frame.height=String(height);frame.allow='encrypted-media; picture-in-picture; web-share';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';host.dataset.width=String(width);host.replaceChildren(frame);
 };
 items.forEach(item=>{item.addEventListener('toggle',()=>{if(item.open)items.forEach(other=>{if(other!==item){other.open=false;mount(other);}});mount(item);});mount(item);});
 let timer;window.addEventListener('resize',()=>{clearTimeout(timer);timer=setTimeout(()=>items.filter(x=>x.open).forEach(mount),240);});
})();
