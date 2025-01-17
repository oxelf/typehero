export async function initOptions(state) {
    let menu = document.querySelector(".options-menu");
    let unselectedOptions = menu.querySelectorAll(".option");
   let selectedOptions = menu.querySelectorAll(".option-selected");
   let options = Array.from(unselectedOptions).concat(Array.from(selectedOptions));
    let optionMap = {};
    let amountOptions = ["10", "25", "50", "75"];
    options.forEach((option) => {
        let h5 = option.querySelector("h5");
        let key = h5.innerText.toLowerCase();
        optionMap[key] = option;
        option.onclick = async function () {
            option.classList.remove("option");
            option.classList.add("option-selected");
            if (key == "words") {
                optionMap["quote"].classList.remove("option-selected");
                optionMap["quote"].classList.add("option");
                state.mode = "words";
                localStorage.setItem("typing-mode", "words");
                for (let i = 0; i < amountOptions.length; i++) {
                    let option = optionMap[amountOptions[i]];
                    if (option.classList.contains("option-selected")) {
                        console.log("selected: ", amountOptions[i]);
                        state.wordAmount = parseInt(amountOptions[i]);
                        localStorage.setItem("typing-words", amountOptions[i]);
                    }
                }
                state.reset();
                await state.newWords();
                state.renderWords();
            }
            else  if (key == "quote") {
                optionMap["words"].classList.remove("option-selected");
                optionMap["words"].classList.add("option");
                state.mode = "quote";
                localStorage.setItem("typing-mode", "quote");
                state.reset();
                await state.newWords();
                state.renderWords();
            } else {
                state.wordAmount = parseInt(key);
                localStorage.setItem("typing-words", key);
                console.log("selected: ", key);
                state.reset();
                await state.newWords();
                state.renderWords();
                for (let i = 0; i < amountOptions.length; i++) {
                    if (amountOptions[i] != key) {
                        let option = optionMap[amountOptions[i]];
                        optionMap[amountOptions[i]].classList.remove("option-selected");
                        optionMap[amountOptions[i]].classList.add("option");
                    }
                }
            }


        }
});
    optionMap[state.mode].classList.remove("option");
    optionMap[state.mode].classList.add("option-selected");

    optionMap[state.wordAmount.toString()].classList.remove("option");
    optionMap[state.wordAmount.toString()].classList.add("option-selected");
}