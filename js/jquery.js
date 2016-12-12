// (function($) {

	$(function() {

	  var transcriptElements = $(".words");
	  var i = 0;
	  var time = 1;

	  	console.log('i at start: ' + i);
	  	console.log('time at start: ' + time);

	  	console.log('----------------------');

      $.each(transcriptElements, function() {
         var start = $(transcriptElements[i]).attr("data-start");
         console.log('start: ' + start);

         var end = new Number($(transcriptElements[i]).attr("data-start")) + 
         	new Number($(transcriptElements[i]).attr("data-dur"));
         console.log('end: ' + end);

         var startNum = parseFloat(start);
         var endNum = parseFloat(end.toFixed(3));
         console.log('startNum: ' + startNum);
         console.log('endNum: ' + endNum);

         console.log('time BEFORE if statement: ' + time);
         if (time >= startNum && time <= endNum){
              $(transcriptElements[i]).addClass("hilite");
              console.log(transcriptElements[i]);
         } else {
              $(transcriptElements[i]).removeClass("hilite");
              console.log(transcriptElements[i]);
         }
         console.log('time AFTER if statement: ' + time);

         i++;
         console.log('i: ' + i);
         console.log('time: ' + time);
         time = startNum;
         console.log('----------------------');
      });

	});






























// })(jQuery);