/////////////////// CREATURES
/////// inspired by : https://editor.p5js.org/pattvira/sketches/kjOYvnP6F

class Segment {
    constructor(x, y, r, c) {
      this.x = x;
      this.y = y;
      this.r = r; 
      this.angle = 0;
      this.face = false;
      this.c = c;
    }
    
    update(x, y, speed, distTarget) {
      let dx = x - this.x;
      let dy = y - this.y;
      this.angle = atan2(dy, dx);
  
      let distBtw = dist(x, y, this.x, this.y);
      if (distBtw > distTarget) {
        let distTravel = distBtw - distTarget;
        this.x += speed * distTravel * cos(this.angle);
        this.y += speed * distTravel * sin(this.angle);
      }
  
    }
    
    display() {
      stroke(255);
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      
      if (this.face) {
        fill(this.c); 
      } else {
        noFill();
      }
      ellipse(0, 0, this.r*2, this.r*2);
      // line(0, 0, this.r, 0);
      
      if (this.face) {
        this.drawFace();
      }
      
      pop();
    }
    
    drawFace() {
      rotate(HALF_PI);
      // Eyes
      noStroke();
      fill(0);
      let eyeOffsetX = this.r * 0.3;
      let eyeOffsetY = -this.r * 0.1;
      ellipse(-eyeOffsetX, eyeOffsetY, 4, 4);
      ellipse(eyeOffsetX, eyeOffsetY, 4, 4);
      
      // Nose 
      ellipse(0, 0, 3, 3);
      
      // Mouth
      noFill();
      stroke(0);
      let x = 0;
      let y = this.r * 0.15; 
      let w = this.r * 0.6;
      let h = this.r * 0.4; 
      arc(x, y, w, h, 0, PI);
    }
  }