//Define notes
const numOfFrets = 23;
const allFormats = ["Root", "Intervals", "Chords"]; //, "Scales" TODO Add scales.
const allNotes = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
const allIntervals = ["P1", "m2", "M2", "m3", "M3", "P4", "d5", "P5", "m6", "M6", "m7", "M7"];
const allChoords = [new Choord("major", ["P1", "M3", "P5"]),
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
//const allScales; // TODO
const allTunings = [new Tunings("Standard",         ["E", "B", "G", "D", "A", "E"]),
                    new Tunings("Drop D",           ["E", "B", "G", "D", "A", "D"]),
                    new Tunings("DAGDAD",           ["D", "A", "G", "D", "A", "D"]),
                    new Tunings("Open D",           ["D", "A", "F#/Gb", "D", "A", "D"]),
                    new Tunings("Half-step Down",   ["D#/Eb", "A#/Bb", "F#/Gb", "C#/Db", "G#/Ab", "D#/Eb"]),
                    new Tunings("Whole-step Down",  ["D", "A", "F", "C", "G", "D"])];
const noteView = [["Note", "Note names"], 
                  ["Intervals", "Interval names"], 
                  ["Root", "Root name and intervals"]];

var choosenRoot = "C"; 
var choosenChoord = "Major";
var choosenIntervals = [];
var choosenNotes = [];
var choosenTuning = "Standard";
var choosenNoteView = "Note";
var strings = [];
var tuning = ["E", "B", "G", "D", "A", "E"];

// Define canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// Define coordinates for plotting the notes on the fretboard
var xCoords = [44, 100, 206, 308, 400, 486, 568, 646, 719, 788, 851, 912, 968, 1023, 1075, 1122, 1169, 1212, 1251, 1290, 1326, 1360 , 1392];
var k = [-0.012383901, -0.00619195, -0.001547988, 0.004643963, 0.01006192, 0.013931889];
var m = [42.23839009, 63.61919505, 86.15479876, 108.5356037, 129.993808, 152.6068111];

//Content loaded event
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Ready!");
    changeDropDowns();

    document.getElementById("Step3Intervals").style.display = "none"; 
    document.getElementById("Step3Chords").style.display = "none"; 

    Update();
});

// Main update loop to set notes and intervals correctly
function Update() {
    ctx.clearRect(0, 0, c.width, c.height);
    choosenIntervals.length = 0;
    choosenNotes.length = 0;

    //Update settings from user
    let e = document.getElementById("selRoot");
    choosenRoot = e.options[e.selectedIndex].value;
    e = document.getElementById("selFormat");
    let format = e.options[e.selectedIndex].value;
    e = document.getElementById("selChord");

    choosenChoord = e.options[e.selectedIndex].value;

    // Fill array strings with notes, since the strings can be tuned differently.
    tuning.forEach(elementString => {
        strings.push(BuildString(elementString));
    });

    if (format === "Root")
        DrawIntervals();
    else if (format === "Intervals") {
        allIntervals.forEach(element => {
            try {
                if (document.getElementById(element).checked) 
                    choosenIntervals.push(element);
            } catch (error) {
                
            }
        });
    
        choosenIntervals.forEach(element => {
            choosenNotes.push(FindNoteOfInterval(choosenRoot, element));
        });

        DrawIntervals();
    }
    else if (format === "Chords") {
        allChoords.forEach(element => {
            if (element.getName() === choosenChoord)
                element.getIntervals().forEach(element => {
                    choosenNotes.push(FindNoteOfInterval(choosenRoot, element));
                });
        });
        
        DrawIntervals();
    }
}

function changeDropDowns() {
    // Populate drop down list for root:
    var selectRoot = document.getElementById("selRoot");
    for (i = selectRoot.length - 1; i >= 0; i--) {
        selectRoot.remove(i);
    }
    allNotes.forEach(element => {
        var opt = element;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectRoot.appendChild(el);
    });

    // Populate drop down list for format:
    var selectFormat = document.getElementById("selFormat");
    for (i = selectFormat.length - 1; i >= 0; i--) {
        selectFormat.remove(i);
    }
    allFormats.forEach(element => {
        var opt = element;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectFormat.appendChild(el);
    });

    // Populate drop down lists for chords
    var selectChord = document.getElementById("selChord");
    for (i = selectChord.length - 1; i >= 0; i--) {
        selectChord.remove(i);
    }
    allChoords.forEach(element => {
        var opt = element.getName();
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectChord.appendChild(el);
    });

    // Populate drop down lists for tunings
    var selectTuning = document.getElementById("selTuning");
    for (i = selectTuning.length - 1; i >= 0; i--) {
        selectTuning.remove(i);
    }
    allTunings.forEach(element => {
        var opt = element.getName();
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectTuning.appendChild(el);
    });

    var selectText = document.getElementById("selText");
    for (i = selectText.length - 1; i >= 0; i--) {
        selectText.remove(i);
    }
    noteView.forEach(element => {
        var el = document.createElement("option");
        el.textContent = element[1];
        el.value = element [0];
        selectText.appendChild(el);
    });
}

// Clear canvas
function Clear() {
    ctx.clearRect(0, 0, c.width, c.height);
}

// Method to draw choosen intervals on fretboard
function DrawIntervals() {
    for (var i = 0; i<strings.length; i++) {
        for (var j = 0; j<strings[i].length; j++){
            if (strings[i][j] === choosenRoot)
                DrawNote(ctx, i, j, strings[i][j], true);
            else if (choosenNotes.includes(strings[i][j]))
                DrawNote(ctx, i, j, strings[i][j], false);
        }
    }
}

function FindNoteOfInterval(root, interval) {
    let i = allNotes.indexOf(root) + allIntervals.indexOf(interval);

    if ((i - allNotes.length) >= 0) 
        i -= allNotes.length;
    
    return allNotes[i];
}

function FindIntervalOfNote(root, note) {
    let i = allNotes.indexOf(root);
    let j = allNotes.indexOf(note);

    if (j < i)
        j += allNotes.length;

    return allIntervals[j-i];
}

function BuildString(startNote) {
    var string = [];
    
    let j = allNotes.indexOf(startNote);

    for (var i = 0; i < numOfFrets; i++, j++) {
        if (j >= allNotes.length)
            j = 0;

        string.push(allNotes[j]);
    }

    return string;
}

function DrawNote(canv, string, fret, name, root) {
    let x = xCoords[fret];
    let y = k[string]*x + m[string];
    var text;

    canv.strokeStyle = "white";
    canv.lineWidth = "3";
    canv.beginPath();
    canv.arc(x, y, 12, 0, 2 * Math.PI);
    canv.stroke();

    if (root === true) 
        canv.fillStyle = "green";
    else 
        canv.fillStyle = "blue";

    canv.fill();

    //Text
    canv.font = "16px Helvetica";
    canv.fillStyle = "white";
    if ((choosenNoteView === "Root" && root != true) || (choosenNoteView === "Intervals"))
        text = FindIntervalOfNote(choosenRoot, name);     
    else
        text = name;

    canv.fillText(text, x-10, y+6);
}