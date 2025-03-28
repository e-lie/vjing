




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
