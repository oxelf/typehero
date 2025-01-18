import {generateWords} from "./generate.js";
import {showAnalytics} from "./statistics.js";

export class GameState {
    constructor() {
        this.cusorPos = 0;
        this.state = "idle";
        this.lettersTyped = 0;
        this.startTime = null;
        this.endTime = null;
        this.mistakes = [];
        this.wpmTimeSeries = [];
        this.wordPos = 0;
        this.words = [];
        this.letterDivs = [];
        this.language = "english";
        this.wordAmount = 25;
    }

    reset() {
        this.lettersTyped = 0;
        this.startTime = null;
        this.endTime = null;
        this.letterDivs = [];
        this.state = "idle";
        this.cusorPos = 0;
        this.wordPos = 0;
    }

    async newWords() {
        console.log("generating with language: ", this.language, " amount: ", this.wordAmount);
        this.reset();
        let res = await generateWords(this.wordAmount, {language: this.language, mode: this.mode});
        this.words = res.words;
        this.author = res.author;
        this.wordAmount = this.words.length;
    }

    loadPreferences() {
        this.language = localStorage.getItem("typing-language") || "english";
        this.mode = localStorage.getItem("typing-mode") || "words";
        this.wordAmount = parseInt(localStorage.getItem("typing-words")) || 25;
    }

    async renderWords() {
        let contentDiv = document.getElementById("content");
        contentDiv.innerHTML = "";

        let blinkingCursor = document.createElement("div");
        blinkingCursor.classList.add("blinking-cursor");
        contentDiv.appendChild(blinkingCursor);

        /*
        for every word we make a word div that holds the letters, to avoid the letters
        overflowing into the next line by the wrap.
         */
        for (let i = 0; i < this.words.length; i++) {
            let letters = this.words[i].split("");
            let wordDiv = document.createElement("div");
            wordDiv.classList.add("word");

            for (let l  = 0; l < letters.length; l++) {
                let letterDiv = document.createElement("div");
                letterDiv.innerText = letters[l];
                letterDiv.classList.add("letter");
                // the cursor would be shifted when hes at a space
                // to avoid that the first letter wont have the cursor spacing
                if (i == 0 && l == 0) {
                    letterDiv.style.marginLeft = "0px";
                }
                wordDiv.appendChild(letterDiv);
                this.letterDivs.push(letterDiv);
            }
            contentDiv.appendChild(wordDiv);

            // space between words
            let spaceDiv = document.createElement("div");
            spaceDiv.classList.add("spacer");
            this.letterDivs.push(spaceDiv);
            contentDiv.appendChild(spaceDiv);
        }

        if (this.mode == "quote")  {
            document.getElementById("quote-author").innerText = `Quote from "${this.author}"`;
        } else {
            document.getElementById("quote-author").innerText = "";
        }
    }

     input(event) {
        if (this.state == "idle") {
            this.state = "running";
            this.startTime = Date.now();
        }
        // Move Cursor one back. Remove margin for the letter moving to, and add to the next letter
        if (event.key == "Backspace") {
          this.moveCursor(this.cusorPos, this.cusorPos - 1 >= 0 ? this.cusorPos - 1 : 0);
        } else {
            this.moveCursor(this.cusorPos, this.cusorPos + 1);
            let lastLetter = this.letterDivs[this.cusorPos - 1];
            // color the letter if its correct or wrong
            if (lastLetter) {
                if (event.key == lastLetter.innerText) {
                    lastLetter.style.color = "var(--correct-font-color)";
                } else {
                    if (lastLetter.innerText != "") {
                        lastLetter.style.color = "var(--wrong-font-color)";
                        console.log("mistake: ", lastLetter.innerText, " typed: ", event.key);
                        this.mistakes.push(Date.now() - this.startTime);
                    }
                }
            }
            this.lettersTyped++;
        }

         let lastLetter = this.letterDivs[this.cusorPos - 1];
        let letter = this.letterDivs[this.cusorPos];
         if (!lastLetter) {
             return;
         }
         let contentDiv = document.getElementById("content");
         let wordDiv = lastLetter.parentElement;
         const index = Array.prototype.indexOf.call(contentDiv.children, wordDiv);

         // if index is -1, we are at a space currently, therefore we finished a word
         if (index != -1) {
             this.wordPos = index / 2;
         } else {
             // keep count of when we finished a word
             this.wpmTimeSeries.push(Date.now() - this.startTime);
         }


         if (letter == this.letterDivs[this.letterDivs.length - 1]) {
             console.log("reached real end");
             this.state = "finished";
             this.endTime = Date.now();
             let time = (this.endTime - this.startTime) / 1000;
             console.log("Time: " + time + " seconds");
             console.log("word time series: ", this.wpmTimeSeries);
             console.log("mistakes: ", this.mistakes);
             let wpm = this.wordAmount / (time / 60);
             console.log("WPM: " + wpm);
             showAnalytics(this);
         }
     }

     moveCursor(oldPos, newPos) {
        this.cusorPos = newPos;
        let cursor = document.querySelector(".blinking-cursor");
        let contentDiv = document.getElementById("content");

        // cursor could be either in the content div or in one of the word divs
        try {
            contentDiv.removeChild(cursor);
            for (let i = 0; i < contentDiv.children.length; i++) {
                contentDiv.children[i].removeChild(cursor);
            }
        } catch (e) {}

        let letter = this.letterDivs[this.cusorPos];
        let lastLetter = this.letterDivs[this.cusorPos - 1];
        let nextLetter = this.letterDivs[this.cusorPos + 1];
        if (letter) {
            letter.style.color = "var(--font-color)";
        }

         // Check if moving back
         if (newPos < oldPos && letter && nextLetter) {
             letter.style.marginLeft = "0px";
             nextLetter.style.marginLeft = "2px";
             letter.parentElement.insertBefore(cursor,letter);
         } else if (letter && lastLetter) {
             lastLetter.style.marginLeft = "2px";
             letter.style.marginLeft = "0px";
             letter.parentElement.insertBefore(cursor,letter);
         }
     }
}