import {drawGraph} from "./graph.js";
import {showNameDialog} from "./name_dialog.js";
import {getId} from "./auth.js";

export async function showAnalytics(state) {
    let words = document.querySelectorAll(".word");
    let fullCorrectWords = 0;
    for (let word of words) {
        let correct = 0;
        let total = word.children.length;
        for (let letter of word.children) {
        if (letter.style.color == "var(--correct-font-color)") {
            correct++;
        }
        }
        if (correct == total) {
            fullCorrectWords++;
        }
    }
    let content = document.getElementById("content");
    let timeSeconds = (state.endTime - state.startTime) / 1000;
    let wpm = fullCorrectWords / (timeSeconds / 60);
    let accuracy = (1 - state.mistakes.length / state.lettersTyped) * 100;
    let userId = getId();
    document.getElementById("language-select-button").style.display = "none";
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
    <h2>${timeSeconds.toFixed(2)}s</h2>
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
    let currName = localStorage.getItem("user-name");
    if (currName == null) {
        await showNameDialog(currName,
            function (newName) {
                console.log("name selected", newName);
                currName = newName;
                localStorage.setItem("user-name", newName);
                let body = {
                    userId: userId,
                    userName: currName,
                    language: state.language,
                    wpm: wpm,
                    accuracy: accuracy,
                    time: timeSeconds,
                    mode: state.mode,
                    wordAmount: (state.mode == "quote")? 0:  state.wordAmount,
                };
                postResults(body);
            },
            function () {
            }
        );
    }

    if (currName != null) {
        let body = {
            userId: userId,
            userName: currName,
            language: state.language,
            wpm: wpm,
            accuracy: accuracy,
            time: timeSeconds,
            mode: state.mode,
            wordAmount: (state.mode == "quote")? 0:  state.wordAmount,
        };
        postResults(body);
    }
}

function postResults(body) {
    fetch("https://typehero.oxelf.dev/result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}