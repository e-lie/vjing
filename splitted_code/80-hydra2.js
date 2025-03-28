//////////////// HYDRA2

var H2 = HY5.hydra('h2', 'synth')
H2.pixelDensity(2)
H2.zIndex(2)
synth.s0.initP5()
synth.s1.initCam()

synth.src(synth.s0)
  .add(
  	src(synth.s2).blend(src(synth.s1), ()=>fader4()),
  	()=>fader3()
  )
	//.modulateRotate(synth.src(synth.o0), [0,2].fast(1).smooth())
	//.thresh([.2,.7].smooth())
	//.modulate(osc(8,.2),.03)
	//.brightness(.2)
  .contrast(()=>fader5()*3)
  .modulateScale(
    synth.src(synth.o0)
    .scale(1.01),
    ()=>fader2(),
  )
.out()