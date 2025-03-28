function draw() {
    clear()
    background(0)
    orbitControl(1)
    //rotateY(radians(frameCount/1))

    noStroke()
    //texture(H.get())

    //sphere(sphereSize(), 64)
    sphereGrid(sphereSize(1, 3), 2, 2, 2, spacing=700)

    lescreatures.draw()
}
