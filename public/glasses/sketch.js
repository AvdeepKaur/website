let predictions = [];
let video;
let facemesh;
let currentGlasses;

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

// Load glasses image
function preload() {
  glassesImg = {
    basic: loadImage('glasses.png'),
    squirtle: loadImage('squirtle.png')
  };
}

function setup() {
  createCanvas(640, 480);
  // Creates the video element
  video = createCapture(VIDEO);
  video.size(500, 280); // Set video size
  video.hide(); // Hide the video element
  
  facemesh = ml5.facemesh(video, modelLoaded);
  
  // Listen to new 'predict' events
  facemesh.on('predict', results => {
    predictions = results;
  });
  
  currentGlasses = 'basic';
  
  let squirtleButton = createButton('Squirtle Glasses');
  squirtleButton.position(10, 490);
  squirtleButton.mousePressed(function() {
    currentGlasses = 'squirtle';
  });
  
  let basicButton = createButton('Basic Glasses');
  basicButton.position(130, 490);
  basicButton.mousePressed(function() {
    currentGlasses = 'basic';
  });
}

function draw() {
  // Mirrors the video
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height); 
  
  // Loop through predictions and draw glasses on each face
  for (let i = 0; i < predictions.length; i++) {
    const keypoints = predictions[i].scaledMesh;
    const { glassesX, glassesY, glassesWidth, glassesHeight } = glasses(keypoints);
    
    // Draw glasses
    image(glassesImg[currentGlasses], glassesX, glassesY, glassesWidth, glassesHeight);
  }
}

function glasses(keypoints) {
  // Calculate the position and size of glasses based on face keypoints
  const leftEye = keypoints[159]; // Left eye
  const rightEye = keypoints[386]; // Right eye
  const glassesWidth = dist(leftEye[0], leftEye[1], rightEye[0], rightEye[1]) * 3; // Adjust size as needed
  const glassesHeight = glassesWidth * 0.5; 
  
  // Calculate the midpoint between the eyes
  const glassesX = (leftEye[0] + rightEye[0]) / 2 - glassesWidth / 2;
  const glassesY = (leftEye[1] + rightEye[1]) / 2 - glassesHeight / 2.5;
  
  return { glassesX, glassesY, glassesWidth, glassesHeight };
}
