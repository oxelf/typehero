export function showSelect(s,d,u,a){s.sort(),console.log("showing select");let e=document.createElement("div");e.classList.add("select-menu-background"),e.style.display="flex",e.innerHTML=`
     <div id="theme-selection-content" class="select-menu">
    <div style="margin: 8px; align-items: center; display: flex; flex-direction: row;">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input class="select-menu-input" autofocus placeholder="Search...">
    </div>
    <div class="select-menu-list">
        </div>
    </div>
    `,document.querySelector("body").appendChild(e);let i=e.querySelector(".select-menu"),o=i.querySelector(".select-menu-list");function c(t){o.innerHTML="",t.forEach(n=>{let l=document.createElement("div");d==n?l.classList.add("select-menu-option-selected"):l.classList.add("select-menu-option"),l.innerHTML=`<svg class="select-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
        </svg>`+n,l.onclick=function(){u(n),e.style.display="none"},o.appendChild(l)})}c(s);let r=i.querySelector(".select-menu-input");r.addEventListener("input",function(){let t=s.filter(n=>n.includes(r.value));c(t)}),window.addEventListener("click",function(t){console.log("click"),t.target==e&&(a(),e.remove())})}
