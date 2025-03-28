
// MIDI CC messages handling with webmidi

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
///////// SHAPE GRID

function sphereSize(factor=1, speed=1){
    //return height/3+(frameCount%(height/6))
    return (Math.sin(frameCount*(speed/100))*100 +200)*factor
   }
   
   function sphereGrid(sphereSize=100, gridX=5, gridY=5, gridZ=5, spacing=200){
     let offset = (gridX - 1) * spacing / 2
     for (let x = 0; x < gridX; x++) {
       for (let y = 0; y < gridY; y++) {
         for (let z = 0; z < gridZ; z++) {
           push();
           // Positionner chaque sphère
           translate(
             x * spacing - offset,
             y * spacing - offset,
             z * spacing - offset
           );
           // Couleur basée sur la position
   /*        let r = map(x, 0, gridX - 1, 50, 255)
           let g = map(y, 0, gridY - 1, 50, 255)
           let b = map(z, 0, gridZ - 1, 50, 255)
           fill(r, g, b)*/
           texture(H.get())
           sphere(sphereSize, 32)
           pop()
         }
       }
     }
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
      translate(-windowWidth/2,-windowHeight/2);
      for (let i=0; i<this.numCreatures; i++) {
        this.creatures[i].update();
        this.creatures[i].display();
      }
    }
}






///////////////////////////////




//////////////////////////////



H.toggle(1)
H.pd(.5)

function grad1() {
 return [.2,.999].smooth()
}


//noize(30, 2).thresh(()=>sin(time)).mult(osc(40, 1, [.5,2].smooth()).colorama(.1).modulate(noize())).out()
//noize(3, 2).modulate(noize(), window.grad1()).out()

s0.initVideo("https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4")
s1.initCam()
src(s1).modulate(noize(3), .1).thresh(.2).out()
//solid(()=>cc[56]).out()


speed=10
let lescreatures;

function setup() {
 lescreatures = new Creatures(20);
 createCanvas(windowWidth, windowHeight, WEBGL)
 P5.zIndex(1)
 normalMaterial()
 lescreatures.setup()
}




function draw() {
 clear()
 background(0)
 orbitControl(1)
 //rotateY(radians(frameCount/1))

 noStroke()
 //texture(H.get())
 
 //sphere(sphereSize(), 64)
 sphereGrid(sphereSize(1, 3), 2, 2, 2, spacing=700)
 
 lescreatures.draw()
}


var H2 = HY5.hydra('h2', 'synth')
H2.pixelDensity(2)
H2.zIndex(2)
synth.s0.initP5()
synth.s1.initCam()

synth.src(synth.s0)
    //.add(src(synth.s1),.8)
	//.modulateScale(synth.src(synth.o0).scale(1.01), [0,2].fast(0.1).smooth())
	//.modulateRotate(synth.src(synth.o0), [0,2].fast(1).smooth())
	//.thresh([.2,.7].smooth())
	//.modulate(osc(8,.2),.03)
	//.brightness(.2)
	//.contrast(3)
	.out()
