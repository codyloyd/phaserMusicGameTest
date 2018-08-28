import player from "../tone";
import { Dude } from "./dude";

export class SimpleScene extends Phaser.Scene {
  preload() {
    this.balls = new Phaser.GameObjects.Group(this);
    this.dude = new Dude({ x: 0, y: 15 });
    // this.counter = this.add.text(324, 192, 0);
    this.load.image("floortile", "./assets/art/musicgame_0.png");
    this.load.image("dude", "assets/art/musicgame_1.png");
    this.load.image("ball", "assets/art/musicgame_2.png");
  }
  create() {
    // keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    // background groups
    this.rows = [];
    for (let x = 0; x < 16; x++) {
      this.rows[x] = new Phaser.GameObjects.Group(this);
      for (let y = 0; y < 16; y++) {
        this.rows[x].get(x * 16, y * 16, "floortile").setOrigin(0, 0);
      }
    }
    this.player = this.add
      .image(this.dude.x * 16, this.dude.y * 16, "dude")
      .setOrigin(0, 0);
    this.player.depth = 1000;
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      player.play();
      this.balls
        .get(this.dude.x * 16, this.dude.y * 16, "ball")
        .setOrigin(0, 0);
      this.drawBalls();
    }
    if (Phaser.Input.Keyboard.JustDown(this.x)) {
      this.balls.remove(
        this.balls.children.entries.find(
          child => child.x == this.dude.x * 16 && child.y == this.dude.y * 16
        ),
        true,
        true
      );
      this.drawBalls();
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.dude.goUp();
      this.player.setY(this.dude.y * 16);
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.dude.goDown();
      this.player.setY(this.dude.y * 16);
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.dude.goLeft();
      this.player.setX(this.dude.x * 16);
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.dude.goRight();
      this.player.setX(this.dude.x * 16);
    }
    function mod(n, m) {
      return ((n % m) + m) % m;
    }
    this.rows.forEach(row => {
      Phaser.Actions.SetAlpha(row.getChildren(), 1);
    });
    Phaser.Actions.SetAlpha(this.rows[player.getPosition()].getChildren(), 0.7);
  }
  drawBalls() {
    player.clear();
    this.balls.children.iterate(ball => {
      player.addNote(ball.x / 16, Math.abs(ball.y / 16 - 15));
    });
  }
}
