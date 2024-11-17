import { GameState} from "./state.js";
import { initDropdown } from "./dropdown.js";
import { initOptions } from "./options.js";
console.log("loaded");


async function run() {
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
}


run();