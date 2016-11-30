// (function($) {

window.onload = init;

/**
 * [init - Main function runs on page load]
 */
function init() {
	// Global Variables
	var video      = document.getElementById('theVideo');
	var playPause  = document.getElementById('playPause');
	var restart    = document.getElementById('restart');
	var videoEnd   = document.getElementById('videoEnd');


	/**
	 * [displayVideoCurrentTime - displays video current time]
	 */
	function displayVideoCurrentTime() {
		var videoCurrentTime = document.getElementById('videoCurrentTime');
		var displayVideoTime = Math.floor(video.currentTime);
		displayVideoTime = displayVideoTime < 10 ? '0' + displayVideoTime : displayVideoTime;
		displayVideoTime = '00:' + displayVideoTime + ' /';
		videoCurrentTime.textContent = displayVideoTime;
	}


	/**
	 * [displayVideoLength - displays length of video]
	 * @param  {[number]} vidLength [length of video]
	 */
	function displayVideoLength(vidLength) {
		vidLength = Math.floor(vidLength);
		// Display video duration
		var displayLength = document.getElementById('vidLength');
		vidLength = '00:' + vidLength;
		displayLength.textContent = vidLength;
	}


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

	// Get video length for duration display
	var vidLength  = video.duration;
	displayVideoLength(vidLength);

	// Get video current time for display
	video.ontimeupdate = function() {
		displayVideoCurrentTime();
	};
	
	// Skips to the beginning of the video
	restart.addEventListener("click", function() {
		video.currentTime = 0;
	}, false);

	// Skips to the end of the video
	videoEnd.addEventListener("click", function() {
		video.currentTime = vidLength;
	}, false);
}// end of init function


		

	
	
// })(jQuery);