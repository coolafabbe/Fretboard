document.getElementById('Format').onchange = function() {
    //alert('Format changed!');

    let e = document.getElementById("Format");
    let format = e.options[e.selectedIndex].value;

    document.getElementById('Step3')

    if (format === "Chords"){
        document.getElementById("Step3Intervals").style.display = "none"; 
        document.getElementById("Step3Chords").style.display = "block"; 

        //document.getElementById('Step3').innerHTML = "<form><label for='Choord'><strong>Step3:</strong> Choose a Choord:</label><br><select name='Choord' id='Choord'>  <option value='major'>major</option><option value='minor'>minor</option><option value='aug'>aug</option><option value='sus4'>sus4</option><option value='sus2'>sus2</option><option value='maj7'>maj7</option><option value='7'>7</option><option value='m7'>m7</option><option value='7b5'>7b5</option><option value='dim'>dim</option><option value='6'>6</option><option value='m6'>m6</option><option value='add9'>add9</option><option value='9'>9</option><option value='m9'>m9</option><option value='6/9'>6/9</option><option value='11'>11</option><option value='m11'>m11</option><option value='13'>13</option></select></form>";
    }
    else if (format === "Intervals") {
        document.getElementById("Step3Intervals").style.display = "block"; 
        document.getElementById("Step3Chords").style.display = "none"; 
        
        //document.getElementById('Step3').innerHTML = "<form><label for='Interval'><strong>Step3:</strong> Choose intervals:</label><br><input type='checkbox' id='m2'>m2<input type='checkbox' id='M2'>M2<input type='checkbox' id='m3'>m3<input type='checkbox' id='M3'>M3<input type='checkbox' id='P4'>P4<input type='checkbox' id='d5'>d5<input type='checkbox' id='P5'>P5<input type='checkbox' id='m6'>m6<input type='checkbox' id='M6'>M6<input type='checkbox' id='m7'>m7<input type='checkbox' id='M7'>M7</form>"; 
    }
    else {
        document.getElementById("Step3Intervals").style.display = "none"; 
        document.getElementById("Step3Chords").style.display = "none"; 
    }   

    Update();
}