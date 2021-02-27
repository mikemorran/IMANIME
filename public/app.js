var socket = io(); 

console.log('hello world');
let canvas;
let windowWidth = 0;
let windowHeight = 0;
let colors = ['red','blue','green','white','pink','orange','yellow'];
let circleSize = 100;
let mySound;
let loginRunning = true;
let availableInstruments;
let availableColors;
let userObject;
let serial;                             // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem2101';  // fill in your serial port name here
let inData;                             // for incoming serial data

function loginProtocol() {
  let beginLogin = true;
  socket.emit("beginLogin", beginLogin);
  socket.on('login', (serverObject) => {
    console.log(serverObject);
    availableInstruments = serverObject.availableInstruments;
    console.log(availableInstruments);
    availableColors = serverObject.availableColors;
    console.log(availableColors);
    for (i = 0; i < availableColors.length; i++) {
      let colorButton = document.createElement('button');
      colorButton.id = availableColors[i];
      colorButton.innerHTML = availableColors[i];
      colorButton.style.border = "none";
      colorButton.style.borderRadius = "100%";
      colorButton.style.backgroundColor = availableColors[i];
      document.getElementById('buttonDisplay').appendChild(colorButton);
      colorButton.addEventListener('click', ()=> {
        console.log("clicked on button: " + colorButton.id);
        let instrument = random(availableInstruments);
        userObject = {
          "color" : colorButton.id,
          "instrument" : instrument
        };
        socket.emit('colorPicked', userObject);
        document.getElementById('loginDiv').style.display = "none";
        loginRunning = false;
      });
    }
  });
}

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
  loginProtocol();
  
  //ADDED SERIAL CONNECTION CODE
  try {
    serial = new p5.SerialPort();       // make a new instance of the serialport library
    serial.on('data', serialEvent);     // callback for when new data arrives
    serial.open(portName);              // open a serial port
  } catch {
    console.log('no serial controller found');
  }
}

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
  inData = serial.readLine();
}

let buttonPushed = false;

function draw() {
  //console.log(inData);
  if (inData === '1' && !buttonPushed) {
    console.log('button pressed!');
    buttonPushed = true;
    mouseClicked();
  }
  if (inData === '0' && buttonPushed) {
    console.log('button released!');
    buttonPushed = false;
  }
}
//END SERIAL CONNECTION CODE


function setupGrid() {
  strokeWeight(3);
  stroke(255, 255);
  line(windowWidth*0.1, 0, windowWidth*0.1, windowHeight*0.9);
  line(windowWidth*0.1, windowHeight*0.9, windowWidth, windowHeight*0.9);
  fill(255);
  push();
  textAlign(CENTER);
  noStroke();
  textSize(22);
  text('Volume', windowWidth/2, windowHeight*0.95);
  text('Pitch', windowWidth*0.05, windowHeight/2);
  for (let i = 1; i < 10; i++) {
    stroke(255, 255);
    line(i*windowWidth/10, windowHeight*0.92, i*windowWidth/10, windowHeight*0.88);
    line(windowWidth*0.08, i*windowHeight/10, windowWidth*0.12, i*windowHeight/10);
  }
  for (let i = 1; i < 10; i++) {
    stroke(255, 60);
    line(i*windowWidth/10, windowHeight*0.9, i*windowWidth/10, 0);
    line(windowWidth*0.1, i*windowHeight/10, windowWidth, i*windowHeight/10);
  }
}



function mouseClicked(){
  if (!loginRunning) {
    console.log('mouseclicked');
    //   fill(255);
      fill(colors[0]);
      ellipse(mouseX,mouseY,circleSize,circleSize);
      mySound.play();
      
  }
}

function windowResized() {
  windowWidth = document.getElementById('CanvasDiv').offsetWidth;
  windowHeight = document.getElementById('CanvasDiv').offsetHeight;
  console.log(windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  setupGrid();
}