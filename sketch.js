const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;

var Players;
var box,box_img;
var score = 0;
var robot,robot_img;
var backgr;
var enemies;
var Bulletgroup, EnemyGroup, CloudGroup, BoxGroup, RobotGroup;
var FORM = 0;
var PLAY = 1;
var END = 2;
var gameState = FORM;
var input,playButton;
var Name;
var GameName;
var col;
var lifes = 3;


function preload()  {

    background_img = loadImage("sky.png")

    player_img = loadAnimation("PC/PC1.gif","PC/PC2.gif","PC/PC3.gif","PC/PC4.gif","PC/PC5.gif","PC/PC6.gif","PC/PC7.gif")

    box_img = loadImage("NPC/boxes.png");

    robot_img = loadAnimation("NPC/0.gif","NPC/1.gif","NPC/2.gif","NPC/3.gif","NPC/4.gif","NPC/5.gif","NPC/6.gif","NPC/7.gif","NPC/8.gif","NPC/9.gif","NPC/10.gif","NPC/11.gif")

    cloud1_img = loadImage("cloud1.png")
    cloud2_img = loadImage("cloud2.png")
    cloud3_img = loadImage("cloud3.png")

    enemy_img = loadAnimation("NPC/a.gif","NPC/b.gif","NPC/c.gif","NPC/d.gif","NPC/e.gif","NPC/f.gif","NPC/g.gif","NPC/h.gif","NPC/i.gif","NPC/j.gif")
    
    bullet_img = loadImage("NPC/Bullet.jpg")
}

function setup()  {
    createCanvas(displayWidth,displayHeight);

    backgr = createSprite(400,200)
    backgr.addImage(background_img)
    backgr.scale = 10
    
    ground = createSprite(400,810,2200,40)
    ground.shapeColor = 119,77,43

    player = createSprite(50,737.85,20,20)
    player.addAnimation("running",player_img)
    player.scale = 0.35
    player.debug = true
    player.setCollider("rectangle",0,0,200,300)

    col = color(219,197,246);

    BoxGroup = new Group();
    RobotGroup = new Group();
    BulletGroup = new Group();
    CloudGroup = new Group();
    EnemyGroup = new Group();

    input = createInput("Enter Name Here..");
    playButton = createButton("Play the Game");
    GameName = createElement('h1');
    GameName.html("Soldier Runner")
}


function draw()  {
    background(175)  
    engine = Engine.create();

    world = engine.World;
    
    if(gameState===FORM)  {
        
        input.position(550,400);
        input.size(300,30)
        playButton.position(650,450);
        playButton.style("background-color",col)
        GameName.position(600,325)
        playButton.mousePressed(function(){
            
            GameName.hide();
            playButton.hide();
            input.hide();
            Name = input.value();
            gameState = PLAY
        })
    }  
    if(gameState===PLAY)  {

        
 

    player.collide(ground)
    spawnBoxes();
    //score = Math.round(score+getFrameRate()/60)
    if(frameCount%10===0)  {
        score = score+1

    }
   spawnEnemies();
    if(score>100)  {
        spawnRobots();

    }

    if(BoxGroup.isTouching(player)||RobotGroup.isTouching(player)||BulletGroup.isTouching(player))  {
        lifes = lifes-1

    }
    if(lifes = 0) {
        gameState = END
    }
    if(keyDown("Space")&&player.y>735)  {
        player.velocityY = -13

    }
    
    player.velocityY = player.velocityY+0.35
    
    
    spawnClouds();

    
    }

    if(gameState===END)  {

        

    }

    drawSprites();
    
    textSize(25)
    fill("red")
    text("Score: "+score,1300,50)  
    text("Lifes Remaining: "+lifes,50,50)
    textSize(15)
    textAlign(CENTER) 
    text(Name,player.x,player.y-50) 
    player.depth = player.depth+1
}


function spawnBoxes()  {
    if(frameCount%317===0)  {
        box = createSprite(1500,750,20,20)
        box.addImage(box_img)
        box.velocityX = -4;
        box.scale = 0.3
        box.lifetime = 1000
        BoxGroup.add(box)
        box.debug = true
        box.setCollider("circle",0,0,200)
    }

}

function spawnRobots()  {
    if(frameCount%145===0)  {
        robot = createSprite(1500,750,20,20)
        robot.addAnimation("robot",robot_img)
        robot.velocityX = -4
        robot.scale = 0.4
        robot.lifetime = 1000
        RobotGroup.add(robot)
        robot.debug = true
        robot.setCollider("rectangle",0,0,100,150)
    }

}

function spawnClouds()  {
    if(frameCount%100===0)  {
        cloud = createSprite(1500,random(50,150),20,20)
        var rand = Math.round(random(1,3))
        switch(rand)  {
            case 1: cloud.addImage(cloud1_img)
            break;
            case 2: cloud.addImage(cloud2_img)
            break;
            case 3: cloud.addImage(cloud3_img)
            default:
            break;
            
        }
        cloud.velocityX = -4
        cloud.scale = 0.2
        cloud.lifetime = 200
        CloudGroup.add(cloud)
    }

}

function spawnEnemies()  {
    if(frameCount%400===0)  {
        enemies = createSprite(1500,735,20,20)
        enemies.addAnimation("Enemies",enemy_img)
        enemies.velocityX = -4
        enemies.scale = 0.6
        enemies.lifetime = 1000
        EnemyGroup.add(enemies)
        enemies.debug = true
        enemies.setCollider("rectangle",0,0,200,200)

        if(frameCount%100===0)  {
            bullets = createSprite(enemies.x,721,20,20)
            bullets.addImage(bullet_img)
            bullets.velocityX = -10
            bullets.scale = 0.05
            bullets.lifetime = 1000
            BulletGroup.add(bullets)
            bullets.debug = true

        }
        

    }

}

    


    