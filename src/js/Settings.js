/*
    atg: AudioTimestampsGenerator object
*/
class Settings {
    constructor(atg) {
        this.controller = atg;
        this.settings = document.querySelector(".settings");
        this.settings.classList.add("visible");

        this.extensionVisibility = this.settings.querySelector("#settings-extension");

        this.registerEvents();
    }

    registerEvents() {
        //        this.extensionVisibility.addEventListener("click", () => console.log(this.extensionVisibility.checked));
        this.extensionVisibility.addEventListener("click", () => this.controller.changeExtensionVisibility(this.extensionVisibility.checked));
    }
}

export {
    Settings
}
