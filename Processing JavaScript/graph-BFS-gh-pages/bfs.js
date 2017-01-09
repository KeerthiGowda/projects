var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);

/* AStar search

- Built the characters and glasses using subdivision.
- Built the arena. No external images used */


var tilemap = [
      "wwwwwwwwwwwwwwwwwwww",
    "w                  w",
    "w wwwww    w      ww",
    "w          w       w",
    "w          w   wwwww",
    "w wwww     w       w",
    "w          w       w",
    "w   w   wwwwwww    w",
    "w   w              w",
    "w   w   wwwwwwwwwwww",
    "w   w   ww         w",
    "w   w   ww     w   w",
    "w   w   ww     w   w",
    "w              w   w",
    "wwww               w",
    "wwwwww    ww    w  w",
    "w         ww    w  w",
    "w ww            w  w",
    "w               w  w",
    "wwwwwwwwwwwwwwwwwwww"];
    
var walls = [];
var initialized= 0;

/****************Draw turkey *************/

angleMode = "radians";
var oneDegree = 3.14/180;
var points = [];
var p2 = [];
var numPoints = 0;
var done = 0;
var start = 0;
var turkey_cor = [];
var glasses_cor = [];
var initialized = 0;
var iterations = 0;
var images = [];

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


var initialize_turkey = function(){
        points = [];
        p2.splice(0,p2.length);
        
        points.push(new PVector(50,100));  // tail
        points.push(new PVector(120,100)); 
        points.push(new PVector(120,30));  //next   
        points.push(new PVector(160,30)); //head
        points.push(new PVector(140,60));
        points.push(new PVector(140,150));     // bottom
        points.push(new PVector(50,150));
        
        points.push(new PVector(50,100));  // back to tail
        points.push(new PVector(10,160));
        points.push(new PVector(10,90));  // curve
        points.push(new PVector(10,80));
        points.push(new PVector(30,30));
        
        
        numPoints = 6; 
        done = 1;
        iterations = 0;
        while(iterations <4 ){
            if (done === 1) {
                subdivide();
                iterations++; 
            }
        }
        turkey_cor = points;  // Co ordinates of turkey 
};


var initialize_glasses = function(){
    
        points = [];
        p2.splice(0,p2.length);
  
        
        points.push(new PVector(50,50));  // left
        points.push(new PVector(100,10));  // top
        points.push(new PVector(150,50));    // center 
        points.push(new PVector(200,10));   // top
        points.push(new PVector(250,50)); // right
        points.push(new PVector(200,90));   // cneter  
        points.push(new PVector(150,50)); // bottom 
        
        points.push(new PVector(100,90));
        
        
        done = 1;
        iterations = 0;
        while(iterations <4 ){
            if (done === 1) {
                subdivide();
                iterations++; 
            }
        }
        glasses_cor = points;  // glasses cordinates
};


initialize_turkey();
initialize_glasses();
// draw the turkey and glasses to get the image

var initialize = function() {
    background(219, 187, 151);
    fill(255, 8, 8);
    scale(1);
    beginShape();
        for (var i = 0; i < turkey_cor.length; i++) {
            vertex(turkey_cor[i].x , turkey_cor[i].y);   
        }    
       vertex(turkey_cor[0].x ,turkey_cor[0].y); 
    endShape();
  //  triangle(150, 34, 180, 40, 150, 44);
    pushMatrix();
    fill(232, 228, 7);
    translate(30,90);
    rotate(-10);
    ellipse(0,0,10,40);  // tail of turkey
    rotate(6);
    ellipse(15,-10,10,30);
    rotate(-6);
    ellipse(-15,10,10,30);
    popMatrix();
    fill(74, 49, 10);
    triangle(145, 44, 160, 70, 155, 34);  // beak
    triangle(110, 150, 100, 190, 110, 190); // legs
    triangle(90, 150, 80, 190, 90, 190);
    ellipse(140, 40, 5, 5);  // eyes
    
    fill(22, 222, 215);
    pushMatrix();
    rotate(oneDegree*-15);
    line(120,85, 110,70);   // glasses stick
    line(120+30,85, 110+25,70);
    scale(0.2);
    translate(525,380);   
     beginShape();   // drawing glasses
        for (var i = 0; i < glasses_cor.length; i++) {
            vertex(glasses_cor[i].x , glasses_cor[i].y);   
        }    
       vertex(glasses_cor[0].x ,glasses_cor[0].y); 
    endShape();
    popMatrix();
    fill(255, 0, 0,10);
    images.push(get(5, 25, 165, 170));
    background(219, 187, 151);
    
    stroke(36, 19, 6);
    for(var i=0; i<50 ; i++){
        fill(87, 67, 13,15);
        rect(100+i, 100+i, 100-i, 100-i);
    }
    images.push(get(100, 100, 100, 100));
};


/*************End draw *****************/

var pathLen = 0;
var pathFound = 0;
var qLen = 0;
var qStart = 0;
var path = [];
var q = [];
var comefrom = new Array(20);

var wallObj = function(x, y) {
    this.x = x;
    this.y = y;
};

// Contains the elements in the queue 
var qObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.fcost = 0;
};


qObj.prototype.set = function(a, b) {
    this.x = a;
    this.y = b;
};

var graph = new Array(20);
var cost = new Array(20);
var inq = new Array(20);
for (var i=0; i<20; i++) {
    graph[i] = new Array(20);
    cost[i] = new Array(20);
    inq[i] = new Array(20);
    comefrom[i] = new Array(20);
}

for (var i=0; i<400; i++) {
    path.push(new PVector(0, 0));
    q.push(new qObj(0, 0));
}

for (var i=0; i<20; i++) {
    for(var j=0; j<20; j++) {
       comefrom[i][j] = new PVector(0, 0);
    }
}

var wallObj = function(x,y){
    this.x = x;
    this.y = y;
};

var haltState = function() {
    this.angle = 0;
};

var turnState = function() {
    this.angle = 0;
    this.angleDir = 0;
    this.vec = new PVector(0,0);
};

var chaseState = function() {
    this.step = new PVector(0,0);
};

var turkeyObj = function(x,y){
     this.position = new PVector(x,y);
     this.state = [new haltState(), new turnState(), new chaseState()];
     this.currState = 0;
     this.angle = 0;
};

var targetObj = function(x, y) {
    this.x = x;
    this.y = y;
};

var turkey = new turkeyObj(100, 340);
var target = new targetObj(0, 0);
var targetPos = new targetObj(0, 0);
var finalDest = new targetObj(0, 0);


turkeyObj.prototype.changeState = function(x) {
    this.currState = x;
};

// halt once the target is reached
haltState.prototype.execute = function(me) {
    if (dist(me.position.x, me.position.y, target.x, target.y) < 5) {
        me.changeState(1);
    }
};

turnState.prototype.execute = function(me) {
    this.vec.set(target.x - me.position.x, target.y - me.position.y);
    this.angle = this.vec.heading();
    var angleDiff = abs(this.angle - me.angle);
    if (angleDiff > 2) {
        if (this.angle > me.angle) {
            this.angleDir = 1;
        }
        else {
            this.angleDir = -1;
        }
        if (angleDiff > 180) {
            this.angleDir = -this.angleDir;
        }
        
        me.angle += this.angleDir;
        if (me.angle > 180) {
            me.angle = -179;
        }
        else if (me.angle < -180) {
            me.angle = 179;
        }
    }
    else {
        me.changeState(2);
    }
};


// Check if you are close to wll. If yes, change direction
chaseState.prototype.collideWall = function(me) {
    var collide = 0;
    this.step.set(target.x - me.position.x, target.y - me.position.y);
    this.step.normalize();
    this.step.mult(15);
    var ahead = PVector.add(me.position, this.step);
    for (var i=0; i<walls.length; i++) {
        if (dist(ahead.x, ahead.y, walls[i].x+10, walls[i].y+10) < 20) {
            collide = 1;
        }
    }
    return collide;
};

// Move towards the target and constatly check if you are hitting the wall
chaseState.prototype.execute = function(me) {
     if (this.collideWall(me) === 1) {
        me.changeState(1);
    }
     if (dist(target.x, target.y, me.position.x, me.position.y) > 2) {
        this.step.set(target.x - me.position.x, target.y - me.position.y);
        this.step.normalize();
        me.position.add(this.step);
    }
    else {
        if ((finalDest.x === target.x) && (finalDest.y === target.y)) {
            me.changeState(0);
        }
        else {
            pathLen--;
            if (pathLen > 0) {
                target.x = path[pathLen].x;
                target.y = path[pathLen].y;
            }
            else {
                target.x = finalDest.x;
                target.y = finalDest.y;
            }
            me.changeState(1);
        }
    }
};

turkeyObj.prototype.draw = function() {
    pushMatrix();
    translate(this.position.x-10, this.position.y-10);
   // rotate(this.angle);
    image(images[0],0, 0, 20,20);
    popMatrix();
};

// Read the position of all the briks and initialize the rest of the area as graph 
var initializeTileMap = function(){
    
    for(var i=0; i<tilemap.length; i++){
        for(var j=0 ; j<tilemap[i].length; j++){
            if(tilemap[i][j] === 'w'){
                walls.push(new wallObj(j*20, i*20));
            }
            else{
                graph[i][j] = 0;
            }
        }
    }        
      
};

var displayTileMap = function(){
    for( var i=0; i<walls.length; i++){
        image(images[1], walls[i].x, walls[i].y, 20,20);
    }
};


var initGraph = function(x, y) {
    for (var i = 0; i< 20; i++) {
        for (var j = 0; j<20; j++) {
            if (graph[i][j] > 0) {
                graph[i][j] = 0;
            }
            inq[i][j] = 0;
        }
    }
    
    graph[x][y] = 1;
};

// Targer point
var targetObj = function(x, y) {
    this.x = x;
    this.y = y;
};

var target = new targetObj(0, 0);
var targetPos = new targetObj(0, 0);
var finalDest = new targetObj(0, 0);

// A* search 
var findAStarPath = function(x, y) {
    
    var i, j, a, b;
    qLen = 0;
    graph[x][y] = 1;
    inq[x][y] = 1;
    q[qLen].set(x, y);
    q[qLen].fcost = 0;
    qLen++;
    pathLen = 0;
    qStart = 0;
    
    var findMinInQ = function() {
        var min = q[qStart].fcost;
        var minIndex = qStart;
        for (var i = qStart+1; i<qLen; i++) {
            if (q[i].fcost < min) {
                min = q[i].qStart;
                minIndex = i;
            }
        }
        if (minIndex !== qStart) {  // swap
            var t1 = q[minIndex].x;
            var t2 = q[minIndex].y;
            var t3 = q[minIndex].fcost;
            q[minIndex].x = q[qStart].x;
            q[minIndex].y = q[qStart].y;
            q[minIndex].fcost = q[qStart].fcost;
            q[qStart].x = t1;
            q[qStart].y = t2;
            q[qStart].fcost = t3;
        }
    };
    
    var setComeFrom = function(a, b, i, j) {
        inq[a][b] = 1;
        comefrom[a][b].set(i, j);
        q[qLen].set(a, b);
        cost[a][b] = cost[i][j] + 10;
        q[qLen].fcost = cost[a][b] + dist(b*20+10, a*20+10, finalDest.x,
finalDest.y);
        qLen++;
    };
    
    while ((qStart < qLen) && (pathFound === 0)) {
        
        findMinInQ();
        i = q[qStart].x;
        j = q[qStart].y;
        graph[i][j] = 1;
        qStart++;
        
        if ((i === targetPos.x) && (j === targetPos.y)) {
            pathFound = 1;
            path[pathLen].set(j*20+10, i*20+10);
            pathLen++;
        }
        
        a = i+1;
        b = j;
        if ((a < 20) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
        a = i-1;
        b = j;
        if ((a >= 0) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
        a = i;
        b = j+1;
        if ((b < 20) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
        a = i;
        b = j-1;
        if ((b >= 0) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
    }   // while
    
    while ((i !== x) || (j !== y)) {
        a = comefrom[i][j].x;
        b = comefrom[i][j].y;
        path[pathLen].set(b*20 + 10, a*20+10);
        pathLen++;
        i = a;
        j = b;
    }
};

var displayCustomText = function(a, x, y, font){
    var f = createFont("Bauhaus 93");
    textFont(f, font);
    text(a, x, y);
};

var game = 0;

// Start of the search. 
var mouseClicked = function() {
    if(game === 0){
        game = 1;
    }
    else{
    target.x = mouseX;
    target.y = mouseY;
   
    finalDest.x = target.x;
    finalDest.y = target.y;
    targetPos.x = floor(finalDest.y / 20);
    targetPos.y = floor(finalDest.x / 20);
    var i = floor(turkey.position.y / 20);
    var j = floor(turkey.position.x / 20);
    initGraph(i, j);
    pathFound = 0;
    pathLen = 0;
    findAStarPath(i, j);
    pathLen--;
    target.x = path[pathLen].x;
    target.y = path[pathLen].y;
    if (turkey.currState !== 1) {
        turkey.changeState(1);
    }
    }
};

// Start till mouse click
var frame = frameCount;
var initial_screen = function(){
        
        
        pushMatrix();
        background(219, 187, 151);
        scale(1);
        image(images[0], 100, 100, 150,150);
        fill(255, 0, 0);
        displayCustomText("Hokie / Turkey.. Aha ha!!", 50, 300, 30);
        displayCustomText("Click anywhere to start the turkey world!!", 60, 350, 15);
        popMatrix();
};

var draw = function() {
    background(219, 187, 151);
    if (initialized === 0) {
        initialized = 1;
        initialize();
        initializeTileMap();
    }
    
    if(game === 1){
    displayTileMap();
    turkey.draw();
    turkey.state[turkey.currState].execute(turkey);
    }
    else{
        initial_screen();
    }
};


}};