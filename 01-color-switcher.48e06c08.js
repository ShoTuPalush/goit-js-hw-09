const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let d=null;t.addEventListener("click",(function(){d=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(d),t.disabled=!1,e.disabled=!0})),e.disabled=!0;
//# sourceMappingURL=01-color-switcher.48e06c08.js.map