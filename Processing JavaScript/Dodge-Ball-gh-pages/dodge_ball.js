var sketchProc=function(processingInstance){ with (processingInstance){
size(800, 800); 
frameRate(60);
var sFactor = 2;
scale(sFactor);;

/* Dodge ball */

/****************************
The game is Dodge Ball

    Creative:
    1. Game design, theme, start screen, arena, characters.
    2. Randomness in characters makes the user to unpredict the behaviour of the NPC
    3. Probablisctic estimation of future to decide to run, or evade by NPCs.
*******************************/


angleMode = "radians";
var oneDegree = 3.14/180;

var evadeStateIndex = 2;
var runStateIndex = 1;
var startStateIndex = 0;
var endStateIndex = 3;
var minThresholdAngle = 85;
var maxThresholdAngle = 105;


var gameObj = function(){
    this.shoot = 0;
    this.gameOver = 0;
    this.start = 0;
    this.initialVelocity = 5;
    this.initialize = 0;
    this.timerTimeOut = 0;
};var game = new gameObj();

var keyArray = [];
var angleScale = 0;
var keyPressed = function() {
  //  if(keyCode === 32){
        if(game.shoot === 0){
            keyArray[keyCode] = 1;
        }
//    }
 //   else{
  //      keyArray[keyCode] = 1;
//    }
    if(keyArray[32] === 1){
        angleScale = random(2,8);
    }
};

var myImages = [];
var notCreated = 0;
var customChar = function(){
    if(notCreated === 0){
        notCreated = 1;
    background(16, 77, 92);
    pushMatrix();
    translate(width/(sFactor*2), height/(sFactor*2));
	
    rotate(0);
    fill(0,0,0);
    triangle(0, -80, 30, -50, -30, -50);
    rect(-25, -70, 50, 50,20);
    ellipse(0, 0, 70, 20);
    ellipse(0, 0, 50, 80);
    ellipse(0, 25, 60, 20);
    fill(255, 255, 255);
    ellipse(-10, -50, 10,10);
    ellipse(10, -50, 10,10);  
    popMatrix();
    myImages.push(get(161*sFactor, 120*sFactor, 75*sFactor, 120*sFactor));
    
    background(16, 77, 92);
    pushMatrix();
    translate(width/(sFactor*2), height/(sFactor*2));
    rotate(-50);
    fill(0,0,0);
    triangle(0, -80, 30, -50, -30, -50);
    rect(-25, -70, 50, 50,20);
    ellipse(0, 0, 70, 20);
    ellipse(0, 0, 50, 80);
    ellipse(0, 25, 60, 20);
    fill(255, 255, 255);
    ellipse(-10, -50, 10,10);
    ellipse(10, -50, 10,10);
    popMatrix();  
    myImages.push(get(161*sFactor, 120*sFactor, 75*sFactor, 120*sFactor));
    
    background(16, 77, 92);
    pushMatrix();
    translate(width/(sFactor*2), height/(sFactor*2));
    rotate(50);
    fill(0,0,0);
    triangle(0, -80, 30, -50, -30, -50);
    rect(-25, -70, 50, 50,20);
    ellipse(0, 0, 70, 20);
    ellipse(0, 0, 50, 80);
    ellipse(0, 25, 60, 20);
    fill(255, 255, 255);
    ellipse(-10, -50, 10,10);
    ellipse(10, -50, 10,10);
    popMatrix();  
    myImages.push(get(161*sFactor, 120*sFactor, 75*sFactor, 120*sFactor));
    
    background(16, 77, 92);
    pushMatrix();
    noStroke();
    translate(width/(sFactor*2), height/(sFactor*2));
    rotate(0);
    fill(70, 204, 25);
    triangle(0, -80, 30, -50, -30, -50);
    rect(-25, -70, 50, 50,20);
    ellipse(0, 0, 70, 20);
    ellipse(0, 0, 50, 80);
    ellipse(0, 25, 60, 20);
    fill(255, 255, 255);
    ellipse(-10, -50, 10,10);
    ellipse(10, -50, 10,10);
    popMatrix(); 
    myImages.push(get(161*sFactor, 120*sFactor, 75*sFactor, 120*sFactor));
    }
};

var ballObj = function(x, y){
    this.position = new PVector(x,y);
    this.velocity = new PVector(0, 0);    
    this.acceleration = new PVector(0, 0);
    this.angle = 0;
    this.size = 40;
    this.mass = this.size / 5;
    this.bounceCoeff = -(100 - this.size) / 50;
    this.c1 = random(0, 255);
    this.c2 = random(0, 255);
    this.c3 = random(0, 255);
    this.dir = new PVector(0, 0);
    this.thrown = 0;
    this.bumpForce = new PVector(0, 0);
}; var ball = new ballObj(200, 375);

var displayCustomText = function(a, x, y, font){
    var f = createFont("Bauhaus 93");
    textFont(f, font);
    text(a, x, y);
};

var collision = function(ax1,ay1,ax2,ay2, bx1, by1, bx2, by2){
    if( (ax2 >= bx1) && (ax1<=bx2)){
        if( (ay2 >= by1) && (ay1<=by2)){
            //println("collision");
            return true;
        }
    }
};

var startState = function(){
};
var runState = function(){
};
var evadeState = function(){
};
var endState = function(){
};

var npcObj = function(x,y, start){
    this.x = x;
    this.y = y;
    this.state = [new startState(), new runState(), new evadeState(), new endState()]; 
    this.currState = 0;
    this.start = start;
    this.hit = 0;
};
var npc = [];


/*********Utility***************/

npcObj.prototype.checkAngle = function(){
    var myVec = new PVector(this.x+15, this.y+20);
    var vec = PVector.sub(ball.position,myVec);
    var angle = vec.heading();
    angle = angle/oneDegree;
    return angle;
};


npcObj.prototype.checkForWin = function(){
   if(this.start < 2){
        if(this.x >370){
            this.x = 370;
            return true;
        }
    }
    else{
        if(this.x < 0){
            this.x = 0;
            return true;
        }
    }
    return false;
};

npcObj.prototype.run = function(){
    if(this.start <2){
       this.x++;
    }
    else {
       this.x--;
    }  
};

npcObj.prototype.runFast = function(){
    if(this.start <2){
       this.x = this.x + random(1,3);
    }
    else {
       this.x = this.x - random(1,3);
    }  
};
npcObj.prototype.evade = function(){
    if(this.start <2){
       this.x--;
    }
    else {
       this.x++;
    }  
};
 
npcObj.prototype.actRandom = function(){
    var myVec= new PVector(this.x+37, this.y+60);
    var vec = PVector.sub(ball.position,myVec);
    if(vec.mag() < 100){
        if(this.start <2){
            this.x -= random(2,3);
            this.y += random(-3,3);
        }
        else{
            this.x += random(2,3);
            this.y += random(-3,3);
        }
    }
};
/**********End********************/
var frames = frameCount;
var imageCount = 0;
npcObj.prototype.draw = function(){
    fill(3, 3, 3);
    if(frames < frameCount - 10){
        frames = frameCount;
        imageCount = (imageCount + 1)%3;
    }
    
    if(this.currState === endStateIndex){
        image(myImages[3], this.x, this.y, 30, 40);
    }
    else{
        image(myImages[imageCount], this.x, this.y, 30, 40);
    }
};

npcObj.prototype.changeState = function(s){
    this.currState = s;
};

startState.prototype.execute = function(me){
    if(game.timerTimeOut){
        if(me.start === 0){
            me.x = 0;
            me.y = 50;
        }
        else if(me.start === 1){
            me.x = 0;
            me.y = 150;
        }
        else if(me.start === 2){
            me.x = 370;
            me.y = 100;
        }
        else if(me.start === 3){
            me.x = 370;
            me.y = 200;
        }
        me.changeState(runStateIndex);
    }
};


runState.prototype.execute = function(me){
    me.draw();
    me.run();
    
    /* Changes to evade state when shoot is pressed or angle is less than 80*/
    if(game.shoot === 1){
        me.changeState(evadeStateIndex);
        
    }
    var angle = me.checkAngle(); 
    if(angle > minThresholdAngle && angle < maxThresholdAngle){
        me.changeState(evadeStateIndex);
    } 
    if(me.checkForWin()){
        me.changeState(3);
    }
};

var currFrame=frameCount;
var prob = 0;
evadeState.prototype.execute = function(me){
    me.draw();
    var myVec= new PVector(me.x+15, me.y+20);
    var vec = PVector.sub(ball.position,myVec);
    if(vec.mag() < 30){
        me.hit = 1;
        if(me.start < 2){
             me.x = 0;
            me.changeState(runStateIndex);
        }
        else{
            me.x = 370;
            me.changeState(runStateIndex);
        }
    }
    
    if(me.checkForWin()){
        me.changeState(endStateIndex);
    }
    
    var angle = me.checkAngle(); 
    if(angle < minThresholdAngle || angle > maxThresholdAngle){
        me.changeState(runStateIndex);
    }
    
    // Evade
    if(currFrame < frameCount-50){
        currFrame = frameCount;
        prob = random(1,20);
    }
     if(prob > 15){
        me.runFast();
    }
    else if(prob > 10){
        me.evade();   
    }
    else if(prob > 0){
        me.actRandom();   
    }
};

var count=  0;
endState.prototype.execute = function(me){
    me.draw();
       if(npc[0].currState === endStateIndex){
           if(npc[1].currState === endStateIndex){
                if(npc[2].currState === endStateIndex){
                    if(npc[3].currState === endStateIndex){
                       fill(19, 173, 50);
                       displayCustomText("You Loose", 120, 230, 40);
                       displayCustomText("Click restart to try again", 90, 280, 20);
                    }
                }
           }
       }
    
};


var currFrame = 0;
var time = 3;
var userStart = 0;

mouseClicked = function() {
    if(mouseX >(width/2-20*sFactor) && mouseX < (width/2+20*sFactor)){
        if(mouseY >(height - 50*sFactor) && mouseX < height){
            userStart = 1;
        }
    } 
};

var initialize = function(){
    ball.draw();
    fill(170, 224, 7);
    ellipse(0,0, 100, 100);
    ellipse(0,400, 100, 100);
    ellipse(400,400, 100, 100);
    ellipse(400,0, 100, 100);
    fill(17, 219, 206);
    displayCustomText("DODGE BALL", 60, 180,50);
    displayCustomText("Welcome to", 90, 100,40);
    customChar();
    image(myImages[2], 30, 140, 30, 50);
    image(myImages[1], 335, 140, 30, 50);
    
    displayCustomText(" . Goal is to avoid the opposition to reaching other side", 0, 220, 15);
    displayCustomText(" . The characters will trun to green once they are home", 0, 240, 15);
    displayCustomText(" . Use arrow keys to move left/right and space bar to shoot. \n   the opposition player will restart if its hit by the ball", 0, 260, 15); 
    
    displayCustomText("  Click on the ball below to", 30, 322, 25);
    displayCustomText("  shoot em up ", 60, 350,40 );
    
    if(userStart){
        fill(255,255,255);
        displayCustomText(time, 180, 200, 50); 
        if(!game.start){
            if(currFrame < frameCount - 60){
                currFrame = frameCount;
                time--;
               if(time === 0){
                   npc.push(new npcObj(0,50,0), new npcObj(0,150,1), new npcObj(370,100,2), new npcObj(370,200,3));     
                   game.initialize = 1;
                   game.start = 1;
                   game.timerTimeOut = 1;
               }
            }
        }
    }
};


var keyReleased = function() {
    keyArray[keyCode] = 0;
};

var drawbackground = function(){
    background(16, 77, 92);
    fill(189, 103, 42);
    ellipse(0,0, 150, 50);
    ellipse(400,0, 150, 50);
    fill(10, 199, 92,50);
    var f = createFont("Bauhaus 93");
    textFont(f, 50);
    text("DODGE BALL", 60, 180);
    
    stroke(255, 255, 0);
    line(0,300, 400, 300);
    fill(19, 99, 102);
    rect(0, 300, 400, 100);
    fill(191, 158, 28,50);
    textFont(f, 40);
    text(" shoot em up ", 70, 350);
    
};

ballObj.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};

var transparency = 200;
ballObj.prototype.draw = function() {
    drawbackground();
    
    noStroke();
    fill(252, 206, 0);
    rect(this.position.x-20, 375+10, 40, 20);
    fill(143, 148, 95);
    arc(this.position.x,375+5, 40, 30,  0, 180);
    
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    noStroke();
    fill(16, 18, 1);
    ellipse(0, 0, this.size,this.size);
    fill(250, 150, 0,transparency);
    fill(7, 109, 122);
    arc(0,0,this.size, this.size/4,90,270);
    fill(150, 134, 32);
    arc(0,0,this.size/2, this.size,-90,90);
    
    fill(255, 0, 0,transparency);
    
    popMatrix();
    
    if(this.position.x < 5){ this.position.x = 5;}
    if(this.position.x > 395){ this.position.x = 395;}
    
};

var windForce = new PVector(0,-2);
ballObj.prototype.move = function() {
    if (keyArray[LEFT] === 1) {
        this.position.x -= 3;
    }
    if (keyArray[RIGHT] === 1) {
        this.position.x += 3;
    }
    if(keyArray[32] ===1){
        game.shoot = 1;
        this.velocity.y = game.initialVelocity;
        angleScale = ((angleScale++) % 6 );
    }
    if(game.shoot === 1){
        windForce.mult(0.1);
        this.applyForce(windForce);
        this.velocity.add(this.acceleration);
        this.position.sub(this.velocity);
        this.angle = this.velocity.y * angleScale;
    }
    if(this.position.y < -40){
        game.shoot = 0;
        this.position.y = 375;
    }
    
};

draw = function() {
    drawbackground();
     if(!game.initialize){
         initialize();
     }
     if(game.start){
         ball.draw(); 
         ball.move();
         for( var i=0; i<npc.length; i++){
             npc[i].state[npc[i].currState].execute(npc[i]);
         }
     }
};
}};
