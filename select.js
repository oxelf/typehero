export function showSelect(options, selected, onSelect, onClosed) {
    options.sort();
    console.log("showing select");
    let background = document.createElement("div");
    background.classList.add("select-menu-background");
    background.style.display = "flex";
    background.innerHTML = `
     <div id="theme-selection-content" class="select-menu">
    <div style="margin: 8px; align-items: center; display: flex; flex-direction: row;">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input class="select-menu-input" autofocus placeholder="Search...">
    </div>
    <div class="select-menu-list">
        </div>
    </div>
    `;

    document.querySelector("body").appendChild(background);

    let content = background.querySelector(".select-menu");

    let list = content.querySelector(".select-menu-list");
    function populateList(options) {
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
                background.style.display = "none";
            }
            list.appendChild(optionDiv);
        });
    }
    populateList(options);
    let input = content.querySelector(".select-menu-input");
    input.addEventListener("input", function() {
        let filtered = options.filter((option) => option.includes(input.value));
        populateList(filtered);
    });

    window.addEventListener("click", function(event) {
        console.log("click");
        if (event.target == background) {
            onClosed();
             background.remove();
        }
    }
    );
}