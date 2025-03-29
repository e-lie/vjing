
///////////////////////////// MAIN P5JS code

speed=10
let lescreatures
let shapeMagrid

function setup() {
    lescreatures = new Creatures(20)
    shapeMagrid = new ShapeGrid(3,3,3,"sphere", 50, 800)
    createCanvas(windowWidth, windowHeight, WEBGL)
    P5.zIndex(1)
    normalMaterial()
    lescreatures.setup()
}
