export default class Insect {
  constructor(difficulty) {
    const rand = Math.random() * window.innerWidth
    this.speed = Math.max(Math.random() * 2, 1)
    this.x = Math.min(Math.max(rand, 100), window.innerWidth)
    this.y = 0
    this.difficulty = difficulty || 1
  }

  move() {
    this.y += this.speed * this.difficulty
  }

  eat() {
    const distanceX = Math.abs(this.x - mouseX)
    const distanceY = Math.abs(this.y - (window.innerHeight - 300));
    if (distanceX < 70 && distanceY < 70) {
      strokeWeight(10)
      stroke(255,0,0)
      line(mouseX, window.innerHeight - 280, this.x, this.y);
      if (distanceX < 50 && distanceY < 50) {
        return this.destroy(true)
      }
    }
      noStroke()
    
  }

  draw(_img) {
    if (this.y > window.innerHeight) {
      this.destroy(false)
    }

    image(_img, this.x, this.y, 50, 50);


  }

  destroy(eaten) {
    //finsects.splice(insects.indexOf(this), 1)
    if (eaten) return 1
  }
}