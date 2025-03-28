///////// SHAPE GRID

function sphereSize(factor=1, speed=1){
    //return height/3+(frameCount%(height/6))
    return (Math.sin(frameCount*(speed/100))*100 +200)*factor
   }
   
   function sphereGrid(sphereSize=100, gridX=5, gridY=5, gridZ=5, spacing=200){
     let offset = (gridX - 1) * spacing / 2
     for (let x = 0; x < gridX; x++) {
       for (let y = 0; y < gridY; y++) {
         for (let z = 0; z < gridZ; z++) {
           push();
           // Positionner chaque sphère
           translate(
             x * spacing - offset,
             y * spacing - offset,
             z * spacing - offset
           );
           // Couleur basée sur la position
   /*        let r = map(x, 0, gridX - 1, 50, 255)
           let g = map(y, 0, gridY - 1, 50, 255)
           let b = map(z, 0, gridZ - 1, 50, 255)
           fill(r, g, b)*/
           texture(H.get())
           sphere(sphereSize, 32)
           pop()
         }
       }
     }
   }