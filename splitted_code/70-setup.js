
///////////////////////////// MAIN P5JS code

speed=10
let lescreatures;

function setup() {
    lescreatures = new Creatures(20);
    createCanvas(windowWidth, windowHeight, WEBGL)
    P5.zIndex(1)
    normalMaterial()
    lescreatures.setup()
}
