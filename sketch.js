var tower, towerImage

var ghost, ghostImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var door, doorImage, doorGroup;

var climber, climberImage, climberGroup;

var invisibleBlock, invisibleGroup;

function preload(){
  
  towerImage = loadImage("tower.png");
  
  ghostImage = loadImage("ghost-standing.png");
  
  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
}

function setup(){
  createCanvas(600,600)
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  tower.scale = 1;
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  doorGroup = createGroup();
  
  climberGroup = createGroup();
  
  invisibleGroup = createGroup();
  
}

function draw(){
  background(0);
  
  if (gameState === PLAY){
    
    if (tower.y > 400){
    tower.y = 300;
  }
    
    if (keyDown("left")){
      ghost.x -= 3;
    }
    
    if (keyDown("right")){
      ghost.x += 3;
    }
    
    if (keyDown("space")){
      ghost.velocityY = -3;
    }
    
    ghost.velocityY += 1;
    
    if (climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    
    if (invisibleGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = END;
    }
    
    spawnDoors();
    drawSprites();
  }
  
  
  
  if (gameState === END){
    strokeWeight(5);
    stroke("red");
    fill("white");
    textSize(60);
    text("Game Over!",150,300);
  }
  
    
  
  
}

function spawnDoors(){
  if (frameCount % 200 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImage);
    door.x = Math.round(random(120,380))
    door.velocityY = 1;
    door.lifetime = 800;
    ghost.depth = door.depth;
    ghost.depth += 1;
    doorGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climberGroup.add(climber);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.x = door.x;
    invisibleBlock.setCollider("rectangle", 0,0,climber.width,2);
    invisibleBlock.debug = true;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    invisibleBlock.lifetime = 800;
    invisibleGroup.add(invisibleBlock);
  }
}