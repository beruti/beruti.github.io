$(document).ready(function(){
																	//-ANIMATE LAMP-has to start straight away
	  animateDiv();
	    															//animateDiv2();
	    
	});

	function makeNewPosition(){                                                 
	    
	    var H = $(window).height() - 400;
	    var W = $(window).width() - 400;
	    
	    var newH = Math.floor(Math.random() * H);                               
	    var newW = Math.floor(Math.random() * W);                                 
	    
	    return [newH,newW];                                                         
	    
	};

	function animateDiv(){
	    var newq = makeNewPosition();                                            
	    $('.a, .b').animate({top: newq[0], left: newq[1] }, function(){            
	      animateDiv();
	      });

																	//function animateDiv2(){
																	//    var newq2 = makeNewPosition();                                            
																	//    $('.b').animate({top: newq2[0], left: newq2[1] }, function(){            
																	//      animateDiv2();          
																	//    });




																	// currently moving as one - need to seperate them
																	//what does .animate() method do exactly? - how does it work to map the frames between point a and point b? vector of image frames?

//---------------------------------------------------------------------


//--CLICK AND SCORE-----

	var lamps = 0;

	var collectedItemsDisplayPanel = $('#display');

	$('.lamp').click(function(){

		lamps++;
		console.log(lamps);
		// console.log("lampTest");											
	
		//$('div').addClass("testOnClick");																							
		// it currently adds the class but doesnt adopt the styling																							
		// even when debugger applied it seems to not adopt styling
		// frame is already cycled on?
		// very confusing																							
		//debugger;		

		//$(this).fadeTo('fast', 0.5);														
																		
																					
	  console.log("You have collected " + lamps + " lamps" + " this means " + lamps*3 + " wishes");

	  collectedItemsDisplayPanel.html(lamps);
	  
	});


}; //why doesn't this need a bracket?