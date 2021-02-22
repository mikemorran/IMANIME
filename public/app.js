console.log('hello world');
let canvas;
let windowWidth = 0;
let windowHeight = 0;
let colors = ['red','blue','green','white','pink','orange','yellow'];
let circleSize = 100;
let mySound;

function preload(){

  mySound = loadSound('clap.wav')
}

function setup() {
  windowWidth = document.getElementById('CanvasDiv').offsetWidth;
  windowHeight = document.getElementById('CanvasDiv').offsetHeight;
  console.log(windowWidth, windowHeight);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('CanvasDiv');
  background(0);
  setupGrid();
}

function setupGrid() {
  strokeWeight(3);
  line(windowWidth*0.1, windowHeight*0.1, windowWidth*0.1, windowHeight*0.9);
  line(windowWidth*0.1, windowHeight*0.9, windowWidth*0.9, windowHeight*0.9);
  text('Volume', windowWidth/3, windowHeight*0.95, 2*windowWidth/3, windowHeight);
  for (let i = 0; i < 10; i++) {
    stroke(255, 100);
    line(i*windowWidth/10, windowHeight*0.92, i*windowWidth/10, windowHeight*0.88);
    line(windowWidth*0.08, i*windowHeight/10, windowWidth*0.12, i*windowHeight/10);
  }
  for (let i = 0; i < 10; i++) {
    stroke(255, 60);
    line(i*windowWidth/10, windowHeight*0.9, i*windowWidth/10, 0);
    line(windowWidth*0.1, i*windowHeight/10, windowWidth, i*windowHeight/10);
  }
}

function mouseClicked(){
  console.log('mouseclicked');
//   fill(255);
  fill(colors[0]);
  ellipse(mouseX,mouseY,circleSize,circleSize);
  mySound.play();
  
}

function windowResized() {
  windowWidth = document.getElementById('CanvasDiv').offsetWidth;
  windowHeight = document.getElementById('CanvasDiv').offsetHeight;
  console.log(windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  setupGrid();
}