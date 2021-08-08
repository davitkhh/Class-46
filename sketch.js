var player, playerImg;
var edges, ground, groundImg;
var enemy, enemy1Img, enemy2Img, enemy3Img, enemyGroup;
var chicken, chickenImg, chickenGroup;
var gameState = "play";
var invisibleGround;
var playerEnd;
var coin, coinImg, coinGroup, coinEnd;
var score;

function preload() {
  playerImg = loadAnimation("images/pc_walking1.png",
    "images/pc_walking2.png", "images/pc_walking3.png", 
    "images/pc_walking4.png",  "images/pc_walking5.png", 
    "images/pc_walking6.png", "images/pc_walking7.png",
    "images/pc_walking8.png", "images/pc_walking9.png");

  playerEnd = loadAnimation("images/pc_walking4.png");

  groundImg = loadImage("images/grassy_background.png");

  enemy1Img = loadImage("images/goblin.png");
  enemy2Img = loadImage("images/armoured_goblin.png");
  enemy3Img = loadImage("images/slime.png");

  chickenImg = loadImage("images/chicken.png");

  coinImg = loadAnimation("images/coin1.jpg", "images/coin2.jpg",
                          "images/coin3.jpg", "images/coin4.jpg");
  
  coinEnd = loadAnimation("images/coin1.jpg");                   
  coinGroup = new Group();
  enemyGroup = new Group();
  chickenGroup = new Group();
}

function setup() {
  createCanvas(790, 700);
  
  ground = createSprite(500, 350, 1000, 700);
  ground.addImage(groundImg);
  ground.velocityX = -6;

  invisibleGround = createSprite(350, 575, 900, 20);
  invisibleGround.visible = false;

  player = createSprite(100, 500, 75, 75);
  player.addAnimation("running", playerImg);
  player.addAnimation("ended", playerEnd);
  // player.velocityX = 6;
  player.scale = 1.7;

  edges = createEdgeSprites();
  score = 0;

}

function draw() {
  background(0); 
  if (gameState === "play") {
    ground.scale = 5;
  

  if (ground.x < 0) {
    ground.x = width / 2;
  }

  if (keyDown("space") && player.y >= 400) {
    player.velocityY = -10
  }

  if (keyDown("right")) {
    player.x += 6;
  }

  player.velocityY += 0.8; 
  player.collide(invisibleGround);
  player.collide(edges);
  spawnChicken();
  spawnEnemies();
  spawnCoin();
  
  if (enemyGroup.isTouching(player)) {
    gameState = "end";
  }

  }

  else if (gameState === "end") {
    ground.velocityX = 0;
    player.velocityX = 0;
    player.velocityY = 0;
    player.changeAnimation("ended", playerEnd);

    coin.changeAnimation("coinEnded", coinEnd);

    enemyGroup.setVelocityXEach(0);
    enemyGroup.setLifetimeEach(-1);

    chickenGroup.setVelocityXEach(0);
    chickenGroup.setLifetimeEach(-1);

    coinGroup.setLifetimeEach(-1);
    coinGroup.setVelocityXEach(0);
  }

  drawSprites();

  fill("white");
  textSize(18);
  stroke("black");
  text("Score: " + score, 40, 40);
}

function spawnEnemies() {
  if (frameCount %160 === 0) {
    enemy = createSprite(980, 550, 50, 50);
    enemy.velocityX = -6;
    var rand = Math.round(random(1, 3));
    switch(rand) {
      case 1: enemy.addImage(enemy1Img);
      break
      case 2: enemy.addImage(enemy2Img);
      break
      case 3: enemy.addImage(enemy3Img);
      break;
      default: break;
    }
    enemy.lifetime = 180;
    enemyGroup.add(enemy);

  }
}

function spawnChicken() {
  if (frameCount %150 === 0) {
  chicken = createSprite(1000, 550, 50, 50);
  chicken.addImage(chickenImg);
  chicken.velocityX = -4;
  chickenGroup.add(chicken);
  }
}

function spawnCoin() {
  if (frameCount % 100 === 0) {
    coin = createSprite(700, 400, 10, 10);
    coin.addAnimation("goal", coinImg);
    coin.addAnimation("coinEnded", coinEnd);
    coin.velocityX = -6;
    coin.scale = 0.6;
    coinGroup.add(coin);
  }
}