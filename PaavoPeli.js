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
var Saarijarvi;
var Villages = [1,1,1];
var Autio;
var officer0;
var officer1;
var officer2;
var Officers;





function initObjects(){
createVillages();
createOfficers();
console.log("alustettu");
}

//Clear canvas
function clearCanvas() {
	context.clearRect( 0, 0, context.canvas.width, context.canvas.height );
}

// Update canvas
function updateCanvas() {
	// Clear canvas
	clearCanvas();
	
	// Draw my objects onto the canvas
	drawVillages();
	drawOfficers();
	
	// Start animation (browser selects the optimal frame rate)
	animationId				= requestAnimationFrame( updateCanvas );
	console.log("alkoi");
}


function drawVillages() {
	console.log("for-luuppin ulkopuolella");
	var id = Villages.length;
	console.log(id);
	for (var i =0; i<id; i++){
		console.log("for-luuppi");
		Villages[i].draw();
	}	
}


function drawOfficers() {
	
	id = Officers.length;
	for (var i =0; i<id; i++){
		Officers[i].draw();
	}
}



initObjects();


window.addEventListener( "load", function() {
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
	this.topic = topic;
};
Village.prototype.draw = function(){
	context.beginPath();
	context.fillStyle = "#00FF00";     
	//context.drawImage(kunnanKuva,x,y);
	context.fillRect( this.x, this.y, 50, 50 ); // x-coordinate, y-coordinate, width, height
	context.closePath(); 	
	console.log("kuutio piirretty");
};


//creates all villages and list of them
function createVillages(){
	Saarijarvi = new Village (100, 100, null, "Saarijärvi");
	Autio= new Village (150, 150, null, "Autio");

	Villages = [Saarijarvi, Autio];
}

//------------------------------------------------------------------------
/*Officer luokka*/
function Officer(theme){
	this.chosen=false;//by default not chosen
		//can be Village or Route
	this.position=Saarijarvi;//by def in Saarijärvi
		//village or null, if null no movement
	this.target=null;
	this.ability=theme;
}
Officer.prototype.draw = function(){
	context.beginPath();
	context.fillStyle = "#FF0000";     // Red
	
	if( this.position != null){ //ei ole null
		var pos = this.position
		var posX = pos.returnX();
		var posY = pos.returnY();
	}
	
	context.arc(posX, posY, 20, 0, 2 * Math.PI, false);
	context.fill();
	context.closePath();
};



//creates all 3 officers and list for them
function createOfficers(){
	officer0 = new Officer(0);
	officer1 = new Officer(1);
	officer2 = new Officer(2);
	
	Officers = [officer0, officer1, officer2];
}



//--------------------------------------------------------------------
function Topic(theme){
	this.theme = theme;//same as officers ability
}

function TopicGenerator(){
	this.maxTopics = 4;//4 by default
	this.activeTopics = 0;//no topics by default
	this.topicWaitTime = 10000; //ms = 10 sec
	this.topicHandlingTime = 1000; //ms = 1 sec
	
	if(maxTopics > Villages.length){ //if too manu topics...
		this.maxTopics = Villages.length;
	}
}
TopicGenerator.prototype.updateTopics = function(){
	if (activeTopics < maxTopics){
		//random LISÄÄ
		//lisää while lause kunnes kunta jossa ei topiccia
		var i = 1;
		
		var topicInVillage = Villages[i].returnTopic;//miten taulukon jäseneen
		if(topicInVillge == null){
			//lisäärandom
			var topicToVillage = new Topic(0);//enumeraatio???? LISÄÄ JOKU
			Villages[i].addTopic(topicToVillage); //lisää suodun topicin kylälle
		}
	}
};
TopicGenerator.prototype.addChallenge = function(){
	if(maxTopics < Villages.lenght){//if its possible to add
		this.maxTopics ++;
	}
};

//-------------------------------------------------------------------------
/*Route luokka*/
function Route(village1, village2){
	this.village1=village1;
	this.village2=village2;
}
function createRoutes(){
	

}

/*
				Autio------<
Saarijärvi----<
				Kyyjärvi----<
*/
var SaarijarviAutio = new Route (Saarijarvi, Autio);


