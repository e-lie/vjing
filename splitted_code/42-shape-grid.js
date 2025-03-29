///////////////////////// SHAPE GRID


class ShapeGrid {
  constructor(
    numX=1, numY=1, numZ=1, shape="sphere", size=100, spacing=800,
    scaleSpeed=0, scaleFactor=1,rotSpeed=0, 
    sizeRand=0, posRand=0, res=1
  ){
    this.numX = numX;
    this.numY = numY;
    this.numZ = numZ;
    this.size = size;
    //this.texture = texture;
    this.rotSpeed = rotSpeed;
    this.scaleSpeed = scaleSpeed;
    this.scaleFactor = scaleFactor;
    this.sizeRand = sizeRand;
    this.posRand = posRand;
    this.shape = shape;
    this.res = res;
    this.spacing = spacing;
    // Add rotation properties
    this.rotX = 0;
    this.rotY = 0;
    this.rotZ = 0;
  }

  shapeSize(){
    //return height/3+(frameCount%(height/6))
    return (Math.sin(frameCount*(this.scaleSpeed/100))*this.size + 2*this.size)*this.scaleFactor
  }

  // Update rotation values based on speed and MIDI control
  updateRotation() {
    // Auto-rotation based on rotSpeed
    this.rotX += this.rotSpeed * 0.01;
    this.rotY += this.rotSpeed * 0.015;
    this.rotZ += this.rotSpeed * 0.005;
    
    // Optional: Control rotation with MIDI
    // Uncomment and adjust CC numbers as needed
    // this.rotX = fader3() * TWO_PI; // Map fader to 0-2π
    // this.rotY = fader4() * TWO_PI;
    // this.rotZ = fader5() * TWO_PI;
  }

  display(){
    this.updateRotation();
    let offset = (this.numX - 1) * this.spacing / 2
    for (let x = 0; x < this.numX; x++) {
      for (let y = 0; y < this.numY; y++) {
        for (let z = 0; z < this.numZ; z++) {
          push();
          // Positionner chaque sphère
          translate(
            x * this.spacing - offset,
            y * this.spacing - offset,
            z * this.spacing - offset
          );
          // Apply rotation to each shape
          rotateX(this.rotX);
          rotateY(this.rotY);
          rotateZ(this.rotZ);
          texture(H.get())
          // Couleur basée sur la position
          // let r = map(x, 0, this.numX - 1, 50, 255)
          // let g = map(y, 0, this.numY - 1, 50, 255)
          // let b = map(z, 0, this.numZ - 1, 50, 255)
          // fill(r, g, b)
          if (this.shape == "sphere"){
            sphere(this.shapeSize(), 32)
          } else {
            box(this.shapeSize())
          }
          pop()
        }
      }
    }
  }
}