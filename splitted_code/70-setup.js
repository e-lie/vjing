
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
