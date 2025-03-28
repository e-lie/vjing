class Creatures{
    constructor(num=30, minSize=5, maxSize=20){
        this.numCreatures = num;
        this.colorPalette = [color(254, 166, 161), color(0, 133, 212), color(252, 197, 3), color(252, 71, 1), color(1, 162, 72)];
        this.creatures = [];
        this.minSize = minSize;
        this.maxSize = maxSize;
    }
    setup(){
      for (let i=0; i<this.numCreatures; i++) {
        let r0 = floor(random(2, 42)); 
        let numCircles = floor(random(this.minSize, this.maxSize));
        this.creatures.push(new Creature(r0, numCircles, this.colorPalette[i % this.colorPalette.length]));
      }
    }
    draw(){
      translate(-windowWidth/2,-windowHeight/2);
      for (let i=0; i<this.numCreatures; i++) {
        this.creatures[i].update();
        this.creatures[i].display();
      }
    }
}