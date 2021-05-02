var towerImage, tower, doorImage, door,climberImage,climber,climbersGroup,doorGroup,ghost,ghostImage,invisibleBlock,invisbleBlockGroup;
var gameState = "play"
function preload(){
    towerImage = loadImage("tower.png")
    doorImage = loadImage("door.png")
    climberImage = loadImage("climber.png")
    ghostImage = loadImage("ghost-standing.png")

}
function setup(){
    createCanvas(600,600);
    tower = createSprite(300,300)
    tower.addImage(towerImage)
    tower.velocityY = 1
    ghost = createSprite(200,200,50,50)
    ghost.scale = 0.3
    ghost.addImage(ghostImage)
    doorGroup = new Group();
    climbersGroup = new Group();
    invisibleBlockGroup = new Group();
}
function draw(){
    background("white")
    if(gameState === "play"){
        if(keyDown("left_arrow")){
            ghost.x = ghost.x-3
        }
        if(keyDown("right_arrow")){
            ghost.x = ghost.x +3
        }
        if(keyDown("space")){
            ghost.velocityY = -5
        }
        ghost.velocityY = ghost.velocityY+0.8
        if(tower.y>400){
            tower.y = 300
        }
        
        if(climbersGroup.isTouching(ghost)){
            ghost.velocityY = 0
        }
        if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
            ghost.destroy();
            gameState = "end"
        }
    }
    spawnDoors();
    drawSprites();
    if(gameState === "end"){
        stroke("yellow")
        fill("yellow")
        textSize(30)
        text("GAME OVER",230,250)
    }
}
function spawnDoors(){
    if(frameCount%240 === 0){
        var door = createSprite(200,-50)
        var climber = createSprite(200,10)
        var invisibleBlock = createSprite(200,15)
        invisibleBlock.width = climber.width
        invisibleBlock.height = 2
        door.x = Math.round(random(120,400))
        climber.x = door.x
        invisibleBlock.x = door.x
        door.addImage(doorImage)
        climber.addImage(climberImage)
        door.velocityY = 1
        climber.velocityY = 1
        invisibleBlock.velocityY = 1
        ghost.depth = door.depth
        ghost.depth = ghost.depth+1
        door.lifetime = 800
        climber.lifetime = 800
        invisibleBlock.lifetime = 800
        doorGroup.add(door)
        climbersGroup.add(climber)
        invisibleBlockGroup.add(invisibleBlock)
        //invisbleBlockGroup.debug = true
    }
}
