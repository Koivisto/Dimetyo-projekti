

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var FPS  					= 25;       // frames per second
var TIME_INTERVAL			= 1000/FPS; // ms
var canvaswidth = 700;
var canvasheight = 400;

canvas.width		= canvaswidth;
canvas.height		= canvasheight;




function initObjects(){
createVillages();
createOfficers();
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
}


function drawVillages() {
	
	id = Villages.lenght;
	for (var i =0; i<id; i++){
		Villages[i].draw();
	}	
}


function drawOfficers() {
	
	id = Officers.lenght;
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
