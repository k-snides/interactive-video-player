$(function() {
	
	// jQuery Variables
	var $videoBox 					= $('#videoBox');
	var $theVideo 					= $('#theVideo');
	var $moreControlsbutton = $('#more-controls-button');

	// moreControlsTimeout used for set and clear Timeout
	var moreControlsTimeout;

	// Hides #more-controls after 7 seconds if not touched
	function noTouchMoreControls() {
		moreControlsTimeout = setTimeout(moreControlsHide, 7000);
		console.log('7 seconds countdown');
	}

	// Clears the timeout and #more-controls remains
	function yesTouchMoreControls() {
		clearTimeout(moreControlsTimeout);
	}

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


	// Calls moreControlsShow() function on $videoBox mouseenter
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








	// FOR TOUCH DEVICES (since no hover capabilities)
	// #more-controls-button calls moreControlsShow() function
	$moreControlsbutton.on("click", function() {
		
		// Shows the #more-controls buttons
		moreControlsShow();

		
		


		

		// Sets timeout so #more-controls will hide
		noTouchMoreControls();

		// When #more-controls is interacted with
		$('#more-controls').off().on("click", function() {

			// yesTouchMoreControls is called so clearTimout
			// is called and user has more time to use controls
			yesTouchMoreControls();

			// noTouchMoreControls is then called immediately after
			// so #more-controls will close after 7 seconds automatically
			noTouchMoreControls();

			// This repeats till user is finished with controls
		});
	});

	// volume click test
	// $('#volumeUp').click(function() {
	// 	$('#box').fadeIn().on("click", function() {
	// 		$(this).fadeOut();
	// 	});
	// });

	$theVideo.off().on("click", function() {
		yesTouchMoreControls();
		noTouchMoreControls();
		console.log('worky poo');
	});


	







	console.log('jquery');

});
