var MonoSynth = require("Tone").MonoSynth;
var Reverb = require("Tone").Reverb;
var verb = new Reverb({ decay: 3, wet: 0.5 }).toMaster();
verb.generate();
var synth = new MonoSynth({
  envelope: {
    attack: 0.005,
    decay: 4.1,
    sustain: 0.0,
    release: 4
  },
  filter: {
    Q: 1,
    type: "lowpass",
    frequency: 50
  },
  filterEnvelope: {
    attack: 0.001,
    release: 4,
    decay: 0.001,
    sustain: 0.5
  }
}).connect(verb);
// var synth = new MonoSynth().toMaster();

export class SimpleScene extends Phaser.Scene {
  preload() {}
  create() {
    this.soundPlayed = false;
    this.notes = ["C4", "A4", "E4", "G5"];
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.up.isDown) {
      console.log("up key is pressed down");
    }
    if (this.cursors.up.isDown && !this.soundPlayed) {
      const randomNumber = Math.floor(Math.random() * 4);
      const note = this.notes[randomNumber];
      synth.triggerAttackRelease(note, 5);
      this.soundPlayed = true;
    }
    if (this.cursors.up.isUp) {
      this.soundPlayed = false;
    }
  }
}
