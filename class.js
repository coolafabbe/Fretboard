class Choord {
    constructor (paramName, paramIntervals) 
    {
        this.intervals = new Array;

        paramIntervals.forEach(element => {
            if (allIntervals.includes(element)) 
                this.intervals.push(element);
            else 
                alert("Fault! the choord " + paramName + " contains an interval that is not defined, interval " + element);
        });

        this.name = paramName;
    }
    getIntervals() {
        return this.intervals;
    }
    getName() {
        return this.name;
    }
}

class Tunings {
    constructor (paramName, paramStrings) {
        this.name = paramName;
        this.strings = new Array;

        paramStrings.forEach(element => {
            if (allNotes.includes(element)) 
                this.strings.push(element);
            else 
                alert("Fault! the tuning " + paramName + " contains an note that is not defined, note " + element);
        });

        if (this.strings.length != 6)
            alert("Fault! the tuning " + paramName + " does not contain 6 strings. Defined strings is : " + this.strings.toString());
    }
    getStrings() {
        return this.strings;
    }
    getName() {
        return this.name;
    }
}