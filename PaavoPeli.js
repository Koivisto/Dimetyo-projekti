/*	PaavoPeli
	Author: Aarne Leinonen
	Tehty studio2 ja dimetyö kurssien projektina
*/

var peliVoitettu = false;


function Village(x, y, topic, name){
	this.x=x;
	this.y=y;
	this.topic=topic;
	this.name=name;
}
Village.prototype.giveTopic(){
	return this.topic;
}
Village.prototype.addTopic(topic){
	this.topic = topic;
}


var Saarijarvi= new Village (100, 100, null, "Saarijärvi");
var Autio= new Village (150, 150, null, "Autio");

var Villages = [Saarijarvi, Autio];//en muista toimiko js listat näin


function Officer(theme){
	this.chosen=false;//by default not chosen
		//can be Village or Route
	this.position=Saarijarvi;//by def in Saarijärvi
		//village or null, if null no movement
	this.target=null;
	this.ability=theme;
}

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
		var topicInVillage = Villages[1].giveTopic;//miten taulukon jäseneen
		if(topicInVillge == null){
			var topicToVillage = new Topic(0);//enumeraatio???? LISÄÄ JOKU
			Villages[1].addTopic(topicToVillage); //lisää suodun topicin kylälle
		}
	}

}

TopicGenerator.prototype.addChallenge(){
	if(maxTopics < Villages.lenght){//if its possible to add
		this.maxTopics ++;
	}
}

function Route(village1, village2){
	this.village1=village1;
	this.village2=village2;
}

/*
				Autio------<
Saarijärvi----<
				Kyyjärvi----<
*/
var SaarijarviAutio = new Route (Saarijarvi, Autio);


