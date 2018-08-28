const Tone = require("Tone");
var PolySynth = Tone.PolySynth;
var Reverb = Tone.Reverb;

var verb = new Reverb({ decay: 4, wet: 0.6 }).toMaster();
verb.generate();

var sampler = new Tone.Sampler(
  {
    C3: "kick (5).wav",
    "C#3": "Snare Bitkits 01.wav",
    C4: "Blip Bitkits 06 1.wav",
    "C#4": "Clap Bitkits 06.wav",
    D4: "ClosedHH Bitkits 02.wav",
    "D#4": "ClosedHH Bitkits 03.wav",
    E4: "ClosedHH Bitkits 04.wav",
    F4: "Glitch Bitkits 01.wav",
    "F#4": "Glitch Bitkits 04.wav",
    G4: "Glitch Bitkits 08 1.wav",
    "G#4": "Noise Bitkits 02.wav",
    A4: "OpenHH Bitkits 04.wav",
    "A#4": "Perc Bitkits 09 1.wav"
  },
  function() {
    // sampler.triggerAttack("c3");
  },
  "assets/sounds/"
).toMaster();
sampler.volume.value = -12;

var synth = new PolySynth({}).connect(verb);
synth.set({
  oscillator: { type: "triangle" },
  envelope: {
    attack: 0.005,
    decay: 1,
    sustain: 0.2,
    release: 4.005
  }
});

var scale = [0, 3, 5, 7, 8, 10];
var extendedScale = [
  ...scale,
  ...scale.map(x => x + 12),
  ...scale.map(x => x + 24)
];

var seq = new Tone.Sequence(
  (time, note) => {
    if (note >= 0) {
      note = extendedScale[parseInt(note)] + 60;
    } else {
      note = " ";
    }
    synth.triggerAttackRelease(Tone.Frequency.mtof(note), "8n");
  },
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  "4n"
);
var drums = new Tone.Sequence(
  (time, note) => {
    const step = Math.floor(drums.progress * 16);
    if (step === 0) {
      sampler.triggerAttack("C3");
    } else if (step === 4 || step === 12) {
      sampler.triggerAttack("C#3");
    } else {
      const number = Math.floor(Math.random() * 10);
      const probability = Math.random();
      if (probability > 0.2) {
        const velocity = (Math.floor(Math.random() * 20) + 70) / 100;
        sampler.triggerAttack(
          Tone.Frequency(number + 60, "midi").toNote(),
          velocity
        );
      }
    }
  },
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  "8n"
);
seq.removeAll();

export default {
  play: function() {
    Tone.Transport.bpm.value = 180;
    Tone.Transport.start();
    seq.start();
    drums.start();
  },
  getPosition: function() {
    return Math.floor(seq.progress * 16);
  },
  clear() {
    seq.removeAll();
  },
  addNote(index, note) {
    seq.add(index, note);
  }
};
