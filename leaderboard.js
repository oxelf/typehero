import {showSelect} from "./select.js";
import {applyTheme} from "./theme.js";

let themeOptions = ["rose_pine", "rose_pine_dawn", "8008", "retro_light", "carbon"];

async function getLeaderboardData(mode, language, words) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
        {
            name: "oxelf",
            rank: 1,
            wpm: 100,
            accuracy: 100.0,
            date: Date.now(),
        },
        {
            name: "leon",
            rank: 2,
            wpm: 90,
            accuracy: 99.0,
            date: Date.now(),
        },
        {
            name: "jimmy",
            rank: 3,
            wpm: 80,
            accuracy: 98.0,
            date: Date.now(),
        },
        {
            name: "jane",
            rank: 4,
            wpm: 70,
            accuracy: 97.0,
            date: Date.now(),
        },
        {
            name: "joe",
            rank: 5,
            wpm: 60,
            accuracy: 96.0,
            date: Date.now(),
        },
        {
            name: "jill",
            rank: 6,
            wpm: 50,
            accuracy: 95.0,
            date: Date.now(),
        },
        {
            name: "john",
            rank: 7,
            wpm: 40,
            accuracy: 94.0,
            date: Date.now(),
        },
        {
            name: "jake",
            rank: 8,
            wpm: 30,
            accuracy: 93.0,
            date: Date.now(),
        },
        {
            name: "josh",
            rank: 9,
            wpm: 20,
            accuracy: 92.0,
            date: Date.now(),
        },
        {
            name: "jason",
            rank: 10,
            wpm: 10,
            accuracy: 91.0,
            date: Date.now(),
        }
    ];
}

export async function populateLeaderboard(mode, language, words) {
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
data.forEach((entry) => {
    let date = new Date(entry.date);
    let stringDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    leaderboard.innerHTML += `
<tr>
          <td>${entry.rank}</td>
            <td>${entry.name}</td>
            <td style="width: 100px;">${entry.wpm}</td>
            <td style="width: 100px">${entry.accuracy}</td>
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
populateLeaderboard("words", "english", 50);