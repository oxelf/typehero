export function showNameDialog(currentName, onSelect, onClosed) {
    let background = document.createElement("div");
    background.classList.add("overlay-background");
    background.style.display = "flex";
    background.innerHTML = `
     <div id="name-dialog-content" class="overlay" style="height: 200px">
    <h3 style="margin: 16px">Choose a Name that will be shown on the leaderboard</h3>
    <div style="margin: 8px; align-items: center; display: flex; flex-direction: row;">
        <input class="primary-input" autofocus placeholder="Name">
    </div>
    <div style="display: flex; flex-direction: column; justify-content: end; height: 30%">
    <div style="display: flex; flex-direction: row; justify-content: end; gap: 8px; margin-right: 8px">
    <button class="primary-button">Submit</button>
    </div>
    </div>
    </div>
    `;

    document.querySelector("body").appendChild(background);


    let input = background.querySelector(".primary-input");
    input.value = currentName;
    input.addEventListener("input", function() {
    });

    let submitButton = background.querySelector(".primary-button");
    submitButton.onclick = function() {
        onSelect(input.value);
        background.style.display = "none";
    }

    input.addEventListener("keydown", function(event) {
        event.stopImmediatePropagation();
        if (event.key == "Enter") {
            onSelect(input.value);
            background.style.display = "none";
        }
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
