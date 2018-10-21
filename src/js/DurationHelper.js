/*
    helper class; converts duration in seconds into HH:MM:SS format
*/

export class DurationHelper {
    constructor(options) {
        this.initOptions(options);
    }

    initOptions(options) {
        var defaultOptions = {
            zeroPrefix: true // add "0" before elements less than 10 - all elements have 2 digits
        };
        this.options = Object.assign({}, defaultOptions, options);
    }
}
