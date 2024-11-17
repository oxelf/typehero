export function initDropdown(dropdown, onSelected, useIcon) {
    console.log("initializing dropdown", dropdown);
    let dropdownContent = dropdown.querySelector(".dropdown-content");
    console.log("dropdown content", dropdownContent);
    console.log("children", dropdownContent.children);
    let children = dropdownContent.children;
    for (let i = 0; i < children.length; i++) {
        children.item(i).onclick = function() {
            console.log(`selected: ${this.innerText}`);
            onSelected(this.innerText);
            dropdown.querySelector(".dropdown-value").innerText = this.innerText;
            dropdownContent.style.display = "none";
        }
    }
    children = dropdown.children;
    for (let i = 0; i < children.length; i++) {
        let child = children.item(i);
        if (child.className == "dropdown-value") {
            console.log(`found value: ${child.innerText}`);
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

