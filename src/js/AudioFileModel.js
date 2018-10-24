
var audioMetaData = require('audio-metadata');
/*
    audioFile: File object,
    audioController: AudioFilesController object
*/
class AudioFileModel {

    constructor(audioFile, audioController) {
        this.file = audioFile;
        var audiofileSplit = this.file.name.split(".");
        this.filename = audiofileSplit.slice(0, audiofileSplit.length - 1).join(".");
        this.fileext = audiofileSplit[audiofileSplit.length - 1];
        this.duration = 0;
        this.timestamp = 0;
        this.convertedTimestamp = "";
        this.title = null;
        this.controller = audioController;


        this.waitForDuration(); // register event for audio element
        this.obtainTitle(); // obtain title of audio file
    }

    obtainTitle() {
        var reader = new FileReader();

        reader.onload = event => {
            var buffer = event.target.result;
            var metadata = audioMetaData.id3v2(buffer);
            if(metadata !== null) {
                this.title = metadata.title;
            }
            else
                console.log("Nie udało się odczytać metadanych pliku.");
            this.controller.incrementObtainedTitles();
        };

        reader.readAsArrayBuffer(this.file);
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

    getTimestamp() {
        return this.timestamp;
    }

    setConvertedTimestamp(convertedTimestamp) {
        this.convertedTimestamp = convertedTimestamp;
    }

    getDuration() {
        return this.duration;
    }

    printDuration() {
        console.log(`${this.timestamp} ${this.convertedTimestamp} ${this.filename}`);
    }
}

export {
    AudioFileModel
}
