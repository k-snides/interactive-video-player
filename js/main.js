(function($) {

	// Global Variables
	var video     = document.getElementById('theVideo');
	var playPause = document.getElementById('playPause');
	
	
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
		
		
		

	
	
})(jQuery);