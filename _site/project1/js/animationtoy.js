$(document).ready(function(){
                                                                    //-ANIMATE LAMP-has to start straight away
      animateDivA();
      animateDivB();
      setUpEventListners();                                                             //animateDiv2();
    });

    function makeNewPosition(){                                                 
        
        var H = $(window).height() - 80;
        var W = $(window).width() - 80;
        
        var newH = Math.floor(Math.random() * H);                               
        var newW = Math.floor(Math.random() * W);                                 
        
        return [newH,newW];                                                         
        
    };

// function secondNewPosition(){
// 	var H = $('div.container').height() - 80;
// 	var W = $('div.container').width() - 80;
// 	
// 	var newH = Math.floor(Math.random() * H);                               
// 	var newW = Math.floor(Math.random() * W);                                 
// 	
// 	return [newH,newW];  

// };
  

//  function animateDiv(){
//      var newq = makeNewPosition();
//      var oldq = $('.a').offset();                                            // Get the current coordinates of the first element, or set the coordinates of every element, in the set of matched elements, relative to the document.
//      var speed = calcSpeed([oldq.top, oldq.left], newq);                     // use function calcSpeed with arguments, previous and next position coordinates0
//      
//      $('.a').animate({ top: newq[0], left: newq[1] }, speed, function(){
//        animateDiv();                                                         // calling the function on itself inplace of where time would normally be set, sets it for an infinite amount of time
//      });
//      
//  };
	function animateDivA(){    
      var newCoordinates = makeNewPosition();
      var oldCoordinates = $('.a').offset();                                  // Get the current coordinates of the first element, or set the coordinates of every element, in the set of matched elements, relative to the document.
      var speed = calcSpeed([oldCoordinates.top, oldCoordinates.left], newCoordinates);                                                                       // basically takes wherever a is and offsets from here

    $('.a').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, speed, function(){  
    	console.log('a');          
      animateDivA();
      });

	};

  function calcSpeed(prev,next){

    var x = Math.abs(prev[1] - next[1]);

    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y? x : y;

    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;


  }








  // function animateDivB(){     
  // $('.b').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, function(){ 
  // 	console.log('b');           
  //   animateDivB();
  //   });

  //                                                                 //function animateDiv2(){
                                                                    //    var newq2 = makeNewPosition();                                            
                                                                    //    $('.b').animate({top: newq2[0], left: newq2[1] }, function(){            
                                                                    //      animateDiv2();          
                                                                    //    });
	};

                                                                    // currently moving as one - need to seperate them
                                                                    //what does .animate() method do exactly? - how does it work to map the frames between point a and point b? vector of image frames?

//---------------------------------------------------------------------


	

//--CLICK AND SCORE-----
function setUpEventListners(){

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
}

