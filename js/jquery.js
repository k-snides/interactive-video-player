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
	$('#volumeUp').hover(function() {
		$('#box').fadeIn().on("click", function() {
			$(this).fadeOut();
		});
	});

	console.log('jquery');

});
