var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg;
var foodsGroup;
var stoneImg;
var obstaclesGroup;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  foodsGroup = createGroup();
  obstaclesGroup = createGroup();
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-6;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  

 if(gameState === PLAY){

  if(foodsGroup.isTouching(player)){
    foodsGroup.destroyEach();
    score = score + 2
    player.scale += + 0.01;

    }
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);


    spawnFood();
    spawnObstacles();
  }

  if(obstaclesGroup.isTouching(player)){
   obstaclesGroup.destroyEach();
   backgr.velocityX = 0;
   player.visible = false;
   gameState = END;
   
  }

  
  
  
 

  

  
  

  drawSprites();

  textSize(40);
  fill("white");
  text("Score:" + score, 600,80);

  if(gameState === END){
    foodsGroup.destroyEach();
    score =0;
    textSize(50);
 fill("white");
 text("Game Over!!", 250,200);
     }
   
  
}

function spawnFood(){
if(frameCount % 80 ===0){
var banana = createSprite(600,250,40,10);
banana.y = random(80,300);
banana.addImage("banana.png", bananaImg);
banana.scale = 0.07;
banana.velocityX = -6;
banana.Lifetime= 300;
player.depth = banana.depth + 1
foodsGroup.add(banana);

}
}

function spawnObstacles(){
if(frameCount % 180 ===0){
var stone = createSprite(700,350,20,20);
stone.addImage("stone.png", stoneImg);
stone.velocityX = -4;
stone.scale = 0.25;
obstaclesGroup.add(stone);
stone.Lifetime = 300;
player.depth = stone.depth + 1;
}
}
