// Variables
var curSide = new Feeding("");
var curMeal = new Meal();
var meals = [];



// ***************************************************************************
// Functions
// ***************************************************************************

// Start
// starts a feeding on the specified side
function start(s){
	pause();
	
	curSide.clear();
	curSide.setSide (s);
	curSide.start();
	
	if (curMeal.getStartTime() < 0)
	{
		curMeal.start(curSide.getStartTime());
	}
};

// Pause
// Pauses the current side.  Can be used to transition to a new side, or just for a break
function pause(){
	if (!curSide.paused)
	{
		curSide.pause();
		// commit time to record
		if (curSide.getSide () == 'left')
		{
			curMeal.setLeftSideTime (curSide.getTime() + curMeal.getLeftSideTime());
		}
		else if (curSide.getSide () == 'right')
		{
			curMeal.setRightSideTime (curSide.getTime() + curMeal.getRightSideTime());
		}
		else
		{
			alert ("There was an error committing side " + curSide.getSide() + ".  Do you have three boobs?!");
		}
		
		// This side is over, delete it.  If the user selects this side again, the time will be added to the meal.
		curSide.clear();
	}
};

// Timer
// Second timer, calling from inside a class doesn't work
function timer(){
	if (!curSide.isPaused()) {
		curSide.setTime();
	}
}

// AddZero
// Add zero to any single digit (for proper time display)
function addZero(i)
{
	if (i<10) 
	{
		i="0" + i;
	}
	return i;
}

// Complete
// Finish a feeding, save it and go back to the main screen
function complete() {
	if (curMeal.getStartTime() >= 0)
	{
		// stop the current feeding
		pause ();
		
		// end the current meal
		curMeal.endNow ();
		
		// write out the current meal
		writeMeal ();
		
		// Double check
		//alert (pritnMeal (curMeal));

		// delete the current meal and side
		curMeal.clear();
	}
	
	// clear the text
	document.getElementById("time").innerHTML = "<b>Time:</b> 0:00:00";
	show("main");
}

// Discard
// User didn't mean to start a feeding, trash the current settings and go back
function discard() {
	// delete the current meal and side
	curMeal.clear();
	curSide.clear();
	
	// clear the text
	document.getElementById("time").innerHTML = "<b>Time:</b> 0:00:00";
	show("main");
}

function cloneObject(source) {
    for (i in source) {
        if (typeof source[i] == 'source') {
            this[i] = new cloneObject(source[i]);
        }
        else{
            this[i] = source[i];
	}
    }
}

// WriteMeal
// write a current meal... this should go out to a text file, but it's going to an array for now
function writeMeal() {
	
	// PhoneGap only, won't work on a PC
	//navigator.file.write('mealLog.txt', printMeal(curMeal), fail, fail);
	var m2 = new cloneObject(curMeal);
	meals.push(new cloneObject(m2));
	createCookie("count", meals.length);
	for (i=0; i < meals.length; i++){
		createCookie("meal" + i, printMeal(meals[i]));
	}
}

function createCookie(name,value) {
	var date = new Date();
	date.setTime(date.getTime()+(20*365*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	//var expires = "; expires=''";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function timeToSeconds(s)
{
		var ss = s.split(":");
		return ss[0] * 3600 + ss[1] * 60 + ss[2];
		
}

// getMeals
// read all meals and display
function getMeals () {
	var count = 0;
	count = readCookie("count");
	for (i=0; i < count; i++)
	{
		var mealString = readCookie("meal" + i);
		var mealsplit = mealString.split(",");
		var r = mealsplit[0];
		var l = mealsplit[1];
		var s = new Date(mealsplit[2]);
		var e = new Date(mealsplit[3]);
		var d = timeToSeconds(mealsplit[4]);
		meals[i] = new Meal();
		meals[i].meal(r, l, s, e);
		meals[i].setDuration (d);
	}
}

function printMeal (m){
	return m.getRightSideTime() + "," + m.getLeftSideTime() + "," + (m.getStartTime()) + "," + (m.getEndTime()) + "," + convertSeconds(m.getDuration());
}

function displayMeal (m){
	var mealDisplay = '<div class="meal"><div class="meal start">Start Time:' + (m.getStartTime().toLocaleTimeString()) + '</div>';
	mealDisplay += '<table width="295"><tr><td><div class="meal time">Duration: ' + convertSeconds(m.getDuration()) + '</div></td></tr></table>'; 
	mealDisplay += '<table width="295"><tr><td><div class="meal side">Left Time: ' + convertSeconds(m.getLeftSideTime()) + '</div></td><td><div class="meal side">Right Time: ' + convertSeconds(m.getRightSideTime()) + '</div></td></tr></table>';
	mealDisplay += '<table width="295"><tr><td><div class="meal time">End Time: ' + (m.getEndTime().toLocaleTimeString()) + '</div></td></tr></table>'; 
	mealDisplay += '</div>';
	
	return mealDisplay;
}

function sortStartTime(a, b) {
	return (b.getStartTime() - a.getStartTime());
}

function printDay(day) {
	return ('<div class="day">' + day + '</div>');
}

function showHistory(){
	var mls = "";
	var day = "";
	
	// Need to add days:
	//sort meals by days
	meals.sort(sortStartTime);
		
	for (i=0; i < meals.length; i++)
	{
		if (meals[i].getStartTime().toDateString() != day)
		{
			day = meals[i].getStartTime().toDateString();
			mls += printDay (day);
		}
		mls += displayMeal (meals[i]);
	}
	document.getElementById('feedingHistory').innerHTML = mls;
}

function clearHistory() {
	alert ("Clearing");
	createCookie("count", 0);
	for (i=0; i < meals.length; i++){
		createCookie("meal" + i, "");
	}
	meals = [];
	show ('main');
}

function convertSeconds(s) {
	var timeString;
	var hours = parseInt( s / 3600 ) % 24;
	var minutes = parseInt( s / 60 ) % 60;
	var seconds = s % 60;
	timeString = hours + ":" + addZero(minutes) + ":" + addZero(seconds);
	return timeString;
}

// Show
// navigate to the different "pages." This keeps the variable data static
function show(page) {
	hideAll();
	if (page == "main")
	{
		document.getElementById('content').innerHTML = mainScreen;
	}
	else if (page == "feeding")
	{
		document.getElementById('content').innerHTML = feedingScreen;
	}
	else if (page == "history")
	{
		document.getElementById('content').innerHTML = historyScreen;
		getMeals();
		showHistory();
	}
	else
	{
		alert (page + " feature is not ready yet!");
		show ('main');
	}
}

// HideAll
// Hide all divs, then show the appropriate page
function hideAll() {
		document.getElementById('content').innerHTML = "";
}

// Init
// Show the main page
function init(){	
	show("main");
	if (window.PalmSystem) {
        //window.PalmSystem.stageReady();
    }
    getMeals();
}	

// ***************************************************************************
// Leftovers from original sample

var beep = function(){
    navigator.notification.beep(2);
};

	var vibrate = function(){
	  navigator.notification.vibrate(0);
	};

function roundNumber(num) {
  var dec = 3;
  var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
  return result;
}

var accelerationWatch = false;

var preventBehavior = function(e) { 
  e.preventDefault(); 
};

function fail(fail)
{
  alert(fail);
}

	// This is just to do this.
	function readFile()
	{  	
		navigator.file.read('/sdcard/phonegap.txt', fail , fail);
	}

	function writeFile()
	{
	  	navigator.file.write('foo.txt', "This is a test of writing to a file", fail, fail);
	}
	

