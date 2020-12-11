class Choord {
    constructor (paramName, paramIntervals) 
    {
        this.intervals = new Array;

        paramIntervals.forEach(element => {
            if (allIntervals.includes(element)) 
                this.intervals.push(element);
            else 
                alert("Fault! the choord " + name + " contains an interval that is not defined, interval " + element);
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

allChoords = [  new Choord("major", ["P1", "M3", "P5"]),
                new Choord("minor", ["P1", "m3", "P5"]),	
                new Choord("aug",   ["P1", "M3", "m6"]),
                new Choord("sus4",  ["P1", "P4", "P5"]),
                new Choord("sus2",  ["P1", "M2", "P5"]),
                new Choord("maj7",  ["P1", "M3", "P5", "M7"]),
                new Choord("7",     ["P1", "M3", "P5", "m7"]),
                new Choord("m7",    ["P1", "m3", "P5", "m7"]),
                new Choord("7b5",   ["P1", "m3", "d5", "m7"]),
                new Choord("dim",   ["P1", "m3", "d5", "M6"]),
                new Choord("6",     ["P1", "M3", "P5", "M6"]),
                new Choord("m6",    ["P1", "m3", "P5", "M6"]),
                new Choord("add9",  ["P1", "M2", "M3", "P5"]),
                new Choord("9",     ["P1", "M2", "M3", "P5", "m7"]),
                new Choord("maj9",  ["P1", "M2", "M3", "P5", "M7"]),
                new Choord("m9",    ["P1", "M2", "m3", "P5", "m7"]),
                new Choord("6/9",   ["P1", "M2", "M3", "P5", "M6"]),
                new Choord("11",    ["P1", "M2", "M3", "P4", "P5", "m7"]),
                new Choord("m11",   ["P1", "M2", "m3", "P4", "P5", "m7"]),
                new Choord("13",    ["P1", "M2", "M3",, "P5", "M6", "m7"])];