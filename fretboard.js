//Define notes
const allNotes = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"];
const allIntervals = ["P1", "m2", "M2", "m3", "M3", "P4", "d5", "P5", "m6", "M6", "m7", "M7"];
const numOfFrets = 23;

var choosenRoot; 
var choosenIntervals = [];
var choosenNotes = [];
var strings = [];

var tuning = ["E", "B", "G", "D", "A", "E"];
var xCoords = [44, 100, 206, 308, 400, 486, 568, 646, 719, 788, 851, 912, 968, 1023, 1075, 1122, 1169, 1212, 1251, 1290, 1326, 1360 , 1392];
var k = [-0.012383901, -0.00619195, -0.001547988, 0.004643963, 0.01006192, 0.013931889];
var m = [42.23839009, 63.61919505, 86.15479876, 108.5356037, 129.993808, 152.6068111];


// Define canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function Update() {
    ctx.clearRect(0, 0, c.width, c.height);
    choosenIntervals.length = 0;
    choosenNotes.length = 0;

    let e = document.getElementById("Root");
    choosenRoot = e.options[e.selectedIndex].value;

    e = document.getElementById("Format");
    let format = e.options[e.selectedIndex].value;
    
    if (format === "Intervals")
        DrawIntervals();
    else if (format === "Chords")
        DrawChoord();
    else if (format === "Root")
        DrawRoots();
}

function Clear() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function DrawRoots() {
    tuning.forEach(elementString => {
        strings.push(BuildString(elementString));
    });

    for (var i = 0; i<strings.length; i++) {
        for (var j = 0; j<strings[i].length; j++){
            if (strings[i][j] === choosenRoot)
                DrawNote(ctx, i, j, strings[i][j], true);
        }
    }
}

function DrawIntervals() {
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

    tuning.forEach(elementString => {
        strings.push(BuildString(elementString));
    });

    for (var i = 0; i<strings.length; i++) {
        for (var j = 0; j<strings[i].length; j++){
            if (strings[i][j] === choosenRoot)
                DrawNote(ctx, i, j, strings[i][j], true);
            else if (choosenNotes.includes(strings[i][j]))
                DrawNote(ctx, i, j, strings[i][j], false);
        }
    }
}


function DrawChoord() {
    e = document.getElementById("Choord");
    let choosenChoord = e.options[e.selectedIndex].value;

    allChoords.forEach(element => {
        if (element.getName() === choosenChoord)
            element.getIntervals().forEach(element => {
                choosenNotes.push(FindNoteOfInterval(choosenRoot, element));
            });
    });

    tuning.forEach(elementString => {
        strings.push(BuildString(elementString));
    });

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
    canv.font = "20px Helvetica";
    canv.fillStyle = "white";
    canv.fillText(name, x-6, y+8);
}