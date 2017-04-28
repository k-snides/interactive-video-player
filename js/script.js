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
	var currentVolume;
	var currentSpeed;
	
	// Gets all the p elements for transcript highlighting
	var transcriptElements   = document.getElementsByTagName('p');

	// Selects volume and speed class for visual indication
	var visualVolume         = document.querySelectorAll('.vol-level');
	var visualSpeed          = document.querySelectorAll('.spd-level');

	// Sets inital volume at half
	video.volume = .5;
	
	
	/**
	 * [visualControlsIndicator - Displays volume and speed indicators]
	 */
	var visualControlsIndicator = function(visualLevel, visual) {

		// If volume or speed is maxed...
		if (visualLevel >= 9) {
			// Display 9 as the maximum
			visualLevel = 9;
		}

		// If volume or speed is set to 1...
		if (visualLevel <= 1) {
			// Display 1 as the minimum
			visualLevel = 1;
		}

		// var visualLevelRounded = Math.round(visualLevel);
		
		// Loops through the current volume or speed
		// and sets the background color to orange
		for (var i = 0; i < visualLevel; i++) {
			visual[i].style.backgroundColor = "orange";
		}

		// Any volume or speed greater than the visualLevel
		// length array backgrounds are set to transparent
		visual[i].style.backgroundColor = "transparent";
	};


	/**
	 * [getDuration - Gets video duration and displays it]
	 */
	var getDuration = function() {
		var displayLength = document.getElementById('vidLength');
		
		// Gets the duration of the video
		var vidLength = video.duration;

		// Rounds down video length and displays it
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

		// Video is paused and goes back to the beginning
		video.currentTime = 0;
	};

	
	/**
	 * [ccOnOff - Toggles cc on and off]
	 */
	var ccOnOff = function() {
		// if button is unchecked/off cc will be hidden
		if (cc.checked === false) {
			video.textTracks[0].mode = "hidden";
		}
		// otherwise if button is checked/on cc will be showing
		else {
			video.textTracks[0].mode = "showing";
		}
	};


	/**
	 * [displayVideoCurrentTime - displays video current time]
	 */
	var displayVideoCurrentTime = function() {
		var videoCurrentTime = document.getElementById('videoCurrentTime');

		// Rounds current video time down
		var displayVideoTime = Math.floor(video.currentTime);

		// if displayVideoTime is less than 10
		// a '0' will display before the displayVideoTime
		displayVideoTime = displayVideoTime < 10 ? '0' + displayVideoTime : displayVideoTime;

		// Displays the current video time after the '00:'
		displayVideoTime = '00:' + displayVideoTime + ' /';
		videoCurrentTime.textContent = displayVideoTime;
	};


	/**
	 * [hightlightTranscript - hightlights transcript while video plays]
	 */
	var hightlightTranscript = function() {
		// Gets the current video time to 3 decimals places
		// to match the HTML data attributes and transcript file
		var theCurrentTime = video.currentTime.toFixed(3);

		var dataStart;
		var dataEnd;
		var start;
		var end;

		// Loops through the all the transcript <p> tags
		for (var i = 0; i < transcriptElements.length; i++) {

			// Gets the data-start and data-end HTML attribute values
			dataStart = transcriptElements[i].getAttribute('data-start');
			dataEnd   = transcriptElements[i].getAttribute('data-end');

			// Then parseFloats them and stores them
			// Must parseFloat these numbers or else they will not work
			start     = parseFloat(dataStart);
			end       = parseFloat(dataEnd);
			
			// if the current time is between the start and end values...
			if (theCurrentTime >= start && theCurrentTime <= end) {
				// The current transcript will hightlight
				transcriptElements[i].className = "highlight";
			}
			else {
				// Otherwise they will not highlight
				transcriptElements[i].className = "";
			}
		}
	};


	/**
	 * [bufferingProgressBar description]
	 */
	var bufferingProgressBar = function() {
		// Finds out how much of the video has been downloaded
    var bufferedEnd = video.buffered.end(video.buffered.length - 1);
    
    var duration = video.duration;
    if (duration > 0) {
    	var bufferBar = document.getElementById('buffered-amount');

    	// Gets the percent of how much of the video is downloaded
    	// and is displayed in the #buffered-amount <span> tag
      bufferBar.style.width = ((bufferedEnd / duration) * 100) + "%";
    }
  }


	/**
	 * [updateProgressBar - updates progress bar as video plays]
	 */
	var updateProgressBar = function() {
		var progressBar     = document.getElementById('progress-bar');
		var progressPercent = document.getElementById('progressPercent');
		
		// Gets the progress of the video with the formula below
		// Then is displayed in CSS using progress[value]::-webkit-progress-value
		var percentage = Math.floor((100 / video.duration) * video.currentTime);
		
		// The video percentage is stored in the progressBar.value
		progressBar.value = percentage;
		
		// Displays the video progress percent
		progressPercent.textContent = percentage + '%';

		// Click on progress bar to be taken to that part of video
		progressBar.addEventListener("click", function(event) {
			var percent = event.offsetX / this.offsetWidth;
	    video.currentTime = percent * video.duration;
		}, false);
	};



	// ----- Event Listeners ----- //
	
	// Calls the getDuration() when the video info is loaded; 
	video.addEventListener("loadedmetadata", getDuration, false);
	
	// Video plays or pauses on click
	video.addEventListener("click", playOrPause, false);

	// Video plays on click of play button overlay
	playPauseOverlay.addEventListener("click", playOrPause, false);
	
	// Buffer/Loading progress bar
	video.addEventListener("progress", bufferingProgressBar, false);
	
	// When the current time updates,
	// calls the displayVideoCurrentTime() function
	video.addEventListener("timeupdate", displayVideoCurrentTime, false);

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

	// When video ends, video pauses and displays play icon
	video.addEventListener("ended", function() {
		pause();
	}, false);

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

	// Display Progress bar
	video.addEventListener("timeupdate", updateProgressBar, false);

	// Toggles cc on and off
	cc.addEventListener("click", ccOnOff, false);


	// Turns volume down 10%
	volumeDown.addEventListener("click", function() {
		video.volume -= 0.1;
		
		// Sets video volume to one decimal place
		video.volume.toFixed(1);
		
		// Video volume is multiplied by 10 for 
		// visualControlsIndicator function
		currentVolume = video.volume * 10;

		// Displays volume indicator when decreased
		visualControlsIndicator(currentVolume, visualVolume);

		// if video volume is less that 0.1...
		if (video.volume.toFixed(1) <= 0.1) {
			// It is set to 0.1
			video.volume = 0.1;
		}

		// if video is muted...
		if (video.muted) {
			// Pressing a volume button unmutes it
			muteOrUnmute();
		}
	}, false);


	// Turns volume up 10%
	volumeUp.addEventListener("click", function() {
		video.volume += 0.1;
		
		// Sets video volume to one decimal place
		video.volume.toFixed(1);

		// Video volume is multiplied by 10 for 
		// visualControlsIndicator function
		currentVolume = video.volume * 10;

		// Displays volume indicator when increased
		visualControlsIndicator(currentVolume, visualVolume);

		// if video volume is greater that 0.9...
		if (video.volume.toFixed(1) >= 0.9) {
			// It is set to 0.9
			video.volume = 0.9;
		}

		// if video is muted...
		if (video.muted) {
			// Pressing a volume button unmutes it
			muteOrUnmute();
		}
	}, false);

	
	// Slows down play back speed by 10%;
	slower.addEventListener("click", function() {
		video.playbackRate -= .1;

		// Sets play back speed to one decimal place
		video.playbackRate.toFixed(1);
		
		// Video speed is multiplied by 10 then subtracted 
		// by 5 for visualControlsIndicator function
		currentSpeed = (video.playbackRate * 10) - 5;

		// Displays speed indicator when decreased
		visualControlsIndicator(currentSpeed, visualSpeed);

		// if video play back rate is below 0.5 
		// play back rate becomes distorted and freezes
		if (video.playbackRate <= 0.5) {
			// So video play back will go no lower than 0.5
			video.playbackRate = 0.5;
		}
	}, false);


	// Speeds up play back speed by 10%;
	faster.addEventListener("click", function() {
		video.playbackRate += .1;

		// Sets play back speed to one decimal place
		video.playbackRate.toFixed(1);
		
		// Video speed is multiplied by 10 then subtracted 
		// by 5 for visualControlsIndicator function
		currentSpeed = (video.playbackRate * 10) - 5;
		visualControlsIndicator(currentSpeed, visualSpeed);
		
		// Play back rate is maxed at 1.5
		// for visual visual controls indicator
		if (video.playbackRate >= 1.5) {
			video.playbackRate = 1.5;
		}
	}, false);


	// Video to Full Screen mode
	fullScreen.addEventListener("click", function() {
		// All other browsers
		if (video.requestFullscreen) {
      video.requestFullscreen();
    }
    // Firefox
    else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    }
    // Chrome and Sarit
    else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
	}, false);

}// end of init function
		

	
	
// })(jQuery);