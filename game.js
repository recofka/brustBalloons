var timerId = null; //
var popSound;

function gameStarted (){
	var url = window.location.search;
	var levelGame = url.replace("?","");	
	var time = 0;

	if (levelGame ==1) { // 1 easy 120 seg
		time=120;
	}
	if (levelGame ==2) {// 2 medium 60 seg
		time=60;
	}
	if (levelGame ==3) {//	3 hard 30 seg
		time=30;
	}	
	
	//put time set at if at the game
	document.getElementById('time').innerHTML=time;

	// number of ballons + call function to display ballons
	var numBallons = 48;
	var brustBalloons = 0;
	createBalloons(numBallons);

	//show ballons amount 
	document.getElementById("goodBalloons").innerHTML = numBallons;
	document.getElementById("brustBalloons").innerHTML = brustBalloons;

	countTime(time + 1);
}


//
function countTime(seconds){
	seconds = seconds - 1;
	if(seconds == -1){
		clearTimeout(timerId); // clear the execution of the function setTimeout
		gaveOver();
		return false;
	}

	document.getElementById("time").innerHTML = seconds;
	timerId = setTimeout("countTime("+seconds+")", 1000);
}


// show alert when time is over
function gaveOver(){
	removeEventBrust();
	alert("End of the game!! booooom")
}



//This function inserts balloon as child to the div scenario
function createBalloons(numballoons){
	for(var i = 1; i <= numballoons; i++){
			var balloon = document.createElement("img");
			balloon.src = "img/balloon.svg";
			balloon.style.width = '54px';	
			balloon.style.margin = '10px';			
			balloon.id = 'b'+i;
			balloon.className = 'windBalloon';
			balloon.onclick = function(){brust(this);};

			document.getElementById("scenario").appendChild(balloon);
		}
}


// This function change the src of the to give a brust balloon after click
function brust(e){
	var idBalloon = e.id;
	document.getElementById(idBalloon).setAttribute("onclick","");
	document.getElementById(idBalloon).src = "img/balloonPow.svg";
	popSound();
	points(-1);	
}



//This function update de score after click
function points(action){
	//retrieves balloon values by #Id
	var brustBalloons = document.getElementById("brustBalloons").innerHTML;
	var goodBalloons = document.getElementById("goodBalloons").innerHTML;

	brustBalloons = parseInt(brustBalloons);
	goodBalloons = parseInt(goodBalloons);

	brustBalloons = brustBalloons - action;
	goodBalloons = goodBalloons + action;

	// changing score

	document.getElementById("brustBalloons").innerHTML = brustBalloons;
	document.getElementById("goodBalloons").innerHTML = goodBalloons;

	gameSituation(goodBalloons);
}


function gameSituation(goodBalloons){
	if(goodBalloons == 0){
		stopGame()
		alert("you win! Need to fix this box and the last pow")
	}
}


function stopGame(){
	clearTimeout(timerId);

}


function removeEventBrust(){
	var i = 1;
	while (document.getElementById('b'+i)){
		document.getElementById('b'+i).onclick = "";
		i++;
	}
}

function popSound(){
	var audioTag = new Audio();
	audioTag.src = 'img/pop.wav';
	audioTag.play();
	
}

