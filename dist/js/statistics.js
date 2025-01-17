import{drawGraph as h}from"./graph.js";import{showNameDialog as g}from"./name_dialog.js";import{getId as y}from"./auth.js";export async function showAnalytics(e){let s=document.querySelectorAll(".word"),a=0;for(let t of s){let n=0,u=t.children.length;for(let p of t.children)p.style.color=="var(--correct-font-color)"&&n++;n==u&&a++}let m=document.getElementById("content"),l=(e.endTime-e.startTime)/1e3,i=a/(l/60),c=(1-e.mistakes.length/e.lettersTyped)*100,r=y();document.getElementById("language-select-button").style.display="none",document.getElementById("replay-button").style.display="none",document.querySelector(".options-menu").style.display="none",m.innerHTML=`
<div style="display: flex; flex-direction: column; gap: 32px; width: 100%; height: 100%">
<canvas id="wpm-chart" style="width: min(80vw, 768px); aspect-ratio: 2/1" ></canvas> 
   <div class="statistics-row"> 
  <div class="statistics-column">
    <h3 class="tooltip">WPM<span class="tooltiptext">Words Per Minute</span> </h3>
    <h2>${i.toFixed(2)}</h2k>
  </div> 
  <div class="statistics-column">
    <h3 class="tooltip">Accuracy<span class="tooltiptext">${e.mistakes.length} Mistakes 
 ${e.lettersTyped-e.mistakes.length} Correct</span> </h3>
    <h2>${c.toFixed(0)}%</h2>
  </div> 
  <div class="statistics-column">
    <h3 class="tooltip">Time<span class="tooltiptext">Total Time typing</span> </h3>
    <h2>${l.toFixed(2)}s</h2>
  </div> 
    </div>
    <div class="actions-row">
    <div class="tooltip"><svg class="icon" onclick="window.location.reload()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
<span class="tooltiptext">Next Test</span>
</div>
</div>
   </div>
    `,h(e);let o=localStorage.getItem("user-name");if((o==null||o=="")&&await g(o,function(t){console.log("name selected",t),o=t,localStorage.setItem("user-name",t);let n={userId:r,userName:o,language:e.language,wpm:i,accuracy:c,time:l,mode:e.mode,wordAmount:e.mode=="quote"?0:e.wordAmount};d(n)},function(){}),o!=null){let t={userId:r,userName:o,language:e.language,wpm:i,accuracy:c,time:l,mode:e.mode,wordAmount:e.mode=="quote"?0:e.wordAmount};d(t)}}async function d(e){const s=await grecaptcha.execute("6Ldg2ogqAAAAAPCVbF6kSiJefDqw2hjHGb_jr2qC",{action:"submit"});e.captchaToken=s,fetch("https://typehero.oxelf.dev/result",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}
