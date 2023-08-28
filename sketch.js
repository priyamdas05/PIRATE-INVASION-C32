const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraints = Matter.Constraint;
const Body = Matter.Body;

let engine;
let world;

var tower;
var angle, cannon;
var cannonball;
var boat;
var balls = [];
var boats = [];
var boatAnimation = [];
var boatSpriteData, boatSpriteSheet;
var boatFrames;
var brokenBoatAnimation = [];
var brokenBoatSpriteData, brokenBoatSpriteSheet;
var brokenBoatFrames;
var waterSplashAnimation = [];
var waterSplashSpritedata, waterSplashSpritesheet;
var waterSplashFrames;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpriteData = loadJSON("assets/boat/boat.json");
  boatSpriteSheet = loadImage("assets/boat/boat.png");
  brokenBoatSpriteData = loadJSON("assets/boat/broken_boat.json");
  brokenBoatSpriteSheet = loadImage("assets/boat/broken_boat.png");
  waterSplashSpritedata = loadJSON("assets/water_splash/water_splash.json");
  waterSplashSpritesheet = loadImage("assets/water_splash/water_splash.png");
}


function setup() {
  canvas = createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;
  angle = -PI/30;

  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150,375,160,310);
  cannon = new Cannon(180,110,110,50,angle);
  cannonball = new CannonBall(cannon.x+10,cannon.y+35);
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  //Use a new keyword to create a tower object.(challenge 4)

  boatFrames = boatSpriteData.frames;
  for (var i = 0; i < boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  brokenBoatFrames = brokenBoatSpriteData.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++){
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  var waterSplashFrames = waterSplashSpritedata.frames;
  for (var i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSplashSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }
}

function draw() 
{
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  ground.display();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }


 //display tower(challenge 4)
  tower.display();
  cannon.display();
  cannonball.display();
  

 

  showBoats();
 
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//function to show the ball
function showCannonBalls(ball, index) {
  ball.display();
  ball.animate();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    if (!ball.isSink) {
      ball.remove(index);
    }
  }
}


function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-130, -100, -120, -80];
      var position = random(positions);
      var boat = new Boat(width,height - 100, 200, 200, position, boatAnimation);
      boats.push(boat);
    }
    
    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });

      boats[i].display();
      boats[i].animate();
    }
  } else {
    var boat = new Boat(width, height - 100, 200, 200, -100, boatAnimation);
        boats.push(boat);
      }
    }
function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}
