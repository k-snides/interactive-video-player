// (function($) {

window.onload = init;

/**
 * [init - Main function runs on page load]
 */
function init() {
	
	// Global Variables
	var video         = document.getElementById('theVideo');
	var playPause     = document.getElementById('playPause');
	var muteUnmute    = document.getElementById('muteUnmute');
	var restart       = document.getElementById('restart');
	var videoEnd      = document.getElementById('videoEnd');
	var rewind        = document.getElementById('rewind');
	var forward       = document.getElementById('forward');
	var volumeUp      = document.getElementById('volumeUp');
	var volumeDown    = document.getElementById('volumeDown');
	var fullScreen    = document.getElementById('fullScreen');



	// TODO: Get duration to show properly and not NaN
	// video.addEventListener("loadedmetadata", function() {
	// 	var duration = video.duration;
	// 	console.log(duration);
	// }, false);
	

	// Get video duration
	// var vidLength  = video.duration;
	// console.log(vidLength);
	// vidLength = Math.floor(vidLength);
	// console.log(vidLength);


	// Display vidLength
	var displayLength = document.getElementById('vidLength');
	var vidLength = video.duration;
	console.log(vidLength);

	vidLength = Math.floor(vidLength);
	vidLength = '00:' + vidLength;
	displayLength.textContent = vidLength;

	console.log(vidLength);

	// Get video length for duration display
	// var vidLength  = video.duration;
	// displayVideoLength(vidLength);

	
	/**
	 * [playOrPause - Plays video and toggles play/pause button]
	 * @return {[type]} [description]
	 */
	var playOrPause = function() {		
		// if video is paused, play video and display pause icon
		if (video.paused) {   
		    video.play();
		    playPause.setAttribute('src', 'icons/pause-icon.png');
		    playPause.setAttribute('alt', 'Pause button');
		}
		// otherwise if video is playing, pause video and display play icon
		else { 
		    video.pause();
		    playPause.setAttribute('src', 'icons/play-icon.png');
		    playPause.setAttribute('alt', 'Play button');
		}
	};


	/**
	 * [muteOrUnmute - Mutes video and toggles mute/unmute button]
	 */
	var muteOrUnmute = function() {
		// if video is muted, unmute video and display unmute icon
		if (video.muted) {
			video.muted = false;
			muteUnmute.setAttribute('src', 'icons/volume-on-icon.png');
			muteUnmute.setAttribute('alt', 'Volume on button');
		}
		// otherwise if video is unmuted, mute video and display mute icon
		else {
			video.muted = true;
			muteUnmute.setAttribute('src', 'icons/volume-off-icon.png');
			muteUnmute.setAttribute('alt', 'Volume off button');
		}
	};


	/**
	 * [unmuteWithVolumeButtons - unmutes audio with volume buttons]
	 */
	var unmuteWithVolumeButtons = function() {
		// Calls muteOrUnmute() to unmute and get 'Volume off icon'
		muteOrUnmute();
		video.volume = video.volume;
	};


	/**
	 * [displayVideoCurrentTime - displays video current time]
	 */
	var displayVideoCurrentTime = function() {
		var videoCurrentTime = document.getElementById('videoCurrentTime');
		var displayVideoTime = Math.floor(video.currentTime);
		displayVideoTime = displayVideoTime < 10 ? '0' + displayVideoTime : displayVideoTime;
		displayVideoTime = '00:' + displayVideoTime + ' /';
		videoCurrentTime.textContent = displayVideoTime;
	};


	/**
	 * [displayVideoLength - displays length of video]
	 * @param  {[number]} vidLength [length of video]
	 */
	// function displayVideoLength(vidLength) {
	// 	vidLength = Math.floor(vidLength);
	// 	// Display video duration
	// 	var displayLength = document.getElementById('vidLength');
	// 	vidLength = '00:' + vidLength;
	// 	displayLength.textContent = vidLength;
	// }


	

	playPause.addEventListener("click", function() {
		playOrPause();
	}, false);

	muteUnmute.addEventListener("click", function() {
		muteOrUnmute();
	}, false);

	// Set volume at half
	video.volume = .5;
	console.log(video.volume);

	

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
		// video.currentTime = vidLength;
		video.currentTime = video.duration;
	}, false);

	// Rewind 10 seconds
	rewind.addEventListener("click", function() {
		video.currentTime -= 10;
	}, false);

	// Fast forward 10 seconds
	forward.addEventListener("click", function() {
		video.currentTime += 10;
	}, false);

	// Turns volume up 10%
	volumeUp.addEventListener("click", function() {
		video.volume += 0.1;
		if (video.volume >= 0.9) {
			video.volume = 0.9;
		}
		if (video.muted) {
			unmuteWithVolumeButtons();			
		}
		console.log(video.volume);
	}, false);

	// Turns volumen down 10%
	volumeDown.addEventListener("click", function() {
		video.volume -= 0.1;
		if (video.volume <= 0.1) {
			video.volume = 0.1;
		}
		if (video.muted) {
			unmuteWithVolumeButtons();
		}
		console.log(video.volume);
	}, false);

	// Video to Full Screen mode
	fullScreen.addEventListener("click", function() {
		if (video.requestFullscreen) {
      video.requestFullscreen();
    }
    else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    }
    else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
	}, false);

}// end of init function


		

	
	
// })(jQuery);