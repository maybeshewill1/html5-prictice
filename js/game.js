var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
//background image
var bgReady = false;
var bgImage=new Image();
 bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";
//hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";
//monstrer image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";
//game object
var hero = {
	speed: 256//每秒移动像素值
};

var monster = {speed: 200};
var monsterCaught = 0;
//处理用户输入
var keysDown = {};
addEventListener("keydown",function (e) {
	keysDown[e.keyCode] =true;
},false);
addEventListener("keyup",function (e) {
	delete keysDown[e.keyCode];
},false);
//reset 英雄放在画布中央
var reset = function () {
	hero.x = canvas.width/2-8;
	hero.y = canvas.height/2-8;
// 怪物位置随机
	monster.x = 32 + (Math.random()*(canvas.width -64));
	monster.y = 32 + (Math.random()*(canvas.height -64));
	
	
};
var dirx=1;
var diry=1;
var timer=setInterval(function(){
		monster.x+=(15/Math.tan(Math.PI/3))*dirx;
		if(monster.x>=canvas.width-64){dirx=-1;}else if(monster.x<=32){dirx=1;}
		monster.y+=2*diry;
		if(monster.y>=canvas.height-64){diry=-1;}else if(monster.y<=32){diry=1;}
		
	},20);
var update = function (modifier) {
/*  if (38 in keysDown) {
		hero.y -= hero.speed*modifier;
	}
	if (40 in keysDown) {
		hero.y +=hero.speed*modifier;
	}
	if (37 in keysDown) {
		hero.x -= hero.speed*modifier;
	}
	if(39 in keysDown) {
		hero.x +=hero.speed*modifier;
	}
	*/  
	
	
	

if (38 in keysDown) { // Player holding up↑
hero.y -= hero.speed * modifier;
if( hero.y < 32 )
hero.y = 32;
}
if (40 in keysDown) { // Player holding down↓
hero.y += hero.speed * modifier;
if( hero.y >= 416) {
hero.y = 416;
}
}
if (37 in keysDown) { // Player holding left←
hero.x -= hero.speed * modifier;
if( hero.x < 32){
hero.x = 32;
}
}
if (39 in keysDown) { // Player holding right→
hero.x += hero.speed * modifier;
if( hero.x > 448){
hero.x = 448;
}
}
	

//英雄与怪物是否接触
if (
	hero.x <= (monster.x + 32)
	&& monster.x <= (hero.x + 32)
	&& hero.y <= (monster.y + 32)
	&& monster.y <= (hero.y +32)
	){
	++monsterCaught;
	reset();
	}
};
//渲染物体
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage,0,0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage,hero.x,hero.y);
	}
	if (monsterReady) {
		ctx.drawImage(monsterImage,monster.x,monster.y);
	}
	//得分
	ctx.fillStyle ="rgb(250,250,250)";
	ctx.font = "24px Helevetica";
	ctx.textAlign ="left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught:"+monsterCaught,32,32);
}
//循环
 var main = function (){
	 var now=Date.now();
	 var delta = now -then;
	 update(delta/1000);
	 render();
	 then=now;
	 requestAnimationFrame(main);
 };
var w =window;
requestAnimationFrame = w.requestAnimationFrame||w.webkitRequestAnimationFrame||w.msRequestAnimationFrame||w.mozRequestAnimationFrame;
var then =Date.now();
reset();
main();