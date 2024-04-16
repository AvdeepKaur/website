// used https://learn.ml5js.org/#/
//hand tracker that is able to detect fists and peacesigns
let handpose;
let camera;
let predictions = [];

let indexFingerTip; 
let middleFingerTip;
let ringFingerTip;
let pinkyFingerTip;
let thumbBase; 

function setup() {
  createCanvas(640, 480);
  //creates the camera capture
  camera = createCapture(VIDEO);
  camera.hide();
  
  // Initialize the model with the camera
  handpose = ml5.handpose(camera, modelReady);
  handpose.on('predict', results => {
    predictions = results;
  });
}

//loads everything in when model is ready
function modelReady() {
  console.log('Model is Loaded!');
}

function draw() {
  //mirrors camera
  translate(camera.width, 0);
  scale(-1, 1);
  image(camera, 0, 0, width, height);
  
  
  //loop through detected hand
  for (let i = 0; i < predictions.length; i++) {
    let hand = predictions[i];
    //draw joins
    drawJoints(hand);
    //draws the hand skeleton
    drawSkeleton(hand);
    // Check for a fist sign
    let fistSign = fist(hand);
    let peaceSign = peace(hand);
    let highFive = open(hand);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    if (fistSign) {
      text("✊",  50, 50);
    } else if (peaceSign) {
      text("✌️",  50, 50);
    } else if (highFive) { 
      text("🖐️",  50, 50);
    }
  }
}

function drawJoints(hand) {
  //hand.landmarks come from the ml5 library
  //finds keypoints on the hand
  for (let i = 0; i < hand.landmarks.length; i++) {
    let [x, y] = hand.landmarks[i];
    fill(0,0,0);
    ellipse(x, y, 10, 10);
  }
}

function drawSkeleton(hand) {
  //the lines connecting each point to eachother
  let fingers = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [0, 9], [9, 10], [10, 11], [11, 12], [0, 13], [13, 14], [14, 15], [15, 16], [0, 17], [17, 18], [18, 19], [19, 20]];

  // Loop through each pair of joints
  for (let i = 0; i < fingers.length; i++) {
    let [a, b] = fingers[i];
    let [x1, y1] = hand.landmarks[a];
    let [x2, y2] = hand.landmarks[b];
    strokeWeight(2);
    stroke(0, 0, 0);
    line(x1, y1, x2, y2);
  }
}

//detects fist !
function fist(hand) {
  // Get the landmarks for the tip of each finger and thumb
  indexFingerTip = hand.landmarks[8]; 
  middleFingerTip = hand.landmarks[12];
  ringFingerTip = hand.landmarks[16];
  pinkyFingerTip = hand.landmarks[20];
  thumbBase = hand.landmarks[4]; 
  
  // find avg distance between thumb and all the fingers
  let distance = 
      (dist(indexFingerTip[0], indexFingerTip[1], thumbBase[0], thumbBase[1]) + 
      dist(middleFingerTip[0], middleFingerTip[1], thumbBase[0], thumbBase[1]) + 
      dist(ringFingerTip[0], ringFingerTip[1], thumbBase[0], thumbBase[1]) +
      dist(pinkyFingerTip[0], pinkyFingerTip[1], thumbBase[0], thumbBase[1])) / 4 ;
  
  
  //determines if it's a fist or not based on distance
  let threshold = 50;
  
  if (distance < threshold) {
    return true; // Fist 
  } else {
    return false; // not fist
  }
}

//detects peace sign
function peace(hand){
  indexFingerTip = hand.landmarks[8]; 
  middleFingerTip = hand.landmarks[12];
  ringFingerTip = hand.landmarks[16];
  pinkyFingerTip = hand.landmarks[20];
  thumbBase = hand.landmarks[4];
  
  //find avg distance between thumb and ring and pinky finger
  let inDistance = (dist(ringFingerTip[0], ringFingerTip[1], thumbBase[0], thumbBase[1]) +
      dist(pinkyFingerTip[0], pinkyFingerTip[1], thumbBase[0], thumbBase[1])) / 2;
  
  let outDistance = (dist(indexFingerTip[0], indexFingerTip[1], thumbBase[0], thumbBase[1]) + 
      dist(middleFingerTip[0], middleFingerTip[1], thumbBase[0], thumbBase[1])) / 2; 
  
  let inThreshold = 50;
  let outThreshold = 150;
  
  if (inDistance > inThreshold || outDistance < outThreshold) {
    return false
  }  else {
    return true
  }
}

//checks for an open hand
function open(hand) {
  // Get the landmarks for the tip of each finger and thumb
  indexFingerTip = hand.landmarks[8]; 
  middleFingerTip = hand.landmarks[12];
  ringFingerTip = hand.landmarks[16];
  pinkyFingerTip = hand.landmarks[20];
  thumbBase = hand.landmarks[4]; 
  
  // Calculate the average distance between thumb and fingers
  let distance = 
      (dist(indexFingerTip[0], indexFingerTip[1], thumbBase[0], thumbBase[1]) + 
      dist(middleFingerTip[0], middleFingerTip[1], thumbBase[0], thumbBase[1]) + 
      dist(ringFingerTip[0], ringFingerTip[1], thumbBase[0], thumbBase[1]) +
      dist(pinkyFingerTip[0], pinkyFingerTip[1], thumbBase[0], thumbBase[1])) / 4 ;
  
  // Determine if it's an open hand based on distance
  let threshold = 100; // Adjust threshold as needed
  if (distance > threshold) {
    return true; // Open hand
  } else {
    return false; // Not open hand
  }
}




