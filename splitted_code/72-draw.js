function draw() {
    clear()

    // background color from gradient with midi cc 23
    const bgColor = getBGColor(fader1());
    background(bgColor.r, bgColor.g, bgColor.b);

    orbitControl(1)
    //rotateY(radians(frameCount/1))

    noStroke()
    //texture(H.get())

    //sphere(sphereSize(), 64)
    //sphereGrid(sphereSize(1, 3), 2, 2, 2, spacing=700)

    if (knob11() > 0.05) {
        lescreatures.draw()
    }

    shapeMagrid.numX=1
    shapeMagrid.numY=1
    shapeMagrid.numZ=1
    shapeMagrid.size=200
    shapeMagrid.spacing=700
    shapeMagrid.scaleSpeed=0
    shapeMagrid.scaleFactor=knob21()*3
    shapeMagrid.rotSpeed=knob22()*3
    shapeMagrid.shape="sphere"
    shapeMagrid.display()
}
