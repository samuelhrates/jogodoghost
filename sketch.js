var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  //grupo da porta
  doorsGroup = new Group();

  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  //animação do fantasma
  ghost = createSprite(200, 200, 30, 30);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
}

function draw() {
  background(200);
  if (gameState === "play") {
    //controle do fantasma
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    //o fantasma pula co espaço

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }

    //gravidade
    ghost.velocityY = ghost.velocityY + 0.8;

    if (tower.y > 400) {
      tower.y = 300;
    }

    //chamando
    SpawnDoors();

    //climbersGroup.collide(ghost);
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }

    drawSprites();
  }
  if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fim de Jogo", 230, 250);
  }
}

//função das janelas aletorias
function SpawnDoors() {
  if (frameCount % 244 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    //mais profundidade ao fantasma que a porta.
    ghost.depth = door.depth;
    ghost.depth += 1;

    //designe tempo de vida a variável
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    //adicione cada porta ao grupo
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
