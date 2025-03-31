// //noize(30, 2).thresh(()=>sin(time)).mult(osc(40, 1, [.5,2].smooth()).colorama(.1).modulate(noize())).out()


// /////////
// osc(100, .04, .5).modulate(noise(3))
// .rotate(0,.1).invert([0,1].smooth())
// .modulateScale(o0).modulate(voronoi())
// .mult(  shape([3,5,8])
//   .invert()  .modulateScale(voronoi())
//   .repeat([3,5,9].smooth(),[3,5,9].ease())  .modulate(noise(40))
//   .rotate(0,.2))
// .out()
// /////////////
// // noise([1,5].fast(.1).smooth())
// src(s3)// solid(1,1,1)
// // .mult(src(s3).brightness(.5).contrast(3))  // .colorama([0,.3].smooth())
//   .modulateRotate(o0,[0,0,1].fast(1).smooth())  // .mult(
//   //  shape(9)  //  .scale([2,5].fast(.2).smooth())
//   //  .repeat([1,2].fast(.2).smooth(),[1,2].fast(.2).smooth()) //    .rotate(0,0)
//  // .modulate(noise(4),.1) // )
//   // .rotate(0,10)  // .kaleid([1,3].fast(.02).smooth())
//   .out()
// speed=.3
// src(s1).brightness(.2).contrast(2)
// .mult(src(o3).rotate(0,.5).contrast(2).mult(solid(1,1,.45).brightness([0,.6].fast(.1).smooth())), .4).out()
// /// v2
// hush()
// noise([1,5].fast(.1).smooth())
//   .colorama([0,.1,.5].smooth())  .modulateRotate(o0,[.1,2,50].fast(.1).smooth())
//   .mult(   shape(999)
//    .scale([1,5].fast(.2).smooth())   .repeat([1,2].fast(.2).smooth(),[1,2].fast(.2).smooth())
//  .rotate(0,.5) .modulate(noise(4),.1)
//  )  .kaleid([1,1,1.2,3].fast(.05).smooth())
//   //.kaleid(1.5)  .out()
// speed=.2

// (200)  .invert(
//     [1,0].fast(.2)//.ease('easeInOutCubic')  )
//   .repeat(2,2)  .modulate(voronoi([10,20,30].smooth()).modulate(noise(),.03), [0,1,2,1,0,.2,1].fast(1).smooth())
//   .rotate(0,.03)  .scale(1.5,1,16/10)
//   .mult(osc(200, 0, [0,1,2].fast(.3).smooth()).modulate(noise(3)).modulateScale(o0), [0,.3,1].fast(.3).smooth())  .out()
//   hush()
// /////////////////////////////////////////
// noise([3,30].fast(.1).smooth()).contrast([.2,.4,.8].smooth()).colorama([4])
// .modulateRotate(  voronoi(4)
//   .modulate(    noise(),.1)
//    .kaleid([4,8,16,10000,10000,16,8].smooth()  )
//   .scale(1.5,1,16/10)  .scrollX([0,1].fast(.2).smooth()),
//   [1,2,0].smooth())
// .color(2,.3,1,[1,.5,0].smooth())// .rotate(0,10)
// .thresh(.2).mult(src(s1).brightness(.3).contrast(3))
// .out()
// speed=.3
// ////////////////////////////////////////////////
// shape([3,4,10].smooth())
//   .rotate(0,10)  .scale([3,7].fast(10).smooth())
//   .repeat(3,3)  .mult(
//     src(s1).brightness(.4).contrast(4)    .modulateScale(gradient().g(),[.2,2].fast(3).smooth(),0.5)
//   )  // .mult(osc(20,.1,1).mult(osc(23,.2,2)).modulateRotate(voronoi()), .4)
//   // .color(.5,.8,.6)  // .rotate(0,10)
//   // .modulate(noise(),0.01)  .modulateScale(gradient().g(),[.2,1].fast(3).smooth(),0.5)
//   // .modulateScale(o0, [0,.4].smooth())  // .modulate(noise(5),.02)
//   .out(o0)
// speed=.3
// speed=1

// /////////////////////////////////////////
// shape([2,4,999])
// .mult(shape([2,4,999]).invert().scale(.95)).scale([.8,3].smooth())
// .repeat(3,3).rotate(0,.1)
// .mult(osc(10,0,2), .7).modulateScale(gradient().g(),1)
// .modulate(noise([1,5].fast(.2).smooth())).out()
// speed = .4

// osc(30, 0, [0,1.5].fast(.2).smooth()).modulate(
//   osc(30).rotate(0,20)  .mult(src(o0).modulate(noise()))
// ).modulateScale(noise([2,3].smooth()).rotate(0,.5), [0,1].smooth()).mult(
//   shape().mult(shape().rotate([0,3].fast(1).smooth()))  .scrollX([0,1].smooth())
//   .rotate(0,.5)  .scale(2)
//   // .repeat([1,4].fast(.2).smooth(), [1,4].fast(.5).smooth())  , [.7,1].fast(.2).smooth()
// ).modulate(o0, [0,2].fast(0.1).smooth())
// // .mult(solid(.4,.4,.4)).contrast(2)
// .brightness(.5).thresh(.1)
// .out(o0)
// src(o2).mult(src(s3).brightness(.4).contrast())
// .rotate(0,20).out()

// speed=.2