var feedingScreen = '\
		<div id="feeding" style="float:top">\
			<div id="info">\
				<h4>Info</h4>\
				<p>\
				Click a side to start the timer.  Click pause to stop timer.  Time is automatically saved, click discard to erase.\
				</p>\
			</div>\
			<div id="shrunkencontainer">\
					<div id="time"><b>Time:</b></div>\
			</div>\
			<table width="300"><tr> 			\
			 \
				<td width="100"> \
					<a href="#" class="btn large" onclick="start(\'left\');">Left</a>\
				</td> \
\
				<td width="100"> \
					<a href="#" class="btn large" onclick="pause();">||</a>\
				</td> \
\
				<td width="100"> \
					<a href="#" class="btn large" onclick="start(\'right\');">Right</a>\
				</td> \
			</tr></table>\
			<table width="300"><tr><td> \
			<a href="#" class="btn stretch" onclick="complete();">Complete</a>\
			<a href="#" class="btn stretch" onclick="discard();">Discard</a>\
			</td></tr></table>\
		</div>';