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

var Saarijarvi= new Village (100, 100, undefined, "Saarijärvi");
var Autio= new Village (150, 150, undefined, "Autio");

function Officer(ability){
	this.chosen=false;//by default not chosen
		//can be Village or Route
	this.position=Saarijarvi;//by def in Saarijärvi
		//village or null, if null no movement
	this.target=null;
	this.ability=ability;
}

function Topic(){

}

function TopicGenerator(){
	this.activeTopics = 6;
	this.topicWaitTime = 10000; //ms = 10 sec
	this.topicHandlingTime = 1000; //ms = 1 sec
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


