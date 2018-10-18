import { AudioFilesController } from './AudioFilesController';
import { AudioFileModel } from './AudioFileModel';

document.addEventListener("DOMContentLoaded", () => {

    var input = document.querySelector("#files-input"); // files input used to load audio files
    var model = null, // AudioFileModel object
        models = [], // array of AudioFileModel objects
        controller = null; // AudioFilesController object

    // user attached audio files
    input.addEventListener("change", e => {
        var files = e.target.files; // File objects collection (files attached by user)
        
        controller = new AudioFilesController(files);
        
        [].forEach.call(files, file => { // create model object for each attached file
            model = new AudioFileModel(file, controller);
            models.push(model); // add model object to collection
        });
    });
});
