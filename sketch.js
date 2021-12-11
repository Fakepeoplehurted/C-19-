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

  ghost=createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.25

  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()

}

function draw() {
  background(0);
  if(gameState==="play")
  {
    spookySound.loop();
 
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow"))
    {
      ghost.x=ghost.x-3
  
    }
    if(keyDown("right_arrow"))
    {
      ghost.x=ghost.x+3
    }
    if(keyDown("R"))
    {
      ghost.velocityY=-10
    }
    ghost.velocityY=ghost.velocityY+0.4

   spawnDoor()
   if(ghost.isTouching(climbersGroup))
   {
    
     ghost.velocityY=0
   }

   if(ghost.isTouching(invisibleBlockGroup)|| ghost.y>600)
   {
     ghost.destroy()
     gameState="end"
   }
  
    drawSprites()


  }
  if(gameState==="end")
  {
    stroke("yellow")
    textSize(25)
    text("GAME OVER YOU LITTLE LOSER ",230,250)
  }
}
function spawnDoor()
{
  if(frameCount % 240===0)
  {
    door=createSprite(200,-50)
    climber=createSprite(200,10)
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    door.addImage(doorImg)
    climber.addImage(climberImg)

    door.velocityY=1
    climber.velocityY=1
    invisibleBlock.velocityY=1
    
    door.x=Math.round(random(100,400))
    climber.x=door.x
    invisibleBlock.x=door.x

    ghost.depth=door.depth
    ghost.depth=ghost.depth+1

   door.lifetime=800
   climber.lifetime=800
   invisibleBlock.lifetime=800
   doorsGroup.add(door)
   climbersGroup.add(climber)
   invisibleBlockGroup.add(invisibleBlock)
   invisibleBlock.debug=true
  }
}
