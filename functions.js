document.getElementById('selFormat').onchange = function() {
    let e = document.getElementById("selFormat");
    let format = e.options[e.selectedIndex].value;

    document.getElementById('selStep3')

    if (format === "Chords"){
        document.getElementById("Step3Intervals").style.display = "none"; 
        document.getElementById("Step3Chords").style.display = "block"; 
    }
    else if (format === "Intervals") {
        document.getElementById("Step3Intervals").style.display = "block"; 
        document.getElementById("Step3Chords").style.display = "none"; 
    }
    else {
        document.getElementById("Step3Intervals").style.display = "none"; 
        document.getElementById("Step3Chords").style.display = "none"; 
    }   

    Update();
}

document.getElementById("selTuning").onchange = function() {
    tuning = [];
    strings = [];

    let e = document.getElementById("selTuning");
    choosenTuning = e.options[e.selectedIndex].value;
    
    allTunings.forEach(element => {
        if (element.getName() === choosenTuning)
            tuning = element.getStrings();
    });

    Update();
}

document.getElementById("selText").onchange = function() { 
    let e = document.getElementById("selText");
    choosenNoteView = e.options[e.selectedIndex].value; 
    
    Update() 
};

document.getElementById("selRoot").onchange = function() {Update();};
document.getElementById("selChord").onchange = function() {Update();};

allIntervals.forEach(element => {
    if (document.getElementById(element))
        document.getElementById(element).onchange = function() {Update();};
});


function AddChord() {
    var name = prompt("Choose a name for new chord:"); 
    var intervals = ["P1"];
    /*
    var userInput = prompt("Choose intervals: (separate by commas)");
    var tmpString; 
    userInput.forEach(element => {
        if (element != ",")
            tmpString.push(element);
        else
            intervals.push(tmpString);
    });*/

    //alert(name + " " + "intervals: " + intervals.toString() + " userinput: " + userInput);

    var chord = new Choord(name, intervals);
    allChoords.push(chord);
    changeDropDowns();
}