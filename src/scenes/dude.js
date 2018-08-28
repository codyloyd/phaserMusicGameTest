export class Dude {
  constructor({ x = 0, y = 0 }) {
    this.x = x;
    this.y = y;
  }
  goUp() {
    if (this.y < 16) {
      this.y -= 1;
    }
  }
  goDown() {
    if (this.y >= 0) {
      this.y += 1;
    }
  }
  goRight() {
    if (this.x < 16) {
      this.x += 1;
    }
  }
  goLeft() {
    if (this.x >= 0) {
      this.x -= 1;
    }
  }
}
