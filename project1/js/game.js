$(document).ready(function(){
 
  //-----------------------------------------------
  //---------Player----Comparison------------------
  //-----------------------------------------------

  var player1 = {
    score: null
  };
  //console.log(player1);
  // is an object
  var player2 = {
    score: null
  }

  function changePlayer() {
    //needs to reset all variables but store player1 score
    // so what needs to be reset? 
    // what functions will need to be run again?
    //- startEverything should be fine for animating - for setting up click event listeners 
    // targets gets set to 0 when you invoke setUpEventListeners();
    // need to pull out player1 score BUT also make sure player2 score is not written to on first go
  };
  //var player2={};
  //var players[];


  //------------------------------------------------
  // Div instructions and score - function to hide on beginning
  //------------------------------------------------

  function InstructionsHider() {
    $("div#instructionScreen").hide();
  }

  function scoreShow() {
    $("div.score").addClass("endScreenShow");
    $("div.score").removeClass("score");
  }

  //-----------------------------------------------
  //---------IGNITION----KEY-----------------------
  //-----------------------------------------------
  var startSound;    
  var gunSound; 
	var keeprunning = true;
	var startEverything = function startEverything(){
		  animateImageA();
		  animateImageB();
    animateImageC();
    animateImageD();
    animateImageE();
    animateImageF();
    animateImageG();
    animateImageH();
    animateImageRiki();
	 	setUpEventListners(); 
	 	theFinalCountDown();
    //playIntro();
    InstructionsHider();
	};

  $('.startButton').click(startEverything); 		
    
  //------------------------------------------------
  //-------MAKING TIMER + TIMEOUT FUNCTIONS---------
  //------------------------------------------------

  // decrement because you want to count down
  function theFinalCountDown(){
    var timerDisplay = $("#timerDisplay");
  	var timeCounter= 10;
  	var countDownInterval = window.setInterval(function(){
  		timeCounter--;
  		//console.log(timeCounter); // shows the counter reducing - lets put this in a physical element on the page
      timerDisplay.html("Timer " + timeCounter);

  		if(timeCounter<1){
  			clearInterval(countDownInterval);
  			// call function that stops everything
  			keeprunning = false;
        player1 === false;
  
        startSound.stop();
        // clears screen of objects when time runs out
        $('.target').remove();  
        //changes functionality of start button to refresh page
        $('.startButton').html("PLAY AGAIN?");
        $('.startButton').click(function(){ document.location.href=""; }); 

          //Show the score div
          scoreShow();
  		}
  	}, 1000);
  };

  //---------------------------------------------                                                                                                                            
  //------------------ANIMATION------------------
  //---------------------------------------------
  function makeNewPosition() {                                                 
      
      var H = $(window).height() - 50;
      var W = $(window).width() - 50;
      
      var newH = Math.floor(Math.random() * H);                               
      var newW = Math.floor(Math.random() * W);                                 
      
      return [newH,newW];                                                         
      
  };
  // is currently moving within the right dimensions but starting from wrong point
  //-----------------------------------------------------    
  //-------------------FOR EACH IMAGE--------------------
  //-----------------------------------------------------

  function animateImageA() {      
   	if (keeprunning === true) {                                      
      $('.a').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 3000, function() {   // console.log('a');          
        animateImageA();
      });
    }
  };
   
  function animateImageB() { 
   	if (keeprunning === true) {
      $('.b').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        //console.log('b');           
        animateImageB();
      });
    }                                                 
  };

  function animateImageC() { 
    if (keeprunning === true) {
      $('.c').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() { 
      // console.log('c');           
      animateImageC();
      });
    }                                                 
  };

  function animateImageD() {
    if (keeprunning === true) {
      $('.d').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() { 
      // console.log('d');           
        animateImageD();
      });
    }                                                 
  }; 

  function animateImageE() {
    if (keeprunning === true) {
      $('.e').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        // console.log('e');           
        animateImageE();
      });
    }                                                 
  };  

  function animateImageF() {       
    if (keeprunning === true) {                                      
      $('.f').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        // console.log('a');          
        animateImageF();
      });
    }
  };

  function animateImageG() {       
    if (keeprunning === true) {                                      
      $('.g').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        // console.log('a');          
        animateImageG();
      });
    }
  };

  function animateImageH() {       
    if (keeprunning === true) {                                      
      $('.h').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        // console.log('a');          
        animateImageH();
      });
    }
  };

  function animateImageRiki() {       
    if (keeprunning === true) {                                      
      $('.riki').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 333, function() {  
      // console.log('riki');          
        animateImageRiki();
      });
    }
  };  
   
  //-----------------------------------------
  //------------CLICK AND SCORE--------------
  //-----------------------------------------
	function setUpEventListners() {
    if (player1 === true) {
    	var targets = 0;
    	var collectedItemsDisplayPanel = $('#scoreDisplay');
      var endScreenShow = $("#scoreContainer");		
      console.log(endScreenShow);

    	$('.target').click(function(){
        var pointsToAdd = $(this).data("points");
        // ----gun-sound-------
         gunSound = soundManager.createSound({                                                            //create sound object
         url: 'gamemusic/pistolSound.mp3'
         }).play(); 
        //-------score--counter--
  	    targets +=pointsToAdd;
  	    console.log(targets);
        player1.score=targets;
        console.log(player1);
        //-------display---------
        collectedItemsDisplayPanel.html(" Score " + targets); 
        // add to endScreenShow div
        console.log(endScreenShow);
      });
    } else { 

      var targets = 0;
      var collectedItemsDisplayPanel = $('#scoreDisplay');
      var endScreenShow = $("#scoreContainer");   
      console.log(endScreenShow);

      $('.target').click(function() {
        var pointsToAdd = $(this).data("points");
        // ----gun-sound-------
        gunSound = soundManager.createSound({ //create sound object
          url: 'gamemusic/pistolSound.mp3'
        }).play(); 
        //-------score--counter--
        targets +=pointsToAdd;
        player2.score=targets;
        console.log(player2);
        //-------display---------
        collectedItemsDisplayPanel.html(" Score " + targets); 
        // add to endScreenShow div
        console.log(endScreenShow);
      });        
    }

    //-----------------------------------------
    //------------PLAYER score COMPARISON------
    //-----------------------------------------
    var winner = function getWinner() {
      if (player1.score > player2.score) {
        console.log("player1 wins")
      } else {
        console.log("player2 wins")
      }
    };

    //---Setting-instructions-screen---
    endScreenShow.html("<p>Score " + targets + "</p>" + "<button class='startButton'>" + "</button>");

    //$(this).fadeTo('fast', 0.5);       
    $(this).remove(); //removes element from page when clicked and score already logged
  };
   
  //------------------------------------------------
  //-------INPUT SOUND MANAGER LIBRARY-------------- //put in sound manager in html
  //----------- + --Background Music----------------

  soundManager.setup({
    url: 'soundmanager/swf',
    flashVersion: 9, // optional: shiny features (default = 8)
    // optional: ignore Flash where possible, use 100% HTML5 mode
    // preferFlash: false,
    onready: function() {
      // Ready to use; soundManager.createSound() etc. can now be called.
      console.log("soundmanager ready");  
    }
  });

  function playIntro(){
    if (keeprunning ===true) {
      startSound = soundManager.createSound({  
        //create sound object
        url: 'gamemusic/aladdin/FriendLikeMe.mp3'
      }).play(); 
    }
  };
});	