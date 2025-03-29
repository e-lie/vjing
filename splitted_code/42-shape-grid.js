///////////////////////// SHAPE GRID


class ShapeGrid {
  constructor(
    numX=1, numY=1, numZ=1, shape="sphere", size=100, spacing=800, texture=null,
    rotSpeed=0, scaleSpeed=0, scaleFactor=1,
    sizeRand=0, posRand=0, res=1
  ){
    this.numX = numX;
    this.numY = numY;
    this.numZ = numZ;
    this.size = size;
    this.texture = texture;
    this.rotSpeed = rotSpeed;
    this.scaleSpeed = scaleSpeed;
    this.scaleFactor = scaleFactor;
    this.sizeRand = sizeRand;
    this.posRand = posRand;
    this.shape = shape;
    this.res = res;
    this.spacing = this.size *2;
  }

  shapeSize(){
    //return height/3+(frameCount%(height/6))
    return (Math.sin(frameCount*(this.scaleSpeed/100))*100 +200)*this.scaleFactor
  }

  display(){
    let offset = (this.numX - 1) * this.spacing / 2
    for (let x = 0; x < this.numX; x++) {
      for (let y = 0; y < this.numY; y++) {
        for (let z = 0; z < this.numZ; z++) {
          push();
          // Positionner chaque sphère
          translate(windowWidth/2, windowHeight/2)
          translate(
            x * this.spacing - offset,
            y * this.spacing - offset,
            z * this.spacing - offset
          );
          if (this.texture !== null) {
            //texture(H.get())
            texture(this.texture())
          } else {
            // Couleur basée sur la position
            let r = map(x, 0, this.numX - 1, 50, 255)
            let g = map(y, 0, this.numY - 1, 50, 255)
            let b = map(z, 0, this.numZ - 1, 50, 255)
            fill(r, g, b)
          }
          if (this.shape == "sphere"){
            sphere(this.shapeSize(), 32)
          } else {
            cube()
          }
          pop()
        }
      }
    }
  }
}