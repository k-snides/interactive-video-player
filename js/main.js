(function($) {

	// Global Variables
	var video      = document.getElementById('theVideo');
	var playPause  = document.getElementById('playPause');
	var restart    = document.getElementById('restart');
	var videoEnd   = document.getElementById('videoEnd');
	
	
	// Plays video and toggles play/pause button
	playPause.onclick = function() {	
		
		// if video is paused, play video and display pause icon
		if (video.paused) {   
		    video.play();
		    playPause.setAttribute('src', 'icons/pause-icon.png');
		}
		// otherwise if video is playing, pause video and display play icon
		else { 
		    video.pause();
		    playPause.setAttribute('src', 'icons/play-icon.png');
		}
	};
		
		
	restart.addEventListener("click", function() {
		video.currentTime = 0;
	}, false);

	videoEnd.addEventListener("click", function() {
		var getVideoDuration = video.duration;
		video.currentTime = getVideoDuration;
		console.log(getVideoDuration);
	}, false);


		

	
	
})(jQuery);