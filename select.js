export function showSelect(selectBackground, options, selected, onSelect) {
    options.sort();
    console.log("showing select");
selectBackground.style.display = "flex";

    let content = selectBackground.querySelector(".select-menu");
    let input = content.querySelector(".select-menu-input");
    let list = content.querySelector(".select-menu-list");
    list.innerHTML = "";
    options.forEach((option) => {
        let optionDiv = document.createElement("div");
        if (selected == option) {
            optionDiv.classList.add("select-menu-option-selected");
        } else {
            optionDiv.classList.add("select-menu-option");
        }
        optionDiv.innerHTML = `<svg class="select-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
        </svg>`+option;
        optionDiv.onclick = function() {
            onSelect(option);
            selectBackground.style.display = "none";
        }
        list.appendChild(optionDiv);
    });

    window.addEventListener("click", function(event) {
        if (event.target == selectBackground) {
            selectBackground.style.display = "none";
        }
    }
    );
}