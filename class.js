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