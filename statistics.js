import {drawGraph} from "./graph.js";

export function showAnalytics(state) {
    let content = document.getElementById("content");
    let timeSeconds = (state.endTime - state.startTime) / 1000;
    let wpm = state.wordAmount / (timeSeconds / 60);
    let accuracy = (1 - state.mistakes.length / state.lettersTyped) * 100;
    document.getElementById("language-dropdown").style.display = "none";
    document.getElementById("replay-button").style.display = "none";
    document.querySelector(".options-menu").style.display = "none";
    content.innerHTML = `
<div style="display: flex; flex-direction: column; gap: 32px; width: 100%; height: 100%">
<canvas id="wpm-chart" style="width: min(80vw, 768px); aspect-ratio: 2/1" ></canvas> 
   <div class="statistics-row"> 
  <div class="statistics-column">
    <h3 class="tooltip">WPM<span class="tooltiptext">Words Per Minute</span> </h3>
    <h2>${wpm.toFixed(2)}</h2k>
  </div> 
  <div class="statistics-column">
    <h3 class="tooltip">Accuracy<span class="tooltiptext">${state.mistakes.length} Mistakes \n ${state.lettersTyped - state.mistakes.length} Correct</span> </h3>
    <h2>${accuracy.toFixed(0)}%</h2>
  </div> 
  <div class="statistics-column">
    <h3 class="tooltip">Time<span class="tooltiptext">Total Time typing</span> </h3>
    <h2>${timeSeconds.toFixed(0)}s</h2>
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
    `;
    drawGraph(state);
}