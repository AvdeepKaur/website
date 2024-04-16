let symmetry = 6;   
let angle = 360 / symmetry;
let colors; 

function setup() { 
  createCanvas(710, 710);
  angleMode(DEGREES);
  background(127);
  colors = [color("#663399"),color("#7953A9"), color("#8B74BD"), color("#6F2DA8")];
  frameRate(20);
}


function draw() {
  translate(width / 2, height / 2);
  rotate(frameCount);
  let colorAngle = 360 / colors.length;
  
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        
        // color for background shapes
        // Calculate the index of the color
        let colorIndex = floor((i * colorAngle) % colors.length);
    
        // Select the color based on the calculated index
        let selectedColor = colors[colorIndex];
        fill(selectedColor);
        
        //snowflake1
        rect(0,0,100, 100);
        
        triangle(0, 0, 10, 8, 50, 50);
        
        //color for shapes that lay on the background shapes
        let a = color(random(colors));
        rect(20,20,20,20);
        
        fill(a)
        rect(10, 10, 10, 10);
        circle(5,5,5);
        circle(50,50,10);
        circle(57,57,10);
        
        fill(selectedColor);
        rect(60,60,60,60);
        rect(100, 100, 50, 50);
        rect(150, 150, 50, 50);
        
        
        let r = color("#22277A");
        fill(r);
        circle(200, 150, 30);
        circle(200,50,30);
        circle(250,100, 30);
        circle(250, 50, 30);
        circle(250, 0, 30);
        circle(200, 100, 30);
        
        
        //outer circles
        fill(selectedColor);
        circle(400,100,20);
        
        circle(300,100,30);
        
        let s = color(random(colors));
        fill(s);
        circle(350, 100, 25);

        
        
        push();
        scale(1, -1);
        pop();
      }
}