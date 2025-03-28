class Creature {
    constructor(r0, num, c) {
      this.segments = []; 
      this.num = num;
      this.r0 = r0; 
      this.c = c;
      
      for (let i=0; i<this.num; i++) {
        let x = width/2 - i*this.r0;
        let y = height/2;
        let r = this.r0 * 1.5 - (this.r0 / (this.num - 1)) * i
        this.segments[i] = new Segment(x, y, r, this.c);
      }
  
  
      this.target = createVector(random(width), random(height));
      this.velocity = p5.Vector.random2D().mult(random(1, 3));
      
      this.head = this.segments[0];
      this.head.face = true;
      this.tail = this.segments[this.segments.length-1];
      
    }
    
    update() {
      this.setDirection();
  
      // Head 
      this.head.update(this.target.x, this.target.y, 0.1, 10);
  
      // Body
      for (let i=1; i<this.num; i++) {
        let prev = this.segments[i - 1];
        let curr = this.segments[i];
        let distTarget = (prev.r + curr.r)/2;
        this.segments[i].update(prev.x, prev.y, 1, distTarget);
      }  
      
    }
    
    setDirection() {
      this.target.add(this.velocity);
    
      if (this.target.x > width) {
        this.velocity.x *= -1;
        this.target.x = width;
      } else if (this.target.x < 0) {
        this.velocity.x *= -1;
        this.target.x = 0;
      }
  
      if (this.target.y > height) {
        this.velocity.y *= -1;
        this.target.y = height;
      } else if (this.target.y < 0) {
        this.velocity.y *= -1;
        this.target.y = 0;
      }
  
      noStroke();
      // fill(0);
      // ellipse(this.target.x, this.target.y, 5, 5);
    }
    
    display() {
        
      this.displayOutline();
      this.displayCircles();
      this.head.display();
    }
    
    displayCircles() {
      for (let i=0; i<this.num; i++) {
        this.segments[i].display();
      }
    }
    
    displayOutline() {
      fill(this.c);
  
      beginShape();
      for (let i = HALF_PI; i> -HALF_PI; i-=PI/20) {
        let x = this.head.x + this.head.r * cos(this.head.angle + i);
        let y = this.head.y + this.head.r * sin(this.head.angle + i);
        vertex(x, y);
      }
      
      for (let i=0; i<this.segments.length; i++) {
        let seg = this.segments[i];
        let x = seg.x + seg.r * cos(seg.angle - HALF_PI);
        let y = seg.y + seg.r * sin(seg.angle - HALF_PI);
        vertex(x, y);
      }
      
      for (let i = 3*HALF_PI; i>HALF_PI; i-=PI/20) {
        let x = this.tail.x + this.tail.r * cos(this.tail.angle + i);
        let y = this.tail.y + this.tail.r * sin(this.tail.angle + i);
        vertex(x, y);
      }
      
      for (let i=this.segments.length-1; i>=0; i--) {
        let seg = this.segments[i];
        let x = seg.x + seg.r * cos(seg.angle + HALF_PI);
        let y = seg.y + seg.r * sin(seg.angle + HALF_PI);
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }