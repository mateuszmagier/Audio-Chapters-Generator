/*
    files: File objects collection
*/
export class AudioFilesController {
    
    constructor(files) {
        this.obtainedDurations = 0;
        this.attachedFilesNumber = files.length;
    }
    
    // method called by AudioFileModel objects when audio's duration is obtained
    incrementObtainedDurations() {
        this.obtainedDurations++;
        console.log(this.obtainedDurations);
        if(this.obtainedDurations === this.attachedFilesNumber) // check if model objects are ready to generate timestamps
            console.log("Załadowano wszystkie.");
    }
}
