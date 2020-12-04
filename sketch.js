
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0
var goundimage
var gamestate="play"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
  monkey=createSprite(50, 250, 20,20)
  monkey.addAnimation("monkey_run",monkey_running)
  monkey.scale=0.1
  
  ground=createSprite(300,300,600,10)

  
  invisibleground=createSprite(300,340,600,100)
  invisibleground.visible=false
  ground.scale=1.3
  FoodGroup=new Group();
  obstacleGroup=new Group();
  monkey.debug=true
  monkey.setCollider("circle",0,0,270)
}

function draw() {
  background(200, 240, 200);
  stroke("black");
  textSize(20)
  fill("Maroon")

  
  text("Survival Time: "+survivalTime,200,50)
  if(gamestate==="play"){
  ground.velocityX=-4
  console.log(monkey.y)
  if (ground.x<0){
    ground.x= ground.width/2
  }
  if(keyDown("space")&&monkey.y>140){
    monkey.velocityY=-14
    
  }
    monkey.velocityY=  monkey.velocityY+0.6
  food();
  stone();
    if(frameCount%20===0){
    survivalTime=Math.ceil(frameCount/frameRate())
  }

  if(obstacleGroup.isTouching(monkey)){
    gamestate="end"
  }
  
}
 if(gamestate==="end"){
    ground.velocityX=0
   monkey.velocityY=2
    FoodGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    FoodGroup.setLifetimeEach(-1)
     obstacleGroup.setLifetimeEach(-1)
  }
  
    monkey.collide(invisibleground)
  drawSprites();
 
}

function stone(){
   if (frameCount%150===0){
    obstacle=createSprite(600,280,20,30)
    obstacle.addImage(obstaceImage)
    obstacle.velocityX=-4
    obstacle.scale=0.15
     obstacle.lifetime=300
     obstacleGroup.add(obstacle)
      obstacle.debug=true
     obstacle.setCollider("circle",0,0,180)

  }
}
function food(){
  if (frameCount%80===0){
    banana=createSprite(600,30,10,5)
    banana.addImage(bananaImage)
    banana.velocityX=-5
    banana.scale=0.15
    banana.lifetime=300
    banana.y=Math.round(random(120,220))
    FoodGroup.add(banana)
  }
}



