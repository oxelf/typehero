class ToggleGroup extends HTMLElement {

    static get observedAttributes() {
        return ["group", "second-group", "value", "second-value"];
    }

    connectedCallback() {
        this.classList.add("options-menu");
        this.group = (this.getAttribute("group") || "").split(",");
        this.secondGroup = (this.getAttribute("second-group")|| "").split(",");
        this.groupElements = [];
        this.value = this.getAttribute("value") || "";
        this.secondValue = this.getAttribute("second-value") || "";
        this.secondGroupElements = [];
        function callOnchange(value) {
            this.onchange(value);
        }
        let p = this;
        for (let i = 0; i < this.group.length; i++) {
            let div = document.createElement("div");
            div.classList.add("option");
            if (this.value == this.group[i]) {
                div.classList.add("option-selected");
            }
            div.innerText = this.group[i];
            div.onclick = function () {
                let e = new Event("change");
                e.value = this.innerText;
                p.onchange(e);
                this.parentElement.groupElements.forEach((e) => {
                    e.classList.remove("option-selected");
                });
                this.classList.add("option-selected");
            }
            this.groupElements.push(div);
            this.appendChild(div);
        }

        let divider = document.createElement("div");
        divider.classList.add("options-divider");
        this.appendChild(divider);

        for (let i = 0; i < this.secondGroup.length; i++) {
            let div = document.createElement("div");
            div.classList.add("option");
            if (this.secondValue == this.secondGroup[i]) {
                div.classList.add("option-selected");
            }
            div.innerText = this.secondGroup[i];
            div.onclick = function () {
                let e = new Event("change");
                e.value = this.innerText;
                p.onchange(e);
                this.parentElement.secondGroupElements.forEach((e) => {
                    e.classList.remove("option-selected");
                });
                this.classList.add("option-selected");
            }
            this.secondGroupElements.push(div);
            this.appendChild(div);
        }
    }

}

window.customElements.define('toggle-group', ToggleGroup);
