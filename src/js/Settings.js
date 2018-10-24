/*
    atg: AudioTimestampsGenerator object
*/
class Settings {
    constructor(atg) {
        this.controller = atg;
        this.settings = document.querySelector(".settings");
        this.settings.classList.add("visible");

        this.extensionVisibility = this.settings.querySelector("#settings-extension");
        this.labelSourceRadios = this.settings.querySelectorAll("input[name=\"name-source\"]");

        this.registerEvents();
    }

    registerEvents() {
        this.extensionVisibility.addEventListener("click", () => this.controller.changeExtensionVisibility(this.extensionVisibility.checked));
        
        [].forEach.call(this.labelSourceRadios, radio => {
            radio.addEventListener("click", () => this.controller.changeLabelSource(radio.value));
        });
    }
}

export {
    Settings
}
