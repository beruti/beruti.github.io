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

  /*
  function changePlayer() {
    //needs to reset all variables but store player1 score
    // so what needs to be reset? 
    // what functions will need to be run again?
    //- startEverything should be fine for animating - for setting up click event listeners 
    // targets gets set to 0 when you invoke setUpEventListeners();
    // need to pull out player1 score BUT also make sure player2 score is not written to on first go
    (player1 === false);
  };
  //var player2={};
  //var players[];
  */

  // is currently selecting player2 to play and showing no scoreboard or anything

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

  function HideScoreForSecondRound(){
    $("div#scoreContainer").removeClass("endScreenShow");
    $("div#scoreContainer").addClass("score"); 
    $(".target").show();
  }

  //-----------------------------------------
  //------------PLAYER score COMPARISON------
  //-----------------------------------------

  //player1.score and player2.score need to be globally available
  // this is outside of scope! not getting called - need to take getWinner out?

  var winner = null;
  function getWinner() {
    if (player1.score > player2.score) {
     winner = "player1 wins";
    } else {
     winner = "player2 wins";
    }
  };
  console.log(winner)

  //getWinner(); // currently calling before game has happened
  // where do you want this result to print - inside end div with text

  //-----------------------------------------------
  //---------IGNITION----KEY-----------------------
  //-----------------------------------------------
  var startSound;    
  var gunSound; 
  var keeprunning = true;
  var secondPlayerAnimate = false;
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
    playIntro();
    InstructionsHider();
  };

 var startEverythingForPlayer2 = function startEverythingForPlayer2(){
      HideScoreForSecondRound(); //hiding score but none of the elements are coming back
                                 // .remove() on player1s go is completely removing elements from dom
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
      theSecondFinalCountDown();
      playIntro();

    };
  
  $('.startButton').click(startEverything);     
  
  //-----------------------------------------
  //------------CLICK AND SCORE--------------
  //-----------------------------------------
  function setUpEventListners() {
    var targets
    if (keeprunning === true) {
      targets = 0;
      var collectedItemsDisplayPanel = $('#scoreDisplay');
      var endScreenShow = $("#scoreContainer");   
    //  console.log(endScreenShow);

      $('.target').click(function(){
        var pointsToAdd = $(this).data("points");
        // ----gun-sound-------
         gunSound = soundManager.createSound({                                                            //create sound object
         url: 'gamemusic/pistolSound.mp3'
         }).play(); 
        //-------score--counter--
        targets +=pointsToAdd;
        //console.log(targets);
        player1.score=targets;
        //console.log(player1.score);
        //-------display---------
        collectedItemsDisplayPanel.html(" Score " + targets); 

       //---Setting-instructions-screen---
       endScreenShow.html("<p>Score " + targets + "</p>" + "<button class='startButton'>" + "</button>");

       //removes element from page when clicked and score already logged
       $(this).hide(); 
       
      });
    } else { 

      targets = 0;
      var collectedItemsDisplayPanel = $('#scoreDisplay');
      var endScreenShow = $("#scoreContainer");   
      //console.log(endScreenShow);
      // gets to here but doesnt restart
      $('.target').off()
      $('.target').click(function() {
        var pointsToAdd = $(this).data("points");
        // ----gun-sound-------
        gunSound = soundManager.createSound({ //create sound object
          url: 'gamemusic/pistolSound.mp3'
        }).play(); 
        //-------score--counter--
        targets +=pointsToAdd;
        player2.score=targets;
        //console.log(player2.score);
        //-------display---------
        collectedItemsDisplayPanel.html(" Score " + targets );
        console.log(player1.score);
        console.log(player2.score)
        getWinner();
        //---Setting-instructions-screen---
        endScreenShow.html("<p>Score " + targets + "</p>" + "<p>" + winner + "</p>" + "<button class='startButton'>" + "</button>");

        //removes element from page when clicked and score already logged
        $(this).remove(); 

      });        
    }

  }; 


  //------------------------------------------------
  //-------MAKING TIMER + TIMEOUT FUNCTIONS---------
  //------------------------------------------------

  function theFinalCountDown(){
    var timerDisplay = $("#timerDisplay");
    var timeCounter= 10;
    var countDownInterval = window.setInterval(function(){
      timeCounter--;
      timerDisplay.html("Timer " + timeCounter);

      if(timeCounter<1){
        clearInterval(countDownInterval);
        // call function that stops everything
        keeprunning = false;
        startSound.stop();
        secondPlayerAnimate = true;
        // clears screen of objects when time runs out
        $('.target').hide();        
        $('.startButton').html("PLAYER2");
       //Show the score div
       scoreShow();

        $('.startButton').click(startEverythingForPlayer2);
        } 
    }, 1000);
  };

  function theSecondFinalCountDown(){
    var timerDisplay = $("#timerDisplay");
    var timeCounter= 10;
    var countDownInterval = window.setInterval(function(){
      timeCounter--;
      //console.log(timeCounter); // shows the counter reducing - lets put this in a physical element on the page
      timerDisplay.html("Timer " + timeCounter);

      if(timeCounter<1){
        clearInterval(countDownInterval);
        // call function that stops everything
        startSound.stop();
        // clears screen of objects when time runs out
        $('.target').remove();  
        //Show the score div
        scoreShow();
        //getWinner();
        //changes functionality of start button to refresh page
        $('.startButton').html("PLAY AGAIN?");
        $('.startButton').click(function(){ document.location.href=""; });  // refresh page on click of button
      
        } 
    }, 1000);

  };

  //------------------------------------------- 
  //------------------ANIMATION----------------
  //-------------------------------------------

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
    if (keeprunning === true || secondPlayerAnimate === true) {                                      
      $('.a').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 3000, function() {   // console.log('a');          
        animateImageA();
      });
    }
  };
   
  function animateImageB() { 
    if (keeprunning === true || secondPlayerAnimate === true) {
      $('.b').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        //console.log('b');           
        animateImageB();
      });
    }                                                 
  };

  function animateImageC() { 
    if (keeprunning === true || secondPlayerAnimate === true) {
      $('.c').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() { 
      // console.log('c');           
      animateImageC();
      });
    }                                                 
  };

  function animateImageD() {
    if (keeprunning === true || secondPlayerAnimate === true) {
      $('.d').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() { 
      // console.log('d');           
        animateImageD();
      });
    }                                                 
  }; 

  function animateImageE() {
    if (keeprunning === true || secondPlayerAnimate === true) {
      $('.e').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        // console.log('e');           
        animateImageE();
      });
    }                                                 
  };  

  function animateImageF() {       
    if (keeprunning === true || secondPlayerAnimate === true) {                                      
      $('.f').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        // console.log('a');          
        animateImageF();
      });
    }
  };

  function animateImageG() {       
    if (keeprunning === true || secondPlayerAnimate === true) {                                      
      $('.g').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        // console.log('a');          
        animateImageG();
      });
    }
  };

  function animateImageH() {       
    if (keeprunning === true || secondPlayerAnimate === true) {                                      
      $('.h').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        // console.log('a');          
        animateImageH();
      });
    }
  };

  function animateImageRiki() {       
    if (keeprunning === true || secondPlayerAnimate === true) {                                      
      $('.riki').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 333, function() {  
      // console.log('riki');          
        animateImageRiki();
      });
    }
  };  
   
  //------------------------------------------------
  //-------INPUT SOUND MANAGER LIBRARY-------------- 
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
    if (keeprunning ===true || secondPlayerAnimate === true) {
      startSound = soundManager.createSound({  
        //create sound object
        url: 'gamemusic/aladdin/FriendLikeMe.mp3'
      }).play(); 
    }
  };
}); 