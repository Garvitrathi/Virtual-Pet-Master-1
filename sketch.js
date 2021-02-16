//Creating variables here
var dog,normalDog,happyDog,foodS,foodStock;

function preload()
{
  //loading images here
  normalDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,350,10,10)
  dog.addImage(normalDog);
  dog.scale = 0.15;
  
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock)
}


function draw() {  
   
  background("lightgreen");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  dog.display();

  drawSprites();
  
  textSize(20);
  fill("red");
  text(" Note :" +"Press UP_ARROW key to feed the dog milk!",30,20)
  text("FoodStock : " + foodS, 180, 280);
  
  
   
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
    if (x<=0) {
      x = 0;
    } else {
      x = x - 1;
    }

  database.ref('/').update({
    food:x
  })
}
