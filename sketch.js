var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3

  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();
}

function draw() {
  background(200);
  
  if(gameState==="play"){

    //infinite tower
    if(tower.y > 400){
      tower.y = 300
    }

    //spawn the door and railing
    spawnDoors();

    //make the ghost move
    if(keyDown("space")){
      ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY + 0.5;

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3
    }

    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
    }

    if(ghost.isTouching(invisibleBlockGroup) || ghost.y>600){
     gameState = "end";
    }

  drawSprites();
  }
  else if(gameState==="end"){
    textSize(30);
    fill("skyblue");
    text("GAME OVER",250,300);
  }
  
}

function spawnDoors(){
  if(frameCount%240===0){
    door = createSprite(200,-50);
    door.x = Math.round(random(120,400))
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 600;
    doorsGroup.add(door)

    //add depth so the ghost appears in front of teh door
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    climber = createSprite(door.x,10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 600;
    climbersGroup.add(climber)

    invisibleBlock = createSprite(door.x,15);
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock)
  }
}
