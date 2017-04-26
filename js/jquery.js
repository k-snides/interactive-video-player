$(function() {
	
	// jQuery Variables
	var $videoBox 					= $('#videoBox');
	var $theVideo 					= $('#theVideo');
	var $moreControlsbutton = $('#more-controls-button');
	var $sideVolume         = $('#volume-side-controls');
	var $sideSpeed          = $('#speed-side-controls');

	// hides volume and speed guage till clicked
	$sideVolume.hide();
	$sideSpeed.hide();
	



	/**
	 * [
	 * 	 When the user clicks on any sentence in the transcript
	     the video player jumps to the appropriate time in the video
	   ]
	 * @param  {[number]} ) {
	 *   var getDataStart [Gets data-start on selected <p>]
	 */
	$('#transcript p').on("click", function() {

		// Gets data-start of <p> that is clicked on
		var getDataStart = $(this).attr('data-start');

		// prevents cc overlap
		getDataStart = Math.abs(parseFloat(getDataStart) + .100);
		
		// Sets the currentTime to the <p data-start=""> attribute
		$theVideo[0].currentTime = getDataStart;
	});



	// moreControlsTimeout used for set and clear Timeout
	var moreControlsTimeout;
	var sideVolumeTimeout;



	var buttonTimeout;

	function setTimeoutButtons(functionToFade, timeToFade) {
		buttonTimeout = setTimeout(functionToFade, timeToFade);
		console.log('setTimeoutButtons function called - 5 seconds');
	}

	function clearTimeoutButtons(functionToClear) {
		clearTimeout(functionToClear);
		console.log('clearTimeoutButtons clearing function')
	}


	

	// Hides #more-controls after 7 seconds if not touched
	// function noTouchMoreControls() {
	// 	moreControlsTimeout = setTimeout(moreControlsHide, 5000);
	// 	console.log('5 seconds countdown');
	// }

	// Clears the timeout and #more-controls remains
	// function yesTouchMoreControls() {
	// 	clearTimeout(moreControlsTimeout);
	// }
	








	
	/**
	 * [moreControlsShow shows more controls when
	 * 									 certain events are fired]
	 */
	var moreControlsShow = function() {
		$('#more-controls').addClass('more-controls-panel');
		$('#progress-bar, .buffered').removeClass('progress-bottom');
		$('.hide-main-controls').delay(500).fadeIn(600);
	};


	/**
	 * [moreControlsHide hides more controls when
	 * 									 certain events are fired]
	 */
	var moreControlsHide = function() {
		$('#more-controls').removeClass('more-controls-panel');	
		$('#progress-bar, .buffered').addClass('progress-bottom');
		$('.hide-main-controls').fadeOut(600);
	};


	// Calls moreControlsShow() function on $videoBox mouseenter and click
	$videoBox.on("click mouseenter", function() {
		moreControlsShow();
	});

	// Calls moreControlsShow() function on $theVideo mousemove
	// $theVideo.on("mousemove", function() {
	// 	moreControlsShow();
	// });

	// Calls moreControlsHide() function on $videoBox mouseleave
	$videoBox.on("mouseleave", function() {
		moreControlsHide();
	});

	// var timer;
	var volumeTimer;
	var speedTimer;

	// var showVolumeAndSpeedGuage = function(guage) {

			// if (guage === $sideVolume) {
			// 	timer = $sideVolume;
			// }
			// else {
			// 	timer = $sideSpeed;
			// }

	// 		guage.fadeIn(500);
			
	// 		if (guage.is(":visible")) {
	// 			clearTimeout(timer);
	// 			console.log('guage is visible');
	// 			timer = setTimeout(function() {
	// 				guage.fadeOut(500);
	// 				console.log('2000');
	// 			}, 2000);
	// 		}
	// 		else {
	// 			console.log('guage is INvisible');
	// 		}
	// };
	
	$('#volumeUp, #volumeDown').on("click", function() {
		// showVolumeAndSpeedGuage($sideVolume);

		console.log('volume volumeTimer beginning: ' + volumeTimer);

		$sideVolume.fadeIn(500);

		if ($sideVolume.is(":visible")) {
			clearTimeout(volumeTimer);
			volumeTimer = setTimeout(function() {
				$sideVolume.fadeOut(500);
				console.log('2000');
			}, 2000);
		}
		console.log('volume volumeTimer end: ' + volumeTimer);
	});


	$('#faster, #slower').on("click", function() {
		// showVolumeAndSpeedGuage($sideSpeed);
		
		
		console.log('speed speedTimer beginning: ' + speedTimer);

		$sideSpeed.fadeIn(500);

		if ($sideSpeed.is(":visible")) {
			clearTimeout(speedTimer);
			speedTimer = setTimeout(function() {
				$sideSpeed.fadeOut(500);
				console.log('2000');
			}, 2000);
		}

		console.log('speed speedTimer end: ' + speedTimer);
	});







	// FOR TOUCH DEVICES (since no hover capabilities)
	// #more-controls-button calls moreControlsShow() function
	$moreControlsbutton.on("click", function() {
		
		console.log('more controls button pressed');

		// Shows the #more-controls buttons
		moreControlsShow();

		// Sets timeout so #more-controls will hide
		// noTouchMoreControls();
		setTimeoutButtons(moreControlsHide, 5000);

		// When #more-controls is interacted with
		$('#more-controls').off().on("click", function() {

			// yesTouchMoreControls is called so clearTimout
			// is called and user has more time to use controls
			// yesTouchMoreControls();
			clearTimeoutButtons(buttonTimeout)

			// noTouchMoreControls is then called immediately after
			// so #more-controls will close after 7 seconds automatically
			// noTouchMoreControls();
			setTimeoutButtons(moreControlsHide, 5000);

			// This repeats till user is finished with controls
		});
	});

	




	$theVideo.off().on("click", function() {
		// yesTouchMoreControls();
		clearTimeoutButtons(moreControlsHide);

		// noTouchMoreControls();
		setTimeoutButtons(moreControlsHide, 5000);
		console.log('worky poo');
	});

	
	




	console.log('new jQuery');
	

});
