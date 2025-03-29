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