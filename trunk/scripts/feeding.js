// Classes

// Meal Class
// Defines a meal, which consists of two sides
// This will be stored in the history
function Meal () {
	this.rightSideTime = 0;
	this.leftSideTime = 0;
	this.startTime = -1;
	this.endTime = 0;
	this.duration = 0;
	
	this.clear = function (){
		this.rightSideTime = 0;
		this.leftSideTime = 0;
		this.startTime = -1;
		this.endTime = 0;
		this.duration = 0;
	}
	
	this.copy = function (m){
		this.rightSideTime = m.getRightSideTime();
		this.leftSideTime = m.getLeftSideTime();
		this.startTime = m.getStartTime();
		this.endTime = m.getEndTime();
		this.duration = m.getDuration();
	}
	
	this.clone = function() {
		var newObj = (this instanceof Array) ? [] : {};
		for (i in this) {
			if (i == 'clone') continue;
			if (this[i] && typeof this[i] == "object") {
				newObj[i] = this[i].clone();
			} else newObj[i] = this[i]
		} return newObj;
	};
	
	this.setRightSideTime = function (t){
		this.rightSideTime = t;
	};
	
	this.getRightSideTime = function (){
		return this.rightSideTime;
	};
	
	this.setLeftSideTime = function (t){
		this.leftSideTime = t;
	};
	
	this.getLeftSideTime = function (){
		return this.leftSideTime;
	};
	
	this.setStartTime = function (t){
		this.startTime = t;
	};
	
	this.getStartTime = function (){
		return this.startTime;
	};
	
	this.setEndTime = function (t){
		this.endTime = t;
	};
	
	this.getEndTime = function (){
		return this.endTime;
	};
	
	this.setDuration = function (t){
		this.duration = t;
	};
	
	this.getDuration = function (){
		return this.duration;
	};
	
	this.meal = function (rightTime, leftTime, startTime, endTime) {
		this.setRightSideTime (rightTime);
		this.setLeftSideTime  (leftTime);
		this.setStartTime     (startTime);
		this.setEndTime       (endTime);
		this.setDuration      (rightTime + leftTime);
	};
		
	this.isDone = function () {
		if (this.getRightSideTime() > 0 && this.getLeftSideTime() > 0) {
			return true;
		}
		else
		{
			return false;
		}
	};
	
	this.start = function (startTime) {
		this.setStartTime (startTime);
	};
	
	this.end = function (endTime) {
		this.setEndTime (endTime);
		this.setDuration (this.getRightSideTime() + this.getLeftSideTime());
	};
	
	this.endNow = function () {
		var d = new Date();
		//this.setEndTime (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds());
		this.setEndTime(d);
		this.setDuration (this.getRightSideTime() + this.getLeftSideTime());
	};
	
}

// Feeding Class
// AKA a single side
// This is used to keep track of a single side, during a single meal
function Feeding (side) {
	this.side = side;
	this.paused = true;
	this.startTime = -1;
	this.runTime = 0;
	this.offTime = 0;
	this.offsetTime = 0;
	
	
	this.clear = function (){
		this.side = side;
		this.paused = true;
		this.startTime = -1;
		this.runTime = 0;
		this.offTime = 0;
		this.offsetTime = 0;
	}

	this.setSide = function (s){
		this.side = s;
	};
	
	this.getSide = function (){
		return this.side;
	};
	
	this.getTime = function (){
		return this.runTime;
	};
	
	this.setRunTime = function (r){
		this.runTime = r;
	};
	
	this.setStartTime = function (t){
		this.startTime = t;
	};
	
	this.getStartTime = function(){
		return this.startTime;
	};
	
	this.setOffTime = function (t){
		this.offTime = t;
	};
	
	this.getOffTime = function(){
		return this.offTime;
	};
	
	this.setPaused = function(p) {
		this.paused = p;
	}
	
	this.isPaused = function(){
		return this.paused;
	};
	
	this.start = function (){
		if (this.isPaused())
		{
			this.setPaused (false);
			var d = new Date();
			//this.setStartTime (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds() - this.getTime());
			this.setStartTime(d);
			this.setTime();
		}
	};
	
	
	this.pause = function (){
		if (!this.isPaused())
		{
			var d = new Date();
			//this.setOffTime (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds());
			this.setOffTime(d);
			this.setRunTime (Math.floor((this.getOffTime() - this.getStartTime())/1000));
			this.setPaused (true);
		}
	};

	this.setTime = function (){
		var d = new Date();
		var time  = d - this.getStartTime();
		time = Math.floor (time/1000);
		var hours = Math.floor (time / 3600);
		var hrem  = time % 3600;
		var mins  = Math.floor (hrem / 60);
		var secs  = hrem % 60;
		document.getElementById("time").innerHTML = "<b>Time:</b> " + hours  + ":" + addZero(mins) + ":" + addZero(secs);
		
		if (!this.isPaused())
		{
			setTimeout("timer()",1000)
		}
	};
}