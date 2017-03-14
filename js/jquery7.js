$(function() {
	
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
		$('#theVideo')[0].currentTime = getDataStart;
	});


	// volume hover test
	// $('#volumeUp').hover(function() {
	// 	$('#box').fadeIn().on("click", function() {
	// 		$(this).fadeOut();
	// 	});
	// });
	

	// When mouse enters #videoBox, button-controls drop down,
	// more controls appear and main controls fadeIn
	$('#videoBox').on("mouseenter", function() {
		$('#more-controls').addClass('more-controls-panel');
		$('#progress-bar, .buffered').removeClass('progress-bottom');
		$('.hide-main-controls').delay(500).fadeIn(600);	
	});

	// When mouse leaves #videoBox
	// main controls fadeOut and progress bars slide down
	$('#videoBox').on("mouseleave", function() {
		$('#more-controls').removeClass('more-controls-panel');	
		$('#progress-bar, .buffered').addClass('progress-bottom');
		$('.hide-main-controls').fadeOut(600);
	});


	
	console.log('jquery');

});
