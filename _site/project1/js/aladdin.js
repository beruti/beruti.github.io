$(document).ready(function(){
//------ANIMATE LAMP------has to start straight away-------------------
	    animateDiv();
	    //animateDiv2();
	    
	});

	function makeNewPosition(){                                                 
	    
	    var H = $(window).height() - 50;
	    var W = $(window).width() - 50;
	    
	    var newH = Math.floor(Math.random() * H);                               
	    var newW = Math.floor(Math.random() * W);                                 
	    
	    return [newH,newW];                                                         
	    
	};

	function animateDiv(){
	    var newq = makeNewPosition();                                            
	    $('.a').animate({top: newq[0], left: newq[1] }, function(){            
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

	//console.log("hello");	works

	var lamps = 0;
	// console.log(lamps); //checked 
	// var clicksMeaningLampsCollected=0;

	var collectedItemsDisplayPanel = $('#display');
	// console.log(collectedItemsDisplayPanel); // why is this an array??


	$('.lamp').click(function(){

		lamps++;
		console.log(lamps);
		// console.log("lampTest");											// works - responds to .click, .dblclick, .mouseover,
		//$(this).fadeTo('slow', 1);
																									//$(this).mouseout(function(){
																									//	console.log("im outta here"); // works with mouse out too
																									//});
																									//clicksMeaningLampsCollected++;       			//increments number of lamps collected
																									//console.log(clicksMeaningLampsCollected);

	   	
	    																						//console.log(lamps);								// doesn't work - can what are you trying to push?
				
	    																						//you can push any data type to an array
	    																						// are you creating any data types on click? no
	    																						// need to have something created on click before you can put it into an array

	    
	    																						//clicksMeaningLampsCollected++;
	    																					  //console.log(clicksMeaningLampsCollected);
	  																						  //no longer pushing to array - it was
	    																					  //console.log(lamps); //have to check what is happening to array!  																					
	  console.log("You have collected " + lamps + " lamps" + " this means " + lamps*3 + " wishes");

	  collectedItemsDisplayPanel.html(lamps);
	  
	});

	
}; //why doesn't this need a bracket?