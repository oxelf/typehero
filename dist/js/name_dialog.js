export function showNameDialog(o,i,l){let e=document.createElement("div");e.classList.add("overlay-background"),e.style.display="flex",e.innerHTML=`
     <div id="name-dialog-content" class="overlay" style="height: 200px">
    <h3 style="margin: 16px">Choose a Name that will be shown on the leaderboard</h3>
    <div style="margin: 8px; align-items: center; display: flex; flex-direction: row;">
        <input class="primary-input" autofocus placeholder="Name">
    </div>
    <div style="display: flex; flex-direction: column; justify-content: end; height: 30%">
    <div style="display: flex; flex-direction: row; justify-content: end; gap: 8px; margin-right: 8px">
    <div id="error" style="color: var(--wrong-font-color)"></div>
    <button class="primary-button">Submit</button>
    </div>
    </div>
    </div>
    `,document.querySelector("body").appendChild(e);let t=e.querySelector(".primary-input");t.value=o,t.addEventListener("input",function(){});let r=e.querySelector(".primary-button");r.onclick=function(){t.value.length>16||t.value.length<3||(i(t.value),e.style.display="none")},t.addEventListener("keydown",function(n){if(n.stopImmediatePropagation(),t.value.length>16){document.getElementById("error").innerText="Name too long";return}else if(t.value.length<3){document.getElementById("error").innerText="Name too short";return}else document.getElementById("error").innerText="";n.key=="Enter"&&(i(t.value),e.style.display="none")}),window.addEventListener("click",function(n){console.log("click"),n.target==e&&(l(),e.remove())})}
