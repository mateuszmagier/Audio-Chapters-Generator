class AudioFileView {
    constructor(model) {
        this.model = model;
        this.extension = null;
    }
    
    createTimestampElement() {
        let element = document.createElement("span");
        element.classList.add("audiofile-timestamp");
        element.innerText = this.model.convertedTimestamp;
        return element;
    }
    
    createFilenameElement() {
        let element = document.createElement("span");
        element.classList.add("audiofile-filename");
        element.innerText = this.model.filename;
        return element;
    }
    
    createExtensionElement() {
        let element = document.createElement("span");
        element.classList.add("audiofile-extension", "invisible");
        element.innerText = "." + this.model.fileext;
        this.extension = element;
        return element;
    }
    
    createElement() {
        let element = document.createElement("div");
        element.classList.add("audiofile");
        element.appendChild(this.createTimestampElement());
        element.appendChild(this.createFilenameElement());
        element.appendChild(this.createExtensionElement());
        return element;
    }
    
    setExtensionVisibility(isVisible) {
        if(isVisible)
            this.extension.classList.add("visible");
        else
            this.extension.classList.remove("visible");
    }
}

export { AudioFileView }