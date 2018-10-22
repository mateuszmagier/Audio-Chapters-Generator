/*
    helper class; converts duration in seconds into HH:MM:SS format
*/

class DurationHelper {
    constructor(options) {
        var defaultOptions = {
            zeroPrefix: true, // add "0" before elements less than 10 - all elements have 2 digits
            includeHours: true // forces generating timestamp in HH:MM:SS format
        };
        this.options = Object.assign({}, defaultOptions, options);
    }

    // helper method: adds "0" prefix before numbers < 10
    prefixZero(number) {
        if (number < 0)
            throw new RangeError("Number must be not less than 0.");
        if (number > 99)
            throw new RangeError("Number must be less than 100.");
        var prefix = "";
        if (number < 10 && this.options.zeroPrefix)
            prefix = "0";
        return prefix + number;
    }

    // helper method: calculates: hours, minutes and seconds number for given duration in seconds
    calculateTimestamp(duration) {
        var hrs, mins, secs;
        var durationLeft = Math.floor(duration); // convert to integer

        hrs = Math.floor(durationLeft / 3600);
        durationLeft -= (hrs * 3600);

        mins = Math.floor(durationLeft / 60);
        durationLeft -= (mins * 60);
        
        secs = durationLeft;
        
        return [hrs, mins, secs];
    }

    getTimestamp(duration) {

    }
}

//export { DurationHelper }
