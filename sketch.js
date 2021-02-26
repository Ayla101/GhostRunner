var ghost,ghostrunner,tower,towerimg,door,doorimg,climber,climberimg;
var invisibleBlock,ibGroup
var doorGroup,climberGroup
var PLAY=1
var END=0
var gamestate=PLAY

function preload(){
  ghostrunner = loadImage("ghost-standing.png")
  towerimg = loadImage("tower.png")
  doorimg = loadImage("door.png")
  climberimg= loadImage("climber.png")
}

function setup(){
  createCanvas(500,500)
  tower = createSprite(250,250)
  tower.addImage(towerimg)
  tower.scale=0.9
  ghost = createSprite(250,100)
  ghost.addImage(ghostrunner)
  ghost.scale = 0.4
  doorGroup=new Group();
  climberGroup=new Group();
  ibGroup= new Group();
  
}

function draw(){
  background("black")
  
  if(gamestate===PLAY){
  
  tower.velocityY = 2
  if (tower.y>500)
  tower.y=250
  
  if (keyDown("space"))
    ghost.velocityY = -5
  
 if (keyDown("left_arrow"))
    ghost.x= ghost.x-3
  
 if (keyDown("right_arrow")) 
     ghost.x= ghost.x+3
  
  ghost.velocityY = ghost.velocityY+0.5
  spawnDoors();
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  }
  if(ibGroup.isTouching(ghost)||ghost.y>500){
    ghost.destroy();
    gamestate=END
  }
  
  
  drawSprites();
  if (gamestate===END){
    fill("red")
    textSize(50);
    text("GAME OVER",100,250)
  }
}
function spawnDoors(){
  if (frameCount%100===0){
    door=createSprite(100,0)
    door.addImage(doorimg)
    door.x=Math.round(random(100,400))
    door.velocityY=2
    door.lifetime= 500
    doorGroup.add(door)
    ghost.depth=door.depth+1
    
    climber = createSprite(100,50)
    climber.addImage(climberimg)
    climber.x=door.x
    climber.velocityY=2
    climber.lifetime= 500
    climberGroup.add(climber)
    
    invisibleBlock= createSprite(100,60,10,2);
    invisibleBlock.velocityY=2
    invisibleBlock.x=climber.x
    invisibleBlock.width=climber.width
    invisibleBlock.debug=true
    invisibleBlock.lifetime=500
    ibGroup.add(invisibleBlock)
  }
 
}