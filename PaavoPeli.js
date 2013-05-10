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

//villages
var Saarijarvi;
var Karstula;
var Kyyjarvi;
var Autio;
var Kannonpaa;
var Kannonkoski;
var Pirttipera;
var Kivijarvi;
var Kinnula;


var distanceKinnula  = [1,0,1,2,3,3,4,5,5] ;
var distanceKivijarvi = [2,1,0,1,2,2,3,4,4];
var distancePirttipera = [2,1,0,1,2,2,3,4,4];
var distanceKannonpaa = [3,2,1,0,1,1,2,3,3];
var distanceKannonkoski= [4,3,2,1,0,2,3,4,4];
var distancesSaarijarvi = [4,3,2,11,2,0,1,2,2];
var distanceKarstula = [5,4,3,2,3,1,0,1,1];
var distanceAutio = [6,5,4,3,4,2,1,0,2];
var distanceKyyjarvi= [6,5,4,3,4,2,1,2,0];

var distances = new Array();

var nKinnula = new Array(0,2);
var nKivijarvi = new Array(0,1,3);
var nPirttipera = new Array(0,2,4);
var nKannonpaa = new Array(0,3,5,6);
var nKannonkoski = new Array(0,4);
var nSaarijarvi = new Array(0,4,7);
var nKarstula = new Array(0,6,8,9);
var nAutio = new Array(0,7);
var nKyyjarvi = new Array(0,7);

var neighbours =new Array(nKinnula, nKivijarvi, nPirttipera, nKannonpaa, nKannonkoski, nSaarijarvi, nKarstula, nAutio, nKyyjarvi);

distances[0] = null;
distances[1] = distanceKinnula;
distances[2] = distanceKivijarvi;
distances[3] = distancePirttipera; 
distances[4] = distanceKannonpaa;
distances[5] = distanceKannonkoski;
distances[6] = distancesSaarijarvi;
distances[7] = distanceKarstula;
distances[8] = distanceAutio;
distances[9] = distanceKyyjarvi;


var Villages;// lists
var Routes;
var AllPlaces;
var officer0;//officers
var officer1;
var officer2;
var Officers;//list

var SaarijarviKarstula;
var SaarijarviKannonpaa;
var KarstulaKyyjarvi;
var KarstulaAutio;
var KannonpaaKannonkoski;
var KannonpaaPirttipera;
var PirttiperaKivijarvi;
var KivijarviKinnula;


var TopicGen; 

var tausta1 = new Image();
tausta1.src = "tausta3.gif";
var officerTexture1 = new Image();
officerTexture1.src = "officer4.gif";//MUHAHAHAHHAHA, kuolema saapuu
var villageTexture1 = new Image();
villageTexture1.src = "village1.gif";

var mouseX;
var mouseY;
var activeOfficer = null;



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
	primeMover();
	moveOfficers();
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

function moveOfficers(){
	id = Officers.length;	
	for (var i =0; i<id; i++){
		var offic = Officers[i];
		var status = offic.returnStatus();
		if (status ==2){
			if (offic.returnTarget() == null){
				setNextTarget(offic);
				console.log("liikutetaan virkamiehia !!!!!!!!!!!!!");
			}
			if (offic.returnProgress()>100){ // tarkistetaan ollaanko seuraavassa kylässä 

				if (offic.returnDestination() == offic.returnTarget()){ // tarkistetaan ollaan perillä
					offic.setTarget == null;
					offic.setStatus(0);
					offic.setPosition(offic.returnDestination());
				}
				else {
					offic.setPosition(offic.returnTarget());
					setNextTarget(offic);
				}
			}
				
		}
	};
}



function drawmovingOfficer(){
	
}





function setNextTarget(officer){
	console.log("Asetetaan määränpää");
	var location = officer.returnPosition();
	var closs = new Array();
	closs = location.returnNeighbours();
	id = closs.length;
	for (var i =0; i<id; i++){
		var naapuri = close[i];//pyydetään naapureita kertomaan matkan pituus määränpäähän
		var matka = naapuri.returnDistance(naapuri);
		console.log("matkaa" + matka);
		// valitaan se naapuri jossa lyhin matka
		// tallennetaan target muuttujaan
	}
}

function primeMover(){
	if (isClicked == true){
		console.log("painettu");		
		id = Officers.length;	
		if (activeOfficer == null){	 // no chosen officer
for (var i =0; i<id; i++){
			var officer = Officers[i];
			var status = officer.returnStatus();
			if (status ==0){ // jos virkamies laiskottelee
				var o = true;
				if (officer.isClicked() && o){
					console.log("muutetaan statusta");
					officer.setStatuss(1);
					activeOfficer=officer;
					o = false;
				}
			}
			};
		}		
		else {   // chosen officer
			// käydään läpi onko painettu kaupunkia, jos on niin vaihdetaan sijaintia
			// kysytään onko painettu virkamiestä uudelleen, jos on vaihdetaan status			
			id = Villages.length;
			var boolean = true;
			if (activeOfficer.isClicked()){
			activeOfficer.setStatuss(0);
			activeOfficer=null;
			boolean = false;
			}
			if (boolean){
			for (var i =0; i<id; i++){ // tän loopin vois lopettaa jo silloin kun yhtä kylää on klikattu
						if (Villages[i].isClicked()){
							activeOfficer.setDestination(Villages[i]);
							var koe = Villages[i].returnName(); //activeOfficer.returnDestination();
							console.log("määränpää " + koe);
							activeOfficer.setStatuss(2);	// muutetaan statukseksi matkalla 
							activeOfficer=null;
						}
						};
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


//Käy läpi virkamiehet ja palauttaa virkamiehen jos sitä on painettu


//Käy läpi kylälistan ja palauttaa kylän jos sitä kylää on painettu

//


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
/*VILLAGE luokka*/
function Village(x, y, topic, name, id, naapurit){
	this.x=x;
	this.y=y;
	this.topic=topic;
	this.name=name;
	this.distances=distances[id];
	this.neighbours = new Array();
	this.neighbours= naapurit;
	console.log("kylä: "+ this.name + this.neighbours[1]);
};


Village.prototype.returnTopic = function(){
	return this.topic;
};

Village.prototype.returnId = function(){
	return this.id;
};


Village.prototype.returnX = function(){
	return this.x;
};
Village.prototype.returnY  = function(){
	return this.y;
};

Village.prototype.returnDistances = function(){
	return this.distances;
};

Village.prototype.returnNeighbours = function(){
	return this.neightbours;
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

Village.prototype.isClicked = function (){
	console.log("kysytaan onko kylää" + this.name +  "painettu");
	var disX = Math.pow(this.x- mouseX,2);
	var	disY = Math.pow(this.y- mouseY,2);
	if(disX<160 && disY<160){
		console.log("kylaa klikattu");
		return true;
	}
	else {
		return false;
	}
};


function createVillages(){
	Saarijarvi = new Village (250, 80, null, "Saarijärvi", 6, nSaarijarvi);
	Karstula = new Village (450,130,null, "Karstula", 7, nKarstula);
	Kyyjarvi = new Village (600,180,null, "Kyyjärvi", 9, nKyyjarvi);
	Autio= new Village (580, 90, null, "Autio", 8, nAutio);
	Kannonpaa = new Village (300,150,null, "Kannonpää", 4, nKannonpaa);
	Kannonkoski = new Village (100,120,null, "Kannonkoski", 5, nKannonkoski);
	Pirttipera = new Village (130,230,null, "Pirttiperä", 3, nPirttipera);
	Kivijarvi = new Village (240,250,null, "Kivijärvi", 2, nKivijarvi);
	Kinnula = new Village (120,370,null, "Kinnula", 1, nKinnula);

	
	Villages = [Kinnula, Kivijarvi, Pirttipera, Kannonpaa, Kannonkoski, Saarijarvi, Autio, Kyyjarvi];
}

//Saarijarvi Karstula Kyyjarvi Autio Kannonpaa Kannonkoski Pirttipera Kivijarvi Kinnula
//------------------------------------------------------------------------


/*Officer luokka*/
function Officer(theme, position){
	this.chosen=false;//by default not chosen
		//can be Village or Route
	this.position=position;//by def in Saarijärvi
		//village or null, if null no movement
	this.target=null; // moving to village
	this.destination = null; //the destination officer is moving towards
	this.route = null; //the route saved if moving
	this.progress = 0;
	this.ability=theme;
	this.status = "0"; // normaali = 0; aktiivinen = 1, matkalla = 2, keskustelee = 3;
}

Officer.prototype.returnProgress = function(){
	return this.progress;
};

Officer.prototype.move = function(){
	this.progress = this.progress +1;
};

Officer.prototype.resetProgress = function(){
	this.progress = 0;
};


//Draws officer
Officer.prototype.draw = function(){
	context.beginPath();
	if (this.status == "1") {
	context.fillStyle = "#000";     // musta
	}
	else if (this.status == "2") {
		context.fillStyle = "#FFF";   
	}
	else if (this.status == "0") {
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

Officer.prototype.returnTarget = function(){
	return this.target;
};

Officer.prototype.returnStatus = function(){
	return this.status;
};

/*
Officer.prototype.setStatus = function(){ //Tämä funktio pitäisi jäädä pois käytöstä, jos tulee fiksumpi tapa tehdä
	console.log("kutsutaan setstatusta");
		var pos = this.position;
		var disX = Math.pow(pos.returnX()- mouseX,2);
		//console.log(mouseX);
		console.log(pos.returnX());
		var	disY = Math.pow(pos.returnY()- mouseY,2);
	if (disX<60 && disY<60){
		if(this.status == "0"){
			this.status = "1";
			activeOfficer = this;
		}
		else if (this.status == "1"){
			this.status = "3";
			activeOfficer = null;
		}
	}
	console.log("status " + this.status);
};

*/

Officer.prototype.isClicked = function (){
	console.log("kysytaan onko painettu");
	var pos = this.position;
	var disX = Math.pow(pos.returnX()- mouseX,2);
	//console.log(mouseX);
	console.log(pos.returnX());
	var	disY = Math.pow(pos.returnY()- mouseY,2);
	if(disX<60 && disY<60){
		return true;
	}
	else{
		return false;
	}
};

Officer.prototype.setStatuss = function(status){
	this.status=status;
};

Officer.prototype.setDestination = function (destination){
	this.destination = destination;
};

Officer.prototype.returnDestination = function (){
	return this.destination;
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
