var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


angleMode = "radians";
var oneDegree = 3.14/180;
var transparency = 200;
var inBasket = 0;
var wind = new PVector(0, 0);
var frames = frameCount;
var n= 0;
var windDIrection = function(){
    if(frames<frameCount - 50){
        n++;
        if(n===5){
            n=0;
        frames = frameCount;
        wind.x = random(-0.1, 0.1);
        wind.y = random(-0.01, 0.01);
        }
    }
};

var basket = [new PVector(300,320),new PVector(370,250), new PVector(370,150), new PVector(300,80)];

var score = 5;
var win = 0;
var basketNumber = 0;
var gameOver = 0;

var displayCustomText = function(a, x, y, font){
    var f = createFont("Forte");
    textFont(f, font);
    text(a, x, y);
};


var startGame = 0;
mouseClicked = function() { 
    if(mouseX>280 && mouseX <320){
        if(mouseY > 180 && mouseY < 220){
            startGame = 1;
        }
    }
};

var lost = 0;
var drawbackground = function(){
  
  background(214, 191, 75);
 // image(getImage("cute/RoofSouth"),0,-2000,400,2400);
  
  /*ground*/
  
  fill(179, 171, 29);
  rect(0,0,400,400);
  fill(39, 104, 117);
  rect(0,50,400,300);
  
  /* markers inside boundary */
  stroke(255, 255,255);
  noFill();
  line(200, 50, 200, 350);
  //ellipse(0, 200, 200, 250);
  //noStroke();
  fill(64, 125, 79,200);
  ellipse(50, 200, 50,250);
  
  // Arrow
  fill(58, 199, 91,100);
  noStroke();
  rect(120,75, 90,10);
  rect(120,145, 150,10);
  rect(120,245, 150,10);
  rect(120,315, 90,10);
  
  triangle(200,60,200,100,240,80);
  triangle(260,130,260,170,300,150);
  triangle(260,230,260,270,300,250);
  triangle(200,300,200,340,240,320);
      
  stroke(255, 255,255);
  noFill();
  ellipse(400, 200, 200, 250);
  ellipse(200, 200, 100, 100);
  
  /*  baskets   */
  
  stroke(165, 191, 52);
  ellipse(370, 158, 30, 20);
  ellipse(370, 156, 30, 20);
  ellipse(370, 154, 30, 20);
  ellipse(370, 152, 30, 20);
  stroke(0, 0, 0);
  ellipse(370, 150, 30, 20);
  
  stroke(165, 191, 52);
  ellipse(370, 258, 30, 20);
  ellipse(370, 256, 30, 20);
  ellipse(370, 254, 30, 20);
  ellipse(370, 252, 30, 20);
  stroke(0, 0, 0);
  ellipse(370, 250, 30, 20);
  
  stroke(165, 191, 52);
  ellipse(300,88, 50, 40);
  ellipse(300,86, 50, 40);
  ellipse(300,84, 50, 40);
  ellipse(300,82, 50, 40);
  stroke(0, 0, 0);
  ellipse(300,80, 50, 40);
  
  stroke(165, 191, 52);
  ellipse(300,328, 50, 40);
  ellipse(300,326, 50, 40);
  ellipse(300,324, 50, 40);
  ellipse(300,322, 50, 40);
  stroke(0, 0, 0);
  ellipse(300,320, 50, 40);
  
  /* holders */
  line(385,150, 400,180); // basket1
  line(385,155, 400,185);
  
  line(385,250, 400,280); // basket 2
  line(385,255, 400,285);
  
  line(300,60, 320,50); // basket 3
  line(305,60, 325,50);
  
  line(300,340, 320,350); // basket 3
  line(305,340, 325,350);
  
   var f = createFont("monospace");
   textFont(f, 17);
   fill(63, 9, 110);
   text("Wind: ", 250,382);
    
    pushMatrix();
    translate(350, 370);
    var zero = new PVector(1,0);
    var angle = PVector.angleBetween(wind,zero);
    rotate(-angle);
    text(">>",0,0,20,20);
    popMatrix();
    text(wind.mag()*100,300,382);
    text("Score = ", 50, 382);
    text(score,120,382);
    if(score >= 20){
        fill(238, 250, 0);
        textFont(f, 30);
        text("You Rock Champ!!\n End of game",100,200);
        gameOver = 1;
    }
    if(score < 1){
        gameOver = 1;
        lost = 1;
    }
    text("chances x",15,30);
    fill(255, 0, 0);
    for(var j=1;j<=score;j++){
        ellipse(100+10*j, 25, 10,10);    
    }
};

var ballObj = function(x, y) {
    this.position = new PVector(x,y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.size = random(30,30);
    this.mass = this.size / 5;
    this.bounceCoeff = -(100 - this.size) / 50;
    this.c1 = random(0, 255);
    this.c2 = random(0, 255);
    this.c3 = random(0, 255);
    this.dir = new PVector(0, 0);
    this.thrown = 0;
    this.hitGround = 0;
    this.bumpForce = new PVector(0, 0);
};

var ball = new ballObj(0, 0);
var gravity = new PVector(0, 0.08);

var coll = 0;
var spin = 0; 
var n = 1;
var incrementScore= 0;
var mouseDragged = function() {
    ball.dir.set(mouseX-pmouseX, mouseY - pmouseY);
    ball.position.set(mouseX, mouseY);
    ball.thrown = 1;
    inBasket = 0;
    transparency = 300;
    coll = 0;
    spin = 1;
   // println(incrementScore);
    if(incrementScore){
        score--;
        incrementScore=0;
    }
};

mouseReleased = function() {
    if (ball.thrown === 1) {
        ball.thrown = 2;
        incrementScore = 1;
    }
};

ballObj.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};

var ballsize = 0;
var frame = frameCount;
var sp = 0;
ballObj.prototype.draw = function(x,y) {
    drawbackground();
    
    stroke(0, 0, 0);
    fill(36, 29, 4,transparency);
    ellipse(x, y, ballsize, ballsize);
    fill(250, 150, 0,transparency);
    arc(x,y,ballsize/2, ballsize-3,-90,90);
    fill(255, 0, 0,transparency);
    stroke(3, 237, 46);
     sp = (sp+1) % 10;
     if(spin){
        if(sp === 5){
         frame = 1 ;
         }
         else{
             frame = -1;
         }
         arc(x,y,ballsize/sp,ballsize, -90 * oneDegree*frame,90*oneDegree*frame);
        fill(217, 255, 0,transparency);
        arc(x,y,ballsize/sp,ballsize, 90 * oneDegree*frame,270*oneDegree*frame);
     }
    
   if(this.velocity.mag() < 0.03){
       spin = 0;
   }
};

var collision = function(ax1,ay1,ax2,ay2, bx1, by1, bx2, by2){
    if( (ax2 >= bx1) && (ax1<=bx2)){
        if( (ay2 >= by1) && (ay1<=by2)){
            //println("collision");
            return true;
        }
    }
};

ballObj.prototype.checkforCollision = function(){
    //var basket = [new PVector(300,320),new PVector(370,250), new PVector(370,150), new PVector(300,80)];
    for(var i=0;i<basket.length;i++){
        if(collision(this.position.x - this.size/2, this.position.y-this.size/2, this.position.x + this.size/2, this.position.y+this.size/2,  basket[i].x - 25, basket[i].y, basket[i].x + 25, basket[i].y+30)){
           coll = 1;
           return true;
        }
    }
};
    


ballObj.prototype.basket = function(){
    //ellipse(300,320, 50, 40);
    //rect(x-5,y+10,10,10);
    var x1 = this.position.x - 5;
    var x2 = this.position.x + 5;
    if(!coll && !inBasket){
        if(this.checkforCollision()){
            this.computeBump();
        }
    }
    
    for(var i = 0;i<basket.length;i++){
        var mag = PVector.sub(this.position,basket[i]);
        if(x1>basket[i].x - 25 && x2<basket[i].x+25){
            if((mag.x > -15 && mag.x < 15) && (mag.y >-20 && mag.y<5)){
                var anglebw = PVector.angleBetween(basket[i],ball.position);
                //if(anglebw > 0){
                    this.position.x = basket[i].x;
                    inBasket = 1;
                    basketNumber = i+1;
                    //println(i);
                    transparency = 100;
                //}
            }
        }
    }
};


ballObj.prototype.computeBump = function() {
    
    for(var i=0; i<4; i++){
       if (dist(this.position.x, this.position.y, basket[i].x,basket[i].y+5) <= (this.size/2 + 25)) {
           //println("bump");
                var v = new PVector(this.position.x - basket[i].x,
this.position.y - basket[i].y+5);
                this.velocity.mult(-1);
                var heading1 = this.velocity.heading();
                var heading2 = v.heading();
                var angle = heading2 - heading1;
                if (heading2 < heading1) {
                    angle = -angle;
                }
                if(abs(heading2 - heading1) > 180) {
                    angle = -angle;
                }
                this.velocity.rotate(2*angle);
                
                v.mult(0.1);    // approx
                this.bumpForce.add(v);
            }
    }
        
};

ballObj.prototype.update = function() {
    
    if (this.thrown === 2) {
         ball.basket();
        if(!inBasket){
            this.velocity.add(PVector.mult(this.dir,0.3));
            var gravityForce = PVector.mult(gravity, this.mass);
            this.applyForce(gravityForce);
            var windForce = PVector.mult(wind, this.mass);
            windForce.mult(0.1);
            this.applyForce(windForce);
            
             windDIrection();
            
            var airFriction = PVector.mult(this.velocity,-1);
            airFriction.normalize();
            airFriction.mult(0.01);
            this.applyForce(airFriction);
            if(this.hitGround){
                var groundFriction = PVector.mult(this.velocity,-1);
                groundFriction.mult(0.05);
                this.applyForce(groundFriction);
            }
            this.velocity.add(this.acceleration);
            ball.position.add(this.velocity);
            this.acceleration.set(0, 0);
            this.dir.set(0);
            if (this.position.y > (350 - this.size/2)) 
            {
                this.position.y = 350 - this.size/2;
                this.velocity.y *= -0.7;
                
            }
        }
        else{ 
            this.position.x = this.position.x +1;
            if(this.position.x >= 375){
                this.position.x = 375;
            }
            this.position.y = this.position.y+2;
            if(this.position.y >= 350-this.size){
                this.velocity.set(0);
                this.draw(300,350);
                
                coll = 1;
                spin = 0;
                inBasket = 0;
                if(incrementScore ===1){
                    score = score + basketNumber;
                    incrementScore = 0;
                    if(score === 7){
                        win =1;
                    }
                }
            } 
        }
    }
    if (this.thrown === 1){
        this.velocity.set(0);
    }
    
    if(this.position.y < 200){
        ballsize = this.size * ((800 + this.position.y)/1000);
    }
    if(this.position.x<25 || this.position.x>780){ this.position.x = 20; this.velocity.x = 0;}
    //if(this.position.y>380){ this.position.y = 380; this.hitGround = 1;} 
    
    if(this.position.x+this.size/2 >= 400){ 
        if(this.position.y<50){
            pushMatrix();
            var temp = 50-this.position.y;
            translate(0,temp);
            ball.draw(800-this.size/2-(this.position.x), this.position.y);
        }
        else{
            ball.draw(800-this.size/2-(this.position.x), this.position.y);
        }
        popMatrix();
    }
    else if(this.position.y<50){
        pushMatrix();
        var temp = 50-this.position.y;
        translate(0,temp);
        if(this.position.x+this.size/2 >= 400){ 
            ball.draw(800-this.size/2-this.position.x, this.position.y);  
        }
        else{
            ball.draw(this.position.x, this.position.y);
        }
        popMatrix();
    }
    else{
        ball.draw(this.position.x, this.position.y);
    } 
};

var initialized = 0;
var initialize = function(){
    initialized = 1;
   
  background(240, 218, 19);
  noStroke();
  fill(116, 189, 162, 80);
  rect(100, 0, 300, 300);
  fill(221, 230, 229, 80);
  rect(0, 50, 300, 300);
  fill(7, 232, 19, 80);
  rect(50, 100, 300, 300);

  stroke(0, 0, 0);
  fill(84, 72, 4);
  displayCustomText("2/3D - 4 basket ball",20, 120, 30);
  
  displayCustomText("Click on the ball to start >>", 20, 200, 20);
  displayCustomText(1, 295, 330,30,10);
  displayCustomText(2, 295, 95,30,10);
  displayCustomText(2, 365, 260,30,10);
  displayCustomText(2, 365, 160,30,10);
  
  displayCustomText(">Click the mouse to get the ball, \n  drag and release the mouse to release ball",5,230,15);
  displayCustomText(">The baskets on the right shows the \n  points each basket is worth",5,270,15);
  displayCustomText(">Keep an eye on the wind direction",5,310,15);
  displayCustomText(">Every basket can fetch you 1 or 2 points",5,330,15);
  displayCustomText(">Every miss costs you one point",5,350,15);
  displayCustomText(">Reach 20 points or more to win the game",5,370,15);
  displayCustomText(">Ball returning from the wall are not considered",5,390,15);
  
  
  
  fill(204, 137, 22);
  ellipse(300, 200, 40, 40);
  stroke(3, 3, 3);
  arc(300, 200, 20, 40, 1, 360);
  
  noFill();
  stroke(165, 191, 52);
  ellipse(370, 158, 30, 20);
  ellipse(370, 156, 30, 20);
  ellipse(370, 154, 30, 20);
  ellipse(370, 152, 30, 20);
  stroke(0, 0, 0);
  ellipse(370, 150, 30, 20);
  
  stroke(165, 191, 52);
  ellipse(370, 258, 30, 20);
  ellipse(370, 256, 30, 20);
  ellipse(370, 254, 30, 20);
  ellipse(370, 252, 30, 20);
  stroke(0, 0, 0);
  ellipse(370, 250, 30, 20);
  
  stroke(165, 191, 52);
  ellipse(300,88, 50, 40);
  ellipse(300,86, 50, 40);
  ellipse(300,84, 50, 40);
  ellipse(300,82, 50, 40);
  stroke(0, 0, 0);
  ellipse(300,80, 50, 40);
  
  stroke(165, 191, 52);
  ellipse(300,328, 50, 40);
  ellipse(300,326, 50, 40);
  ellipse(300,324, 50, 40);
  ellipse(300,322, 50, 40);
  stroke(0, 0, 0);
  ellipse(300,320, 50, 40);
};

draw= function() {
    
    if(!initialized){
        initialize();
    }
    if(startGame){
         drawbackground();
         if (ball.thrown > 0) {
            ball.update();
        }
    }
    if(gameOver){
        startGame = 0;
        var f = createFont("monospace");
        textFont(f, 30);
        fill(235, 218, 174);
        if(lost){
            text(" You lost!!\n",100,150);
            text("Press restart \nto try again",100,200);
        }
    }
};


}};