HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},function(){const e=()=>document.dispatchEvent(new Event("page:loaded",{bubbles:!0}));"loading"===document.readyState?document.addEventListener("readystatechange",e,{once:!0}):e(),document.addEventListener("pjax:success",e)}(),NexT.utils={registerExtURL:function(){document.querySelectorAll("span.exturl").forEach((e=>{const t=document.createElement("a");t.href=decodeURIComponent(atob(e.dataset.url).split("").map((e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2))).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)}))},registerCopyCode:function(){let e=document.querySelectorAll("figure.highlight");0===e.length&&(e=document.querySelectorAll("pre:not(.mermaid)")),e.forEach((e=>{if(e.querySelectorAll(".code .line span").forEach((e=>{e.classList.forEach((t=>{e.classList.replace(t,"hljs-"+t)}))})),!CONFIG.copycode.enable)return;let t=e;"mac"!==CONFIG.copycode.style&&(t=e.querySelector(".table-container")||e),t.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');const n=e.querySelector(".copy-btn");n.addEventListener("click",(()=>{const t=(e.querySelector(".code")||e.querySelector("code")).innerText;if(navigator.clipboard)navigator.clipboard.writeText(t).then((()=>{n.querySelector("i").className="fa fa-check-circle fa-fw"}),(()=>{n.querySelector("i").className="fa fa-times-circle fa-fw"}));else{const e=document.createElement("textarea");e.style.top=window.scrollY+"px",e.style.position="absolute",e.style.opacity="0",e.readOnly=!0,e.value=t,document.body.append(e),e.select(),e.setSelectionRange(0,t.length),e.readOnly=!1;const o=document.execCommand("copy");n.querySelector("i").className=o?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw",e.blur(),n.blur(),document.body.removeChild(e)}})),e.addEventListener("mouseleave",(()=>{setTimeout((()=>{n.querySelector("i").className="fa fa-copy fa-fw"}),300)}))}))},wrapTableWithBox:function(){document.querySelectorAll("table").forEach((e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)}))},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach((e=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some((t=>e.src.includes(t)))&&!e.parentNode.matches(".video-container")){const t=document.createElement("div");t.className="video-container",e.wrap(t);const n=Number(e.width),o=Number(e.height);n&&o&&(t.style.paddingTop=o/n*100+"%")}}))},registerScrollPercent:function(){const e=document.querySelector(".back-to-top"),t=document.querySelector(".reading-progress-bar");window.addEventListener("scroll",(()=>{if(e||t){const n=document.body.scrollHeight-window.innerHeight,o=n>0?Math.min(100*window.scrollY/n,100):0;e&&(e.classList.toggle("back-to-top-on",Math.round(o)>=5),e.querySelector("span").innerText=Math.round(o)+"%"),t&&t.style.setProperty("--progress",o.toFixed(2)+"%")}if(!Array.isArray(NexT.utils.sections))return;let n=NexT.utils.sections.findIndex((e=>e&&e.getBoundingClientRect().top>10));-1===n?n=NexT.utils.sections.length-1:n>0&&n--,this.activateNavByIndex(n)}),{passive:!0}),e&&e.addEventListener("click",(()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})}))},registerTabsTag:function(){document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach((e=>{e.addEventListener("click",(t=>{if(t.preventDefault(),e.classList.contains("active"))return;const n=e.parentNode;[...n.children].forEach((t=>{t.classList.toggle("active",t===e)}));const o=document.getElementById(e.querySelector("a").getAttribute("href").replace("#",""));if([...o.parentNode.children].forEach((e=>{e.classList.toggle("active",e===o)})),o.dispatchEvent(new Event("tabs:click",{bubbles:!0})),!CONFIG.stickytabs)return;const a=n.parentNode.getBoundingClientRect().top+window.scrollY+10;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:a})}))})),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){window.addEventListener("message",(({data:e})=>{if("string"==typeof e&&e.includes("ciu_embed")){const t=e.split(":")[1],n=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(n,10)+5+"px"}}),!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach((e=>{const t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html",""),n=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||n))}))},registerLangSelect:function(){document.querySelectorAll(".lang-select").forEach((e=>{e.value=CONFIG.page.lang,e.addEventListener("change",(()=>{const t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach((e=>{e.innerText=t.text})),window.location.href=t.dataset.href}))}))},registerSidebarTOC:function(){this.sections=[...document.querySelectorAll(".post-toc li a.nav-link")].map((e=>{const t=document.getElementById(decodeURI(e.getAttribute("href")).replace("#",""));return e.addEventListener("click",(n=>{n.preventDefault();const o=t.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:o,complete:()=>{history.pushState(null,document.title,e.href)}})})),t}))},registerPostReward:function(){const e=document.querySelector(".reward-container button");e&&e.addEventListener("click",(()=>{document.querySelector(".post-reward").classList.toggle("active")}))},activateNavByIndex:function(e){const t=document.querySelectorAll(".post-toc li a.nav-link")[e];if(!t||t.classList.contains("active-current"))return;document.querySelectorAll(".post-toc .active").forEach((e=>{e.classList.remove("active","active-current")})),t.classList.add("active","active-current");let n=t.parentNode;for(;!n.matches(".post-toc");)n.matches("li")&&n.classList.add("active"),n=n.parentNode;const o=document.querySelector(".sidebar-panel-container");o.parentNode.classList.contains("sidebar-toc-active")&&window.anime({targets:o,duration:200,easing:"linear",scrollTop:o.scrollTop-o.offsetHeight/2+t.getBoundingClientRect().top-o.getBoundingClientRect().top})},updateSidebarPosition:function(){if(window.innerWidth<992||"Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)return;const e=document.querySelector(".post-toc");let t=CONFIG.page.sidebar;"boolean"!=typeof t&&(t="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&e),t&&window.dispatchEvent(new Event("sidebar:show"))},activateSidebarPanel:function(e){const t=document.querySelector(".sidebar-inner"),n=document.querySelector(".sidebar-panel-container"),o=["sidebar-toc-active","sidebar-overview-active"];t.classList.contains(o[e])||window.anime({duration:200,targets:n,easing:"linear",opacity:0,translateY:[0,-20],complete:()=>{t.classList.replace(o[1-e],o[e]),window.anime({duration:200,targets:n,easing:"linear",opacity:[0,1],translateY:[-20,0]})}})},getScript:function(e,t={},n){if("function"==typeof t)return this.getScript(e,{condition:n}).then(t);const{condition:o=!1,attributes:{id:a="",async:r=!1,defer:c=!1,crossOrigin:i="",dataset:s={},...l}={},parentNode:d=null}=t;return new Promise(((t,n)=>{if(o)t();else{const o=document.createElement("script");if(a&&(o.id=a),i&&(o.crossOrigin=i),o.async=r,o.defer=c,Object.assign(o.dataset,s),Object.entries(l).forEach((([e,t])=>{o.setAttribute(e,String(t))})),o.onload=t,o.onerror=n,"object"==typeof e){const{url:t,integrity:n}=e;o.src=t,n&&(o.integrity=n,o.crossOrigin="anonymous")}else o.src=e;(d||document.head).appendChild(o)}}))},loadComments:function(e,t){return t?this.loadComments(e).then(t):new Promise((t=>{const n=document.querySelector(e);CONFIG.comments.lazyload&&n?new IntersectionObserver(((e,n)=>{e[0].isIntersecting&&(t(),n.disconnect())})).observe(n):t()}))}};