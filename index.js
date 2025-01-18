import { GameState} from "./js/state.js";
import {applyTheme}  from "./js/theme.js";
import {showSelect} from "./js/select.js";
import {getId} from "./js/auth.js";

console.log("loaded");

applyTheme();
let themeOptions = ["rose_pine", "rose_pine_dawn", "8008", "retro_light", "carbon", "forest"];
let languageOptions = ["english", "german"];
let preventInput = false;
let capsLock = false;

async function run() {
    let id = getId();
    console.log("user id: ", id);
    let state = new GameState();
    state.loadPreferences();
    await state.newWords();
    state.renderWords();
    window.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "Shift":
                return;
            case "CapsLock":
                return;
            case "Meta":
                return;
            case "Alt":
                return;
            case "Control":
                return;
            case "Tab":
                return;
        }
        if (event.getModifierState("CapsLock")) {
            capsLock = true;
            document.getElementById("caps-lock").style.display = "flex";
        } else {
            capsLock = false;
            document.getElementById("caps-lock").style.display = "none";
        }
        if (preventInput) {
            return;
        }
        state.input(event);
    });



    // mode selection
    let toggleGroup = document.querySelector("toggle-group");
    toggleGroup.onchange = async function (e) {
        if (e.value == "Words") {
            state.mode = "words";
            localStorage.setItem("typing-mode", "words");
            state.reset();
            state.wordAmount = parseInt(toggleGroup.secondValue);
            await state.newWords();
            state.renderWords();
        } else if (e.value == "Quote") {
            state.mode = "quote";
            localStorage.setItem("typing-mode", "quote");
            state.reset();
            await state.newWords();
            state.renderWords();
        } else {
            state.wordAmount = parseInt(e.value);
            localStorage.setItem("typing-words", e.value);
            state.reset();
            await state.newWords();
            state.renderWords();
        }
    }

    // language selection button
    let languageSelectButton = document.querySelector(".dropdown-value");
    languageSelectButton.innerText = state.language;
    languageSelectButton.onclick = function() {
        preventInput = true;
        let language = localStorage.getItem("typing-language") || "english";
        showSelect(languageOptions, language, async function (language) {
            preventInput = false;
            console.log("selected language: ", language);
            localStorage.setItem("typing-language", language);
            state.language = language;
            languageSelectButton.innerText = state.language;
            state.reset();
            await state.newWords();
            state.renderWords();
        }, function () {
            preventInput = false;
        });
    }

    // theme selection button
    let themeButton = document.getElementById("theme-button");
    themeButton.onclick = function() {
        preventInput = true;
        let theme = localStorage.getItem("theme") || "rose_pine";
        showSelect(themeOptions, theme, function (theme) {
            preventInput = false;
            console.log("selected theme: ", theme);
            localStorage.setItem("theme", theme);
            applyTheme();
        }, function () {
            preventInput = false;
        });
    }

    loadStats()
    fetch("https://typehero.oxelf.dev/view")
}

async function loadStats() {
    let stats = await fetch("https://typehero.oxelf.dev/stats");
    let json = await stats.json();
    document.getElementById("view-count").innerText = json.siteViews;
    document.getElementById("tests-count").innerText = json.testsStarted;
}


run();