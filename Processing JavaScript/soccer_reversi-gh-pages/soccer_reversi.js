var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 

frameRate(60);
translate(0,0);
angleMode = "radian";
var oneDegree = 3.14/180;
var centerX = 200;
var centerY = 200;
var user_X = 0;
var user_Y = 0;
var keyArray = [];
var myImages = [];
var r=255;
var g = 0;
var b = 0;
var initialized = 0;
var keyPress = 0;
var framerate = frameCount;
var k_a=random(1500);
var k_pass = 0;
var k_timeout = 0;

// arvind
// arvind
var enter =0;
var light;
keyArray[UP] = keyArray[DOWN] = 0;
var arrow_array = [];
var coin_array = [];
var board_map = [];
var board;
var i,j;
var board_image = [];
var drawing=0;
var count=0;
var ic=0;
var a_c=0;
var a_n1 = random(1500);
var a_n2 = 0;
var a_a = random(1500);
var a_mouse_click = [];
var a_player = 1;
var a_h_player = 0;
var a_game_over = 0;
var a_all_occupied = 0;
var a_no_moves = 0;
var a_result1=1;
var a_result2=1;
var a_no_move_h=0;
var a_no_move_c=0;
var a_valid_move = 0;
var a_valid_move_0 = 1;
var a_valid_move_1 = 1;
var a_final_board;
var a_hint_board = [];
var a_get_score = 0;
var a_score_1,a_score_0;
var a_last_flipped = 0 ;
var a_difficulty = 0;
var a_cx,a_cy,a_cz,a_angle,a_r;
a_r = 200;
a_cx = a_cz = a_cy = a_angle = 0;
var a_elevation = -425;
var p = createGraphics(400,400,P3D);
var k_gametimeout = 0;

var corners = [];
var game_vars1 = function(){		// declaring variable which controls state of game
  this.startscreen = 1;
  this.gamescreen1 = 0;
  this.endscreen1 = 0;
  this.gamescreen2 = 0;
  this.gamescreen2_options = 0;
  this.gamescreen2_end = 0;
  this.winscreen = 0;
  this.helpscreen = 0;
  this.helpscreen_soccer = 0;
  this.helpscreen_reversi = 0;
  this.aboutscreen=0;
  this.optionscreen1 = 0;
  this.goalScreen = 0;
  this.penaltyscreen = 0;
};

/******* Reversi **********/

var a_node = function(){
	this.a_parent = [0,0];
	this.children = [];
	this.type = 0;
	this.visit = 0;
	this.move = [];
	this.score0=0;
	this.score1=1;
};


for( var a_p=0;a_p<8;a_p++){
    a_hint_board[a_p]=[];
    for(var a_q=0;a_q<8;a_q++){
        a_hint_board[a_p][a_q]=0;
    }
}


for(i=0;i<8;i++){
    board_map[i]=[];
}

board_map[4][4]=0;
board_map[3][3]=0;
board_map[4][3]=1;
board_map[3][4]=1;

var fitness = function(curr_board, curr_player,difficulty){

var value;
value = 0;
var other_player;
if(curr_player === 1){
	other_player = 0;
}
else{
	other_player = 1;
}
//println("Printing Board :");
for(var i =0; i<8 ; i++){
	for(var j = 0; j<8; j++){
		//if(curr_board[i][j]===1 || curr_board[i][j] === 0){
	//		print(curr_board[i][j]);
		//}
	//	else{
		//	print("x");
			
	//	}
		var pos_val=1;
		if(i===0 || j === 0){
			pos_val = 2;
			if( (i===0 && j === 0 ) || (i===0 && j===7) || (j===0 && i === 7) || (i===7 && j === 7)){
				pos_val=3;
			}	
			if( (i===1) || (j===6) || ( i === 6) || (j === 1)){
				pos_val=-1;
			}	
			if( (i===2) || (j===5) || ( i === 5) || (j === 2)){
				pos_val=2;
			}	

		}

		if(curr_board[i][j] === curr_player){
			value+=pos_val;
		}
		else if(curr_board[i][j] === other_player){
			value-=1;
		}
	}
//	println("");
}
//	println("Value : " + value );

return value;

};

var draw1_board = function(){
    
    background(255, 255, 255);
    this.width1=100;
    this.height1=100;
    pushMatrix();
    translate(200,200);

    fill(92, 5, 5);
    rect(-this.width1/2-10,-this.height1/2-10,this.width1+20,this.height1+20);
    fill(0, 255, 51);
    rect(-this.width1/2,-this.height1/2,this.width1,this.height1);
    for(i=0;i<8;i++){
        for(j=0;j<8;j++){
            
            //println("here");
            fill(4, 255, 0);
            stroke(0, 0, 0);
            rect(-this.width1/2 + 12.5*j,-this.height1/2 + 12.5*i,12.5,12.5);

            if(board_map[i][j]===0){
                fill(255,255,255);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
            if(board_map[i][j]===1){
                fill(0,0,0);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
        }
    }
    board_image[0] = get(140,140,120,120);
    background(255, 255, 255);
    board_map[3][3]=1;
    board_map[3][2]=1;
    fill(92, 5, 5);
    rect(-this.width1/2-10,-this.height1/2-10,this.width1+20,this.height1+20);
    fill(0, 255, 51);
    rect(-this.width1/2,-this.height1/2,this.width1,this.height1);
    for(i=0;i<8;i++){
        for(j=0;j<8;j++){
            
            //println("here");
            fill(4, 255, 0);
            stroke(0, 0, 0);
            rect(-this.width1/2 + 12.5*j,-this.height1/2 + 12.5*i,12.5,12.5);

            if(board_map[i][j]===0){
                fill(255,255,255);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
            if(board_map[i][j]===1){
                fill(0,0,0);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
        }
    }
    board_image[1] = get(140,140,120,120);
    background(255, 255, 255);
    board_map[3][3]=0;
    board_map[2][2]=0;
    fill(92, 5, 5);
    rect(-this.width1/2-10,-this.height1/2-10,this.width1+20,this.height1+20);
    fill(0, 255, 51);
    rect(-this.width1/2,-this.height1/2,this.width1,this.height1);
    for(i=0;i<8;i++){
        for(j=0;j<8;j++){
            
            //println("here");
            fill(4, 255, 0);
            stroke(0, 0, 0);
            rect(-this.width1/2 + 12.5*j,-this.height1/2 + 12.5*i,12.5,12.5);

            if(board_map[i][j]===0){
                fill(255,255,255);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
            if(board_map[i][j]===1){
                fill(0,0,0);
                ellipse(-this.width1/2 + 7.25 +  12.5*j,-this.height1/2 + 6.25 + 12.5*i,11,11);
            }
        }
    }
    board_image[2] = get(140,140,120,120);
    popMatrix();
    
};

draw1_board();

for(i=0;i<8;i++){
    board_map[i]=[];
}

board_map[4][4]=0;
board_map[3][3]=0;
board_map[4][3]=1;
board_map[3][4]=1;


var game_vars = new game_vars1();

var check_legal_move = function(move,player, board){
    //println("Function called");
    
    var tiles_flipped = [];
    var on_board=1;
    var starty = move[0];
    var startx = move[1];
    var x = startx;
    var y = starty;
    var directions = [];
    var my_tile;
    var other_tile;
    directions.push([0,1]);
    directions.push([1,1]);
    directions.push([-1,1]);
    directions.push([1,0]);
    directions.push([1,-1]);
    directions.push([0,-1]);
    directions.push([-1,-1]);
    directions.push([-1,0]);

    
    if(player === 1)
    {
        my_tile = 1;
        other_tile = 0;
    }
    
    else if(player === 0)
    {
        my_tile = 0;
        other_tile = 1;
    }
    
    //board[startx][starty] = my_tile;
    
    ////println("before beginning of for loop");
    for(var i =0; i <8;i++){
        //println("Starting of for loop");
        on_board=1;
        x=startx;
        y=starty;
        var stepx = directions[i][1];
        var stepy = directions[i][0];
        x+=stepx;
        y+=stepy;
        //println("outer For loop " + i + " Direction " + directions[i][1] + " " + directions[i][0] + " starting x y " + x + " " + y + " " + other_tile);
        //println(board[x][y]=== other_tile);
        //println((x<8 && y < 8 && x > 0 && y > 0)&&(board[x][y]=== other_tile));
        if((x<8 && y < 8 && x >= 0 && y >= 0) && (board[x][y]=== other_tile) ){
            //println("Considering direction " + directions[i][1] + " " + directions[i][0]);
             while(board[x][y]===other_tile && on_board === 1 ){
                 //println("Traverse while loop " + y +" "+ x + " " + board[x][y]);
                 x+=stepx;
                 //println("here1");
                 y+=stepy;
                 //println("here2 "  + on_board);
                 //println(y +" "+ x + " board " + board[x][y]);
                 //println(y +" "+ x);
                 if( x>=8 || y>= 8 || x < 0 || y < 0){
                        on_board=0;
                        x=startx;
                        y=starty;
                 }
             }
             if( on_board === 0 ){
                 
             }
             if(on_board ===1){
                if(board[x][y] === my_tile){
                 //println("Found flips ");
                 while(x!==startx || y !== starty){
                     //println("final while loop " + i);
                     x-=stepx;
                     y-=stepy;
                     tiles_flipped.push([y],[x]);
                   }
                   
             }
             }
        }
    }
    
    //board_map[startx][starty] = -1;
    //println("Result = " + tiles_flipped);
    if(tiles_flipped.length ===0){
        return 0;
    }
    else{
        return tiles_flipped;
    }
};


var a_find_best_move = function ( start_boardmap, player , levels){


// initializing stuff
    var tree = [];
    var my_tile;
    var a_player = player;
    var other_tile;
    var other_player;
    for( var i=0;i<=levels;i++){
	    tree[i] = [];
    }
        
   if(player === 1){
	my_tile=1;
	other_tile=0;
   }

    else{
    my_tile=0;
	other_tile=1;
     }
	tree[0].push(new a_node());
	tree[0][0].board = [];
       for(var g=0;g<8;g++){
	       tree[0][0].board[g] = [];
	       for(var h=0;h<8;h++){
		       tree[0][0].board[g][h] = start_boardmap[g][h];
		}
	}
	//println("Printing intial ");
       for(var i=0;i<8;i++){
		for(var j=0;j<8;j++){
			//print(tree[0][0].board[i][j]);
			if(tree[0][0].board[i][j]===1){
				tree[0][0].score1+=1;
			}
			else if(tree[0][0].board[i][j]===0){
				tree[0][0].score0+=1;
			}
		}
		//println("");
	}


// Building the tree
//
	//println(tree[0][0].board[3][3]);
	  for(var i =0; i <levels;i++){ 
		  if(i%2===0){
			  a_player = my_tile;
			  other_player = other_tile;
		  }
		  else{
			  a_player = other_tile;
			  other_player = my_tile;
		  }
	   for(var j=0;j<tree[i].length;j++){
        for(var x=0;x<8;x++){
                  for(var y=0;y<8;y++){
			//println(tree[0][0].board[3][3]);
			//println("For : " + x +" " + y + " " )
			//println(tree[i][j].board[x][y])

                    if(tree[i][j].board[x][y]!==1 && tree[i][j].board[x][y]!==0){
                        if(x>=1 && x<=6 && y>=1 && y<=6){
                        if(tree[i][j].board[x-1][y-1]=== other_player || tree[i][j].board[x-1][y]=== other_player || tree[i][j].board[x-1][y +1]=== other_player || tree[i][j].board[x][y-1]=== other_player ||tree[i][j].board[x][y+1]=== other_player ||tree[i][j].board[x+1][y-1]=== other_player ||tree[i][j].board[x+1][y]=== other_player ||tree[i][j].board[x+1][y+1]=== other_player ){
                        //if(1===1){
			   //println("Checking for " + x + " " + y);
                           var result = check_legal_move([y,x],a_player,tree[i][j].board); 
                           if(result ===0){}
                           else{

			      //println("Adding node to level : " + (i+1) + " for the position " + x + " " + y); 
                               tree[i+1].push(new a_node()); 
			       var index;
			       
			       index = tree[i+1].length;
			       index-=1;
			       tree[i][j].children.push([i+1,index]);
			       tree[i+1][index].a_parent[0] = i;
			       tree[i+1][index].a_parent[1] = j;
			       tree[i+1][index].move = result;
			       tree[i+1][index].board = [];
			       for(var g=0;g<8;g++){
				       tree[i+1][index].board[g] = [];
				       for(var h=0;h<8;h++){
					       tree[i+1][index].board[g][h] = tree[i][j].board[g][h];
					}
				}
			       for(var b=0;b<result.length;b+=2){
				       tree[i+1][index].board[result[b+1]][result[b]] = a_player;

			       }

			       if((i+1)%2===0){
                                   tree[i+1][index].type = 0; 
			       }
			       else{
                                   tree[i+1][index].type = 1;
			       }
			       if(a_player === 1){
				       tree[i+1][index].score1+=result.length;
				       tree[i+1][index].score0-=result.length - 1;
			       }
			       else{
				       tree[i+1][index].score0+=result.length;
				       tree[i+1][index].score1-=result.length - 1;
			       }

                           }
                           }
                        }
                        else{
                           var result = check_legal_move([y,x],a_player,tree[i][j].board); 
                           if(result ===0){}
                           else{
			       
			      //println("Adding node to level : " + (i+1) + " for the position " + x + " " + y); 
                               tree[i+1].push(new a_node()); 
			       var index;
			       
			       index = tree[i+1].length;
			       index-=1;
			       tree[i][j].children.push([i+1,index]);
			       tree[i+1][index].a_parent[0] = i;
			       tree[i+1][index].a_parent[1] = j;
			       tree[i+1][index].move = result;
			       tree[i+1][index].board = [];
			       for(var g=0;g<8;g++){
				       tree[i+1][index].board[g] = [];
				       for(var h=0;h<8;h++){
					       tree[i+1][index].board[g][h] = tree[i][j].board[g][h];
					}
				}
			       for(var b=0;b<result.length;b+=2){
				       tree[i+1][index].board[result[b+1]][result[b]] = a_player;

			       }

			       if((i+1)%2===0){
                                   tree[i+1][index].type = 0; 
			       }
			       else{
                                   tree[i+1][index].type = 1;
			       }
			       if(a_player === 1){
				       tree[i+1][index].score1+=result.length;
			       }
			       else{
				       tree[i+1][index].score0+=result.length;
			       }


                           }                               
                           }
                    }
                }
            }
	  }
	  }
    

// Starting alpha beta
var curr_level = levels;
var best_board, best_result;
while(tree[0][0].visit === 0){
	for( var i = 0; i < tree[curr_level].length ; i++){
	//	println("Checking for levl: " + curr_level + " and node :" + i);
		if(tree[curr_level][i].children.length === 0){
			tree[curr_level][i].value = fitness(tree[curr_level][i].board,player,0);
			//tree[curr_level][i].value = tree[curr_level][i].score1 - tree[curr_level][i].score0;
		//	println("Value for Node " + curr_level + " " + i + " : " + tree[curr_level][i].value);
		}
		else{
			if(tree[curr_level][i].type === 0){
				tree[curr_level][i].value = -10000;
				for( var j = 0; j < tree[curr_level][i].children.length ; j++){
					if(tree[tree[curr_level][i].children[j][0]][tree[curr_level][i].children[j][1]].value > tree[curr_level][i].value){
						tree[curr_level][i].value =tree[tree[curr_level][i].children[j][0]][tree[curr_level][i].children[j][1]].value; 
						if(curr_level === 0 && i === 0){
							best_board = tree[tree[curr_level][i].children[j][0]][tree[curr_level][i].children[j][1]].board;
							best_result = tree[tree[curr_level][i].children[j][0]][tree[curr_level][i].children[j][1]].move;
						//	println("Assigning Final value" + best_result);
						}
					}	
				}
			}
			if(tree[curr_level][i].type === 1){
				tree[curr_level][i].value = 10000;
				for( var j = 0; j < tree[curr_level][i].children.length ; j++){
					if(tree[tree[curr_level][i].children[j][0]][tree[curr_level][i].children[j][1]].value < tree[curr_level][i].value){
						tree[curr_level][i].value =tree[tree[curr_level][i].children[j][0]][tree[curr_level][i].children[j][1]].value; 
					}	
				}
			}

		}
	tree[curr_level][i].visit = 1;
	}
	curr_level-=1;
}

//for(var k=0;k<levels+1;k++){
//print("Level " + k + ":");
//for(var j=0;j<tree[k].length;j++){
//print(tree[k][j].value + " ");
//}
//println(" ");
//}


//println("Returning " + best_result);
return best_result;

};

var arrow =function(x,y,t){
    this.x=x;
    this.y=y;
    this.side = t;
    this.a=0;
};

arrow.prototype.draw = function() {
    this.update();
    strokeWeight(4 - 3*sin(this.a));
    stroke(255, 0, 0);
    fill(242, 255, 0);
    pushMatrix();
    translate(this.x,this.y);
    scale(this.side,1);
    rect(-20,-8,40,16);
    triangle(10,-20,10,20,30,0);
    popMatrix();
};

arrow.prototype.update = function(){
    this.a+=0.1;
    if(this.a>3.141){this.a = -3.414;}

    if(game_vars.startscreen ===1){
        if(this.y>=230){
            this.y=230;
        }    
        if(this.y<=110){
            this.y=110;
        }
    }
    if(game_vars.helpscreen === 1){
        if(this.y>=230){
            this.y=230;
        }    
        if(this.y<=190){
            this.y=190;
        }
    }
    if(game_vars.gamescreen2_options === 1){
        if(this.y>=150){
            this.y=150;
        }    
        if(this.y<=110){
            this.y=110;
        }
    }

};

var light_source = function(x,y){
    this.x=x;
    this.y=y;
    this.a=PI/2;
    this.i=0/21;
    this.s=0.01;
};

light_source.prototype.draw = function() {
    this.update();
    strokeWeight(1);
    pushMatrix();
    translate(this.x,this.y-20);
    rotate(this.a+PI);
    translate(0,-30);
    line(-0,0,0,30);
    fill(255, 0, 0);
    
    fill(255, 251, 0);
    ellipse(0,0,20,20);
    fill(255,255,255,100);
    ellipse(0,0,30,10);
    fill(255, 0, 0);
    arc(0,0,30,30,0,PI);
    
    fill(255, 255, 0,100);
    noStroke();
    quad(-15,0,15,0,420,-380,-420,-380);
    
    popMatrix();
};

light_source.prototype.update = function(){
    
    this.a=2*asin(this.i);
    this.i+=this.s;
    if(this.i>=1/2){this.s=-0.0096;}
    if(this.i<=-1/2){this.s=0.0096;}
    //println(this.i);
    
};

var board_sample = function(x,y){
    this.x=x;
    this.y=y;
    this.a=0;
    this.height = 300;
    this.width = 300;
};

board_sample.prototype.draw = function() {
    pushMatrix();
    translate(this.x,this.y);
    rotate(this.a);
    fill(92, 5, 5);
    rect(-this.width/2-10,-this.height/2-10,this.width+20,this.height+20);
    fill(0, 255, 51);
    rect(-this.width/2,-this.height/2,this.width,this.height);
        if(a_last_flipped){
		   //println(a_last_flipped.length);
        for(i=0;i<a_last_flipped.length;i=i+2){
		    fill(255,255,0);
		    rect(-this.width/2 + 7.25 + 12 +  3*12.5*a_last_flipped[i] - 25/2,-this.height/2 + 13 + 6.25 + 3*12.5*a_last_flipped[i+1] - 25/2,25,25);
		    //rect(0,0,25,25);
	    }
	   }

    for(i=0;i<8;i++){
        for(j=0;j<8;j++){
            
            //println("here");
            fill(4, 255, 0);
            //noFill();
            stroke(0, 0, 0);
            rect(-this.width/2 + 3*12.5*j,-this.height/2 + 3*12.5*i,3*12.5,3*12.5);

            if(board_map[i][j]===0){
                fill(255,255,255);
                ellipse(-this.width/2 + 7.25 +  3*12.5*j + 12,-this.height/2 + 13+ 6.25 + 3*12.5*i,25,25);
            }
            if(board_map[i][j]===1){
                fill(0,0,0);
                ellipse(-this.width/2 + 7.25 + 12 +  3*12.5*j,-this.height/2 + 13 + 6.25 + 3*12.5*i,25,25);
            }
	    if(a_hint_board[i][j] === 3 && a_player === a_h_player){
                fill(255, 0, 0);
                textSize(20);
                text("X",-this.width/2 + 7.25 +  3*12.5*j + 12-5,-this.height/2 + 13+ 6.25 + 3*12.5*i -5,100,100);
            }

        }
    }

    popMatrix();
};


var coin = function(x,y,t){
    this.x=x;
    this.y=y;
    this.t=t;
    this.a=0;

};

coin.prototype.draw= function() {
    this.update();
    if(this.t===0){
        pushMatrix();
        stroke(0, 0, 0);
        strokeWeight(1);
        translate(this.x,this.y);
        strokeWeight(2);
        fill(13, 2, 2);
        beginShape();
        vertex(-15,10);
        bezierVertex(-5 + 20*sin(this.a),30 - abs(5*sin(this.a)),5+20*sin(this.a),30 - abs(5*sin(this.a)),15,10);
        endShape();
        fill(255,255,255);
        noStroke();
        rect(-15,0,30,10);
        stroke(0, 0, 0);
        arc(0,10,30,10,0,3.141);
        line(-15,10,-15,0);
        line(15,10,15,0);
        ellipse(0,0,30,10);
        
        ellipse(0,0,20,7);
        popMatrix();
    }

};

coin.prototype.update = function(){
    this.a+=0.03;
    if(this.a>3.141){this.a = -3.141;}
    
};

var a_reset_game = function(){
        a_final_board = get(0,0,400,400);

		for( var a_p=0;a_p<8;a_p++){
		    a_hint_board[a_p]=[];
		    for(var a_q=0;a_q<8;a_q++){
		        a_hint_board[a_p][a_q]=0;
		    }
		}
		
		
		for(i=0;i<8;i++){
		    board_map[i]=[];
		}
		
		board_map[4][4]=0;
		board_map[3][3]=0;
		board_map[4][3]=1;
		board_map[3][4]=1;
		a_last_flipped = 0;
		a_player =1;

};

keyPressed = function(){
  enter=0;
  keyPress = 1;
  keyArray[keyCode]=1;
  if((game_vars.startscreen ===1 )  && enter === 0){
      enter=1;
      arrow_array[0].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      arrow_array[1].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      if(keyArray[10]===1){
          if(arrow_array[0].y===110){
	           a_reset_game();
              game_vars.optionscreen1=1;
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;  // edit this
              game_vars.winscreen=0;
              game_vars.helpscreen = 0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
          }
          if(arrow_array[0].y===150){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;  // edit this
              game_vars.winscreen=0;
              game_vars.helpscreen = 0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 1;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
          }
          if(arrow_array[0].y===190){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=1;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
          }
          if(arrow_array[0].y===230){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=1;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
          }
      }
  }
 
    if(game_vars.aboutscreen ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
      }
    }
    
    if(game_vars.helpscreen ===1 && enter === 0 ){
      enter=1;
      arrow_array[0].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      arrow_array[1].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
      }
      if(keyArray[10]===1){
          if(arrow_array[0].y===190){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 1;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
          }
          if(arrow_array[0].y===230){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen = 0;
              game_vars.helpscreen_soccer = 1;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
          }
      }
    }
    
    if(game_vars.helpscreen_soccer ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=1;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
      }
    }
    
    if(game_vars.helpscreen_reversi ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=1;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
      }
    }
    
    if(game_vars.optionscreen1 ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[10]===1){
              game_vars.gamescreen1=1;
	      game_vars.optionscreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
      }
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
	      game_vars.optionscreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
      }
    }
    
    if(game_vars.gamescreen2 ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 1;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
      }
    }
    
    if((game_vars.gamescreen2_options ===1 )  && enter === 0){
      enter=1;
      arrow_array[0].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      arrow_array[1].y+=40*keyArray[DOWN] - 40*keyArray[UP] ;
      if(keyArray[10]===1){
          if(arrow_array[0].y===110){
	           a_reset_game();
              game_vars.optionscreen1=0;
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=1;
              game_vars.startscreen=0;  // edit this
              game_vars.winscreen=0;
              game_vars.helpscreen = 0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
              k_gametimeout = 1;
          }
          if(arrow_array[0].y===150){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=1;
              game_vars.startscreen=0;  // edit this
              game_vars.winscreen=0;
              game_vars.helpscreen = 0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.goalScreen = 0;
              game_vars.penaltyscreen = 0;
              k_gametimeout = 5;
          }
          if(arrow_array[0].y===190){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.goalScreen = 0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.penaltyscreen = 1;
              game_vars.aboutscreen=0;
          }
      }
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.goalScreen = 0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.penaltyscreen = 0;
              game_vars.aboutscreen=0;
      }
  }
  if(game_vars.gamescreen2_end ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
               game_vars.penaltyscreen = 0;
      }
    }
    if( game_vars.penaltyscreen ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.penaltyscreen = 0;
      }
    }
    
    
    if(game_vars.gamescreen1 ===1 && enter === 0 ){
      enter=1;
      //println(40*keyArray[DOWN] - 40*keyArray[UP]);
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.goalScreen = 0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.penaltyscreen = 0;
              game_vars.aboutscreen=0;
      }
    if(keyCode === 90){
        a_r-=2;
    }
    if(keyCode === 88){
        a_r+=2;
    }
    if(keyCode === UP){
        if(a_elevation<400){
            a_elevation = a_elevation - 3;
        }
    }
    if(keyCode === DOWN){
        if(a_elevation>-700){
            a_elevation = a_elevation + 3;
        }
    }

    }
    if(game_vars.endscreen1===1  && enter === 0 ){
      enter=1;
      if(keyArray[81]===1){
              game_vars.gamescreen1=0;
              game_vars.endscreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=1;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.goalScreen = 0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.penaltyscreen = 0;
              game_vars.aboutscreen=0;
      }
    }
};


board = new board_sample(320,300);

light = new light_source(200,300);

coin_array.push( new coin(200,360,0));

arrow_array.push( new arrow(100,110,1));
arrow_array.push( new arrow(300,110,-1));

mouseDragged = function(){
    if(1===1){
        
    if(mouseY>200){
    //println(cz);println(200-cx/(200-cz));
    a_angle = atan((200 - mouseX)/(200 - mouseY));
    //angle-=90;
    //if(pmouseX - mouseX > 0){
        //angle=angle*-1;
    //}

    //println("Angle " + angle);
    //println("CX " + cx);
    //println("CZ " + cz);
    }
    else{
            //println(cz);println(200-cx/(200-cz));
    a_angle = atan((200 - mouseX)/(200 - mouseY));
    a_angle-=PI;
    //if(pmouseX - mouseX > 0){
        //angle=angle*-1;
    //}
    //println("Angle " + angle);
    //println("CX " + cx);
    //println("CZ " + cz);
    }

    }

};

var draw_c = function(t){
this.sides = 10;
this.radius = 20;
this.angle = 2*PI/this.sides;
p.beginShape();
if(t===1){
    p.fill(0, 0, 0);
}
else if(t===0){
    p.fill(255, 255, 255);
}
if(t!==2){
for( var i=0;i<this.sides;i++){
    var x = this.radius*sin(this.angle * i);
    var z = this.radius*cos(this.angle * i);
    p.vertex(x,-40,z);
}
p.endShape();
p.beginShape();
for( var i=0;i<this.sides;i++){
    var x = this.radius*sin(this.angle * i);
    var z = this.radius*cos(this.angle * i);
    p.vertex(x,-12,z);
}
p.endShape();
//p.noStroke();
p.beginShape(TRIANGLE_STRIP);
for( var i=0;i<this.sides+1;i++){
    var x = this.radius*sin(this.angle * i);
    var z = this.radius*cos(this.angle * i);
    p.vertex(x,-40,z);
    p.vertex(x,-12,z);
}

p.endShape();
p.stroke(0,0,0);
}
else{
p.fill(255,255,0,150);
p.beginShape();
p.vertex(-25,-12,-25);
p.vertex(25,-12,-25);
p.vertex(25,-12,25);
p.vertex(-25,-12,25);
p.endShape();
}

};


var drawboard = function(){
    
    p.beginDraw();
    p.beginCamera();
    p.stroke(0,0,0);
    //p.lights();
    //p.ambientLight(70, 70, 70);

    a_cx = sin(a_angle)*a_r;  // computing the x and z coordinates of the camera
    a_cz = cos(a_angle)*a_r;

    p.camera(a_cx,-100 + a_elevation,a_cz,0,0,0,0,1,0);
    p.background(5, 200, 200);
    p.beginShape();
    p.fill(0, 195, 0);
    p.emissive(50,50,50);
    p.vertex(-220,-11,-220);
    corners.push([-220,-100,-200]);
    p.vertex(-220,-11,220);
    corners.push([-220,-100,200]);
    p.vertex(220,-11,220);
    corners.push([220,-100,200]);
    p.vertex(220,-11,-220);
    corners.push([220,-100,-200]);
    p.endShape();
    p.pushMatrix();
    p.strokeWeight(15);
    for(var i =0;i<7;i++){
        p.line(-170+55*i,-11,-220,-170 + 55*i,-11,220);
    }
    for(var i =0;i<7;i++){
        p.line(-220,-11,-170+55*i,220,-11,-170 + 55*i);
    }
    //p.noStroke();
    for(var i=0;i<8;i++){
        for(var j =0;j<8;j++){
             p.pushMatrix();
             p.translate(map(i,0,7,-200,190),0,map(j,0,7,-200,190));
             if(a_hint_board[i][j] === 3 && a_player === a_h_player){
			    //p.emissive(255,255,0);
			    draw_c(2);
            }
 
            if(board_map[i][j] === 1){
                //println("Here");
                //p.emissive(0,0,0);
                draw_c(1);
            }
            else if(board_map[i][j] === 0){
                //p.emissive(150,150,150);
                draw_c(0);
            }
            p.popMatrix();
        }
        
    }
    p.emissive(0,0,0);
   p.noStroke();
   if(a_last_flipped){
        for(var j =0;j<a_last_flipped.length;j=j+2){
             p.pushMatrix();
             p.translate(map(a_last_flipped[j+1],0,7,-200,190),0,map(a_last_flipped[j],0,7,-200,190));
	     p.fill(255,0,0,100);
	     p.sphere(30);
            p.popMatrix();
        }
   }
    
    p.popMatrix();
    p.fill(112, 11, 11);
    p.box(500,20,500);
    p.endCamera();
    p.noLights();
    p.endDraw();
    image(p,0,0);
    //println(a_elevation);
};



a_player =1;
mouseClicked = function(){
	if(game_vars.gamescreen2===1)
    {
        k_timeout = frameCount;
        k_pass = 1;  
    }

    if(game_vars.optionscreen1 === 1){
    if(mouseX<200){
        if(mouseX<100){
		a_h_player = 0;
	}
	else{
		a_h_player = 1;
	}
    }
    else{
	    if(mouseY<133){
		    a_difficulty = 0;
	    }
	    else if(mouseY<266){
	        a_difficulty = 1;
	    }
	    else{
		    a_difficulty = 2;
	    }
    }
    } 
    if(game_vars.gamescreen1===1){
        //println("PLayer is " + a_player + " " + a_h_player );
        var other_player;
        if(a_player===1){
            other_player =0;
        }
        else{
            other_player=1;
        }
        if(a_h_player === a_player){ 
        if((a_player ===1 && a_valid_move_1===0) || (a_player ===0 && a_valid_move_0===0)){
            a_no_move_h=1;
            //println("No Move for player");
            a_valid_move =1;
        }
        if(a_no_move_h!==1){
            a_mouse_click[0] = floor(((mouseX - 83)/37));
            a_mouse_click[1] = floor(((mouseY - 20)/37));


    if((mouseX>p.screenX(corners[0][0] + 30,corners[0][1],corners[0][2]) - 30 && mouseY>p.screenY(corners[0][0],corners[0][1],corners[0][2])) &&(mouseX<p.screenX(corners[0][0] + 480,corners[0][1],corners[0][2]) && mouseY<p.screenY(corners[0][0],corners[0][1],corners[0][2] + 440)) ){
        //println("Clicked inside");
        var x=0,i=0,y=0;
        //println(
        while(mouseY>p.screenY(corners[0][0] + 30,corners[0][1],corners[0][2] + map(i,0,7,0,330))){
            i++;
        }
        a_mouse_click[0]=i-2;
        i=0;
        while(mouseX>p.screenX(corners[0][0] + 30 + map(i,0,7,0,330),corners[0][1],corners[0][2] + map(a_mouse_click[0],0,7,0,330))){
            i++;
            
        }
        
        a_mouse_click[1] = i-1;
        //println(a_mouse_click);
    }



            //println("Clicked :" + a_mouse_click);
            a_valid_move =0;
            if(board_map[a_mouse_click[1]][a_mouse_click[0]]!==1 &&  board_map[a_mouse_click[1]][a_mouse_click[0]]!==0){
                //println("Checking");
                var result = check_legal_move(a_mouse_click,a_player,board_map);
                if(result === 0 ){
                    //println("Bad Move");
                }
                else{
                    a_last_flipped = result;//print("Right" + result);
                    for(var i=0;i<result.length;i+=2){
                        board_map[result[i+1]][result[i]] = a_player;
                   a_valid_move =1;
			
                    }
                }
            }
        }
        if(a_player ===1 && a_valid_move === 1){
            a_player = 0;
        }
        else if(a_valid_move === 1){
            a_player= 1;
        }
        //println("here");
    }
        else{
		        
	    for(var x = 0;x<8;x++){
            for(var y =0;y<8;y++){
		a_hint_board[x][y]=0;
		        if(board_map[x][y]!==0 && board_map[x][y]!==1){
                        a_result1 = check_legal_move([y,x],1,board_map);
                        a_result2 = check_legal_move([y,x],0,board_map);
                        if(a_result1 !== 0){
                            a_valid_move_1=1;
			    if(a_h_player === 1){
		            a_hint_board[x][y]=3;
			    }
                        } 
	                if(a_result2 !== 0){
		            a_valid_move_0=1;
			    if(a_h_player === 0){
			        a_hint_board[x][y]=3;
                            } 
                        } 
		        }

            }
        }
	if(a_valid_move_0===1 && a_player === 0 || a_valid_move_1 === 1 && a_player === 1){
            var move_value = [];
            var best_x,best_y,best_val;
            var best_result = [];
            best_val=0;
	    if(a_difficulty === 0){
            for(var x=0;x<8;x++){
                move_value[x]=[];
                for(var y=0;y<8;y++){
                    if(board_map[x][y]!==1 && board_map[x][y]!==0){
                        if(x>=1 && x<=6 && y>=1 && y<=6){
                        if(board_map[x-1][y-1]=== other_player || board_map[x-1][y]=== other_player || board_map[x-1][y +1]=== other_player || board_map[x][y-1]=== other_player ||board_map[x][y+1]=== other_player ||board_map[x+1][y-1]=== other_player ||board_map[x+1][y]=== other_player ||board_map[x+1][y-1]=== other_player ){
                           var result = check_legal_move([y,x],a_player,board_map); 
                           if(result ===0){}
                           else{
                               move_value[x][y] = result.length;
                               if(result.length>best_val){
                                   best_val = result.length;
                                   best_x = x;
                                   best_y = y;
                                   best_result = result;
                               }
                           }
                           }
                        }
                        else{
                           var result = check_legal_move([y,x],a_player,board_map); 
                           if(result ===0){}
                           else{
                               move_value[x][y] = result.length;
                               if(result.length>best_val){
                                   best_val = result.length;
                                   best_x = x;
                                   best_y = y;
                                   best_result = result;
                               }
                           }                               
                           }
                    }
                }
            }
            }
	     var multi;
	    if(a_difficulty === 2){
	    multi = a_find_best_move(board_map, a_player, 5);
	    }
	    if(a_difficulty === 1){
	    multi = a_find_best_move(board_map, a_player, 1);
	    }
	    if(a_difficulty !== 0){
		    a_last_flipped = multi;
            for(var i=0;i<multi.length;i+=2){
                board_map[multi[i+1]][multi[i]] = a_player;
		
            }
	    }
	    else{
	        a_last_flipped = best_result;
            for(var i=0;i<best_result.length;i+=2){
                board_map[best_result[i+1]][best_result[i]] = a_player;
            }
	    }
            a_player = other_player;

        }
	else{
		a_player = other_player;
	}
        }
        a_valid_move_0=0;
	a_valid_move_1=0;	
        a_result1=1;
        a_result2=1;
        for(var x = 0;x<8;x++){
            for(var y =0;y<8;y++){
		a_hint_board[x][y]=0;
		        if(board_map[x][y]!==0 && board_map[x][y]!==1){
                        a_result1 = check_legal_move([y,x],1,board_map);
                        a_result2 = check_legal_move([y,x],0,board_map);
                        if(a_result1 !== 0){
                            a_valid_move_1=1;
			    if(a_h_player === 1){
		            a_hint_board[x][y]=3;
			    }
                        } 
	                if(a_result2 !== 0){
		            a_valid_move_0=1;
			    if(a_h_player === 0){
			        a_hint_board[x][y]=3;
                            } 
                        } 
		        }

            }
        }
        //println(a_valid_move_1 + " " + a_valid_move_0);
	if(a_valid_move_0 === 0 && a_valid_move_1 === 0){
	a_game_over = 1;
        game_vars.startscreen = 0;
        game_vars.gamescreen1 = 0;
        game_vars.endscreen1 = 1;
        game_vars.gamescreen2 = 0;
        game_vars.winscreen = 0;
        game_vars.helpscreen = 0;
        game_vars.helpscreen_soccer = 0;
        game_vars.helpscreen_reversi = 0;
        game_vars.aboutscreen=0;
        game_vars.gamescreen2_options = 0;
        game_vars.gamescreen2_end = 0;
        drawboard();
	a_final_board = get(0,0,400,400);

		
	}
	//println("End of MouseClick");
	
        
    }
    else if(game_vars.gamescreen2 === 1){
        user_X = mouseX;
        user_Y = mouseY;
    }

};

mouseReleased = function(){
    
    if(k_timeout-60 < frameCount){
        
    }
    a_r = 200;
a_cx = a_cz = a_cy = a_angle = 0;

a_elevation = -425;
};
/***** end reversi *************/


var initializeSoccerCharacters = function(){
    /***********************/
    initialized  = 1;
    background(40, 176, 19);
    pushMatrix();
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(38, 6, 6);
    
    ellipse(0, 0, 50,50); //head
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // showlder
    rect(this.x+25,this.y+30, 15, 20, 10); // showlder
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    fill(230, 229, 181);
    rect(this.x-22, this.y+95, 20, 20);
    rect(this.x+2, this.y+95, 20, 20);
    
    fill(0,0, 0);
    rect(this.x-25, this.y+110, 23,15,50);
    rect(this.x+2, this.y+110, 23,15,50);
    fill(0, 21, 255,30);
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
    
    /***********End ***************/
    /**********Start*************/
    background(40, 176, 19);
    pushMatrix();
    scale(1);
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(38, 6, 6);
    
    ellipse(0, 0, 50,50); //head
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // showlder
    rect(this.x+25,this.y+30, 15, 20, 10); // showlder
    
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    //legs
    fill(230, 229, 181);
    //rect(this.x-22, this.y+95, 20, 20); // left leg
    rect(this.x+2, this.y+95, 20, 20);
    
    fill(0,0, 0); 
    rect(this.x-25, this.y+95, 23,15,50); // Changed 110 to 95 
    rect(this.x+2, this.y+110, 23,15,50);
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
    /**********************End**************/
    /**********Start*************/
    background(40, 176, 19);
    pushMatrix();
    scale(1);
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(38, 6, 6);
    
    ellipse(0, 0, 50,50); //head
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // showlder
    rect(this.x+25,this.y+30, 15, 20, 10); // showlder
    
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    //legs
    fill(230, 229, 181);
    rect(this.x-22, this.y+95, 20, 20); 
    //rect(this.x+2, this.y+95, 20, 20);// right leg
    
    fill(0,0, 0); 
    rect(this.x-25, this.y+105, 23,15,50);  
    rect(this.x+2, this.y+95, 23,15,50);// Changed 110 to 95
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
    /**********************End**************/
    
    /************ Front ******************/
    /*************Start *****************/
    /* Second Image */
    background(40, 176, 19,0);
    pushMatrix();
    scale(1);
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(229, 232, 207);
    ellipse(this.x, this.y, 50,50); //head
    
    //eyes
    fill(219, 107, 15);
    ellipse(this.x-10, this.y+5, 5,7);
    ellipse(this.x+10, this.y+5, 5,7);
    arc(this.x,this.y+15,10,10,1*oneDegree, 180*oneDegree);
    fill(74, 25, 25);
    //hair
    arc(this.x,this.y-5,50,40, 170*oneDegree,370*oneDegree);
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // shoulder
    rect(this.x+25,this.y+30, 15, 20, 10); // shoulder
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    fill(230, 229, 181);
    rect(this.x-22, this.y+95, 20, 20);
    rect(this.x+2, this.y+95, 20, 20);
    
    fill(0,0, 0);
    rect(this.x-25, this.y+110, 23,15,50);
    rect(this.x+2, this.y+110, 23,15,50);
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
    /****************end*************************/
    /*************Start *****************/
    background(40, 176, 19,0);
    /* Second Image */
    pushMatrix();
    scale(1);
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(229, 232, 207);
    ellipse(this.x, this.y, 50,50); //head
    
    //eyes
    fill(219, 107, 15);
    ellipse(this.x-10, this.y+5, 5,7);
    ellipse(this.x+10, this.y+5, 5,7);
    arc(this.x,this.y+15,10,10,1*oneDegree, 180*oneDegree);
    fill(74, 25, 25);
    //hair
    arc(this.x,this.y-5,50,40, 170*oneDegree,370*oneDegree);
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // shoulder
    rect(this.x+25,this.y+30, 15, 20, 10); // shoulder
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    fill(230, 229, 181);
    //rect(this.x-22, this.y+95, 20, 20); // left leg
    rect(this.x+2, this.y+95, 20, 20);
    
    fill(0,0, 0);
    rect(this.x-25, this.y+95, 23,15,50); // changed 110 t0 95
    rect(this.x+2, this.y+110, 23,15,50);
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
    /***********************end*********************/
    
    /*************Start *****************/
    /* Second Image */
    background(40, 176, 19,0);
    pushMatrix();
    scale(1);
    translate(100,100);
    this.x = 0;
    this.y = 0;
    fill(229, 232, 207);
    ellipse(this.x, this.y, 50,50); //head
    
    //eyes
    fill(219, 107, 15);
    ellipse(this.x-10, this.y+5, 5,7);
    ellipse(this.x+10, this.y+5, 5,7);
    arc(this.x,this.y+15,10,10,1*oneDegree, 180*oneDegree);
    fill(74, 25, 25);
    //hair
    arc(this.x,this.y-5,50,40, 170*oneDegree,370*oneDegree);
    fill(r,g,b);
    
    //body
    quad(this.x-30, this.y+25, this.x+30, this.y+25, this.x+25, this.y+75, this.x-25, this.y+75);
    
    fill(235, 237, 208); // hand
    ellipse(this.x-32,this.y+50, 10, 20);
    ellipse(this.x+32,this.y+50, 10, 20);
    
    fill(r,g,b); 
    rect(this.x-39,this.y+30, 15, 20, 10); // shoulder
    rect(this.x+25,this.y+30, 15, 20, 10); // shoulder
    
    fill(255, 255, 255);
    rect(this.x-25, this.y+75, 25, 20); //shorts
    rect(this.x, this.y+75, 25, 20);
    
    fill(230, 229, 181);
    rect(this.x-22, this.y+95, 20, 20); 
    //rect(this.x+2, this.y+95, 20, 20);// right leg
    
    fill(0,0, 0);
    rect(this.x-25, this.y+105, 23,15,50); 
    rect(this.x+2, this.y+95, 23,15,50);// changed 110 t0 95
    myImages.push(get(100+this.x-37, 100+this.y-29, 76,150));
    popMatrix();
/***********************end*********************/
};


var displayCustomText = function(a, x, y, font){
    var f = createFont("Bauhaus 93");
    textFont(f, font);
    text(a, x, y);
};

var drawBackground = function(){
    noStroke();
    fill(40, 176, 19);
    rect(0, -200, 400, 800);
    fill(34, 133, 16,100);
    rect(0, -200, 30, 800);
    for(var i=1; i<7; i++){
        rect(60*i, -200, 30, 800);
    }
    stroke(255, 255, 255);
    noFill();
    strokeWeight(2);
    rect(centerX-195,centerY-290, 390, 580);
    strokeWeight(1);
    line(0, centerY, 400, centerY);
    ellipse(centerX, centerY, 100, 100);
    
    rect(centerX-100, centerY-290, 200, 100);
    rect(centerX-50, centerY-290, 100, 50);
    
    rect(centerX - 100, centerY - 290, 200, 100);
    rect(centerX - 50, centerY - 290, 100, 50);
    
    rect(centerX - 100, centerY - 290, 200, 100);
    rect(centerX - 50, centerY - 290, 100, 50);
    rect(centerX - 100, centerY + 290, 200, -100);
    rect(centerX - 50, centerY + 290, 100, -50);
    
    arc(centerX, centerY-190, 50, 50, 0, oneDegree*180);
    arc(centerX, centerY+190, 50, 50, oneDegree*180,oneDegree*360);
    
    rect(centerX-25, centerY-300, 50, 10);
    rect(centerX-25, centerY+300, 50, -10);
    // goal
    
};


var keyReleased = function() {
    keyArray[keyCode] = 0;
    keyPress = 0;
    a_r = 200;
    a_cx = a_cz = a_cy = a_angle = 0;
    a_elevation = -425;

};

var ballObj = function(x, y){
    this.position = new PVector(x,y);
    this.size = 5;
    this.angle = 0;
    this.acceleration = new PVector(0, 0);
    this.velocity = new PVector(0, 0);
    this.drag = new PVector(0, 0);
    this.aVelocity = 0;
    this.inTransit = 0;
    
};var ball_help = new ballObj(330,100);

var defend_state = 0;
var attack_state = 1;
var prepareToKickoff_state = 2;
var defending = function(){
};
var attacking = function(){
};
var prepareToKickoff = function(){
};
var teamObj = function(n,c){
    this.controlPlayer = c;
    this.number = n;
    this.state = [new defending(), new attacking(), new prepareToKickoff()];
    this.currentState = 0;
    this.goal = 0;
};

var kickoff_num = 0;
var wait_num = 1;
var chaseBall_num = 2;
var receiveBall_num = 3;
var kickBall_num = 4;
var dribble_num = 5;
var gaurdAttacker_num = 6;
var chaseToIntercept_num = 7;

var kickoffState = function(){
};
var waitState = function(){
};
var chaseBallState = function(){
};
var receiveBallState = function(){
};
var kickBallState = function(){
};
var dribbleState = function(){
};
var gaurdAttackerState = function(){
};
var chaseToInterceptState = function(){
};
var playerObj = function(x, y, t, f, n,d){
    this.position = new PVector(x,y);
    this.baseposition = new PVector(x,y);
    this.staticposition = new PVector(x,y);
    this.updatedPosition = new PVector(x,y);
    this.legs = 0;
    this.face = f;
    this.velocity = new PVector(0, 0);
    this.team = t;
    this.state = [new kickoffState(),new waitState(), new chaseBallState(), new receiveBallState(), new kickBallState(), new dribbleState(), new gaurdAttackerState(), new chaseToInterceptState()];
    
    this.currentState = 0;
    this.number = n;
    this.defenceIntelligence = 0;
    this.framerate = 0;
    // Add description features to this player
};

var goalieObj = function(x, y, t) {
    this.position = new PVector(x,y);
    this.team = t;
    this.framerate = 0;
};

/***** All soccer game variables ******************/
var ball = new ballObj(330, 100);
var players = [];
var player = new playerObj(100, 100);
var target = new PVector(0, 0);
var teamPossesion = 0;
var score0 = 0;
var score1 = 0;
var numOfPlayers = 6;
var team0 = 0;
var team1 = 1;
var front = 1;
var back = 0;
// All players
//Team 0
players.push(new playerObj(100,40 , team0, front, 0,2));
players.push(new playerObj(300,40 , team0, front,1,4));

players.push(new playerObj(50,120 , team0, front,2,8));
players.push(new playerObj(350,120 , team0, front,3,12));

players.push(new playerObj(100,170 , team0, front,4,16));
players.push(new playerObj(200,200 , team0, front,5,20));

//Team 1
players.push(new playerObj(100,380 , team1, back,6,10));
players.push(new playerObj(300,380 , team1, back,7,9));

players.push(new playerObj(50,300 , team1, back,8,8));
players.push(new playerObj(350,300 , team1, back,9,7));

players.push(new playerObj(300,250 , team1, back,10,5));
players.push(new playerObj(180,200 , team1, back,11,3));


var goalies = [new goalieObj(200, 490, 0), new goalieObj(200, -90, 1)];
var teams = [new teamObj(team0,0), new teamObj(team1,11)];

// game variables
var game_state = 0;

var goal_0_left = new PVector(centerX-25, centerY+300); // Team 0's target goal
var goal_0_right = new PVector(centerX+25, centerY+300);
var goal_0_center = new PVector(centerX, centerY+300);
var goal_1_left = new PVector(centerX-25, centerY-300); // team1's target goal
var goal_1_right = new PVector(centerX+25, centerY-300);
var goal_1_center = new PVector(centerX, centerY-300);

var k_thresholdAngletoPass = 0;

var k_random = 0;
var k_frame_random = frameCount;
var myClosestPlayer = 0;

// Start screen variables
var frame_Start = frameCount;
var initialScale = 1;
var initialPlayer = new playerObj(-5, 100);
var allPlayerStates = [0,0,0,0,0,0,0,0,0,0,0,0];

var chaseVelocityFactor = 1;
var chaseToIntercept_velocityFactor = 1.5;
var movePlayer_velocityFactor = 2;
/************ End of all soccer game variables ********/

/******************ballObj***********************/
ballObj.prototype.draw = function() {
 
  pushMatrix();
  translate(this.position.x, this.position.y);
  rotate(this.angle);
  fill(155,255, 255,250);
  ellipse(0, 0,this.size+5, this.size+5);
  stroke(132, 167, 209);
  strokeWeight(1);
  arc(0,0,this.size, this.size/2, 0, 180*oneDegree);
  arc(0,-this.size/3,this.size, this.size/2, 20 * oneDegree, 160*oneDegree);
  
  arc(0,0,this.size/2,this.size,  90*oneDegree, 270*oneDegree);
  arc(this.size/3,0,this.size/2,this.size, 120*oneDegree, 250*oneDegree);
  fill(10, 196, 196,0);
  
  arc(0,0,this.size, this.size/2, 0, 180*oneDegree);
  arc(0,-this.size/3,this.size, this.size/2,20 * oneDegree, 160*oneDegree);
  fill(0, 0, 0);
  displayCustomText("NIKE", -this.size/3.2,5, this.size/4, 30);
  popMatrix();
};

ballObj.prototype.move = function() {
 
    this.velocity.add(this.drag);
    this.position.add(this.velocity);
    this.drag.set(this.velocity.x, this.velocity.y);
    this.drag.mult(-0.03);
    
    this.aVelocity = this.velocity.mag() * 4;
    if (this.velocity.x < 0) {
        this.aVelocity = -this.aVelocity;
    }
    this.angle += this.aVelocity;
    
    if (this.velocity.mag() < 0.1) {
        this.inTransit = 0;
    }
    else {
        this.inTransit = 1;
    }
    
    // Goal scoring
/*    if (this.position.x < 0) {
        this.position.x = 0;
        this.velocity.set(0, 0);
        if ((this.position.y > 90) && (this.position.y < 310)) {
            teamPossesion = 0;
            score1++;
        }
    }
    else if (this.position.x > 400) {
        this.position.x = 400;
        this.velocity.set(0, 0);
        if ((this.position.y > 90) && (this.position.y < 310)) {
            teamPossesion = 1;
            score0++;
        }
    } */
    // if (this.position.y < -100) {
    //     this.position.y = 200;
    //     this.position.x = 200;
    //     this.velocity.set(0, 0);
    // }
    // else if (this.position.y >= 500) {
    //     this.position.y = 200;
    //     this.position.x = 200;
    //     this.velocity.set(0, 0);
    // }
    if (this.position.x < 25) {
        this.position.x = 25;
        this.velocity.set(0, 0);
    }
    else if (this.position.x > 375) {
        this.position.x = 375;
        this.velocity.set(0, 0);
    }
};

ballObj.prototype.heldMe = function(me) {
    if(k_pass !== 1){
        if (dist(this.position.x, this.position.y, me.position.x, me.position.y) < 2) {
                    return true;
        }
    }
    return false;
};

ballObj.prototype.heldAttack = function(team) {
    var h = 0;
    for (var i=0; i<players.length; i++) {
        if(players[i].team !== team.number){
            if (dist(this.position.x, this.position.y, players[i].position.x, players[i].position.y) < 15) {
                h = 1;
            }
        }
    }
    return h;
};

ballObj.prototype.heldDefence = function(team){
    var h = 0;
    for (var i=0; i<players.length; i++) {
        if(players[i].team === team.number){
            if (dist(this.position.x, this.position.y, players[i].position.x, players[i].position.y) < 15) {
                h = 1;
            }
        }
    }
    return h;
};
/******************End ballObj***********************/

/***************teamObj***********************/
teamObj.prototype.changeState = function(s){
    this.currentState = s;
};
/*************** end teamObj***********************/

/***************playerObj***********************/
var k_coll = 0;
var collision = function(me,ax1,ay1,ax2,ay2, bx1, by1, bx2, by2){
    if( (ax2 >= bx1) && (ax1<=bx2)){
        if( (ay2 >= by1) && (ay1<=by2)){
            k_coll  =1;
            if(ax2 >= bx1 && ax1<bx1 ){
                me.updatedPosition.x -=5;
            }
            if(ax1 <= bx2 && ax2>bx2){
                me.updatedPosition.x +=5;
            }
            
            if(ay2 >= by1 && ay1<by1){
                me.updatedPosition.y -=5;
            }
            if(ay1 <= by2 && ay2>by2){
                me.updatedPosition.y +=5;
            }
            return true;
        }
    }
    return false;
};

var checkForCollision = function(){
  for(var i=0; i<players.length; i++){
      for(var j=0; j<players.length; j++){
          if(i !== j){
            collision(players[i], players[i].position.x, players[i].position.y, players[i].position.x+15,  players[i].position.y+35,players[j].position.x, players[j].position.y, players[j].position.x+15,  players[j].position.y+35);     
          }
      }
  }
};


playerObj.prototype.chaseBall = function() {
        var x = ball.position.x + ball.velocity.x * 4;  // predict future position
        var y = ball.position.y + ball.velocity.y * 4;
        this.velocity.set(x - this.position.x, y - this.position.y);
        //this.velocity = PVector.div(this.velocity, this.velocity.mag());
        //var magnitude = abs(this.velocity.mag());
		var magnitude = sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
		
        if(magnitude > 0){	
            this.velocity.x =  this.velocity.x/magnitude;
            this.velocity.y =  this.velocity.y/magnitude;
	    }
	    else{
	        return;
	    }
        this.velocity.mult(chaseVelocityFactor);   // dribble change
        this.position.add(this.velocity);
        if(this.velocity.y < 5){//this.face = 1;
        
            }
        else{//this.face = 0;
        
            }
        
        if(this.framerate < frameCount-5){
            this.framerate = frameCount;
            this.legs = (this.legs+1)%3;
        }
};

playerObj.prototype.gohome = function(){
    var x = this.staticposition.x;
    var y = this.staticposition.y;
    this.velocity.set(x - this.position.x, y - this.position.y);
        //this.velocity = PVector.div(this.velocity, this.velocity.mag());
        //var magnitude = abs(this.velocity.mag());
	var magnitude = sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
	
	if(magnitude > 0){	
        this.velocity.x =  this.velocity.x/magnitude;
        this.velocity.y =  this.velocity.y/magnitude;
	}
	else{
	    return;
	}
	
    if(magnitude < 1){
        this.velocity.set(0);
    }
    
    else{
        this.velocity.mult(2);
        this.position.add(this.velocity);
    }
    if(this.velocity.y > 0){
        //this.face = 1;
        
    }
    
    else{//this.face = 0;
    
    }
        
    if(this.framerate < frameCount-5){
        this.framerate = frameCount;
        this.legs = (this.legs+1)%3;
    }
};

playerObj.prototype.gotoUpdatedHome = function(){
    var x = this.updatedPosition.x;
    var y = this.updatedPosition.y;
    this.velocity.set(x - this.position.x, y - this.position.y);
        //this.velocity = PVector.div(this.velocity, this.velocity.mag());
        //var magnitude = abs(this.velocity.mag());
	var magnitude = sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
	
	if(magnitude > 0){	
        this.velocity.x =  this.velocity.x/magnitude;
        this.velocity.y =  this.velocity.y/magnitude;
	}
	else{
	    return;
	}
	this.velocity.mult(2);
    if(magnitude < 1){
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
    else{
        this.position.add(this.velocity);
    }
    if(this.velocity.y > 1){
        //this.face = 1;
        
            }
    else{
        //this.face = 0;
        
    }
        
    if(this.framerate < frameCount-5){
        this.framerate = frameCount;
        this.legs = (this.legs+1)%3;
    }
};


playerObj.prototype.chaseToIntercept = function() {
    if (ball.inTransit === 1) {
        var x = ball.position.x;
        var y = ball.position.y;
        
        var v = ball.velocity.get();
        x = x + this.defenceIntelligence*ball.velocity.x;
//        y = y + this.defenceIntelligence*ball.velocity.y;
        this.velocity.set(x - this.position.x, y - this.position.y);
        
        var magnitude = sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        
       if(magnitude > 0){	
            this.velocity.x =  this.velocity.x/magnitude;
            this.velocity.y =  this.velocity.y/magnitude;
	    }
	    else{
	        return;
	    }
        this.velocity.mult(chaseToIntercept_velocityFactor);
        this.position.add(this.velocity);
    }
    if(this.framerate < frameCount-5){
        this.framerate = frameCount;
        this.legs = (this.legs+1)%3;
    }
};

playerObj.prototype.changeState = function(s){
    this.currentState = s;
};

playerObj.prototype.draw = function() {
   //  checkForCollision();
     
     if(this.position.x < 25){
         this.position.x = 25;
     }
     else if(this.position.x > 375){
         this.position.x = 375;
     }
     
     if(this.position.y < -100){
         this.position.y = -100;
     }
     else if(this.position.y > 500){
         this.position.y = 500;
     }
     
    if(this.face === 0){
        
       image(myImages[this.legs], this.position.x-7, this.position.y-30, 15, 35);
       if((this.team === 1) && (teams[this.team].controlPlayer ===this.number)){
           fill(random(0,255),random(0,255),random(0,255) );
            rect(this.position.x-4, this.position.y-16, 9,8);
        }
    //   text(this.number, this.position.x-7, this.position.y-35);
    }
    else{
       image(myImages[this.legs+3], this.position.x-7, this.position.y-30, 15, 35);
       if((this.team === 1) && (teams[this.team].controlPlayer ===this.number)){
            fill(random(0,255),random(0,255),random(0,255) );
            rect(this.position.x-4, this.position.y-16, 9,8);
       }
       
    //   text(this.number, this.position.x-7, this.position.y-35);
    }
    noStroke();
    if(this.team === 0){
        fill(255, 255, 0);
        rect(this.position.x-4, this.position.y-16, 9,8);
    }
    
};

var controlPlayer_move = function(me) {
    
    if(keyPress === 1){
        if (keyArray[65] === 1) {
            me.position.x-=movePlayer_velocityFactor;
            
        }
        if (keyArray[68] === 1) {
            me.position.x+=movePlayer_velocityFactor;
        }
        if (keyArray[87] === 1) {
            me.position.y-=movePlayer_velocityFactor;
            me.face = 0;
        }
        if (keyArray[83] === 1) {
            me.position.y+=movePlayer_velocityFactor;
            me.face = 1;
        }  
        if(this.framerate < frameCount-5){
            this.framerate = frameCount;
            me. legs = (me.legs+1)%3;
        }
    }
/*    var npcCenter = new PVector(15,20);
    npcCenter =  PVector.add(npcCenter, this.position);
    var vec = PVector.sub(npcCenter, ball.position);
    if(vec.mag() < 10){
        if (keyArray[LEFT] === 1) {
            ball.position.x-=5;
        }
        if (keyArray[RIGHT] === 1) {
            ball.position.x+=5;
        }
        if (keyArray[UP] === 1) {
            ball.position.y-=5;
        }
        if (keyArray[DOWN] === 1) {
            ball.position.y+=5;
        }  
    }*/
    
};

playerObj.prototype.keepmoving = function(me){
    me.position.y = me.position.y+ 0.05* sin(k_random);
    k_random = k_random + oneDegree*2;
    if(this.framerate < frameCount-5){
            this.framerate = frameCount;
            me.legs = (me.legs+1)%3;
   }
};

/***************End playerObj***********************/

/*************Golie Object*********************/
goalieObj.prototype.draw = function() {
       if((this.team === 0)){
           image(myImages[2], this.position.x-7, this.position.y-30, 15, 35);
           fill(12, 242, 200);
            rect(this.position.x-4, this.position.y-16, 9,8);
        }
        if((this.team === 1)){
           image(myImages[3], this.position.x-7, this.position.y-30, 15, 35);
           fill(26, 6, 201);
            rect(this.position.x-4, this.position.y-16, 9,8);
        }
};
goalieObj.prototype.move = function() {
    var tgt = new PVector(0,0);
    this.position.x = ball.position.x;
    if(this.position.x > 230){
        this.position.x = 230;
    }
    if(this.position.x < 170){
        this.position.x = 170;
    }
    
    if(this.framerate < frameCount-5){
        this.framerate = frameCount;
        this.legs = (this.legs+1)%3;
    }
    if(ball.heldMe(this)){
         ball.velocity.set(0);
         if(ball.position.y < 500){
            tgt.x = random(100, 300);
            tgt.y = random(100, 300);
            ball.velocity = PVector.sub(tgt, ball.position);
            ball.velocity.div(25);
            ball.drag.set(ball.velocity.x, ball.velocity.y);
            ball.drag.mult(-0.001);
         } 
         if(ball.position.y > -100){
            tgt.x = random(100, 300);
            tgt.y = random(100, 300);
            ball.velocity = PVector.sub(tgt, ball.position);
            ball.velocity.div(25);
            ball.drag.set(ball.velocity.x, ball.velocity.y);
            ball.drag.mult(-0.001);
         }
    }
    
};
/*****************end golie object***************/

/*****************Common functions **************/
var vec_normalize = function(vec){
   
  var magnitude = sqrt(vec.x * vec.x + vec.y * vec.y);
		
        if(magnitude > 0){	
            vec.x =  vec.x/magnitude;
            vec.y =  vec.y/magnitude;
	    }
	    else{
	        return;
	    }
	    return vec;
};

var chooseClosestPlayer = function(team) {
    var bestPlayer = 0;
    var bestDist = 1000;
    var localTarget = 0;
    var d = 0;
    localTarget = ball.position;
    for (var i = 0; i< players.length; i++) {
        if ( players[i].team === team.number) {
            d = PVector.sub(localTarget, players[i].position);
            var dis = d.mag();
            if (dis < bestDist) {
                bestDist = dis;
                bestPlayer = i;
            }
        }
    }
    return(bestPlayer);
};

var chooseClosestPlayerThanMe = function(me, team) {
    var bestPlayer = 0;
    var bestDist = 1000;
    var localTarget = 0;
    var d = 0;
    localTarget = ball.position;
    for (var i = 0; i< players.length; i++) {
        if ( (i !== me.number) && (players[i].team === team.number)) {
            d = PVector.sub(localTarget, players[i].position);
            var dis = d.mag();
            if (dis < bestDist) {
                bestDist = dis;
                bestPlayer = i;
            }
        }
    }
    return(bestPlayer);
};

// Returns score on how safe it is to pass
var safeToPass = function(player1, player2){
    var angle =0;
    var score = 100;
    var vec1 = PVector.sub(player1.position, player2.position);
    var vec2 = 0;
    for (var i = 0; i< players.length; i++) {
        if ( players[i].team !== teamPossesion)   {
            vec2 = PVector.sub(player1.position, players[i].position);
            
            if( players[i].position.y > 200){
                score = players[i].position.y;
            }
            
            angle = PVector.angleBetween(vec1,vec2) / oneDegree;
            
            if(angle > 180){ angle = 360-180 ;}
            if(abs(angle) < 5){
                score = score - 80;
            }
            else if(abs(angle) < 10){
                score = score - 50;
            }
            else if(abs(angle) < 20){
                score = score - 20;
            }
        }    
    }
    return score;
};

var safeToPassArea = function(player1, area){
    var angle =0;
    var score = 100;
    var vec1 = PVector.sub(player1.position, area);
    var vec2 = 0;
    for (var i = 0; i< players.length; i++) {
        if ( players[i].team !== teamPossesion)   {
            vec2 = PVector.sub(player1.position, players[i].position);
            
            angle = PVector.angleBetween(vec1,vec2) / oneDegree;
            
            if(angle > 180){ angle = 360-180 ;}
            if(abs(angle) < 5){
                score = score - 50;
            }
            else if(abs(angle) < 10){
                score = score - 30;
            }
            else if(abs(angle) < 20){
                score = score - 20;
            }
        }    
    }
    return score;
};

var chooseBestPlayerToPass = function(me,team){
    var bestPlayer = 0;
    var bestScore = 0;
    var angle = 0;
    var score;
    for (var i = 0; i< players.length; i++) {
        if ( (i !== me.number) && (players[i].team === me.team)) {
            score = safeToPass(me, players[i]); 
            if(score >= bestScore){
                bestScore = score;
                bestPlayer = i;
            }
        }
    }
    return bestPlayer;
};

var team0_attackingArea = [];
var team1_attackingArea = [];
for(var rows=0; rows<2; rows++){
    var xStart = 0;
    var yStart = (rows*60);
    for(var columns=0; columns<4; columns++){
        team1_attackingArea.push(new PVector(xStart+50, yStart+80-100));
        xStart = xStart+100;
    }
}
for(var rows=0; rows<2; rows++){
    var xStart = 0;
    var yStart = (rows*60);
    for(var columns=0; columns<4; columns++){
        team0_attackingArea.push(new PVector(xStart+50, yStart+20+350));
        xStart = xStart+100;
    }
}
var squaredDistance = function(x, y){
    var distance = 0;
    distance = (x.x - y.x) * (x.x - y.x) + (x.y - y.y) * (x.y - y.y);
    return distance;
};

var findPass = function(me, team){
    var bestscore = 0;
    var score = 0;
    var bestarea = 0;
    if(team.number === 0){
        for(var i=0; i<team0_attackingArea.length; i++){
            var dist_goal = squaredDistance(team0_attackingArea[i], goal_0_center);
            if(dist_goal < 5000){ score = 100;}
            else { score = 80;}
            var safe_for_me_to_pass = safeToPassArea(me, team0_attackingArea[i]);
            score = score + safe_for_me_to_pass;
            if(score > bestscore){
                bestscore = score;
                bestarea = i;
            }
        }
    }
    if(team.number === 1){
        for(var i=0; i<team1_attackingArea.length; i++){
            var dist_goal = squaredDistance(team1_attackingArea[i], goal_1_center);
            if(dist_goal < 5000){ score = 100;}
            else { score = 80;}
            var safe_for_me_to_pass = safeToPassArea(me, team1_attackingArea[i]);
            score = score + safe_for_me_to_pass;
            if(score > bestscore){
                bestscore = score;
                bestarea = i;
            }
        }
    }
    //         var safe_for_me_to_pass = safeToPassArea(me, team0_attackingArea[i]);
    //         score = score + safe_for_me_to_pass;
            
    //         for( var j=6; i<players.length; j++){  // Other team players
    //             // var distance = 0;
    //             //var distance= squaredDistance(players[j].position, team0_attackingArea[i]);
    //             // if(distance > 2500){    // 50 pixels
    //             //     score = score-50;
    //             // }
    //             // else if(distance > 5000){   // 70 pixels
    //             //     score = score-30;
    //             // }
    //             // else if(distance > 10000){   // 100 pixels
    //             //     score = score-10;
    //             // }
    //         }
    //         for( var j=0; i<players.length/2; j++){  // Our team players
    //             // var distance= squaredDistance(players[j].position, team0_attackingArea[i]);
    //             // if(distance < 2500){    // 50 pixels
    //             //     score = score + 50;
    //             // }
    //             // else if(distance < 5000){   // 70 pixels
    //             //     score = score+30;
    //             // }
    //             // else if(distance < 10000){   // 70 pixels
    //             //     score = score+10;
    //             // }
    //         } 
    //         if(score > bestscore){
    //             bestscore = score;
    //             bestarea = i;
    //         }
    //     }
    // }
    // else if(team.number === 1){
    //     for(var i=0; i<1; i++){
    //         var dist_goal = squaredDistance(team1_attackingArea[i], goal_1_center);
    //         if(dist_goal < 5000){ score = 100;}
    //         else { score = 80;}
            
    //         var safe_for_me_to_pass = safeToPassArea(me, team0_attackingArea[i]);
    //         score = score + safe_for_me_to_pass;
            
    //         for( var j=6; j<players.length; j++){  // Other team players
    //             // var distance = squaredDistance(players[j].position, team1_attackingArea[i]);
    //             // if(distance > 2500){    // 50 pixels
    //             //     score = score-50;
    //             // }
    //             // else if(distance > 5000){   // 70 pixels
    //             //     score = score-30;
    //             // }
    //             // else if(distance > 10000){   // 100 pixels
    //             //     score = score-10;
    //             // }
    //         }
    //         for( var j=0; j<players.length/2; j++){  // Our team players
    //             // var distance= squaredDistance(players[j].position, team1_attackingArea[i]);
    //             // if(distance < 2500){    // 50 pixels
    //             //     score = score + 50;
    //             // }
    //             // else if(distance < 5000){   // 70 pixels
    //             //     score = score+30;
    //             // }
    //             // else if(distance < 10000){   // 70 pixels
    //             //     score = score+10;
    //             // }
    //         }
    //         //println(score);
    //         if(score > bestscore){
    //             bestscore = score;
    //             bestarea = i;
    //         }
    //     }
    // }
    return bestarea;
    
};

// Returns score on how likely it is to score the goal
// Computationally expensice. Call only when the player is in the vicinity of the goal
var canScore = function(me){
    var vec1 = 0;
    var vec2 = 0;
    var vec3 = 0;
    var vec4 = 0;
    var vec_centerGoal = 0;
    var angle = 0;
    var angleBwPlayers = 0;
    var ballHeadingAngle = 0;
    var score= 100;
    
    if(me.team === 0){
        vec1 = PVector.sub(me.position, goal_0_left);
        vec2 = PVector.sub(me.position, goal_0_right);
        vec3 = PVector.sub(me.position, goal_0_center);
        angle = PVector.angleBetween(vec1,vec2) / oneDegree;
        ballHeadingAngle = abs(angle/2); // to the center of the post

        if(abs(me.position.y - goal_0_left.y) > 200){
            return 0; // too far
        }
        if(abs(me.position.y - goal_0_left.y)<random(50, 100)){
            score = 200;
        }
        for (var i = 0; i< players.length; i++) {
            if ( players[i].team !== me.team)  {
                vec4 = PVector.sub(me, players[i].position);
                angleBwPlayers = PVector.angleBetween(vec3, vec4)/oneDegree;
                if(abs(angleBwPlayers) < ballHeadingAngle){  // Check this function
                    score = score - 30;
                }
                if(abs(angleBwPlayers) < 1.1*ballHeadingAngle){
                    score = score - 20;
                }
                if(score < 0){
                    return 0;
                }
            }
        }
    }
    else{
        vec1 = PVector.sub(me.position, goal_1_left);
        vec2 = PVector.sub(me.position, goal_1_right);
        vec3 = PVector.sub(me.position, goal_1_center);
        angle = PVector.angleBetween(vec1,vec2) / oneDegree;
        ballHeadingAngle = abs(angle/2); // to the center of the post
        if(abs(me.position.y - goal_1_left.y) > 100){
            return 0; // too far
        }
        
        if(abs(me.position.y - goal_1_left.y)<20){
            score = 200;
        }
        
        for (var i = 0; i< players.length; i++) {
            if ( players[i].team !== me.team)  {
                vec4 = PVector.sub(me, players[i].position);
                angleBwPlayers = PVector.angleBetween(vec3, vec4)/oneDegree;
                if(abs(angleBwPlayers) < ballHeadingAngle){
                    score = score - 30;
                }
                if(abs(angleBwPlayers) < (1.1*ballHeadingAngle)){
                    score = score - 20;
                }
                if(score < 0){
                    return 0;
                }
            }
        }
    }
    
    return score;
};

var anyOppnentClosetoMe = function(me){
    for (var i = 0; i< players.length; i++) {
        if ( (i !== me.number) && (players[i].team !== me.team)) {
            var d = squaredDistance(me.position, players[i].position);
            if(d <2000){
                return true;
            }
        }
    }
};


var scoreKick = function() {
    var inGoal = 0;
    if (((target.x < 30) && (target.y > 100) && (target.y < 300)) ||
        ((target.x > 370) && (target.y > 100) && (target.y < 300))) {
        inGoal = 1;
    }
    return inGoal;
};

var startScreenAnimation = function(){
    pushMatrix();
    initialPlayer.face= 1;
    pushMatrix();
    scale(initialScale);
    translate(initialScale*2,0);
    initialPlayer.draw();
    if(frame_Start < frameCount-10){
        initialScale = initialScale+0.1;
        frame_Start  = frameCount;
         initialPlayer.legs = (initialPlayer.legs+1)%3;
    }
    popMatrix();
    
    if(initialScale>4){
        initialPlayer.position.y = 100;
        initialScale = 1;
    }    
};


// var collision = function(ax1,ay1,ax2,ay2, bx1, by1, bx2, by2){
//     if( (ax2 >= bx1) && (ax1<=bx2)){
//         if( (ay2 >= by1) && (ay1<=by2)){
//             //println("collision");
//             return true;
//         }
//     }
// };




ballObj.prototype.moveWithPlayer = function(me){
    // ball.position.x = me.position.x+10;
    // ball.position.y = me.position.x+25;
    // ball.move();
    
    // var angle = me.heading();
    // var trgt = new PVector(10 * sin(angle),10 * cos(angle));
    //     trgt = vec_normalize(trgt);
    //     trgt.set(PVector.div(trgt,1.8));
    //     ball.velocity.set(trgt);
    //     ball.velocity.mult(4);
    //     ball.drag.set(ball.velocity.x, ball.velocity.y);
    //     ball.drag.mult(-0.001);
    
    var factor = 5;
    var negFactor = -5;
    var xFactor = 0;
    var yFactor = 0;
    if(keyPress === 1){
        if (keyArray[65] === 1) {
            xFactor = negFactor;
            
        }
        if (keyArray[68] === 1) {
             xFactor = factor;
        }
        if (keyArray[87] === 1) {
            yFactor = negFactor;
        }
        if (keyArray[83] === 1) {
            yFactor = factor;
        } 
    }
    
    target.x = me.position.x + xFactor ;
    target.y = me.position.y + yFactor ;
        ball.velocity = PVector.sub(target, ball.position);
        ball.velocity.div(5);
        ball.drag.set(ball.velocity.x, ball.velocity.y);
        ball.drag.mult(-0.001);
};


var updateLocation = function(me){
     var area  = findPass(me, teams[me.team]);
     if(teams[0].currentState !== prepareToKickoff_state || teams[1].currentState !== prepareToKickoff_state){
     if(me.team === 0){
         if(me.number === 0 || me.number === 1){
             if(teams[me.team].currentState === attack_state && ball.position.y > 200){
                    me.updatedPosition.y =  100;
             }
             else if(ball.position.y < 200){
                 me.updatedPosition.y = 50;
             }
            
         }
         if(me.number === 2 ){
            me.updatedPosition.y = 100;
         }
         if( me.number === 3){
             if(ball.position.y > 200 && ball.position.y < 330){
                me.updatedPosition.y = ball.position.y + random(30, 50);
             }
            else if(ball.position.y < 200){
                 me.updatedPosition = ball.position.y + random(-20, 20);
            } 
         }
         if(me.number === 4 || me.number === 5){
             if(ball.position.y > 200){
                 me.updatedPosition.x = team0_attackingArea[area].x;
                 me.updatedPosition.y = ball.position.y+5;
             }
             else{
                 me.updatedPosition = me.baseposition;
             }
         }
     }
     else{
        if(me.number === 6 || me.number === 7){
            
         }
         if(me.number === 8){
             me.updatedPosition.y = 300;
         }
         if(me.number === 9){
             if(ball.position.y < 200){
                me.updatedPosition.y = ball.position.y;
            }
            else{
                 me.updatedPosition = me.baseposition;
             }
         
         }
         if(me.number === 10 || me.number === 11){
             if(ball.position.y < 200){
                me.updatedPosition.x = team1_attackingArea[area].x;
                me.updatedPosition.y = ball.position.y-5;
         }
         else{
                 me.updatedPosition = me.baseposition;
             }         
         }
     } 
     }
};

/*****************End common functions ************/

/*****************teamObj states executables ***********/
defending.prototype.execute = function(team){
    var closestPlayer = 0;
    closestPlayer = chooseClosestPlayer(team);
    if(team.number === 1 ){
        if(squaredDistance(players[team.controlPlayer].position, ball.position) > 2500){
            if(squaredDistance(players[team.controlPlayer].position, players[closestPlayer].position) > 2500){
            team.controlPlayer = closestPlayer;
            }
        }
    }
    else{
      team.controlPlayer = closestPlayer;
    }
    if (ball.inTransit === 1) {
        allPlayerStates[team.controlPlayer] = chaseToIntercept_num;
        allPlayerStates[closestPlayer] = chaseToIntercept_num;
        
                // if(ball.position.y < 100){    
                //     allPlayerStates[0] = chaseToIntercept_num;
                //     allPlayerStates[1] = chaseToIntercept_num;
                // }
                
                // if(ball.position.y < 200 && ball.position.y >=100){    
                //     allPlayerStates[2] = chaseToIntercept_num;
                //     allPlayerStates[3] = chaseToIntercept_num;
                // }
                
                // if(ball.position.y >=200){    
                //     allPlayerStates[4] = chaseToIntercept_num;
                //     allPlayerStates[5] = chaseToIntercept_num;
                // }
                
                if(ball.position.y >=300){
                    allPlayerStates[6] = chaseToIntercept_num;
                    allPlayerStates[7] = chaseToIntercept_num;
                }
                if(ball.position.y > 200 && ball.position.y <= 300){    
                    allPlayerStates[8] = chaseToIntercept_num;
                    allPlayerStates[9] = chaseToIntercept_num;
                }
                
                if(ball.position.y < 200){    
                    allPlayerStates[10] = chaseToIntercept_num;
                    allPlayerStates[11] = chaseToIntercept_num;
                }
        
        
    }
    else{
        allPlayerStates[team.controlPlayer] = chaseBall_num;
    }
    if(ball.heldDefence(team) === 1){
        teamPossesion = team.number;
        team.changeState(attack_state);
    }
    
    for(var i=0;i<players.length; i++){
        players[i].changeState(allPlayerStates[i]);   
    }
    
};

attacking.prototype.execute = function(team){
    var closestPlayer = 0;
    var palyerToPass = 0;
    closestPlayer = chooseClosestPlayer(team);
    if(team.number === 1 ){
        if(squaredDistance(players[team.controlPlayer].position, ball.position) > 2500){
            if(squaredDistance(players[team.controlPlayer].position, players[closestPlayer].position) > 2500){
            team.controlPlayer = closestPlayer;
            }
        }
    }
    else{
      team.controlPlayer = closestPlayer;
    }
    allPlayerStates[closestPlayer] = chaseBall_num;
    
    if(ball.heldDefence(team) === 1){
        
        //allPlayerStates[closestPlayer] = kickBall_num;
       // allPlayerStates[closestPlayer] = dribble_num;
       
             
       if(team.number === 1){
           if(k_pass === 1){
               allPlayerStates[closestPlayer] = kickBall_num;
               
            //   k_pass = 0;
           }
           else{
               
               if(!ball.heldMe(players[closestPlayer])){
                // k_pass =0;
                    ball.moveWithPlayer(players[closestPlayer]);
               }
           }
       }
           
       else{
            if(anyOppnentClosetoMe(players[closestPlayer])){
                allPlayerStates[closestPlayer] = kickBall_num;
            }
            else{
                // if(squaredDistance(players[closestPlayer].position, ball.position )< 50){
                //     allPlayerStates[closestPlayer] = chaseBall_num;
                // }dwww
                if(players[closestPlayer].number === 0 || players[closestPlayer].number === 1){
                    allPlayerStates[closestPlayer] = kickBall_num;
                }
                else if(chooseBestPlayerToPass(players[closestPlayer],teams[players[closestPlayer].team])  < 50){
                    allPlayerStates[closestPlayer] = dribble_num;
                }
                else{
                   allPlayerStates[closestPlayer] = kickBall_num; 
                }
            }
       }
        
    }
    if(ball.heldAttack(team) === 1){
        team.changeState(defend_state);
    }
    
    for(var i=0;i<players.length; i++){
        players[i].changeState(allPlayerStates[i]);   
    }
};

var kickofTime = 0;
prepareToKickoff.prototype.execute = function(){
    
    for(var i=0;i<players.length; i++){
        allPlayerStates[i] = 0; 
    }
    for(var i=0;i<players.length; i++){
        players[i].changeState(allPlayerStates[i]);   
    }
    if(kickofTime < frameCount -100){
        teams[1].changeState(attack_state);
        teams[0].changeState(attack_state);
    }
    ball.velocity.set(0);
};
/****************end teamObj states executables *******/

/*****************PlayerObj executables ***********/
kickoffState.prototype.execute = function(me){
    me.gohome();
};
waitState.prototype.execute  = function(me){
    if(teams[me.team].currentState === attack_state){
        me.gotoUpdatedHome();
    }
    else{
        // allPlayerStates[me.number] = kickoff_num;
    }
};
chaseBallState.prototype.execute  = function(me){
    if(teams[1].controlPlayer !== me.number){
      //  if(teams[me.team].currentState === 0){
            me.chaseBall();
    //    }
        if(teams[me.team].controlPlayer !== me.number){
             allPlayerStates[me.number] = wait_num; 
        }
    }
};
receiveBallState.prototype.execute  = function(me){
    var count = 0;
    for(var i=0;i<players.length; i++){
        if(players[i].currentState === receiveBall_num){
            count++;
        }
    }
    if(count <2){
                if(teams[me.team].currentState === 1){
                    me.chaseBall();
                }
                else{
                    allPlayerStates[me.number] = wait_num;
                }
            }
    
};

var noKick = 0;
kickBallState.prototype.execute  = function(me){
    var bestPlayer_id = 0;
    var bestPlayer = 0;
    if(me.team === team1){
        var tr = mouseY;
        if(ball.position.y < 100){
            tr =   mouseY + ball.position.y - 100;
        }
        else if(ball.position.y > 300 ){
            tr = mouseY + ball.position.y - 300;
        }
        if(tr > 570)
        { tr = 650;}
        
        if(tr < -70)
        { tr = -200;}

        target.set(mouseX, tr);
        ball.velocity = PVector.sub(target, ball.position);
        if(tr > -50){
            ball.velocity.div(25);
        }
        else{
            ball.velocity.div(15);
        }
        ball.drag.set(ball.velocity.x, ball.velocity.y);
        ball.drag.mult(-0.001);
        
    }
    else{
//    if(teams[1].controlPlayer !== me.number){ 
        bestPlayer_id = chooseBestPlayerToPass(me, teams[me.team]);
        bestPlayer = players[bestPlayer_id];
            target.set(bestPlayer.position);
//    }
//  else{
//        target.set(user_X, user_Y);
//   }
     
        ball.velocity = PVector.sub(target, ball.position);
        ball.velocity.div(25);
        ball.drag.set(ball.velocity.x, ball.velocity.y);
        ball.drag.mult(-0.001);
     }
    if(squaredDistance(me.position, ball.position) < 100){
        noKick++;
        allPlayerStates[me.number] = kickBall_num;
        if(noKick > 10){
            ball.position.set(me.position.x,me.position.y);
        }
        
    }
    else{
        noKick = 0;
        allPlayerStates[me.number] = wait_num; 
    }
    
    allPlayerStates[bestPlayer_id] = receiveBall_num;
};

dribbleState.prototype.execute = function(me){
    var trgt = 0;
    me.chaseBall();
    if(ball.heldMe(me)){
        if(me.team === 1){
            
        }
        else{
            trgt = PVector.sub( goal_0_center,me.position);
        }
        trgt = vec_normalize(trgt);
        trgt.set(PVector.div(trgt,1.8));
        ball.velocity.set(trgt);
        ball.velocity.mult(4);
        ball.drag.set(ball.velocity.x, ball.velocity.y);
        ball.drag.mult(-0.001);
        if(canScore(me) >=100){
            ball.velocity.mult(5);
            allPlayerStates[me.number] = wait_num;
        }
        
    }
};

gaurdAttackerState.prototype.execute = function(me){
};

chaseToInterceptState.prototype.execute  = function(me){
    // if(squaredDistance(me.position, ball.position) < 30){
    //     if(me.number === 2){
    //         println(squaredDistance(me.position, ball.position));
    //     }
    //     allPlayerStates[me.number] = kickBall_num;
    // }
    
    
    
    if(teams[1].controlPlayer !== me.number){    
        if(teams[me.team].currentState === 0){
            if(me.number === 0 || me.number === 1){
                if(ball.position.y < 100){    
                    me.chaseToIntercept();
                    return;
                }
            }
            if(me.number === 2 || me.number === 3){
                if(ball.position.y < 200 && ball.position.y >=100){    
                    me.chaseToIntercept();
                    return;
                }
            }
            if(me.number === 4 || me.number === 5){
                if(ball.position.y >=200){    
                    me.chaseToIntercept();
                    return;
                }
            }
            
            if(me.number === 6 || me.number === 7){
                if(ball.position.y > 250){ 
                    me.chaseToIntercept();
                    return;
                }
            }
            if(me.number === 8 || me.number === 9){
                if(ball.position.y > 200 && ball.position.y <= 300){    
                    me.chaseToIntercept();
                    return;
                }
            }
            if(me.number === 10 || me.number === 11){
                if(ball.position.y < 200){    
                    me.chaseToIntercept();
                    return;
                }
            }
            
        }
        if(teams[me.team].currentState === 1){
        }
        allPlayerStates[me.number] = wait_num;
    }
    
};

var gameTimer = frameCount;
var k_time = 0;
var k_seconds = 60;
var k_minutes = 0;
var freezeTime = 0;
var timerUpdate = function(){
    if(freezeTime === 0){
    if(gameTimer<frameCount){
        gameTimer = frameCount;
        k_time--;
        if(k_time <= 0){
            k_time = 60;
            k_seconds--;
        }
        if(k_seconds <= 0){
            k_seconds = 60;
            k_gametimeout--;
        }
    }
    if(k_gametimeout < 0){
        if(teams[0].goal !== teams[1].goal){
            game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 1;
              game_vars.penaltyscreen = 0;
              game_vars.aboutscreen=0;
              game_vars.goalScreen = 0;
        }
        else{
            game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 1;
              game_vars.penaltyscreen = 0;
              game_vars.aboutscreen=0;
              game_vars.goalScreen = 0;
        }
    }
    k_minutes = k_gametimeout;
    }
};

var goalTime;
var checkForGoal = function(){
    if(ball.position.y < -100 || ball.position.y > 500){
    
        if(ball.position.y < -100){
          if(ball.position.x > goal_1_center.x -25 && ball.position.x < goal_1_center.x +25){
              teams[1].goal++;
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.penaltyscreen = 0;
              game_vars.aboutscreen=0;
              game_vars.goalScreen = 1;
          goalTime = frameCount;
          }
        }
        if(ball.position.y > 500){
          
          if(ball.position.x > goal_0_center.x -25 && ball.position.x < goal_0_center.x +25){
              teams[0].goal++;
              game_vars.gamescreen1=0;
              game_vars.gamescreen2=0;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.penaltyscreen = 0;
              game_vars.aboutscreen=0;
              game_vars.goalScreen = 1;
          goalTime = frameCount;
          }
    
      }
      
      ball.position.y = 200;
        ball.position.x = 200;
        ball.velocity.set(0);
        teams[1].changeState(prepareToKickoff_state);
        teams[0].changeState(prepareToKickoff_state);
        timerUpdate();
          
    }
};

var explosionObj = function(a) {
    this.position = new PVector(0, 0);
    this.direction = new PVector(0, 0);
    this.size = random(1, 3);
    if (a === 0) {
        this.c1 = random(0, 250);
    }
    else {
        this.c1 = random(100, 255);
    }
    if (a === 1) {
        this.c2 = random(0, 250);
    }
    else {
        this.c2 = random(100, 255);
    }
    if (a === 3) {
        this.c3 = random(0, 250);
    }
    else {
        this.c3 = random(100, 255);
    }
    this.timer = 0;
};    

///// EXPERIMENT number of particles ////
var fireworkObj = function(a) {
    this.position = new PVector(200, 380);
    this.direction = new PVector(0, 0);
    this.target = new PVector(mouseX, mouseY);
    this.step = 0;
    this.explosions = [];
    for (var i = 0; i < 200; i++) {
        this.explosions.push(new explosionObj(a));   
    }    
};    

var firework = [new fireworkObj(0), new fireworkObj(1), new fireworkObj(2), new fireworkObj(0)];

//// EXPERIMENT direction of explosion /////
fireworkObj.prototype.draw = function() {
    fill(255, 255, 255);
    noStroke();
    ellipse(this.position.x, this.position.y, 2, 2);
    
    this.position.add(this.direction);
    if (dist(this.position.x, this.position.y, this.target.x, this.target.y) < 4) {
        this.step = 2;
        for (var i = 0; i < this.explosions.length; i++) {
            this.explosions[i].position.set(this.target.x, this.target.y);
            
            this.explosions[i].direction.set(random(0, 360), random(-0.3, 0.3));
/*	    this.explosions[i].direction.set(random(-0.3, 0.3), 
		random(-0.3, 0.3)); // cartesian (instead of polar) direction */
            this.explosions[i].timer = 180;
        }
    }    
};

//// EXPERIMENT direction of explosion /////
explosionObj.prototype.draw = function() {
    fill(this.c1, this.c2, this.c3, this.timer);	// 4th value fader
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
    
    this.position.x += this.direction.y*cos(this.direction.x);
    this.position.y += this.direction.y*sin(this.direction.x);
/*  this.position.add(this.direction); // random cartesian direction */
    this.position.y += (90/(this.timer + 100));    //gravity
    this.timer--;
};



draw = function() {
    
     if(game_vars.startscreen === 1 ){
        pushMatrix();
        //translate(300,300);
        background(40, 176, 19);
        
        /* Soccer */
        if(initialized === 0){
            initializeSoccerCharacters();
        }
        
        /* Soccer End */
        
        for (i=0; i<=400; i+=8) {
            for (j=0; j<=400; j+=8) {
                fill(164, 181, 9);
                rect(i,j,4,4);
            }
        }
        startScreenAnimation();
        image(board_image[0],250,250,140,140);
        arrow_array[0].draw();
        arrow_array[1].draw();
        coin_array[0].draw();
        light.draw();
        fill(4, 0, 255);
        textSize(30);
        fill(19, 99, 51);
        
        var f = createFont("Bauhaus 93");
        textFont(f, 40);
        fill(161, 39, 8);
        text("Fun2Shh",130,40,450,200);
        fill(54, 42, 19);
         textFont(f, 30);
        text("Reversi " ,150,100,300,200);
        text("Soccer " ,150,140,300,200);
        text("Help " ,170,180,300,200);
        text("About " ,160,220,300,200);
        popMatrix();
    }
     
     if(game_vars.helpscreen === 1){
        background(40, 176, 19);
    
        noStroke();
        var n1 = k_a;  
        for (var x=0; x<=400; x+=8) {
        var n2 = 0;
        for (var y=0; y<=400; y+=8) {
            var c = map(noise(n1,n2),0,1,0,255);
            fill(0, c, 0,150);
            rect(x,y,8,8);
            n2 += 0.01; // step size in noise
        }
        n1 += 0.01; // step size in noise
        }
    k_a -= 0.01;  // speed of clouds
        
        arrow_array[0].draw();
        arrow_array[1].draw();
        
        var f = createFont("Bauhaus 93");
        textFont(f, 25);
        fill(54, 42, 19);
        text("HELP",30,20,300,200);
        text("Reversi " ,160,180,300,200);
        text("Soccer " ,160,220,300,200);
        var f = createFont("Calibri");
        textFont(f, 15);
        text("Press 'q' key to go back", 5, 380, 400, 300);
     }
     
     if(game_vars.helpscreen_soccer === 1){
        background(12, 125, 14);
        noStroke();
        ball_help.size = 100;
        ball_help.draw(370, 100);
        ball_help.angle = ball_help.angle + 1 * oneDegree;
        
        fill(66, 25, 25);
        var f = createFont("Bauhaus 93");
        textFont(f, 25);
        text("HELP",30,20,300,200);
        
        var f = createFont("Calibri");
        textFont(f, 15);
        fill(247, 247, 247);
        text("You would be playing soccer with the computer.\n\nUse the a,w,s,d keys to navigate the active player from your team \n\nActive player will be automatically selected based on the ball's current location\n\n",30,50,220,400);
        text("Click the mouse on canvas to pass the ball to the specific location\n\n The game would be for 5 minutes and the team with highest score wins the game\n\n If the match ties, then the match ties\n",30,230,320,400);
        
        fill(89, 6, 6);
        var f = createFont("Calibri");
        textFont(f, 15);
        text("Press 'q' key to go back", 5, 380, 400, 300);
        
        
     }
     
      if(game_vars.helpscreen_reversi === 1){
        background(12, 125, 14);
        pushMatrix();
        if(frameCount - count > 90){
            count = frameCount;
            ic++;
        }
        if(ic===3){ic=0;}
        image(board_image[ic],270,30,120,120);
        translate(0,-200);
        translate(0,-50);
        stroke(0, 0, 0);
        popMatrix();


        fill(74, 19, 2);
        var f = createFont("Bauhaus 93");
        textFont(f, 25);
        
        text("HELP",30,20,300,200);
        var f = createFont("Calibri");
        textFont(f, 15);
        fill(247, 247, 247);
        text("Reversi is a two player board game. Each player controls either the black or the white tile.  The black gets to move first. At any point in the game any square on the 8x8 board can only be occupied by either a tile of one color.",30,50,220,400);
        text("Each turn consists of one player placing one tile of his color in any one of the spaces which allows him to capture his opponent’s tiles. The tiles can be captured vertically, horizontally and diagonally. The above figures show all the legal positions available and how the captured pieces are flipped. The game is played until no position on the board is a legal position for either of the player. If one player at any point in the game does not have a legal move, he must pass. The winner is the player who has the most number of tiles at the end of the game.",30,190,320,400);
        //text("It is a ",30,70,300,200);
        
         fill(89, 6, 6);
        var f = createFont("Calibri");
        textFont(f, 15);
        text("Press 'q' key to go back", 5, 385, 400, 300);
        
    }
    if(game_vars.aboutscreen === 1){
       
        background(40, 176, 19);
    
        noStroke();
        var n1 = k_a;  
        for (var x=0; x<=400; x+=8) {
        var n2 = 0;
        for (var y=0; y<=400; y+=8) {
            var c = map(noise(n1,n2),0,1,0,255);
            fill(0, c, 0,150);
            rect(x,y,8,8);
            n2 += 0.01; // step size in noise
        }
        n1 += 0.01; // step size in noise
        }
    k_a -= 0.01;  // speed of clouds
        
        fill(59, 5, 5);
         var f = createFont("Bauhaus 93");
        textFont(f, 25);
        text("Authors : ",40,100,400,400);
        textFont(f, 20);
        text("Aravind V",40,200,400,400);
        text("Keerthi G",40,170,400,400);
        
        fill(89, 6, 6);
        var f = createFont("Calibri");
        textFont(f, 15);
        text("Press 'q' key to go back", 5, 380, 400, 300);
        
    }
    
    if(game_vars.gamescreen2_options === 1){
    
    teams[0].goal = 0;
    teams[1].goal = 0;
        for(var i = 0; i< players.length; i++){
            allPlayerStates[i] = 0;
        }
        drawBackground();
        var f = createFont("Bauhaus 93");
        fill(54, 42, 19);
        textFont(f, 22);
        arrow_array[0].draw();
        arrow_array[1].draw();
         fill(54, 42, 19);
        text("Quickplay" ,140,100,300,200);
        text("Long play" ,150,140,300,200);
    }
    
    if(game_vars.penaltyscreen===1 ){
        pushMatrix();
        scale(2);
        translate(-100, 150);
        drawBackground();
        popMatrix();
        fill(255, 204, 0);
        var f = createFont("Bauhaus 93");
        fill(54, 42, 19);
        textFont(f, 30);
        text("Penalty Shootout",80, 30);
        
        fill(255, 0,0,150);
        ellipse(350, 390, 100, 50);
        fill(255, 255,0,150);
        ellipse(400, 390, 100, 50);
        fill(255, 255, 255);
        var f = createFont("Calibri");
        textFont(f, 15);
        text("RED           YEL", 310, 395); 
        text(teams[1].goal, 342,395);  // red
        text(teams[0].goal, 355,395);// yellow
        freezeTime = 1;
        
       // carryoutshootout();
    
    }
    if(game_vars.gamescreen2===1 ){
        
        pushMatrix();
        var tr = ball.position.y;
        if(ball.position.y < 100){
            if(ball.position.y < -100) { tr = -100;}
             translate(0,100-tr);   
        }
        else if(ball.position.y > 300 ){
            if(ball.position.y > 450) { tr = 450;}
            translate(0,300-tr);
        }
        drawBackground();
        if(initialized === 0){
            initializeSoccerCharacters();
        }
        
        fill(35, 69, 15);
        var f = createFont("Calibri");
        textFont(f, 15);
        
       
         for(var i=0; i<players.length; i++){
            // for(var i=6; i<12; i++){
            players[i].draw();
             var currstate = players[i].currentState;
             players[i].state[currstate].execute(players[i]);
            //  if(currstate !== 0){
                updateLocation(players[i]);
            //  }
        }
        
        for(var i=0; i<teams.length; i++){
            teams[i].state[teams[i].currentState].execute(teams[i]);
        }
        
        for(var i=0; i< goalies.length; i++){
         goalies[i].draw();   
         goalies[i].move();
        }
        
        // for(var i=0; i<team0_attackingArea.length; i++){
        //     rect(team0_attackingArea[i].x, team0_attackingArea[i].y,5,5);
        // }
        // for(var i=0; i<team1_attackingArea.length; i++){
        //     rect(team1_attackingArea[i].x, team1_attackingArea[i].y,5,5);
        // }
        ball.move();
        ball.draw();
        controlPlayer_move(players[teams[1].controlPlayer]);
        
        popMatrix();
        if(k_timeout < frameCount-20){
            k_pass = 0;   
        }
        checkForGoal();
        //   println(allPlayerStates);
    //    println(ball.inTransit);
      //  println(teams[0].currentState);
      
    
    noStroke();
        fill(255, 0,0,150);
        ellipse(350, 390, 100, 50);
        fill(255, 255,0,150);
        ellipse(400, 390, 100, 50);
        fill(255, 255, 255);
        var f = createFont("Calibri");
        textFont(f, 15);
        text("RED           YEL", 310, 395); 
        text(teams[1].goal, 342,395);  // red
        text(teams[0].goal, 355,395);// yellow
        text(k_minutes + ":" + k_seconds, 340, 380); 
        timerUpdate();
        
        
    }
    if(game_vars.goalScreen ===1 ){
        background(random(255),random(255),random(255) );
        var f = createFont("Bauhaus 93");
        textFont(f, 25);
        text("GOAL !!!  ", 150, 200, 200,100);
        if(goalTime < frameCount-60){
             game_vars.gamescreen1=0;
              game_vars.gamescreen2=1;
              game_vars.startscreen=0;
              game_vars.winscreen=0;
              game_vars.helpscreen=0;
              game_vars.helpscreen_soccer = 0;
              game_vars.helpscreen_reversi = 0;
              game_vars.aboutscreen=0;
              game_vars.gamescreen2_options = 0;
              game_vars.gamescreen2_end = 0;
              game_vars.penaltyscreen = 0;
              game_vars.aboutscreen=0;
              game_vars.goalScreen = 0;
            kickofTime = frameCount;
        }
        
        ball.position.y = 200;
        ball.position.x = 200;
        ball.velocity.set(0);
        teams[1].changeState(prepareToKickoff_state);
        teams[0].changeState(prepareToKickoff_state);
        timerUpdate();
    }
    
    if(game_vars.gamescreen2_end === 1 ){
        
        
        background(random(0,50),random(0,50), random(0,50), 255);
        fill(12, 42, 163, 50);
        ellipse(200, 200, 400, 200);
        fill(130, 214, 19);
        var f = createFont("Bauhaus 93");
        textFont(f, 30);
        text("Game Over", 130, 180);
        if(teams[0].goal > teams[1].goal){
            text("Yellow wins", 130, 230);
        }
        else if(teams[0].goal < teams[1].goal){
            text("Red wins", 130, 230);
        }
        else{
            text("Match Tied", 130, 230);
        }
        for (var j = 0; j < firework.length; j++) {
        if (firework[j].step === 0) {
            firework[j].position.set(200, 450);
            firework[j].target.set(random(100, 300), random(50, 120));
            firework[j].direction.set(firework[j].target.x - firework[j].position.x, firework[j].target.y - firework[j].position.y);
            var s = random(1, 2) / 100;
            firework[j].direction.mult(s);
            firework[j].step++;
        } 
        else if (firework[j].step === 1) {
            firework[j].draw();
        } 
        else if (firework[j].step === 2) {
            for (var i = 0; i < firework[j].explosions.length; i++) {
                firework[j].explosions[i].draw();   
            } 
            if (firework[j].explosions[0].timer <= 0) {
                firework[j].step = 0;   
            }
        }
    }
        
        
    }
    
     if(game_vars.gamescreen1 === 1){
	if(frameCount%2===0){
        pushMatrix();
        background(76, 219, 224);
        translate(-90,-130);
        scale(1,1);
        //board.draw();
        popMatrix();
        drawboard();
	}
        var f = createFont("Bauhaus 93");
        textFont(f, 15);
	fill(255,255,0);
	if(a_h_player === 1){
		textSize(19);
		text("Human is Black ",20,360,400,400);

	}
	if(a_h_player === 0){
		textSize(19);
		text("Human is White ",20,360,400,400);

	}
        if(a_player === 1){
            textSize(30);
            fill(0, 0, 0);
            text("Black's Turn.",20,335,300,300);
            textSize(19);
            //text("Press mouse anywhere to see computer play.",10,360,440,300);
        }       
        else if(a_player === 0){
            fill(255,255,255);
            textSize(30);
            text("White's Turn",20,335,300,300);
            textSize(19);
            //text("Press mouse on a tile to play.",10,360,440,300); 
        }
        a_score_1=0;
        a_score_0=0;
	    for(var x=0;x<8;x++){
		for(var y=0;y<8;y++){
			if(board_map[x][y] === 1){
				a_score_1+=1;
			}
			if(board_map[x][y] === 0){
				a_score_0+=1;
			}
		}
	    }
	textSize(25);
	text("W: " + a_score_0 + " B: " + a_score_1,30,50,300,300);
	fill(155,55,0);
	textSize(15);
	text("Press \"Z\" and \"X\" to Zoom in and use UP and DOWN buttons to change elevation.",10,10,390,300);
	text("Use mouse to rotate camera.",210,30,380,40);
	fill(255,255,0);
	textSize(20);
	text("Press mouse to see computer play",100,380,300,300);
        
        fill(35, 69, 15);
        var f = createFont("Calibri");
        textFont(f, 15);
        text("Press 'q' to exit", 5, 395);
        
    }
    if(game_vars.endscreen1 === 1){
	pushMatrix();
        background(255, 0, 0);
        background(255, 0, 0);
        image(a_final_board,0,0,400,400);
        textSize(35);
       if(a_get_score === 0){ 
	//println("Getting score");
	a_get_score = 1;
        a_score_1=0;
        a_score_0=0;
	    for(var x=0;x<8;x++){
		for(var y=0;y<8;y++){
			if(board_map[x][y] === 1){
				a_score_1+=1;
			}
			if(board_map[x][y] === 0){
				a_score_0+=1;
			}
		}
	    }
	    }
	    fill(0,0,0,75);
	    rect(0,0,400,400);
	    fill(0, 251, 255);
	    text("Game Over !",30,100,300,300);
	    if(a_score_0 > a_score_1){
		    fill(255,255,255);
		    text("White Won ",30,200,300,300);
	    }
	    else if(a_score_1 > a_score_0){
		    fill(255,255,255);
		    text("Black Won ",30,200,300,300);
	    }
	    text("W: " + a_score_0 + " B: " + a_score_1,30,230,300,300);
	    
	    //else if(score_1 === score_0){
		//    text("W: " + score_0 + " B: " + score_1,30,230,300,300);
		 //   text("Draw",30,200,300,300);
	   // }
        
    
    popMatrix();
        fill(35, 69, 15);
        var f = createFont("Calibri");
        textFont(f, 15);
        text("Press 'q' to exit", 15, 395);
        
        

    }

    if(game_vars.optionscreen1 === 1){
	    strokeWeight(10);
	    stroke(0,0,0);
        background(255, 0, 0);
	fill(0,255,255);
	if(a_h_player === 0){
	fill(255,255,0);
	}
	rect(0,0,100,400);
	fill(0,255,255);
	if(a_h_player === 1){
	fill(255,255,0);
	}
	rect(100,0,100,400);
	fill(0,255,255);
	if(a_difficulty === 0){
	fill(255,255,0);
	}
	rect(200,0,200,133);
	fill(0,255,255);
	if(a_difficulty === 1){
	fill(255,255,0);
	}
	rect(200,133,200,133);
	fill(0,255,255);
	if(a_difficulty === 2){
	fill(255,255,0);
	}
	rect(200,266,200,133);
	fill(255,0,0);
	textSize(20);
	text("Click to choose the tile color",10,110,300,300);
	text("Choose difficulty",220,30,300,300);
	fill(255,255,255);
	ellipse(50,200,70,70);
	fill(0,0,0);
	ellipse(150,200,70,70);
	fill(0,0,0);
	textSize(20);
	text("Easy",250,75,300,300);
	text("Medium",250,75+133,300,300);
	text("Hard",250,75 + 266,300,300);
        fill(35, 69, 15);
        var f = createFont("Calibri");
        textFont(f, 15);
        text("Press 'q' to exit", 15, 395);
        

    }

};
}};
