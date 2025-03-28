
// Hydra video init
//s0.initVideo("https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4")

// Hydra video init
//s0.initVideo("https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4")

// Virtual Camera
s1.initCam(0)
s2.initCam(1)

src(s1)
//.modulate(noize(3), .1)
//.thresh(.2)
.out()

//noize(30, 2).thresh(()=>sin(time)).mult(osc(40, 1, [.5,2].smooth()).colorama(.1).modulate(noize())).out()
