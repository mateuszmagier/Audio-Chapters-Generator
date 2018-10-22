class AudioFileView {
    constructor(model) {
        this.model = model;
    }
    
    createElement() {
        let element = document.createElement("div");
        element.classList.add(".audiofile");
//        element.setAttribute("contenteditable", true);
        element.innerText = `${this.model.convertedTimestamp} ${this.model.filename}`;
        return element;
    }
}

export { AudioFileView }