// (function($) {

window.onload = init;

/**
 * [init - Main function runs on page load]
 */
function init() {
	
	// Global Variables
	var video                = document.getElementById('theVideo');
	var playPause            = document.getElementById('playPause');
	var playPauseOverlay     = document.getElementById('play-pause-overlay');
	var muteUnmute           = document.getElementById('muteUnmute');
	var restart              = document.getElementById('restart');
	var videoEnd             = document.getElementById('videoEnd');
	var rewind               = document.getElementById('rewind');
	var forward              = document.getElementById('forward');
	var volumeUp             = document.getElementById('volumeUp');
	var stop				         = document.getElementById('stop');
	var volumeDown           = document.getElementById('volumeDown');
	var slower               = document.getElementById('slower');
	var faster               = document.getElementById('faster');
	var fullScreen           = document.getElementById('fullScreen');
	var cc                   = document.getElementById('cc');
	

	// var prog                 = document.getElementById('progress-bar');



	// Gets all the p elements for transcript highlighting
	var transcriptElements   = document.getElementsByTagName('p');

	// Selects volume and speed class for visual indication
	var visualVolume = document.querySelectorAll('.vol-level');
	var visualSpeed  = document.querySelectorAll('.spd-level');

	// Sets volume at half
	video.volume = .5;
	
	

	var currentVolume;
	var currentSpeed;
	

	
	
	
	console.log('new testies');

	var visualControlsIndicator = function(visualLevel, visual) {

		// console.log('visualControlsIndicator called');
		// console.log('visualControlsIndicator: ' + visualLevel.toFixed(1));

		if (visualLevel >= 9) {
			visualLevel = 9;
		}

		if (visualLevel <= 1) {
			visualLevel = 1;
		}

		var visualLevelRounded = Math.round(visualLevel);

		for (var i = 0; i < visualLevelRounded; i++) {
			visual[i].style.backgroundColor = "orange";
			// console.log('visual array: ' + i);
		}

		visual[i].style.backgroundColor = "transparent";

	};






	/**
	 * [getDuration - Gets video duration and displays it]
	 */
	var getDuration = function() {
		var displayLength = document.getElementById('vidLength');
		var vidLength = video.duration;
		console.log('vidLength: ' + vidLength);

		vidLength = Math.floor(vidLength);
		vidLength = '00:' + vidLength;
		displayLength.textContent = vidLength;
	};


	/**
	 * [pause - Pauses video and displays the play icon]
	 */
	var pause = function() {
		video.pause();
		playPause.setAttribute('src', 'icons/play-icon.png');
		playPause.setAttribute('alt', 'Play button');
		playPauseOverlay.style.display = "block";
	};

	
	/**
	 * [playOrPause - Plays video and toggles play/pause button]
	 * @return {[type]} [description]
	 */
	var playOrPause = function() {		
		// if video is paused, play video and display pause icon
		if (video.paused) {   
		 	video.play();
		 	// If play back speed is altered
		 	// pressing play will resume normal play back
		 	video.playbackRate = 1;
		 	playPause.setAttribute('src', 'icons/pause-icon.png');
		 	playPause.setAttribute('alt', 'Pause button');
		 	playPauseOverlay.style.display = "none";
		}
		// otherwise if video is playing, pause video and display play icon
		else { 
	    pause();
	    playPauseOverlay.style.display = "block";
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
	 * [stopButton - Starts video at the beginning]
	 */
	var stopButton = function() {
		pause();
		video.currentTime = 0;
	};

	
	/**
	 * [ccOnOff - Toggles cc on and off]
	 */
	var ccOnOff = function() {
		// button is unchecked/off cc will be hidden
		if (cc.checked === false) {
			video.textTracks[0].mode = "hidden";
		}
		// otherwise if button is checked/on cc will be showing
		else {
			video.textTracks[0].mode = "showing";
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

		// if (true) {
		// 	prog.addEventListener("mouseover", function() {
		// 		console.log('float thinger would appear');
		// 	}, false);
		// }
	};


	/**
	 * [hightlightTranscript - hightlights transcript while video plays]
	 */
	var hightlightTranscript = function() {
		var theCurrentTime = video.currentTime.toFixed(3);
		var dataStart;
		var dataEnd;
		var start;
		var end;

		for (var i = 0; i < transcriptElements.length; i++) {

			dataStart = transcriptElements[i].getAttribute('data-start');
			dataEnd   = transcriptElements[i].getAttribute('data-end');

			start     = parseFloat(dataStart);
			end       = parseFloat(dataEnd);
			
			if (theCurrentTime >= start && theCurrentTime <= end) {
				transcriptElements[i].className = "highlight";
			}
			else {
				transcriptElements[i].className = "";
			}
		}
	};

	/**
	 * [bufferingProgressBar description]
	 */
	var bufferingProgressBar = function() {
    var bufferedEnd = video.buffered.end(video.buffered.length - 1);
    var duration = video.duration;
    if (duration > 0) {
    	var bufferBar = document.getElementById('buffered-amount');
      bufferBar.style.width = ((bufferedEnd / duration) * 100) + "%";
    }
  }


	/**
	 * [updateProgressBar - updates progress bar as video plays]
	 */
	var updateProgressBar = function() {
		var progressBar     = document.getElementById('progress-bar');
		var progressPercent = document.getElementById('progressPercent');
		var percentage = Math.floor((100 / video.duration) * video.currentTime);
		progressBar.value = percentage;
		progressPercent.textContent = percentage + '%';

		// Click on progress bar to be taken to that part of video
		progressBar.addEventListener("click", function(event) {
			var percent = event.offsetX / this.offsetWidth;
	    video.currentTime = percent * video.duration;
		}, false);
	};


	// ----- Event Listeners ----- //
	
	// Video plays or pauses on click
	video.addEventListener("click", playOrPause, false);

	// Video plays on click of play button overlay
	playPauseOverlay.addEventListener("click", playOrPause, false);
	
	// Buffer/Loading progress bar
	video.addEventListener("progress", bufferingProgressBar, false);
	
	// When video ends, video pauses and displays play icon
	video.addEventListener("ended", function() {
		pause();
	}, false);

	// Calls the getDuration() when the video info is loaded; 
	video.addEventListener("loadedmetadata", getDuration, false);

	// Calls the playOrPause() when user clicks play/pause button
	playPause.addEventListener("click", function() {
		playOrPause();
	}, false);

	// Calls the stopButton() when user clicks stop button
	stop.addEventListener("click", stopButton, false);

	// Calls the muteUnmute() when user clicks mute/unmute button
	muteUnmute.addEventListener("click", function() {
		muteOrUnmute();
	}, false);

	// When the current time updates,
	// calls the displayVideoCurrentTime() function
	video.addEventListener("timeupdate", displayVideoCurrentTime, false);










	// Working of float indicator
	// prog.addEventListener("mouseover", displayVideoCurrentTime, false);


















	// When the current time updates,
	// calls the hightlightTranscript() function
	video.addEventListener("timeupdate", hightlightTranscript, false);
	
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





	// Turns volume down 10%
	volumeDown.addEventListener("click", function() {
		video.volume -= 0.1;
		video.volume.toFixed(1);
		console.log('volume at button press: ' + video.volume.toFixed(1));

		currentVolume = video.volume * 10;
		visualControlsIndicator(currentVolume, visualVolume);

		if (video.volume.toFixed(1) <= 0.1) {
			video.volume = 0.1;
		}
		if (video.muted) {
			unmuteWithVolumeButtons();
		}
		console.log(video.volume.toFixed(1));
	}, false);

	// Turns volume up 10%
	volumeUp.addEventListener("click", function() {
		video.volume += 0.1;
		video.volume.toFixed(1);
		console.log('volume at button press: ' + video.volume.toFixed(1));

		currentVolume = video.volume * 10;
		visualControlsIndicator(currentVolume, visualVolume);

		if (video.volume.toFixed(1) >= 0.9) {
			video.volume = 0.9;
		}
		if (video.muted) {
			unmuteWithVolumeButtons();			
		}
		console.log(video.volume.toFixed(1));
	}, false);






	
	// Slows down play back speed by 10%;
	slower.addEventListener("click", function() {
		video.playbackRate -= .1;

		video.playbackRate.toFixed(1);
		console.log('speed at button press: ' + video.playbackRate.toFixed(1));

		currentSpeed = (video.playbackRate * 10) - 5;
		visualControlsIndicator(currentSpeed, visualSpeed);

		// Video loses audio below 0.5 playbackRate and freezes
		if (video.playbackRate <= 0.5) {
			video.playbackRate = 0.5;
		}
		console.log(video.playbackRate.toFixed(1));
	}, false);

	// Speeds up play back speed by 10%;
	faster.addEventListener("click", function() {
		video.playbackRate += .1;

		video.playbackRate.toFixed(1);
		console.log('speed at button press: ' + video.playbackRate.toFixed(1));

		currentSpeed = (video.playbackRate * 10) - 5;
		visualControlsIndicator(currentSpeed, visualSpeed);
		
		// playbackRate is capped at 1.5
		// for visual indicator
		if (video.playbackRate >= 1.5) {
			video.playbackRate = 1.5;
		}
		console.log(video.playbackRate.toFixed(1));
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

	

	// Display Progress bar
	video.addEventListener("timeupdate", updateProgressBar, false);

	// Toggles cc on and off
	cc.addEventListener("click", ccOnOff, false);




}// end of init function
		

	
	
// })(jQuery);