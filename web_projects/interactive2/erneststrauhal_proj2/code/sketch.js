let mic, noise, reverb, env, fft, osc;

let easing = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

noise = new p5.Noise();

  noise.start();

    noise.amp(0);

    env = new p5.Env();
  // set attackTime, decayTime, sustainRatio, releaseTime
  env.setADSR(0.001, 1.5, 0.2, 0.1);
  // set attackLevel, releaseLevel
  env.setRange(1, 0);

  carrier = new p5.Oscillator(); // connects to master output by default
  carrier.freq(800);

  carrier.amp(0);

  carrier.start();

  modulator = new p5.Oscillator('noise');
  modulator.disconnect(); // disconnect the modulator from master output
  modulator.freq(10);
  modulator.amp(10);
  modulator.start();


  osc = new p5.SqrOsc();
  osc.amp(-10000);  

  osc.start();

}

function draw() {
  if (mouseIsPressed) {
    stroke(255, 0, 0);
    
  } else {
    stroke(0, 0, 255);
    blendMode(SCREEN);
  }
  
  colorMode(RGB);

  let spectrum = fft.analyze();
  beginShape();
  

  strokeWeight(0.7)
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, -200));
  }
  
  endShape();

 // change oscillator frequency based on mouseX
  let freq = map(mouseX, 0, width, 40, 880);
  osc.freq(freq);

  let amp = map(mouseY, 0, height, 1, 0.01);
  osc.amp(amp);


}

function mousePressed() {
env.play(noise);

  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
let mic, noise, reverb, env, fft, osc;

let easing = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

noise = new p5.Noise();

  noise.start();

    noise.amp(0);

    env = new p5.Env();
  // set attackTime, decayTime, sustainRatio, releaseTime
  env.setADSR(0.001, 1.5, 0.2, 0.1);
  // set attackLevel, releaseLevel
  env.setRange(1, 0);

  carrier = new p5.Oscillator(); // connects to master output by default
  carrier.freq(800);

  carrier.amp(0);

  carrier.start();

  modulator = new p5.Oscillator('noise');
  modulator.disconnect(); // disconnect the modulator from master output
  modulator.freq(10);
  modulator.amp(10);
  modulator.start();


  osc = new p5.SqrOsc();
  osc.amp(-10000);  

  osc.start();

}

function draw() {
  if (mouseIsPressed) {
    stroke(0, 0, 0);
  } else {
    stroke(255, 0, 0);
  }
  
  colorMode(RGB);

  let spectrum = fft.analyze();
  beginShape();
  

  strokeWeight(0.7)
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, -200));
  }
  
  endShape();

 // change oscillator frequency based on mouseX
  let freq = map(mouseX, 0, width, 40, 880);
  osc.freq(freq);

  let amp = map(mouseY, 0, height, 1, 0.01);
  osc.amp(amp);


}

function mousePressed() {
env.play(noise);

  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
