
// Hydra video init
s0.initVideo("https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4")

// Virtual Camera
s1.initCam()

src(s1).modulate(noize(3), .1).thresh(.2).out()

//noize(30, 2).thresh(()=>sin(time)).mult(osc(40, 1, [.5,2].smooth()).colorama(.1).modulate(noize())).out()

//noize(3, 2).modulate(noize(), window.grad1()).out()

//solid(()=>cc[56]).out()