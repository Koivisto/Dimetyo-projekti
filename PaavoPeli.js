/*	PaavoPeli
	Author: Aarne Leinonen
	Tehty studio2 ja dimetyö kurssien projektina
*/
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var FPS  					= 25;       // frames per second
var TIME_INTERVAL			= 1000/FPS; // ms
var canvaswidth = 700;
var canvasheight = 400;
canvas.width		= canvaswidth;
canvas.height		= canvasheight;
var peliVoitettu = false;
var isClicked = false;
/*KARTAN HAHMOTELMAA
						Kyyjärvi (0)
						/
		     /-----Karstula (2)----Autio (0)
Saarijärvi (2)				
			 \------Kannonpää (2)-------Kannonkoski (0)
						 \
						 Pirttiperä (1)-----Kivijärvi (1)-----Kinnula (0)
*/
var Saarijarvi;
var Karstula;
var Kyyjarvi;
var Autio;
var Kannonpaa;
var Kannonkoski;
var Pirttipera;
var Kivijarvi;
var Kinnula;
var Villages;// lists
var Routes;
var AllPlaces;
var officer0;//officers
var officer1;
var officer2;
var Officers;//list

var TopicGen; 

var tausta1 = new Image();
tausta1.src = "tausta3.gif";
var officerTexture1 = new Image();
officerTexture1.src = "officer4.gif";//MUHAHAHAHHAHA, kuolema saapuu
var villageTexture1 = new Image();
villageTexture1.src = "village1.gif";

var mouseX;
var mouseY;

function initObjects(){
//console.log("alustetaan");
createVillages();
createRoutes();
createOfficers();
TopicGen = new TopicGenerator();
//console.log("alustettu");
}

//Clear canvas
function clearCanvas() {
	context.clearRect( 0, 0, context.canvas.width, context.canvas.height );
	context.beginPath();
	context.drawImage(tausta1,0,0);
	context.closePath();
	/*
	context.clearRect( 0, 0, context.canvas.width, context.canvas.height );
	//tämä on lisätty, jotta näkyisi canvaasin rajat suunnitteluvaiheessa
	context.beginPath();
    context.moveTo(canvaswidth -10, canvasheight);
    context.lineTo(canvaswidth, canvasheight -10);
    context.stroke();
	*/
}

// Update canvas
function updateCanvas() {
	mouseListener();
	updateGame();
	// Clear canvas
	clearCanvas();
	// Draw my objects onto the canvas
	drawRoutes();
	drawVillages();	
	drawOfficers();
	// Start animation (browser selects the optimal frame rate)
	animationId				= requestAnimationFrame( updateCanvas );
	//console.log("alkoi");
}

function mouseListener(){
	if (isClicked == true){
		console.log("painettu");
		
		id = Officers.length;
		for (var i =0; i<id; i++){
			var officer = Officers[i];
			var status = officer.returnStatus()
			if (status == "3"){
				officer.setStatus();
			}
		}
		
		isClicked = false;
		
		
	}
	
}

canvas.addEventListener('click', function(evt) {
	var rect = canvas.getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
    
    var message = ('Mouse position: ' + mouseX +',' + mouseY);
   console.log("painoin" + message);
   isClicked = true;
  }, false);



//All gamelogics is updated here, before drawing
function updateGame() {
	//console.log("------");
	TopicGen.updateTopics();
	//At this point officers are moving at random, but they are MOVING!
	/*var sataRandom = Math.floor((Math.random()*100)); //0-99
	if(sataRandom < 4){
		var randomOfficerIndex = Math.floor((Math.random()*3)); //0-2
		var movingOfficer = Officers[randomOfficerIndex];
		var randomPlaceIndex = Math.floor((Math.random()*AllPlaces.length)); //0-length
		var randomPlace = AllPlaces[randomPlaceIndex];
		movingOfficer.moveToPlace(randomPlace);
	}*/
	//checking if officer is dealing with topic
	id = Officers.length;
	for (var i =0; i<id; i++){
		var officer = Officers[i];
		var position = officer.returnPosition();
		//if (position.returnTopic() != undefined){
			//console.log(position.returnTopic());
			if (position.returnTopic() != null){
				position.addTopic(null);
				//position.addTopic(null);
				
				//TopicGenerator need update too, so this indicates him to make new topics
				var newNumber = TopicGen.returnActiveTopics() -1;
				TopicGen.setActiveTopics(newNumber);
				
				console.log("aihe keskusteltu!!!" + TopicGen.returnActiveTopics());
			}
		//}
	}
}

function drawVillages() {
	//console.log("for-luuppin ulkopuolella");
	var id = Villages.length;
	//console.log(id);
	for (var i =0; i<id; i++){
		//console.log("for-luuppi");
		Villages[i].draw();
	}	
}
function drawRoutes() {
	//console.log("for-luuppin ulkopuolella");
	var id = Routes.length;
	//console.log(id);
	for (var i =0; i<id; i++){
		//console.log("for-luuppi");
		Routes[i].draw();
	}	
}

function drawOfficers() {
	
	id = Officers.length;
	for (var i =0; i<id; i++){
		Officers[i].draw();
	}
}

window.addEventListener( "load", function() {
	initObjects();	
	updateCanvas();
		
}
);


(function() {
	 var lastTime = 0;
	 var vendors = ['ms', 'moz', 'webkit', 'o'];
	 for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	     window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	     window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                || window[vendors[x]+'CancelRequestAnimationFrame'];
	 }

	 if (!window.requestAnimationFrame)
	     window.requestAnimationFrame = function(callback, element) {
	         var currTime = new Date().getTime();
	         var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	         var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	           timeToCall);
	         lastTime = currTime + timeToCall;
	         return id;
	     };

	 if (!window.cancelAnimationFrame)
	     window.cancelAnimationFrame = function(id) {
	         clearTimeout(id);
	     };
	}());

//------------------------------------------------------
/*Villge luokka*/
function Village(x, y, topic, name){
	this.x=x;
	this.y=y;
	this.topic=topic;
	this.name=name;
};

Village.prototype.returnTopic = function(){
	return this.topic;
};
Village.prototype.returnX = function(){
	return this.x;
};
Village.prototype.returnY  = function(){
	return this.y;
};
Village.prototype.addTopic  = function(topic){
	//console.log("topikki on " + topic);
	this.topic = topic;
};
Village.prototype.returnName = function(){
	return this.name;
};
Village.prototype.draw = function(){

	context.beginPath();
	context.drawImage(villageTexture1 , this.x-25, this.y-50);//village to correct position
	context.fillStyle = "#000099";
	context.font="12px Arial";
	context.fillText(this.name, this.x, this.y);
	if(this.topic != null){
		//console.log("------piirretään");
		context.beginPath();
		context.fillStyle = "#BBBB00";
		context.fillRect( this.x-10, this.y-60, 20, 20 ); // x-coordinate, y-coordinate, width, height
		context.fillText("Täällä vaaditaan viikatemiestä", this.x-80, this.y-60);
		context.closePath(); 
		
		//this.topic.draw();	
	}
	context.closePath();
};
/*KARTAN HAHMOTELMAA
						Kyyjärvi (0)
						/
		     /-----Karstula (2)----Autio (0)
Saarijärvi (2)				
			 \------Kannonpää (2)-------Kannonkoski (0)
						 \
						 Pirttiperä (1)-----Kivijärvi (1)-----Kinnula (0)
*/
//creates all villages and list of them
function createVillages(){
	Saarijarvi = new Village (250, 80, null, "Saarijärvi");
	Karstula = new Village (450,130,null, "Karstula");
	Kyyjarvi = new Village (600,180,null, "Kyyjärvi");
	Autio= new Village (580, 90, null, "Autio");
	Kannonpaa = new Village (300,150,null, "Kannonpää");
	Kannonkoski = new Village (100,120,null, "Kannonkoski");
	Pirttipera = new Village (130,230,null, "Pirttiperä");
	Kivijarvi = new Village (240,250,null, "Kivijärvi");
	Kinnula = new Village (120,370,null, "Kinnula");

	Villages = [Saarijarvi, Karstula, Kyyjarvi, Autio, Kannonpaa, Kannonkoski, Pirttipera, Kivijarvi, Kinnula];
}
//Saarijarvi Karstula Kyyjarvi Autio Kannonpaa Kannonkoski Pirttipera Kivijarvi Kinnula
//------------------------------------------------------------------------
/*Officer luokka*/
function Officer(theme, position){
	this.chosen=false;//by default not chosen
		//can be Village or Route
	this.position=position;//by def in Saarijärvi
		//village or null, if null no movement
	this.target=null;
	this.ability=theme;
	this.status = "3";
}

Officer.prototype.draw = function(){
	context.beginPath();
	if (this.status == "1") {
	context.fillStyle = "#000";     // joku v�ri
	}
	else if (this.status == "2") {
		context.fillStyle = "#FFF";   
	}
	else{
		context.fillStyle = "#FF0000";     // Red
		}
	
	if( this.position != null){ //ei ole null
		var pos = this.position;
		var posX = pos.returnX();
		var posY = pos.returnY();
	}
	
	context.arc(posX, posY, 20, 0, 2 * Math.PI, false);
	context.fill();
	context.closePath();
	//plus picture
	context.beginPath();
	context.drawImage(officerTexture1 , posX - 15, posY-25);//officer to correct position
	context.closePath();
};

Officer.prototype.moveToVillage = function(village){
	this.position = village;
};
Officer.prototype.moveToPlace = function(place){
	this.position = place;
};
Officer.prototype.moveToRoute = function(route){
	this.position = route;
};
Officer.prototype.returnPosition = function(){
	return this.position;
};



Officer.prototype.returnStatus = function(){
	return this.status;
};

Officer.prototype.setStatus = function(){
		var pos = this.position;
		var disX = Math.pow(pos.returnX()- mouseX,2);
		//console.log(mouseX);
		console.log(pos.returnX());
		var	disY = Math.pow(pos.returnY()- mouseY,2);
	if (disX<30 && disY<30){
		this.status = "1";
	}
	console.log("status " + this.status);
};


//creates all 3 officers and list for them
function createOfficers(){
	officer0 = new Officer(0, Kinnula);
	officer1 = new Officer(1, Saarijarvi);
	officer2 = new Officer(2, Autio);
	
	Officers = [officer0, officer1, officer2];
}


//--------------------------------------------------------------------
/*Topic-luokka*/
function Topic(theme){// position){
	this.theme = theme;//same as officers ability
	//this.position = position;
}
//-------------------------------------
/*TopicGenerator-luokka*/
function TopicGenerator(){
	this.maxTopics = 4;//4 by default
	this.activeTopics = 0;//no topics by default
	this.topicWaitTime = 10000; //ms = 10 sec
	this.topicHandlingTime = 1000; //ms = 1 sec
	
	if(this.maxTopics > Villages.length){ //if too manu topics...
		this.maxTopics = Villages.length;
	}
}
TopicGenerator.prototype.returnActiveTopics = function(){
	return this.activeTopics;
};
TopicGenerator.prototype.setActiveTopics = function(newNumber){
	this.activeTopics = newNumber;
};

TopicGenerator.prototype.updateTopics = function(){
	
	if (this.activeTopics < this.maxTopics){
		var topicNumberBefore = this.activeTopics; //before while-loop
		//console.log("whilen ulkopuolella");
		while(topicNumberBefore == this.activeTopics){//repeat so long that there is 1 more topic
			//console.log("------");
			var i = Math.floor((Math.random()*Villages.length)); //0-length
			
			var village = Villages[i];
			var topicInVillage = village.returnTopic();
			if(topicInVillage == null){
				//console.log("lisätään aihe");
				var topicType = Math.floor((Math.random()*3));//0-3
				var topicToVillage = new Topic(topicType);
				Villages[i].addTopic(topicToVillage); //lisää suodun topicin kylälle
				this.activeTopics++;
				
			}
		}
		//console.log("whilen jälkeen");
	}
};
TopicGenerator.prototype.addChallenge = function(){
	if(this.maxTopics < Villages.lenght){//if its possible to add
		this.maxTopics ++;
	}
};


//-------------------------------------------------------------------------
/*Route luokka*/
function Route(village1, village2){
	this.village1=village1;
	this.village2=village2;
	//nämä muutettu olennon tiedoiksi jotta voi piirtää helposti
	this.v1X = village1.returnX();// + 25 ;//  x;//   kaatuu koska Villagen protoryyppi funktio on kadoksissa //prototype.returnX();
	//reitti kaupunkien välissä, route between villages
	this.v2X=village2.returnX();// + 25;//x;//
	this.v1Y=village1.returnY();// + 50;//y;//
	this.v2Y=village2.returnY();// + 50;//y;//
	
	var rX= (this.v1X +this.v2X)/2;
	var rY= (this.v1Y +this.v2Y)/2;
	this.x=rX;
	this.y=rY;
}
var SaarijarviKarstula;
var SaarijarviKannonpaa;
var KarstulaKyyjarvi;
var KarstulaAutio;
var KannonpaaKannonkoski;
var KannonpaaPirttipera;
var PirttiperaKivijarvi;
var KivijarviKinnula;


/*KARTAN HAHMOTELMAA
						Kyyjärvi (0)
						/
		     /-----Karstula (2)----Autio (0)
Saarijärvi (2)				
			 \------Kannonpää (2)-------Kannonkoski (0)
						 \
						 Pirttiperä (1)-----Kivijärvi (1)-----Kinnula (0)
*/
function createRoutes(){
	//console.log("Reitit alustetaan");
	SaarijarviKarstula = new Route(Saarijarvi, Karstula);
	SaarijarviKannonpaa = new Route(Saarijarvi, Kannonpaa);
	KarstulaKyyjarvi = new Route(Karstula, Kyyjarvi);
	KarstulaAutio = new Route(Karstula, Autio);
	KannonpaaKannonkoski = new Route(Kannonpaa, Kannonkoski);
	KannonpaaPirttipera = new Route(Kannonpaa, Pirttipera);
	PirttiperaKivijarvi = new Route(Pirttipera, Kivijarvi);
	KivijarviKinnula = new Route(Kivijarvi, Kinnula);
	
	Routes = [SaarijarviKarstula,SaarijarviKannonpaa,KarstulaKyyjarvi,
	KarstulaAutio,KannonpaaKannonkoski,KannonpaaPirttipera,PirttiperaKivijarvi,
	KivijarviKinnula];
	
	AllPlaces = [SaarijarviKarstula,SaarijarviKannonpaa,KarstulaKyyjarvi,
	KarstulaAutio,KannonpaaKannonkoski,KannonpaaPirttipera,PirttiperaKivijarvi,
	KivijarviKinnula, Saarijarvi, Karstula, Kyyjarvi, Autio, Kannonpaa, Kannonkoski,
	Pirttipera, Kivijarvi, Kinnula];
}
Route.prototype.returnX = function(){
	return this.x;
};
Route.prototype.returnY  = function(){
	return this.y;
};
Route.prototype.returnTopic = function(){
	return null;//helpompaa kuin periminen == purkka
};
Route.prototype.draw = function(){
	context.strokeStyle = '#927621';
	context.lineWidth   = 8;
	context.beginPath();
	context.moveTo(this.v1X, this.v1Y);
	context.lineTo(this.v2X, this.v2Y);
	context.stroke();
};
