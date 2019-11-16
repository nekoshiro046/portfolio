var fr = 60;
let firstBox;
var canvas;
let fontSize = 40;
let font;
var ww = 5,wh = 5;
function preload(){
	font = loadFont('assets/font/FreeSans.otf');
}
function setup() {
  canvas = createCanvas(windowWidth/ww, windowWidth/ww,WEBGL);
  canvas.position("30%",0);
  canvas.style('position','fixed');
  canvas.style('margin-left','2%');
  canvas.style('z-index','0');
  canvas.parent('sketch-holder');
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  frameRate(fr);
  firstBox = new box(0,0,0,(windowWidth)/ww/5);
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);	
  rectMode(CENTER);
}
function draw() {drawScene();}
function windowResized() {resizeCanvas(windowWidth/ww, windowWidth/ww);}
function mousePressed() {
	if(firstBox.inTerritory(mouseX,mouseY) && inCanvas()){
		window.close();
	}
}
function drawScene(){
  background(255);
  if(firstBox.inTerritory(mouseX,mouseY)){
  	var rn = int(random(20));
  	if(rn == 0){
  		firstBox.moveInnerBox();
  	}else if(rn == 1){
  		firstBox.shapeInnerBox();
  	}
    stroke(firstBox.baseColor);
    firstBox.drawInnerBox();
	drawText(firstBox.core.x,firstBox.core.y,'back',firstBox.inch,0);
   }else{
    stroke(0,50);
    drawText(firstBox.core.x,firstBox.core.y,'back',firstBox.inch,150);
   }
   firstBox.drawBox();   
}
function drawText(x,y,str,strSiz,col){
	push();  
	translate(x,y);
	fill(col);
	textSize(strSiz);
	text(str, 0,0);
	pop();
}
function inCanvas(){
	var back;
	if(mouseX < 0 || mouseX > windowWidth || mouseY < 0 || mouseY > windowHeight){
		back = false;
	}else{
		back = true;
	}
	return back;
}
function objInCanvas(x,y){
	var back;
	if(x <  -windowWidth/2|| x > windowWidth/2|| y < -windowHeight/2 || y > windowHeight/2){
		back = false;
	}else{
		back = true;
	}
	return back;
}
class box{
	constructor(x,y,z,inc,ln){
		this.core =	createVector(x,y,z);
		this.inch = inc;
		this.territory = this.inch;
		this.bVertex  = [];
	    this.velocity = createVector(random(-5,5), random(-5,5));
	    this.acceleration = createVector(random(-0.05,0.05), random(-0.05,0.05));
		this.head4Speed = random(0.1,0.8);
	    this.linkID = ln;
	    this.angleX = random(360);this.angleY = random(360);this.angleZ = random(360);
	    this.angleStep = 0.5;
	    this.baseColor = color(random(255),random(255),random(255));
	    this.shapeBox();
	    this.innerBVertex  = [];
	    this.shapeInnerBox();
	}
	shapeBox(){
	    var pointx1 = this.core.x - this.inch;
	    var pointx2 = this.core.x + this.inch;
	    var pointy1 = this.core.y - this.inch;
	    var pointy2 = this.core.y + this.inch;
	    var pointz1 = this.core.z - this.inch;
	    var pointz2 = this.core.z + this.inch;
	    for(let i = 0; i <= 7; i++){
	      switch(i){
	        case 0:
	           this.bVertex[i]  = createVector(pointx1,pointy1,pointz1);
	           break;
	        case 1:
	           this.bVertex[i]  = createVector(pointx1,pointy1,pointz2);
	           break;   
	        case 2:
	           this.bVertex[i]  = createVector(pointx1,pointy2,pointz2);
	           break;
	        case 3:
	           this.bVertex[i]  = createVector(pointx1,pointy2,pointz1);
	           break; 
	        case 4:
	           this.bVertex[i]  = createVector(pointx2,pointy2,pointz1);
	           break;
	        case 5:
	           this.bVertex[i]  = createVector(pointx2,pointy2,pointz2);
	           break; 
	        case 6:
	           this.bVertex[i]  = createVector(pointx2,pointy1,pointz2);
	           break; 
	        case 7:
	           this.bVertex[i]  = createVector(pointx2,pointy1,pointz1);
	           break;   
	      }
	    }
  	}
  	shapeInnerBox(){
	    var pointx1 = this.core.x - this.inch/2;
	    var pointx2 = this.core.x + this.inch/2;
	    var pointy1 = this.core.y - this.inch/2;
	    var pointy2 = this.core.y + this.inch/2;
	    var pointz1 = this.core.z - this.inch/2;
	    var pointz2 = this.core.z + this.inch/2;
	    for(let i = 0; i <= 7; i++){
	      switch(i){
	        case 0:
	           this.innerBVertex[i]  = createVector(pointx1,pointy1,pointz1);
	           break;
	        case 1:
	           this.innerBVertex[i]  = createVector(pointx1,pointy1,pointz2);
	           break;   
	        case 2:
	           this.innerBVertex[i]  = createVector(pointx1,pointy2,pointz2);
	           break;
	        case 3:
	           this.innerBVertex[i]  = createVector(pointx1,pointy2,pointz1);
	           break; 
	        case 4:
	           this.innerBVertex[i]  = createVector(pointx2,pointy2,pointz1);
	           break;
	        case 5:
	           this.innerBVertex[i]  = createVector(pointx2,pointy2,pointz2);
	           break; 
	        case 6:
	           this.innerBVertex[i]  = createVector(pointx2,pointy1,pointz2);
	           break; 
	        case 7:
	           this.innerBVertex[i]  = createVector(pointx2,pointy1,pointz1);
	           break;   
	      }
	    }
  	}
	drawBox(){
		push();
		translate(this.core.x,this.core.y);
	    rotateX(radians(this.angleX));this.angleX+= this.angleStep;if(this.angleX > 360)this.angleX=0;
	    rotateY(radians(this.angleY));this.angleY+= this.angleStep;if(this.angleY > 360)this.angleY=0;
	    rotateZ(radians(this.angleZ));this.angleZ+= this.angleStep;if(this.angleZ > 360)this.angleZ=0;
	    noFill();
	    beginShape(); 
	    for(let i = 0; i< 7; i++){
	      vertex(this.bVertex[i].x,this.bVertex[i].y,this.bVertex[i].z);
	      vertex(this.bVertex[i+1].x,this.bVertex[i+1].y,this.bVertex[i+1].z);
	    }
	    endShape(CLOSE); 
	    beginShape(LINES);
	    for(let i = 0; i<6 ; i++){
	      if(i == 1){
	        vertex(this.bVertex[1].x,this.bVertex[1].y,this.bVertex[1].z);
	        vertex(this.bVertex[6].x,this.bVertex[6].y,this.bVertex[6].z);
	        endShape(); 
	      }
	      if(i % 2 == 0 || i == 0){
	        vertex(this.bVertex[i].x,this.bVertex[i].y,this.bVertex[i].z);
	        vertex(this.bVertex[i+3].x,this.bVertex[i+3].y,this.bVertex[i+3].z);
	        endShape(); 
	      }
	    }  
	    pop();
	}
	drawInnerBox(){
		push();
		translate(this.core.x,this.core.y);
	    rotateX(radians(this.angleX));
	    rotateY(radians(this.angleY));
	    rotateZ(radians(this.angleZ));
	    noFill();
	    beginShape(); 
	    for(let i = 0; i< 7; i++){
	      vertex(this.innerBVertex[i].x,this.innerBVertex[i].y,this.innerBVertex[i].z);
	      vertex(this.innerBVertex[i+1].x,this.innerBVertex[i+1].y,this.innerBVertex[i+1].z);
	    }
	    endShape(CLOSE); 
	    beginShape(LINES);
	    for(let i = 0; i<6 ; i++){
	      if(i == 1){
	        vertex(this.innerBVertex[1].x,this.innerBVertex[1].y,this.innerBVertex[1].z);
	        vertex(this.innerBVertex[6].x,this.innerBVertex[6].y,this.innerBVertex[6].z);
	        endShape(); 
	      }
	      if(i % 2 == 0 || i == 0){
	        vertex(this.innerBVertex[i].x,this.innerBVertex[i].y,this.innerBVertex[i].z);
	        vertex(this.innerBVertex[i+3].x,this.innerBVertex[i+3].y,this.innerBVertex[i+3].z);
	        endShape(); 
	      }
	    }  
	    pop();
	}
	moveInnerBox(){
		var pointx1,pointx2,pointy1,pointy2,pointz1,pointz2;
		var rnX = random(2),rnY = random(2),rnZ = random(2);
		if(rnX < 1){
			pointx1 = this.core.x - this.inch/2 + this.inch/2;
			pointx2 = this.core.x + this.inch/2 + this.inch/2;
		}else{
			pointx1 = this.core.x - this.inch/2 - this.inch/2;
			pointx2 = this.core.x + this.inch/2 - this.inch/2;
		}

		if(rnY < 1){
			pointy1 = this.core.y - this.inch/2 + this.inch/2;
			pointy2 = this.core.y + this.inch/2 + this.inch/2;

		}else{
			pointy1 = this.core.y - this.inch/2 - this.inch/2;
			pointy2 = this.core.y + this.inch/2 - this.inch/2;
		}

		if(rnZ < 1){
			pointz1 = this.core.z - this.inch/2 + this.inch/2;
			pointz2 = this.core.z + this.inch/2 + this.inch/2;
		}else{
			pointz1 = this.core.z - this.inch/2 - this.inch/2;
			pointz2 = this.core.z + this.inch/2 - this.inch/2;
		}
		for(let i = 0; i <= 7; i++){
	      switch(i){
	        case 0:
	           this.innerBVertex[i]  = createVector(pointx1,pointy1,pointz1);
	           break;
	        case 1:
	           this.innerBVertex[i]  = createVector(pointx1,pointy1,pointz2);
	           break;   
	        case 2:
	           this.innerBVertex[i]  = createVector(pointx1,pointy2,pointz2);
	           break;
	        case 3:
	           this.innerBVertex[i]  = createVector(pointx1,pointy2,pointz1);
	           break; 
	        case 4:
	           this.innerBVertex[i]  = createVector(pointx2,pointy2,pointz1);
	           break;
	        case 5:
	           this.innerBVertex[i]  = createVector(pointx2,pointy2,pointz2);
	           break; 
	        case 6:
	           this.innerBVertex[i]  = createVector(pointx2,pointy1,pointz2);
	           break; 
	        case 7:
	           this.innerBVertex[i]  = createVector(pointx2,pointy1,pointz1);
	           break;   
	      }
	    }
	}
	drawTetrahedron(){
	    push();  
	    translate(this.core.x,this.core.y);
	    rotateX(radians(this.angleX));
	    rotateY(radians(this.angleY));
	    rotateZ(radians(this.angleZ));
	    noFill();
	    beginShape(); 
	    for(var i = 0; i < 5; i+=2){
	      vertex(this.bVertex[i].x,this.bVertex[i].y,this.bVertex[i].z);
	      vertex(this.bVertex[i+2].x,this.bVertex[i+2].y,this.bVertex[i+2].z);
	    }
	    endShape(CLOSE);
	    beginShape(LINES); 
	    vertex(this.bVertex[0].x,this.bVertex[0].y,this.bVertex[0].z);
	    vertex(this.bVertex[4].x,this.bVertex[4].y,this.bVertex[4].z);
	    endShape();
	    beginShape(LINES); 
	    vertex(this.bVertex[2].x,this.bVertex[2].y,this.bVertex[2].z);
	    vertex(this.bVertex[6].x,this.bVertex[6].y,this.bVertex[6].z);
	    endShape();
	    pop();
  	}
	inTerritory(mx,my){
	    var back;
	    var f = createVector(mx-windowWidth/2/ww,my-windowWidth/2/ww);
	    var dbox = p5.Vector.sub(f, this.core);
	    var dist_box = dbox.mag();
	    if(dist_box < this.territory){
	      back = true;
	    }else{
	      back = false;
	    }
	    return back;
	}
}
// var height = window.parent.screen.height;
$(function () {
    var w = $(window).width();
    var topBtn = $('#page-top');
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    $('html,body').animate({ scrollTop: 0 }, '1');

    jQuery(window).scroll(function (){
        jQuery('.underline').each(function(){
            var elemPos = jQuery(this).offset().top;
            var scroll = jQuery(window).scrollTop();
            var windowHeight = jQuery(window).height();
            if (scroll > elemPos - windowHeight + 225){
                jQuery(this).addClass('scrollin');
            }
        });

        jQuery('.fadein').each(function(){
            var elPos = jQuery(this).offset().top;
            var scroll = jQuery(window).scrollTop();
            var windowHeight = jQuery(window).height();
            if (scroll > elPos - windowHeight + 250){
                jQuery(this).addClass('scrollin');
            }
        });
    });
});