let letters = [];
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let gravity = 0.03;
let catchingRange = 50;

//intervals for letters to drop
let dropInterval = 60; 
let lastDropFrame = 0;

//store the input
let inputText = '';
let inputArray = [];

function setup() {
  createCanvas(600, 400);
  textSize(24);
  textAlign(CENTER, CENTER);
  noCursor();
  
  let text = createP("Add a word to watch it rain:");
  text.position(0, 385);
  let inp = createInput('');
  inp.position(185, 400);
  inp.input(updateInput);
}

function draw() {
  //draws the background
  background(color("#7393B3"));
  drawCloud(20, 30, 100);
  drawCloud(200, 30, 120);
  drawCloud(400, 30, 110);

  //draws the basket
  fill("#97704F");
  stroke("#97704F");
  strokeWeight(3);
  rect(mouseX - 25, mouseY - 25, 50, 35, 10);
  noFill();
  
  rect(mouseX - 25, mouseY- 40, 50, 35, 10); 

  //the letters
  noStroke();
  fill(255);
  
  if (frameCount - lastDropFrame >= dropInterval) {
    //picks a new letter in the alphabet array or input
    if (inputText !== '' ){
      for (let i = 0; i < inputText.length; i++) {
      letters.push(new Letter(random(width), random(-200, -100), inputText.charAt(i)));
  }
    } else {
      letters.push(new Letter(random(width), random(-200, -100), random(alphabet)));
    }
    lastDropFrame = frameCount;
  }

  //makes each letter fall in the array
  for (let letter of letters) {
    letter.applyForce(createVector(0, gravity));
    letter.update();
    letter.display();

    //if the mouse interacts with the letter it calls catch
    if (dist(mouseX, mouseY, letter.position.x, letter.position.y) < catchingRange) {
      letter.catch();
    }
  }
}

//creates a letter with individual positioning
class Letter {
  constructor(x, y, char) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.char = char;
    this.isCaught = false;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  //while the letter isn't caught it continues to drop and updates display
  update() {
    if (!this.isCaught) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  }

  display() {
    if (!this.isCaught) {
      text(this.char, this.position.x, this.position.y);
    }
  }
  
  //makes the letter dissapear when it interacts with the mouse
  catch() {
    this.isCaught = true;
    this.velocity.mult(0);
    this.acceleration.mult(0);
    this.position.y = height + 100;
    this.position.x = mouseX;
  }
  
}
function updateInput() {
  inputText = this.value();
}

function drawCloud(x, y, size) {
  noStroke();
  fill(255); 

  //forms the clouds :3
  ellipse(x, y, size, size);
  ellipse(x + size * 0.8, y - size * 0.2, size * 0.8, size * 0.8);
  ellipse(x + size * 1.6, y, size, size);
  ellipse(x + size * 0.8, y + size * 0.2, size * 0.8, size * 0.8);
  ellipse(x + size * 0.4, y + size * 0.2, size * 0.8, size * 0.8);
}
