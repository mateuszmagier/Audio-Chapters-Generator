class AudioFileView {
    constructor(model) {
        this.model = model;
        this.filename = null;
        this.extension = null;
        this.title = null;
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
        this.filename = element;
        return element;
    }
    
    createExtensionElement() {
        let element = document.createElement("span");
        element.classList.add("audiofile-extension", "invisible");
        element.innerText = "." + this.model.fileext;
        this.extension = element;
        return element;
    }
    
    createTitleElement() {
        let element = document.createElement("span");
        element.classList.add("audiofile-title", "invisible");
        element.innerText = this.model.title;
        this.title = element;
        return element;
    }
    
    createElement() {
        let element = document.createElement("div");
        element.classList.add("audiofile");
        element.appendChild(this.createTimestampElement());
        element.appendChild(this.createFilenameElement());
        console.log("Widok... title:" + this.model.title);
        if(this.model.title !== null) // title was obtained from metadata
            element.appendChild(this.createTitleElement());
        element.appendChild(this.createExtensionElement());
        return element;
    }
    
    setExtensionVisibility(isVisible) {
        if(isVisible)
            this.extension.classList.add("visible");
        else
            this.extension.classList.remove("visible");
    }
    
    changeLabelSource(sourceName) {
        switch(sourceName) {
            case "filename":
                this.filename.classList.remove("invisible");
                this.title.classList.add("invisible");
                break;
            case "title":
                this.filename.classList.add("invisible");
                this.title.classList.remove("invisible");
                break;
            default:
                console.error("Unsupported label source name.");
        }
    }
}

export { AudioFileView }