var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);
// Fish tank

/*
    Fish tank with weeds. Click the mouse to generate bubbles.
    All the characters are drawn with subdivision and bezier.
    
    Fishes would be of random size every time you restart. 
    
*/


angleMode = "radians";
var points = [];
var p2 = [];
var numPoints = 0;
var done = 0;
var start = 0;
var fish = [];
var initialized = 0;


/* Fish object */
var fishObj = function(x, y, size){
    this.position = new PVector(x,y);
    this.size = size;
    this.cor = [];
};

/* bubbles obj */
var iterations = 0;
var clicked = 0;
var bubbleObj = function(x, y, size){
    this.position = new PVector(x, y);
    this.velocity = new PVector(random(-0.1, 0.1), random(-1, -3));
    this.size = random(10,30);
    this.position.y -= (18 - this.size);
    this.timeLeft = random(230,255);
};

/* Fountain of bubbles */
var fountainObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.spliced = 0;
};

/* Array to store bubbles */
var bubbles = [];

/* Create a new fountation one mouse if pressed */ 
var mouseClicked = function(){
    bubbles.push(new fountainObj(mouseX, mouseY));
};


bubbleObj.prototype.draw = function() {
    /* if it reached top, stop its verical velocity*/
    if(this.position.y <= this.size/2){
        this.position.y = this.size/2;
    }
    stroke(221, 255, 0);
    fill(255,255,255,40);
    ellipse(this.position.x, this.position.y, this.size, this.size);
};

/*Moving the bubble */
bubbleObj.prototype.move = function() {
    this.position.add(this.velocity);
    this.timeLeft--;
};

/* push random numebr of bubbles every time mouse is clicked */
fountainObj.prototype.execute = function() {
    /* just one fountain per click */
    if(this.spliced === 0){
        var r = random(10,30);
        for( var i = 0; i<r; i++){
            this.particles.push(new bubbleObj(this.x, this.y));
        }
        this.spliced = 1;
    }
    
    /* draw all th bubbles */
    for (var i=0; i<this.particles.length; i++) {
        if ((this.particles[i].timeLeft > 0) && 
            (this.particles[i].position.y < this.y)) {
            this.particles[i].draw();
            this.particles[i].move();
        }
        else {
            this.particles.splice(i, 1);
        }
    } 
    
};

/*for subdivision */
var splitPoints = function() {
    p2.splice(0, p2.length);
    for (var i = 0; i < points.length - 1; i++) {
        p2.push(new PVector(points[i].x, points[i].y));
        p2.push(new PVector((points[i].x + points[i+1].x)/2, (points[i].y +
points[i+1].y)/2));
    }  
    p2.push(new PVector(points[i].x, points[i].y));
    p2.push(new PVector((points[0].x + points[i].x)/2, (points[0].y +
points[i].y)/2));
};   

/*for subdivision */
var average = function() {
    for (var i = 0; i < p2.length - 1; i++) {
        var x = (p2[i].x + p2[i+1].x)/2;
        var y = (p2[i].y + p2[i+1].y)/2;
        p2[i].set(x, y);
    } 
    var x = (p2[i].x + points[0].x)/2;
    var y = (p2[i].y + points[0].y)/2;
    points.splice(0, points.length);
    for (i = 0; i < p2.length; i++) {
        points.push(new PVector(p2[i].x, p2[i].y));   
    }
};  

/*for subdivision */
var subdivide = function() {
    splitPoints();
    average();
}; 

/* Get ready before start. Get all the verticies of the fish after subdivision */
var initialize = function(){
    
    initialized = 1;
    fish = [new fishObj(50, 50, 20), new fishObj(80, 300, 15),  new fishObj(100, 150, 20), new fishObj(300, 300, 15), new fishObj(300, 100, 25), new fishObj(450, 200, 15)];  
    for(var i=0; i<fish.length;i++){
        var f = fish[i];
        var size = random(0.3,1.3);
        //points.splice(0,points.length);
        points = [];
        p2.splice(0,p2.length);
        points.push(new PVector(f.position.x - f.size*2, f.position.y - f.size/size)); 
        points.push(new PVector(f.position.x - f.size*4, f.position.y + f.size/2)); 
        points.push(new PVector(f.position.x - f.size*2, f.position.y + f.size/size));     
        points.push(new PVector(f.position.x + f.size*2, f.position.y + f.size/random(6,8)));  
        // for tail
        
   //     points.push(new PVector(f.position.x + f.size*random(2.5,3.5), f.position.y + f.size/random(0.5,1)));
     //   points.push(new PVector(f.position.x + f.size*3, f.position.y + f.size/random(1,2)));
       //   points.push(new PVector(f.position.x + f.size*random(2.5,3.5), f.position.y - f.size/random(0.5,1))); 
    /*     points.push(new PVector(f.position.x + f.size*random(5,10), f.position.y + f.size/random(2,4))); 
           points.push(new PVector(f.position.x + f.size*random(8,10), f.position.y + f.size/random(1,2)));*/
        
        points.push(new PVector(f.position.x + f.size*2, f.position.y - f.size/random(6,8))); 
        
        numPoints = 5; 
        done = 1;
        iterations = 0;
        while(iterations <4 ){
            if (done === 1) {
                subdivide();
                iterations++; 
            }
        }
        fish[i].cor = points;
    }
    noStroke();
    rect(0,370,400, 30);
};

/* draw routine for fish and sea weeds */
var cx1Dir = 20;
var cx2Dir = 40;
var offset = 0;
var dirX1 = 0;
var dirX2 = 0;
var c= 0;
var crazz1 = 340;
var frameC = frameCount;
var drawFish = function(f){
    pushMatrix();
    if(f.size >19){
        f.position.x -= 0.2;
    }
    else{
        f.position.x -= 0.15;
    }
    if(f.position.x < -f.size*50){
        f.position.x = 450;
    }
    translate(f.position.x,0);
    rotate(0);
    fill(227, 36, 7);
    strokeWeight(1);
    beginShape();
    for (var i = 0; i < f.cor.length; i++) {
        vertex(f.cor[i].x , f.cor[i].y);   
    }    
   vertex(f.cor[0].x , f.cor[0].y); 
    endShape();
    
    strokeWeight(2);
    noFill();
    if(dirX1 === 0){
        cx1Dir = cx1Dir+f.size/800;
        if(cx1Dir > 40){dirX1 = 1;}
    }
    else{
        cx1Dir = cx1Dir-f.size/800;
        if(cx1Dir < 30){dirX1 = 0;}
    }
    if(dirX2 === 0){
        cx2Dir = cx2Dir-f.size/800;
        if(cx2Dir < 30){dirX2 = 1;}
    }
    else{
        cx2Dir = cx2Dir+f.size/500;
        if(cx2Dir > 40){dirX2 = 0;}
    }
     
    var tailsize = f.size*2;
    stroke(185, 247, 0);
  /*  bezier(f.cor[50].x , f.cor[50].y,f.cor[50].x + cx1Dir, f.cor[50].y +cx2Dir,f.cor[50].x +  cx1Dir, f.cor[50].y +cx2Dir,f.cor[50].x+tailsize, f.cor[50].y + tailsize);
   
   
    bezier(f.cor[50].x , f.cor[50].y,f.cor[50].x + cx2Dir, f.cor[50].y - cx1Dir,f.cor[50].x +cx2Dir , f.cor[50].y -cx2Dir,f.cor[50].x+tailsize, f.cor[50].y - tailsize);
    
    bezier(f.cor[50].x+tailsize, f.cor[50].y + tailsize,f.cor[50].x + cx2Dir , f.cor[50].y + cx2Dir,f.cor[50].x +cx1Dir , f.cor[50].y - cx1Dir,f.cor[50].x+tailsize, f.cor[50].y - tailsize);
    */
    
    //line(f.cor[20].x,f.cor[20].y, 400, 400); 
    
   
        ellipse(f.cor[20].x ,(f.cor[20].y+f.cor[79].y)/2, 5,5);
   
    for(var i=0 ; i<f.size; i++){
        bezier(f.cor[75].x , f.cor[75].y,f.cor[75].x + 10, f.cor[75].y -10,f.cor[75].x +20 , f.cor[75].y -20,f.cor[75].x+50, f.cor[75].y-30);
    }
    
    
    for(var i=0 ; i<f.size; i++){
        bezier(f.cor[25].x , f.cor[25].y,f.cor[25].x + 10, f.cor[25].y +10,f.cor[25].x +20 , f.cor[25].y +20,f.cor[25].x+50, f.cor[25].y+30);
    }
    
    var factor =4;
    for(var i=0; i<f.size;i++){
    bezier(f.cor[50].x , f.cor[50].y,f.cor[50].x + cx2Dir, f.cor[50].y +(i+1)*factor- cx1Dir,f.cor[50].x +cx2Dir , f.cor[50].y -cx2Dir + (i+1)*factor,f.cor[50].x+tailsize+ cx2Dir+random(5,10), f.cor[50].y - tailsize + (i+1)*factor);
    }
    popMatrix();
   
  if(frameC < frameCount-30){ 
      frameC = frameCount;
      noStroke();
      fill(10, 16, 138);
      rect(0,370,400,50);
        fill(10, 184, 7);
        noStroke();
            
            
        var x1 = random(1,2);
        var y1 = 400;
        var cx1 = x1;
        var cy1 = random(360,370); 
        var cx2 = x1;
        var cy2 = random(360,370); 
        var x2 = 5;
        var y2 = 400;
        bezier(x1,y1,cx1, cy1, cx2, cy2, x2,y2);
        
        for(var i=0; i<10;i++){
            bezier(x1,y1,cx1, cy1, cx2, cy2, x2,y2);
            x1 = x1 +1*i ;
            x2 = x1+5;
            cx2 = x1;
            cx1 = x1;
            
        }
        
        for(var i=0; i<15;i++){
            bezier(x1,y1,cx1, cy1, cx2, cy2, x2,y2);
            x1 = x1 +1*i ;
            x2 = x1+5;
            cx2 = x1;
            cx1 = x1;
            
        }
        for(var i=0; i<10;i++){
            bezier(x1,y1,cx1, cy1, cx2, cy2, x2,y2);
            x1 = x1 +1*i ;
            x2 = x1+5;
            cx2 = x1;
            cx1 = x1;
            
        }
        for(var i=0; i<20;i++){
            bezier(x1,y1,cx1, cy1, cx2, cy2, x2,y2);
            x1 = x1 +1*i ;
            x2 = x1+5;
            cx2 = x1;
            cx1 = x1;
            
        }
   }
    
};
/* draw all fishes */
fishObj.prototype.draw = function() {
    for(var i=0; i<fish.length; i++){
        drawFish(fish[i]);   
    }
};

var draw = function() {
    fill(10, 16, 138);
    noStroke();
    rect(0,0,400, 370);
    if(initialized === 0){
        initialize();
        
    }
    fish[0].draw();
    fish[1].draw();
    for (var i=0; i<bubbles.length; i++) {
        bubbles[i].execute();
    }
    //println(p2.length);
};


}};
