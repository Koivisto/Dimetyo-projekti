/*	PaavoPeli
	Author: Aarne Leinonen
	Tehty studio2 ja dimetyö kurssien projektina
*/

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var peliVoitettu = false;


/*Villge luokka*/
function Village(x, y, topic, name){
	this.x=x;
	this.y=y;
	this.topic=topic;
	this.name=name;
}
Village.prototype.returnTopic(){
	return this.topic;
};
Village.prototype.returnX(){
	return this.x;
};
Village.prototype.returnY(){
	return this.y;
};
Village.prototype.addTopic(topic){
	this.topic = topic;
};
Village.prototype.draw(){
	context.beginPath();
	context.fillStyle = "#00FF00";     
	//context.drawImage(kunnanKuva,x,y);
	context.fillRect( this.x, this.y, 50, 50 ); // x-coordinate, y-coordinate, width, height
	context.closePath(); 	
};

//creates all villages and list of them
function createVillages(){
	var Saarijarvi= new Village (100, 100, null, "Saarijärvi");
	var Autio= new Village (150, 150, null, "Autio");

	var Villages = [Saarijarvi, Autio];
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
Officer.prototype.draw(){
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
	var officer0 = new Officer(0);
	var officer1 = new Officer(1);
	var officer2 = new Officer(2);
	
	var Officers = [officer0, officer1, officer2];
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
	
	if(maxTopics > Villages.lenght){ //if too manu topics...
		this.maxTopics = Villages.lenght;
	}
}
TopicGenerator.prototype.updateTopics(){
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
TopicGenerator.prototype.addChallenge(){
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


