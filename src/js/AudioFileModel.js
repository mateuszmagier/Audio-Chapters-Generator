/*
    audioFile: File object,
    audioController: AudioFilesController object
*/
export class AudioFileModel {
    
    constructor(audioFile, audioController) {
        this.file = audioFile;
        this.filename = this.file.name;
        this.duration = 0;
        this.timestamp = 0;
        this.controller = audioController;

        this.waitForDuration(); // register event for audio element
    }

    waitForDuration() {
        var audio, objectURL;

        objectURL = URL.createObjectURL(this.file);
        audio = new Audio(); // create new audio element
        audio.setAttribute("src", objectURL);

        // set audio file's duration and notify controller
        audio.addEventListener("durationchange", e => {
            console.log(`${this.filename}: ${e.target.duration}`);
            this.duration = e.target.duration;
            this.controller.incrementObtainedDurations();
        });
    }
    
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    }
    
    getDuration() {
        return this.duration;
    }
    
    printDuration() {
        console.log(`${this.timestamp} ${this.filename}`);
    }
    
    calculateTimestamp(prevTimestamp) {
        
    }
}
