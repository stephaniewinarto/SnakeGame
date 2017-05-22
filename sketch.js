var character = ["学", "而", "不", "思", "则", "罔", "，", "思", "而", "不", "学", "则", "殆" ];
var sound;
var soundArray = [];

var s;
var scl = 40;
var counter = 1;
var gameStatus = 0;

function preload() { 
  
  for (var i = 0; i < soundFileNames.length; i++) {
    var temp = loadSound(soundFileNames[i]);
    soundArray.push(temp);
  }
  
  s = new Snake();
  frameRate(10);
  pickLocation();
}

function setup() {
  createCanvas(600, 600); 
}

function draw() {
  if(gameStatus === 0){
    //background(255*noise(0.05), 150, 250);
    startGame();
  } else if (gameStatus === 1) {
    var t=0.01; 
    background(255,200,random(250));
    fill(255, 0, 100);
    //rect(food.x, food.y, scl, scl);
    
    text(character[counter], food.x, food.y, scl, scl);
    // fill(255,50,50);
    // rectMode(CENTER);
    // rect(windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/2);
    
    s.update();
    s.show();
    
    if (s.eat(food)) {
      pickLocation();
      soundArray[counter].play();
      counter++;
    }
    
    
    
    if (counter > character.length-1) {
        gameStatus = 2;
    }
    
    
    
   

  } else {
    gameOver();
  }
}
  
function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  //picks location randomly based on the grid set out 
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode == DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode == RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode == LEFT_ARROW) {
    s.dir(-1, 0);
  }
}
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  

  this.eat = function(pos) {
    //detects if the snake has collided with the food 
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }


  this.update = function() {
    
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.total - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function() {

    fill(random(255*0.01), 50, 255);
    stroke(255);
    textSize(scl);


    for (var i = 1; i < this.tail.length; i++) {
      //first character is written at the position that is stored in the alst index of tail etc.
      text(character[i], this.tail[this.tail.length-i].x, this.tail[this.tail.length-i].y, scl, scl);
    }
    
    text(character[0], this.x, this.y, scl, scl);
    

  }
}


function startGame(){
  //noStroke();
 // noFill();
  textSize(36);
 // rect(0, 0, width, height);
  
  //push(); 
  fill(random(255), 150, 250);
  textAlign(CENTER);
  text("START",width/2,60);
  //pop();
  
  if (mouseIsPressed){
    gameStatus = 1;
  }
  }
  

function gameOver(){
  //clear();
  textSize(36);
  fill(random(255), 150, 250);
  text("GAME OVER", width/2, height/2);
  text("restart", width/2, 400 );
  
  if (mouseIsPressed){
    gameStatus = 1;
    s = new Snake();
    counter = 1;
  }
  
}

var soundFileNames = ["1学.mp3", 
  "2而.mp3",
  "3不.mp3",
  "4思.mp3",
  "5则.mp3",
  "6罔.mp3",
  "6.wav",
  "7思.mp3",
  "8而.mp3",
  "9不.mp3",
  "10学.mp3",
  "11则.mp3",
  "12殆.mp3"
]