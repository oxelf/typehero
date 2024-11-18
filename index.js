import { GameState} from "./state.js";
import { initDropdown } from "./dropdown.js";
import { initOptions } from "./options.js";
import {applyTheme}  from "./theme.js";
import {showSelect} from "./select.js";
console.log("loaded");

let capsLock = false;
 let themeOptions = ["rose_pine", "rose_pine_dawn", "8008", "retro_light", "carbon"];


async function run() {
    applyTheme();
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
        state.input(event);
    });

    document.querySelector(".dropdown-value").innerText = state.language;

    initDropdown(document.getElementById("language-dropdown"), async function(language) {
        state.language = language;
        localStorage.setItem("typing-language", language);
        await state.newWords();
        state.renderWords();
    }, false);

    initOptions(state);

    let themeButton = document.getElementById("theme-button");
    themeButton.onclick = function() {
        let theme = localStorage.getItem("theme") || "rose_pine";
        showSelect(document.getElementById("theme-selection"),themeOptions, theme, function (theme) {
           console.log("selected theme: ", theme);
            localStorage.setItem("theme", theme);
            applyTheme();
        })
    }
}


run();