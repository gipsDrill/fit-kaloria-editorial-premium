
// Resize Facebook's documented fixed-width plugin when its container changes.
(()=>{const host=document.getElementById('facebook-timeline');if(!host)return;let width=0,timer;
 const render=()=>{const next=Math.min(500,Math.floor(host.getBoundingClientRect().width));if(next<180||next===width)return;width=next;
 const url=new URL('https://www.facebook.com/plugins/page.php');url.search=new URLSearchParams({href:host.dataset.page,tabs:'timeline',width:String(width),height:'760',small_header:'true',adapt_container_width:'true',hide_cover:'false',show_facepile:'false',locale:'pl_PL'}).toString();
 const frame=document.createElement('iframe');frame.src=url.toString();frame.title='Najnowsze posty Fit Kaloria na Facebooku';frame.width=String(width);frame.height='760';frame.loading='lazy';frame.allow='encrypted-media; picture-in-picture; web-share';frame.referrerPolicy='strict-origin-when-cross-origin';host.replaceChildren(frame);};
 render();if('ResizeObserver'in window)new ResizeObserver(()=>{clearTimeout(timer);timer=setTimeout(render,240);}).observe(host);
})();
