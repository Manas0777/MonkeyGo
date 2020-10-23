// declaring global variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var banana, obstacleGroup;
var score = 0;
var ground;
var PLAY =1
var END = 0
var gameState = PLAY

function preload(){
  // loading monkey animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  // loading banana animation
  bananaImage = loadImage("banana.png");
  
 // loading obstacle animation
  obstacleImage = loadImage("obstacle.png");
 }



function setup() {
createCanvas(600, 400);

//creating sprite for monkey
 monkey = createSprite(80,315,20,20)
monkey.addAnimation("moving",monkey_running) 
monkey.scale = 0.1

  
// creating sprite for ground
 ground = createSprite(450,350,2000,10)
ground.velocityX = -4 
ground.x = ground.width/2 
  
  

  obstaclesGroup = createGroup();
  bananaGroup      = createGroup(); 
  
  }


function draw() {
background(10000000)
text("Score: "+ score, 500,50);
  
if(gameState === PLAY) {
if(keyDown("space")){
  monkey.velocityY = -12
}
if (ground.x < 0){
   ground.x = ground.width/2;
}

  if(monkey.isTouching(obstaclesGroup)){
    gameState = END
  }
    if(monkey.isTouching(bananaGroup)){
    score = score+1
    bananaGroup.destroyEach()
  }
  
   monkey.velocityY = monkey.velocityY + 0.8
   spawnObstacles();
   spawnBanana();
   survivalTime()
  
}
  else if(gameState === END){
    
    text ("game over",300,200)
    monkey.destroy()
    obstaclesGroup.destroyEach()
    bananaGroup.destroyEach()
    ground.destroy()
    stroke = 2 
    textSize = 16
  }
          
    monkey.collide(ground);      
  
  
  
  
  
  
  
  
drawSprites()
}

function spawnObstacles(){

if (frameCount % 120 === 0){
  
  var obstacle = createSprite(600,325,10,40);
  obstacle.addImage(obstacleImage)
  obstacle.scale = 0.2
  obstacle.velocityX = -6
  obstacle.lifetime = 120;
  obstaclesGroup.add(obstacle);
  
}

  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,200,40,10);
    banana.y = Math.round(random(100,220));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 600;
    

    //add each banana to the group
    bananaGroup.add(banana);

  }
  
}

function survivalTime(){
  var survivalTime = 0
  stroke("black")
  textSize(20)
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime :"+survivalTime,100,50)
}







