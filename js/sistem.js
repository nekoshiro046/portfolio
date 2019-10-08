Pace.on('done', function(){$('.wrapper').fadeIn();});
var fr = 60;
let objNum = 3;let worksNum = 7;
let boxes =  [];let firstBox;let worksBox = [];
var canvas;
var scene = 1;// 1:top 2:menu 3:work 
var mouseCharge = 0;var oneFrame = 0;
var sampleSound = [];//サウンドファイル格納
let fontSize = 40;
let fontEn,fontJp;
var userMove = 0;
let linkIndex = ['a','c','w'];
let linkName = ["about","contact","works"];
let linkURL = ['about-me','contact','works'];
var worksIndex = ["back" ,"b","s", "w", "01", "m","n"];//1-4 : installation 5 : ux 0 : back
var worksName = ["menu" ,"border","syundo", "world apart", "01", "mimie","nomnom  the Game"];//1-4 : installation 5 : ux 0 : back
var worksLinkURL = ['','work/border.html', 'work/syundo.html' ,'work/world_apart.html','work/01.html','work/mimie.html','work/nomnomGame.html'];
let worksYear = ['','18.08	Installation','18.10	Installation','19.02	Installation','19.07	Installation','19.06	UX','19.06	UX'];
var allBtn = false,instaBtn = true, uxBtn = true;
var soundSource = [];//サウンドファイル格納
var firstTouch = 0;

function preload(){
	fontEn = loadFont('assets/font/FreeSans.otf');
	soundFormats('mp3', 'ogg');
	soundSource[0] = loadSound('assets/sound/se01.mp3');
	soundSource[1] = loadSound('assets/sound/se02.mp3');
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight,WEBGL);
  canvas.position(0,0);
  canvas.style('position','fixed');
  canvas.style('z-index','5');
  canvas.parent('sketch-holder');
  canvas.style('padding','0');
  canvas.style('margin','0');
  canvas.style('width','100%');
  canvas.style('height','auto');
  frameRate(fr);
  initBox();
  firstBox = new box(0,0,-20,(windowWidth + windowHeight)/20);
  textFont(fontEn);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);	
  rectMode(CENTER);
  imageMode(CENTER);
}

function pressedAllBtn(){
	if(allBtn == false){
		$(function() {
		    $(".allBtn").css({
		        "color": "#ffffff",
		        "background": "#000000"
		    });
		    $(".instaBtn").css({
		        "color": "#000000",
		        "background": "#ffffff"
		    });
		    $(".uxBtn").css({
		        "color": "#000000",
		        "background": "#ffffff"
		    });
		});

		instaBtn =  false;
		uxBtn = false;
		allBtn = true;
	}else{
		$(function() {
		    $(".allBtn").css({
		        "color": "#000000",
		        "background": "#ffffff"
		    });
		});
		allBtn = false;
	}
}
function pressedInstaBtn(){
	if(instaBtn == false){
		$(function() {
		    $(".instaBtn").css({
		        "color": "#ffffff",
		        "background": "#000000"
		    });
		    $(".allBtn").css({
		        "color": "#000000",
		        "background": "#ffffff"
		    });

		});

		instaBtn = true;
		allBtn = false;
	}else{
		$(function() {
		    $(".instaBtn").css({
		        "color": "#000000",
		        "background": "#ffffff"
		    });
		});
		instaBtn = false;
	}
}
function pressedUxBtn(){
	if(uxBtn == false){
		$(function() {
		    $(".uxBtn").css({
		        "color": "#ffffff",
		        "background": "#000000"
		    });
		    $(".allBtn").css({
		        "color": "#000000",
		        "background": "#ffffff"
		    });
		});

		uxBtn = true;
		allBtn = false;
	}else{
		$(function() {
		    $(".uxBtn").css({
		        "color": "#000000",
		        "background": "#ffffff"
		    });
		});
		uxBtn = false;
	}
}
function initBox() {
	for(var i = 0; i < objNum; i++){
	    var posX = 0;var posY = 0;var posZ = -20;
	    var inch = (windowWidth + windowHeight)/20;
	    boxes[i] = new box(posX,posY,posZ,inch,i);
  	}
}
function initWorksBox(workPos) {
	for(var i = 0; i < worksNum; i++){
	    // var posX = workPos.x;var posY = workPos.y;var posZ = workPos.z;
	    var posX = 0;var posY = 0;var posZ = 0;
	    var inch = (windowWidth + windowHeight)/40;
	    if( i == 0){
			inch = (windowWidth + windowHeight)/20;
		}
	    worksBox[i] = new box(posX,posY,posZ,inch,i);
  	}
}
function draw() {
	selectScene();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function touchStarted() {
  if(firstTouch == 0 && inCanvas()){
    soundSource[0].play();
    firstTouch = 1;
  }
  if(scene == 2){
		for(var i = 0; i < objNum; i++){
			if(boxes[i].inTerritory(mouseX,mouseY) && mouseCharge == 0  && inCanvas()){
				soundSource[0].play();
				if(i == 2){
					canvas.style('position','fixed');
					initWorksBox(boxes[i].core);
					scene = 3;
				}else{
					canvas.style('position','absolute');
				}
				var target = linkURL[i];
				var position;
				position = $(target).offset().left;
				$("html, body").animate({scrollLeft:position}, 400, "swing");
				position = $(target).offset().top;
				$("html, body").animate({scrollTop:position}, 400, "swing");
				return false;
		    }
		}
	}
	else if(scene == 3){
		for(var i = 0; i < worksNum; i++){
			if(worksBox[i].inTerritory(mouseX,mouseY) && mouseCharge == 0 && inCanvas()){
				if(i == 0){
					$("html, body").animate({scrollTop: 0}, 500);
					$("html, body").animate({scrollLeft: 0}, 500);
					initBox();
					scene = 2;
					soundSource[0].play();
				}
				else{
					if((i > 0 && i <= 4 && instaBtn == true) || (i > 4 && uxBtn == true) || (allBtn == true) ){
						soundSource[1].play();
						mouseCharge = 0;oneFrame = 0;
						mouseIsPressed = false;
						window.open(worksLinkURL[i], '_blank');
					}
				}
		    }
		}
	}
}

function mousePressed() {
	if(scene == 2){
		for(var i = 0; i < objNum; i++){
			if(boxes[i].inTerritory(mouseX,mouseY) && mouseCharge == 0  && inCanvas()){
				soundSource[0].play();
				if(i == 2){
					canvas.style('position','fixed');
					initWorksBox(boxes[i].core);
					scene = 3;
				}else{
					canvas.style('position','absolute');
				}
				var target = linkURL[i];
				var position;
				position = $(target).offset().left;
				$("html, body").animate({scrollLeft:position}, 400, "swing");
				position = $(target).offset().top;
				$("html, body").animate({scrollTop:position}, 400, "swing");
				return false;
		    }
		}
	}
	else if(scene == 3){
		for(var i = 0; i < worksNum; i++){
			if(worksBox[i].inTerritory(mouseX,mouseY) && mouseCharge == 0 && inCanvas()){
				if(i == 0){
					$("html, body").animate({scrollTop: 0}, 500);
					$("html, body").animate({scrollLeft: 0}, 500);
					initBox();
					scene = 2;
					soundSource[0].play();
				}
				else{
					if((i > 0 && i <= 4 && instaBtn == true) || (i > 4 && uxBtn == true)  ){

						soundSource[1].play();

						mouseCharge = 0;oneFrame = 0;
						mouseIsPressed = false;
						window.open(worksLinkURL[i], '_blank');
					}
				}
		    }
		}
	}
}


function selectScene(){
	if(scene == 1){
		canvas.style('z-index','5');
	    if(mouseIsPressed && inCanvas() && firstBox.inTerritory(mouseX,mouseY)){
	    	drawScene1('Yuki\’s portfolio');
	      	scene = 2;
	    }
	    else if(inCanvas() && mouseY < (windowHeight/5) && mouseY > (windowHeight/6) && mouseX > (windowWidth/3) && mouseX < (windowWidth/3*2)){
	    	drawScene1('click box or keep clciking');
	    }
	    else{
	      drawScene1('Yuki\’s portfolio');
	    }
	}
	else if(scene == 2){
		canvas.style('z-index','-1');
	    if(mouseIsPressed && inCanvas()){
			oneFrame++;
		    for(var i = 0; i < objNum; i++){
				if(oneFrame > 60){
					boxes[i].Head4Core(true,boxes[i].head4Speed);
	        	}
	        	else{
	        		for(var j = 0; j < objNum; j++){
			      		if(i != j && boxes[i].inNeighborSpace(boxes[j].core)){
			      			boxes[i].setVelocity(boxes[j].core);
			      		}
			      	}
			      	if(!objInCanvas(boxes[i].core.x + boxes[i].inch *1.5,boxes[i].core.y + boxes[i].inch *1.5) ||
	      	 !objInCanvas(boxes[i].core.x - boxes[i].inch *1.5,boxes[i].core.y - boxes[i].inch *1.5)){
			      		boxes[i].Head4Core(false,0.05);
			      	}
					boxes[i].updata();
	        	}
		    }
			if(oneFrame > fr*0.8)mouseCharge++;
		    if(mouseCharge > fr*2){
		      scene = 1;
		      drawScene1();
		      $("html, body").animate({scrollTop: 0}, 500);
		      $("html, body").animate({scrollLeft: 0}, 500);
		      initBox();
		    }
		    else if(mouseCharge != 0 && oneFrame > fr){
		      drawScene2();
		      var sx = map(mouseCharge,0,fr*2,0,windowWidth/2);
		      var sy = map(mouseCharge,0,fr*2,0,windowHeight/2);
		      noFill();
		      stroke(0);
		      rect(0,0,windowWidth-sx*2,windowHeight-sy*2);
		    }
		    else{
		      drawScene2();
		    }
	    }
	    else{
	      for(var i = 0; i < objNum; i++){
	      	for(var j = 0; j < objNum; j++){
	      		if(i != j && boxes[i].inNeighborSpace(boxes[j].core)){
	      			boxes[i].setVelocity(boxes[j].core);
	      		}
	      	}
	      	if(!objInCanvas(boxes[i].core.x + boxes[i].inch *1.5,boxes[i].core.y + boxes[i].inch *1.5) ||
	      	 !objInCanvas(boxes[i].core.x - boxes[i].inch *1.5,boxes[i].core.y - boxes[i].inch *1.5)){
	      		boxes[i].Head4Core(false,0.05);
			}
	        boxes[i].updata();
	      }
	      drawScene2();
	      mouseCharge = 0;oneFrame = 0;
	    }
	}
	else if(scene == 3){
		canvas.style('z-index','-1');
	    if(mouseIsPressed && inCanvas()){
			oneFrame++;
		    for(var i = 0; i < worksNum; i++){
				if(oneFrame > 60){
					worksBox[i].Head4Core(true,worksBox[i].head4Speed);
	        	}
	        	else{
	        		for(var j = 0; j < worksNum; j++){
			      		if(i != j && worksBox[i].inNeighborSpace(worksBox[j].core)){
			      			worksBox[i].setVelocity(worksBox[j].core);
			      		}
			      	}
			      	if(!objInCanvas(worksBox[i].core.x + worksBox[i].inch *1.5,worksBox[i].core.y + worksBox[i].inch *1.5) ||
	      	 !objInCanvas(worksBox[i].core.x - worksBox[i].inch *1.5,worksBox[i].core.y - worksBox[i].inch *1.5)){
			      		worksBox[i].Head4Core(false,0.05);
			      	}
					worksBox[i].updata();
	        	}
		    }
			if(oneFrame > fr*0.8)mouseCharge++;
		    if(mouseCharge > fr*2){
		      scene = 2;
		      mouseCharge = 0;oneFrame = 0;
		      drawScene2();
		      $("html, body").animate({scrollTop: 0}, 500);
		      $("html, body").animate({scrollLeft: 0}, 500);
		      initBox();
		    }
		    else if(mouseCharge != 0 && oneFrame > fr){
		      drawScene3();
		      var sx = map(mouseCharge,0,fr*2,0,windowWidth/2);
		      var sy = map(mouseCharge,0,fr*2,0,windowHeight/2);
		      noFill();
		      stroke(0);
		      rect(0,0,windowWidth-sx*2,windowHeight-sy*2);
		    }
		    else{
		      drawScene3();
		    }
	    }
	    else{
	      for(var i = 0; i < worksNum; i++){
	      	for(var j = 0; j < worksNum; j++){
	      		if(i != j && worksBox[i].inNeighborSpace(worksBox[j].core)){
	      			worksBox[i].setVelocity(worksBox[j].core);
	      		}
	      	}
	      	if(!objInCanvas(worksBox[i].core.x + worksBox[i].inch *1.5,worksBox[i].core.y + worksBox[i].inch *1.5) ||
	      	 !objInCanvas(worksBox[i].core.x - worksBox[i].inch *1.5,worksBox[i].core.y - worksBox[i].inch *1.5)){
	      		worksBox[i].Head4Core(false,0.05);
			}
	        worksBox[i].updata();
	      }
	      drawScene3();
	      mouseCharge = 0;oneFrame = 0;
	    }
	}
}

function drawScene1(str){
	background(0);
  	var a = int(random(1,7));
  if(a == 1 || a == 4){
    if(firstBox.inTerritory(mouseX,mouseY)){
      stroke(255,0,0);
      firstBox.drawTetrahedron();
    }
    stroke(255);
    firstBox.drawBox();
    drawText(firstBox.core.x,firstBox.core.y - windowHeight/3,str,windowHeight/20,255);
  }
  else if(a == 2 || a == 5){
  	drawText(firstBox.core.x,firstBox.core.y - windowHeight/3,str,windowHeight/20,255);
  	push();
    translate(-0.5,1,-1.5);
    stroke(255,0,0);
    firstBox.drawBox();
    pop();
    push();
    translate(1.0,-2.5,0);
    stroke(0,255,0);
    firstBox.drawBox();
    pop();
    push();
    translate(-1.8,2.5,1.9);
    stroke(0,0,255);
    firstBox.drawBox();
    pop();
  }
  else if(a == 3){
  	drawText(firstBox.core.x,firstBox.core.y - windowHeight/3,str,windowHeight/20,255);
    stroke(255);
    var r = random(1,4);
    for(var i = 0; i < r; i++){
      var randiv = random(4,20);
      beginShape(LINES);
      vertex(random(-windowWidth/randiv,windowWidth/randiv),random(-windowHeight/randiv,windowHeight/randiv),random(-10,10));
      vertex(random(-windowWidth/randiv,windowWidth/randiv),random(-windowHeight/randiv,windowHeight/randiv),random(-10,10));
      endShape();
    }
   }
}

function drawScene2(){
  background(255);
  for(var j = 0; j < objNum; j++){
    if(boxes[j].inTerritory(mouseX,mouseY)){
      stroke(boxes[j].baseColor);
      boxes[j].drawTetrahedron();
	  drawText(boxes[j].core.x,boxes[j].core.y,linkName[boxes[j].linkID],boxes[j].inch,0);
    }else{
      drawText(boxes[j].core.x,boxes[j].core.y,linkName[boxes[j].linkID],boxes[j].inch,150);
      stroke(0,50);
    }
    boxes[j].drawBox(); 
  }
}


function drawScene3() {
	background(255);
	for(var j = 1; j < worksNum; j++){
		if(j >= 1 && j <= 4){
			if(!instaBtn)continue;
		}else if(j <= 5){
			if(!uxBtn)continue;
		}
		if(worksBox[j].inTerritory(mouseX,mouseY)){
		    stroke(worksBox[j].baseColor);
		    worksBox[j].drawInnerBox();
		    drawText(worksBox[j].core.x,worksBox[j].core.y,worksName[j],worksBox[j].inch,0);
			drawCaption(worksYear[j],worksBox[j].inch/2,0);
		}
		else{
	      	drawText(worksBox[j].core.x,worksBox[j].core.y,worksIndex[j],worksBox[j].inch,150);
	      	stroke(0,50);
	    }
	      	worksBox[j].drawBox(); 
	}
	if(worksBox[0].inTerritory(mouseX,mouseY)){
		stroke(worksBox[0].baseColor);
		worksBox[0].drawTetrahedron();
		drawText(worksBox[0].core.x,worksBox[0].core.y,worksName[0],worksBox[0].inch,0);
		
	}else{
		drawText(worksBox[0].core.x,worksBox[0].core.y,worksIndex[0],worksBox[0].inch,150);
	    stroke(0,50);
	}
	worksBox[0].drawBox(); 
}
function drawText(x,y,str,strSiz,col){
	push();  
	translate(x,y);
	fill(col);
	textSize(strSiz);
	text(str, 0,0);
	pop();
}
function drawCaption(str,strSize,col){
	push();  
	stroke(0);
	line(-width/3,height/3,width/3,height/3);
	line(width/3,-height/3,width/3,height/3);
	drawText(width/4,height/3+strSize,str,strSize,col);
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
function toMenu(){
	if(scene != 2){
		initBox();
		scene = 2;
		$("html, body").animate({scrollTop: 0}, 500);
		$("html, body").animate({scrollLeft: 0}, 500);
	}
}
function changeWorksPage(){
	$(function () {
	    var firworContents = $('.firstWorks');
	    firworContents.hide();
	    var secworContents = $('.secondWorks');
	    secworContents.show();

	    var container = document.querySelector('#container');
	    imagesLoaded(container, function () {
	        var msnry = new Masonry(container, {
	          itemSelector: '.item', //コンテンツのclass名
	          isFitWidth: true, //コンテナの親要素のサイズに基づいて、コンテンツのカラムを自動調節します。
	          // columnWidth: 120, //カラムの幅を設定
	        });
	    });
    });
    pressedAllBtn();
	canvas.style('position','absolute');
}
function returnWorksPage(){
	$(function () {
	    var firworContents = $('.firstWorks');
	    firworContents.show();
	    var secworContents = $('.secondWorks');
	    secworContents.hide();
    });
	canvas.style('position','fixed');
	if(allBtn){
		pressedUxBtn();
		pressedInstaBtn();
	}
	if(scene == 2){
		initBox();
	}else if(scene == 3){
		initWorksBox();
	}
}
class box{
	constructor(x,y,z,inc,ln){
		this.core =	createVector(x,y,z);
		this.inch = inc;
		this.territory = this.inch;
		this.bVertex  = [];
	    this.velocity = createVector(random(-5,5), random(-5,5));
	    this.acceleration = createVector(random(-0.05,0.05), random(-0.05,0.05));
	    // this.firstAc = createVector(random(-5,5),random(-5,5),0);
		this.head4Speed = random(0.1,0.8);
	    this.linkID = ln;
	    this.angleX = random(360);this.angleY = random(360);this.angleZ = random(360);
	    this.angleStep = 0.5;
	    this.baseColor = color(random(255),random(255),random(255));
	    this.shapeBox();
	    this.innerBVertex  = [];
	    this.shapeInnerBox();
	    this.visible = true;
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

  	updata(){
	    this.acceleration.add(this.firstAc);
	    // this.firstAc.div(4);
	    this.velocity.add(this.acceleration);
	    this.core.add(this.velocity);
	    this.acceleration.mult(0);
	    this.velocity.mult(0.98);
  	}

  	Head4Core(up01,c){
	    // var moCh = map(this.head4Speed,0,this.head4Speed,0.1,1.0);
	    var f = createVector(0,0,0);
	    var force = p5.Vector.sub(f, this.core);
	    force.normalize().mult(c);
	    this.acceleration.add(force);
	    if(up01){//up01 : boolen型でupdataを行うかの有無
	    	this.updata();
	    }
	    else{
	    }
	}

	setVelocity(jpos){
		var f = jpos;
	    var force = p5.Vector.sub(this.core, f);
	    force.normalize().mult(0.005);
	    // force.normalize().mult(0.5);
	    this.acceleration.add(force);
	}

	drawBox(){
		push();
		translate(this.core.x,this.core.y);
	    rotateX(radians(this.angleX));this.angleX+= this.angleStep;if(this.angleX > 360)this.angleX=0;
	    rotateY(radians(this.angleY));this.angleY+= this.angleStep;if(this.angleY > 360)this.angleY=0;
	    rotateZ(radians(this.angleZ));this.angleZ+= this.angleStep;if(this.angleZ > 360)this.angleZ=0;
	    noFill();

	    // point(0,0);

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

	    // point(0,0);

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
  	drawTextWithB(str,col){
		push();  
		translate(this.core.x,this.core.y);
		rotateX(radians(this.angleX));
		rotateY(radians(this.angleY));
		rotateZ(radians(this.angleZ));
		fill(col);
		textSize(this.inch);
		text(str, 0,0);
		pop();
	}
	inTerritory(mx,my){
	    var back;
	    var f = createVector(mx-windowWidth/2,my-windowHeight/2);
	    var dbox = p5.Vector.sub(f, this.core);
	    var dist_box = dbox.mag();
	    if(dist_box < this.territory){
	      back = true;
	    }else{
	      back = false;
	    }
	    return back;
	}
	inNeighborSpace(jpos){
	    var back;
	    var f = jpos;
	    var dbox = p5.Vector.sub(f, this.core);
	    var dist_box = dbox.mag();
	    if(dist_box < this.territory * 2.5){
	      back = true;
	    }else{
	      back = false;
	    }
	    return back;
	}
}
$(function() {
    $('html,body').animate({ scrollTop: 0 }, '1');
});