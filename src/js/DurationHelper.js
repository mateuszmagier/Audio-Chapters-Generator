/*
    helper class; converts duration in seconds into HH:MM:SS format
*/

class DurationHelper {
    constructor(options) {
        this.initOptions(options);
    }

    initOptions(options) {
        var defaultOptions = {
            zeroPrefix: true, // add "0" before elements less than 10 - all elements have 2 digits
            includeHours: true // forces generating timestamp in HH:MM:SS format
        };
        this.options = Object.assign({}, defaultOptions, options);
    }
    
    prefixZero(number) {
        var prefix = "";
        if(number < 10)
            prefix = "0";
        return prefix + number;
    }
}

//export { DurationHelper }