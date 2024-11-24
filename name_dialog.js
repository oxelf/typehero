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
    <div id="error" style="color: var(--wrong-font-color)"></div>
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
        if (input.value.length > 16 || input.value.length < 3) {
            return;
        }
        onSelect(input.value);
        background.style.display = "none";
    }

    input.addEventListener("keydown", function(event) {
        event.stopImmediatePropagation();
        if (input.value.length > 16) {
           document.getElementById("error").innerText = "Name too long"; 
           return;
        } else {
            if (input.value.length < 3) {
                document.getElementById("error").innerText = "Name too short";
                return;
            } else {
                document.getElementById("error").innerText = "";
            }
        }
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
