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
	

	// When mouse enters #videoBox or #button-controls
	// more controls appear and main controls fadeIn
	$('#videoBox, #button-controls').on("mouseenter", function() {
		$('#button-controls').addClass('more-controls');
		$('.hide-main-controls').fadeIn(600);	
	});

	// When mouse leaves #videoBox or #button-controls
	// more controls disappears
	$('#videoBox, #button-controls').on("mouseleave", function() {
		$('#button-controls').removeClass('more-controls');	
	});

	// When mouse leaves #videoBox
	// main controls fadeOut
	$('#videoBox').on("mouseleave", function() {
		$('.hide-main-controls').fadeOut(600);
	});


	console.log('jquery');

});
