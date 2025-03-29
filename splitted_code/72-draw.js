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

    lescreatures.draw()
    shapeMagrid.display()
}
