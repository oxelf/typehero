import {showSelect} from "./select.js";
import {applyTheme} from "./theme.js";

let themeOptions = ["rose_pine", "rose_pine_dawn", "8008", "retro_light", "carbon"];

async function getLeaderboardData(mode, language, words) {
    let response = await fetch(`https://typehero.oxelf.dev/leaderboard?mode=${mode}&wordAmount=${words}&language=${language}`, {});
    return await response.json();
}

export async function populateLeaderboard(mode, language, words) {
    let title = language + " - ";
    if (mode == "quote") {
        title += "Quotes";
    } else {
        title += words.toString() + " Words";
    }
    document.getElementById("leaderboard-title").innerText = title;
let data = await getLeaderboardData(mode,language, words);
let leaderboard = document.querySelector(".leaderboard-table");
leaderboard.innerHTML = `
<tr>
          <th>Rank</th>
            <th>Name</th>
            <th style="width: 100px">WPM</th>
            <th style="width: 100px">Accuracy</th>
            <th style="width: 200px">Date</th>
        </tr>
`;
data.sort(
    (a, b) => {
       return a.rank - b.rank;
    }
);
data.forEach((entry) => {
    let date = new Date(entry.date);
    let stringDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    leaderboard.innerHTML += `
<tr>
          <td>${entry.rank}</td>
            <td>${entry.userName}</td>
            <td style="width: 100px;">${entry.wpm.toFixed(2)}</td>
            <td style="width: 100px">${entry.accuracy.toFixed(2)}</td>
            <td style="width: 200px;">${stringDate}</td>
        </tr>
        `;});
}


let themeButton = document.getElementById("theme-button");
themeButton.onclick = function() {
    let theme = localStorage.getItem("theme") || "rose_pine";
    showSelect(themeOptions, theme, function (theme) {
        console.log("selected theme: ", theme);
        localStorage.setItem("theme", theme);
        applyTheme();
    }, function () {
    });
}
let language = localStorage.getItem("typing-language") || "english";
let words = parseInt(localStorage.getItem("typing-words")) || 25;
let mode = localStorage.getItem("typing-mode") || "words";
words = (mode == "quote")? 0:  words;
populateLeaderboard(mode, language, words);