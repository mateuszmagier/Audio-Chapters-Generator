import {
    AudioFileModel
} from './AudioFileModel';
import {
    DurationHelper
} from './DurationHelper';
import {
    AudioFileView
} from './AudioFileView';
import {
    Settings
} from './Settings';

/*
    filesInputSelector: iCSS selector of audio files input
*/
class AudioTimestampsGenerator {

    constructor(filesInputSelector) {
        this.input = document.querySelector(filesInputSelector); // input element used to attach audio files
        this.obtainedDurations = 0; // number of known durations of audio files
        this.obtainedTitles = 0; // number of known titles of audio files
        this.attachedFilesNumber = 0; // number of files attached by user
        this.models = []; // array of AudioFileModel objects
        this.views = []; // array of AudioFileView objects
        this.settings = null;

        if (this.input === null) {
            console.log("Nieprawidłowy selektor");
        }

        this.handleFilesUpload(); // register change event for files input
    }

    // read files attached by user and create AudioFileModel objects for each of them
    handleFilesUpload() {
        this.input.addEventListener("change", e => {
            var files = e.target.files; // File objects collection (files attached by user)
            var model; // AudioFileModel object
            this.attachedFilesNumber = files.length;

        [].forEach.call(files, file => { // create model object for each attached file
                model = new AudioFileModel(file, this);
                this.models.push(model); // add model object to collection
            });
        });
    }

    // calculate timestamps for each audio file
    calculateTimestamps() {
        console.log("Obliczam timestamps.");
        var timestamp = 0;
        [].forEach.call(this.models, model => {
            model.setTimestamp(timestamp);
            //            model.setConvertedTimestamp(durationHelper.getTimestamp(timestamp));
            timestamp += model.getDuration();
            model.printDuration();
        });

        var options;
        if (this.models[this.models.length - 1].getTimestamp() < 3600)
            options = {includeHours: false};
        else 
            options = {};
        
        var durationHelper = new DurationHelper(options); // default options
        // set converted timestamps
        [].forEach.call(this.models, model => {
            timestamp = model.getTimestamp();
            model.setConvertedTimestamp(durationHelper.getTimestamp(timestamp));
        });
    }

    createViews() {
        let container = document.createElement("div");
        let view; // AudioFileView object
        container.classList.add("audiofiles-container");
        //        container.setAttribute("contenteditable", true);
        [].forEach.call(this.models, model => {
            view = new AudioFileView(model);
            container.appendChild(view.createElement());
            this.views.push(view);
        });
        document.querySelector("body").appendChild(container);
        this.settings = new Settings(this);
    }

    changeExtensionVisibility(isVisible) {
            [].forEach.call(this.views, view => view.setExtensionVisibility(isVisible));
    }
    
    changeLabelSource(source) {
        console.log("Zmieniam źródło na: " + source);
        [].forEach.call(this.views, view => view.changeLabelSource(source));
    }

    // method called by AudioFileModel objects when audio's duration is obtained
    incrementObtainedDurations() {
        this.obtainedDurations++;
        console.log(this.obtainedDurations);
        if (this.obtainedDurations === this.attachedFilesNumber) { // check if model objects are ready to generate timestamps
            console.log("Załadowano wszystkie durations.");
            this.calculateTimestamps();
        }
    }
    
    // method called by AudioFileModel objects when audio's title is obtained
    incrementObtainedTitles() {
        this.obtainedTitles++;
        if(this.obtainedTitles === this.attachedFilesNumber) { // all titles were obtained
            console.log("Załadowano wszystkie titles.");
            this.createViews();
        }
    }
}

export {
    AudioTimestampsGenerator
};
