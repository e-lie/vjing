/////////////////////// MIDI CC messages handling with webmidi

// register WebMIDI
navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);

    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
    for (var input of midiAccess.inputs.values()){
        input.onmidimessage = getMIDIMessage;
    }
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

//create an array to hold our cc values and init to a normalized value
var cc=Array(128).fill(0.5)

getMIDIMessage = function(midiMessage) {
    var arr = midiMessage.data    
    var index = arr[1]
    //console.log('Midi received on cc#' + index + ' value:' + arr[2])    // uncomment to monitor incoming Midi
    var val = (arr[2]+1)/128.0  // normalize CC values to 0.0 - 1.0
    cc[index]=val
}


///// Midi Mix mapping

function fader1(){
    return cc[19]
}
function fader2(){
    return cc[23]
}
function fader3(){
    return cc[27]
}
function fader4(){
    return cc[31]
}
function fader5(){
    return cc[49]
}
function fader6(){
    return cc[53]
}
function fader7(){
    return cc[57]
}
function fader8(){
    return cc[61]
}
function faderMaster(){
    return cc[62]
}


function knob11(){
    return cc[16]
}
function knob12(){
    return cc[17]
}
function knob13(){
    return cc[18]
}

function knob21(){
    return cc[20]
}
function knob22(){
    return cc[21]
}
function knob23(){
    return cc[22]
}


function knob31(){
    return cc[24]
}
function knob32(){
    return cc[25]
}
function knob33(){
    return cc[26]
}


function knob41(){
    return cc[28]
}
function knob42(){
    return cc[29]
}
function knob43(){
    return cc[30]
}


function knob51(){
    return cc[46]
}
function knob52(){
    return cc[47]
}
function knob53(){
    return cc[48]
}

function knob61(){
    return cc[50]
}
function knob62(){
    return cc[51]
}
function knob63(){
    return cc[52]
}

function knob71(){
    return cc[54]
}
function knob72(){
    return cc[55]
}
function knob73(){
    return cc[56]
}

function knob81(){
    return cc[58]
}
function knob82(){
    return cc[59]
}
function knob83(){
    return cc[60]
}