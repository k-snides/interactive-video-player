$(function() {
	
	// jQuery Variables
	var $videoBox 					= $('#videoBox');
	var $theVideo 					= $('#theVideo');
	var $transcriptP        = $('#transcript p');
	var $moreControlsbutton = $('#more-controls-button');
	var $sideVolume         = $('#volume-side-controls');
	var $sideSpeed          = $('#speed-side-controls');

	// hides volume and speed indicator till clicked
	$sideVolume.hide();
	$sideSpeed.hide();

	// Variables for setTimeout & clearTimeout
	var moreControlsTimeout;
	var volumeTimer;
	var speedTimer;


	// Hides #more-controls after 5 seconds if not touched
	var setMoreControls = function() {
		moreControlsTimeout = setTimeout(moreControlsHide, 5000);
	};


	// Clears the timeout and #more-controls remains
	var clearMoreControls = function() {
		clearTimeout(moreControlsTimeout);
	};


	// Shows #more-controls when certain events are fired
	// Progress bars slide up to show controls
	var moreControlsShow = function() {
		$('#more-controls').addClass('more-controls-panel');
		$('#progress-bar, .buffered').removeClass('progress-bottom');
		$('.hide-main-controls').delay(500).fadeIn(600);
	};


	// Hides more controls when certain events are fired
	// Progress bars slide down as controls hide
	var moreControlsHide = function() {
		$('#more-controls').removeClass('more-controls-panel');	
		$('#progress-bar, .buffered').addClass('progress-bottom');
		$('.hide-main-controls').fadeOut(600);
	};
	

	 // When the user clicks on any sentence in the transcript
	 // the video player jumps to the appropriate time in the video
	$transcriptP.on("click", function() {

		// Gets data-start of <p> that is clicked on
		var getDataStart = $(this).attr('data-start');

		// prevents cc overlap
		getDataStart = Math.abs(parseFloat(getDataStart) + .100);
		
		// Sets the currentTime to the <p data-start=""> attribute
		$theVideo[0].currentTime = getDataStart;
	});


	// When the user clicks on the volume buttons,
	// the volume guage appears on the right
	$('#volumeUp, #volumeDown').on("click", function() {

		$sideVolume.fadeIn(500);

		// if the volume indicator is visible
		if ($sideVolume.is(":visible")) {

			// clear the volume timer variable
			// so volume indicator stays visible
			clearTimeout(volumeTimer);

			// fade out the volume indicator 2 seconds
			// after user stops clicking
			volumeTimer = setTimeout(function() {
				$sideVolume.fadeOut(500);
			}, 2000);
		}
	});


	// When the user clicks on the speed buttons,
	// the speed indicator appears on the left
	$('#faster, #slower').on("click", function() {

		$sideSpeed.fadeIn(500);

		// if the speed indicator is visible
		if ($sideSpeed.is(":visible")) {
			
			// clear the speed timer variable
			// so speed indicator stays visible
			clearTimeout(speedTimer);

			// fade out the speed indicator 2 seconds
			// after user stops clicking
			speedTimer = setTimeout(function() {
				$sideSpeed.fadeOut(500);
				console.log('2000');
			}, 2000);
		}
	});


	// Calls moreControlsShow() function on $videoBox mouseenter and click
	$videoBox.on("click mouseenter", function() {
		moreControlsShow();
	});


	// Calls moreControlsHide() function on $videoBox mouseleave
	$videoBox.on("mouseleave", function() {
		moreControlsHide();
	});


	// FOR TOUCH DEVICES (since no hover capabilities)
	// #more-controls-button calls moreControlsShow() function
	$moreControlsbutton.on("click", function() {

		// Shows the #more-controls buttons
		moreControlsShow();

		// Sets timeout so #more-controls will hide
		setMoreControls();
		// setTimeoutButtons(moreControlsTimeout, moreControlsHide, 5000);

		// When #more-controls is interacted with
		$('#more-controls').off().on("click", function() {

			// clearMoreControls is called so clearTimout
			// is called and user has more time to use controls
			clearMoreControls();

			// setMoreControls is then called immediately after
			// so #more-controls will close after 5 seconds automatically
			setMoreControls();

			// This repeats till user is finished with controls
		});
	});

	
	$theVideo.off().on("click", function() {

		// clearMoreControls is called so clearTimout
		// is called and user has more time to use controls
		clearMoreControls();

		// setMoreControls is then called immediately after
		// so #more-controls will close after 5 seconds automatically
		setMoreControls();
	});

	
	
	// TODO: when big play overlay is pressed,
	// #more-controls will not hide


	

	console.log('test jQuery file');
});
