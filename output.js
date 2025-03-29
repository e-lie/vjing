
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
var cc=Array(128).fill(0)

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
/////////////////// CREATURES
/////// inspired by : https://editor.p5js.org/pattvira/sketches/kjOYvnP6F

class Segment {
    constructor(x, y, r, c) {
      this.x = x;
      this.y = y;
      this.r = r; 
      this.angle = 0;
      this.face = false;
      this.c = c;
    }
    
    update(x, y, speed, distTarget) {
      let dx = x - this.x;
      let dy = y - this.y;
      this.angle = atan2(dy, dx);
  
      let distBtw = dist(x, y, this.x, this.y);
      if (distBtw > distTarget) {
        let distTravel = distBtw - distTarget;
        this.x += speed * distTravel * cos(this.angle);
        this.y += speed * distTravel * sin(this.angle);
      }
  
    }
    
    display() {
      stroke(255);
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      
      if (this.face) {
        fill(this.c); 
      } else {
        noFill();
      }
      ellipse(0, 0, this.r*2, this.r*2);
      // line(0, 0, this.r, 0);
      
      if (this.face) {
        this.drawFace();
      }
      
      pop();
    }
    
    drawFace() {
      rotate(HALF_PI);
      // Eyes
      noStroke();
      fill(0);
      let eyeOffsetX = this.r * 0.3;
      let eyeOffsetY = -this.r * 0.1;
      ellipse(-eyeOffsetX, eyeOffsetY, 4, 4);
      ellipse(eyeOffsetX, eyeOffsetY, 4, 4);
      
      // Nose 
      ellipse(0, 0, 3, 3);
      
      // Mouth
      noFill();
      stroke(0);
      let x = 0;
      let y = this.r * 0.15; 
      let w = this.r * 0.6;
      let h = this.r * 0.4; 
      arc(x, y, w, h, 0, PI);
    }
  }
class Creature {
    constructor(r0, num, c) {
      this.segments = []; 
      this.num = num;
      this.r0 = r0; 
      this.c = c;
      
      for (let i=0; i<this.num; i++) {
        let x = width/2 - i*this.r0;
        let y = height/2;
        let r = this.r0 * 1.5 - (this.r0 / (this.num - 1)) * i
        this.segments[i] = new Segment(x, y, r, this.c);
      }
  
  
      this.target = createVector(random(width), random(height));
      this.velocity = p5.Vector.random2D().mult(random(1, 3));
      
      this.head = this.segments[0];
      this.head.face = true;
      this.tail = this.segments[this.segments.length-1];
      
    }
    
    update() {
      this.setDirection();
  
      // Head 
      this.head.update(this.target.x, this.target.y, 0.1, 10);
  
      // Body
      for (let i=1; i<this.num; i++) {
        let prev = this.segments[i - 1];
        let curr = this.segments[i];
        let distTarget = (prev.r + curr.r)/2;
        this.segments[i].update(prev.x, prev.y, 1, distTarget);
      }  
      
    }
    
    setDirection() {
      this.target.add(this.velocity);
    
      if (this.target.x > width) {
        this.velocity.x *= -1;
        this.target.x = width;
      } else if (this.target.x < 0) {
        this.velocity.x *= -1;
        this.target.x = 0;
      }
  
      if (this.target.y > height) {
        this.velocity.y *= -1;
        this.target.y = height;
      } else if (this.target.y < 0) {
        this.velocity.y *= -1;
        this.target.y = 0;
      }
  
      noStroke();
      // fill(0);
      // ellipse(this.target.x, this.target.y, 5, 5);
    }
    
    display() {
        
      this.displayOutline();
      this.displayCircles();
      this.head.display();
    }
    
    displayCircles() {
      for (let i=0; i<this.num; i++) {
        this.segments[i].display();
      }
    }
    
    displayOutline() {
      fill(this.c);
  
      beginShape();
      for (let i = HALF_PI; i> -HALF_PI; i-=PI/20) {
        let x = this.head.x + this.head.r * cos(this.head.angle + i);
        let y = this.head.y + this.head.r * sin(this.head.angle + i);
        vertex(x, y);
      }
      
      for (let i=0; i<this.segments.length; i++) {
        let seg = this.segments[i];
        let x = seg.x + seg.r * cos(seg.angle - HALF_PI);
        let y = seg.y + seg.r * sin(seg.angle - HALF_PI);
        vertex(x, y);
      }
      
      for (let i = 3*HALF_PI; i>HALF_PI; i-=PI/20) {
        let x = this.tail.x + this.tail.r * cos(this.tail.angle + i);
        let y = this.tail.y + this.tail.r * sin(this.tail.angle + i);
        vertex(x, y);
      }
      
      for (let i=this.segments.length-1; i>=0; i--) {
        let seg = this.segments[i];
        let x = seg.x + seg.r * cos(seg.angle + HALF_PI);
        let y = seg.y + seg.r * sin(seg.angle + HALF_PI);
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }
class Creatures{
    constructor(num=30, minSize=5, maxSize=20){
        this.numCreatures = num;
        this.colorPalette = [color(254, 166, 161), color(0, 133, 212), color(252, 197, 3), color(252, 71, 1), color(1, 162, 72)];
        this.creatures = [];
        this.minSize = minSize;
        this.maxSize = maxSize;
    }
    setup(){
      for (let i=0; i<this.numCreatures; i++) {
        let r0 = floor(random(2, 42)); 
        let numCircles = floor(random(this.minSize, this.maxSize));
        this.creatures.push(new Creature(r0, numCircles, this.colorPalette[i % this.colorPalette.length]));
      }
    }
    draw(){
      push()
      translate(-windowWidth/2,-windowHeight/2);
      for (let i=0; i<this.numCreatures; i++) {
        this.creatures[i].update();
        this.creatures[i].display();
      }
      pop()
    }
}

///////////////////////// SHAPE GRID


class ShapeGrid {
  constructor(
    numX=1, numY=1, numZ=1, shape="sphere", size=100, spacing=800,
    scaleSpeed=0, scaleFactor=1,rotSpeed=0, 
    sizeRand=0, posRand=0, res=1
  ){
    this.numX = numX;
    this.numY = numY;
    this.numZ = numZ;
    this.size = size;
    //this.texture = texture;
    this.rotSpeed = rotSpeed;
    this.scaleSpeed = scaleSpeed;
    this.scaleFactor = scaleFactor;
    this.sizeRand = sizeRand;
    this.posRand = posRand;
    this.shape = shape;
    this.res = res;
    this.spacing = spacing;
    // Add rotation properties
    this.rotX = 0;
    this.rotY = 0;
    this.rotZ = 0;
  }

  shapeSize(){
    //return height/3+(frameCount%(height/6))
    return (Math.sin(frameCount*(this.scaleSpeed/100))*this.size + 2*this.size)*this.scaleFactor
  }

  // Update rotation values based on speed and MIDI control
  updateRotation() {
    // Auto-rotation based on rotSpeed
    this.rotX += this.rotSpeed * 0.01;
    this.rotY += this.rotSpeed * 0.015;
    this.rotZ += this.rotSpeed * 0.005;
    
    // Optional: Control rotation with MIDI
    // Uncomment and adjust CC numbers as needed
    // this.rotX = fader3() * TWO_PI; // Map fader to 0-2π
    // this.rotY = fader4() * TWO_PI;
    // this.rotZ = fader5() * TWO_PI;
  }

  display(){
    this.updateRotation();
    let offset = (this.numX - 1) * this.spacing / 2
    for (let x = 0; x < this.numX; x++) {
      for (let y = 0; y < this.numY; y++) {
        for (let z = 0; z < this.numZ; z++) {
          push();
          // Positionner chaque sphère
          translate(
            x * this.spacing - offset,
            y * this.spacing - offset,
            z * this.spacing - offset
          );
          // Apply rotation to each shape
          rotateX(this.rotX);
          rotateY(this.rotY);
          rotateZ(this.rotZ);
          texture(H.get())
          // Couleur basée sur la position
          // let r = map(x, 0, this.numX - 1, 50, 255)
          // let g = map(y, 0, this.numY - 1, 50, 255)
          // let b = map(z, 0, this.numZ - 1, 50, 255)
          // fill(r, g, b)
          if (this.shape == "sphere"){
            sphere(this.shapeSize(), 32)
          } else {
            box(this.shapeSize())
          }
          pop()
        }
      }
    }
  }
}
///////////////////// P5 helper functions

// Define the four colors for your gradient (add these before setup function)
const gradientColors = [
    { r: 0, g: 0, b: 0 },       //  Black
    { r: 50, g: 50, b: 50 },  // grey
    { r: 255, g: 255, b: 255 },  // White
    { r: 255, g: 0, b: 100 },   // Red
    { r: 255, g: 255, b: 0 },    // Yellow
    { r: 0, g: 150, b: 255 },   // Blue
    { r: 0, g: 0, b: 0 },    //  Black
];
  
// Function to interpolate between colors in the gradient
function getBGColor(position) {
    // Ensure position is between 0 and 1
    position = constrain(position, 0, 1);
    
    // Calculate which segment of the gradient we're in
    // With 4 colors, we have 3 segments (0-1, 1-2, 2-3)
    const numSegments = gradientColors.length - 1;
    const segmentSize = 1 / numSegments;
    
    // Find the segment indices
    const segmentIndex = Math.min(Math.floor(position / segmentSize), numSegments - 1);
    const colorStart = gradientColors[segmentIndex];
    const colorEnd = gradientColors[segmentIndex + 1];
    
    // Calculate the position within the current segment (0 to 1)
    const segmentPosition = (position - segmentIndex * segmentSize) / segmentSize;
    
    // Interpolate between the two colors
    return {
      r: lerp(colorStart.r, colorEnd.r, segmentPosition),
      g: lerp(colorStart.g, colorEnd.g, segmentPosition),
      b: lerp(colorStart.b, colorEnd.b, segmentPosition)
    };
}
//////////////// HYDRA HELPER FUNCTIONS

function grad1() {
    return [.2,.999].smooth()
}
//////////////// HYDRA1

H.toggle(1)
H.pd(.5)


// Hydra video init
//s0.initVideo("https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4")

// Hydra video init
//s0.initVideo("https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4")

// Virtual Camera
s1.initCam(0)
s2.initCam(1)

src(s1).blend(src(s2), ()=>knob31())
//.modulate(noize(3), .1)
//.thresh(.2)
.out()

//noize(30, 2).thresh(()=>sin(time)).mult(osc(40, 1, [.5,2].smooth()).colorama(.1).modulate(noize())).out()


///////////////////////////// MAIN P5JS code

speed=10
let lescreatures
let shapeMagrid

function setup() {
    lescreatures = new Creatures(20)
    shapeMagrid = new ShapeGrid(
    	2,2,2,"cube",
    	50, 700,
    	1,//scaleSpeed
    	2,//scaleFactor
    	0,//rotSpeed
    )
    createCanvas(windowWidth, windowHeight, WEBGL)
    P5.zIndex(1)
    normalMaterial()
    lescreatures.setup()
}

function draw() {
    clear()

    // background color from gradient with midi cc 23
    const bgColor = getBGColor(fader1());
    background(bgColor.r, bgColor.g, bgColor.b);

    orbitControl(1)
    //rotateY(radians(frameCount/1))

    noStroke()
    //texture(H.get())

    //sphere(sphereSize(), 64)
    //sphereGrid(sphereSize(1, 3), 2, 2, 2, spacing=700)

    if (knob11() > 0.05) {
        lescreatures.draw()
    }

    shapeMagrid.numX=1
    shapeMagrid.numY=1
    shapeMagrid.numZ=1
    shapeMagrid.size=200
    shapeMagrid.spacing=700
    shapeMagrid.scaleSpeed=0
    shapeMagrid.scaleFactor=knob21()*3
    shapeMagrid.rotSpeed=knob22()*3
    shapeMagrid.shape="sphere"
    shapeMagrid.display()
}

//////////////// HYDRA2

var H2 = HY5.hydra('h2', 'synth')
H2.pixelDensity(2)
H2.zIndex(2)
synth.s0.initP5()
synth.s1.initCam(0)
synth.s2.initCam(1)


synth.src(synth.s0)
  .blend(// mix p5, vjing, and webcam with fader3 and knob31
  	src(synth.s0)
    .blend(src(synth.s1), 1)
    .blend(src(synth.s2), ()=>knob31()),
  	()=>fader3()
  )
	//.modulateRotate(synth.src(synth.o0), [0,2].fast(1).smooth())
	//.thresh([.2,.7].smooth())
	//.modulate(osc(8,.2),.03)
	//.brightness(.2)
  //.contrast(1)
  .modulateScale(
    synth.src(synth.o0)
    .scale(1.01),
    ()=>fader2(),
  )
.out()




