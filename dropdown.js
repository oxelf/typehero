export function initDropdown(dropdown, onSelected, useIcon) {
    let dropdownContent = dropdown.querySelector(".dropdown-content");
    let children = dropdownContent.children;
    for (let i = 0; i < children.length; i++) {
        children.item(i).onclick = function() {
            onSelected(this.innerText);
            dropdown.querySelector(".dropdown-value").innerText = this.innerText;
            dropdownContent.style.display = "none";
        }
    }
    children = dropdown.children;
    for (let i = 0; i < children.length; i++) {
        let child = children.item(i);
        if (child.className == "dropdown-value") {
            child.onclick = function () {
                dropdown.querySelector(".dropdown-content").style.display = "flex";
            };
            window.addEventListener("click", function(event) {
                if (!dropdown.contains(event.target)) {
                    dropdownContent.style.display = "none";
                }});
        }
    }
}

