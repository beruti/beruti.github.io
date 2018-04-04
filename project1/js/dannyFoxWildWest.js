$(document).ready(function(){

  //-----------------------------------------------
  //---------Initial Conditions------------------
  //-----------------------------------------------

  //create player objects
  //with score counters set to zero
  var player1 = {score: null};
  var player2 = {score: null};

  var startSound;
  var gunSound;
  var keepRunning = true;
  var secondPlayerAnimate = false;
  function startEverything(){
    animateTargetImages();
    setUpEventListeners();
    theFinalCountDown();
    playBackingMusic();
    hideInstructions();
  };

  function startEverythingForPlayer2(){
      hideScoreForSecondRound();
      animateTargetImages();
      setUpEventListeners();
      theSecondFinalCountDown();
      playBackingMusic();
    };

  $('.startButton').click(startEverything);

  //------------------------------------------------
  //-------IMPORT SOUND MANAGER LIBRARY-------------
  //--------Configure Background Music--------------

  soundManager.setup({
    url: 'soundmanager/swf',
    flashVersion: 9,
    onready: function() {
      // Ready to use; soundManager.createSound() etc. can now be called.
      console.log("soundmanager ready");
    }
  });

  function playBackingMusic(){
    if (keepRunning ===true || secondPlayerAnimate === true) {
      startSound = soundManager.createSound({
        //create sound object
        url: 'gamemusic/aladdin/FriendLikeMe.mp3'
      }).play();
    }
  };
  //------------------------------------------------
  // Div instructions and score - function to hide on beginning
  //------------------------------------------------

  function hideInstructions() {
    $("div#instructionScreen").hide();
  }

  function showScoreToggle() {
    $("div#scoreContainer").addClass("endScreenShow");
    $("div#scoreContainer").removeClass("score");
  }

  function hideScoreForSecondRound(){
    $("div#scoreContainer").removeClass("endScreenShow");
    $("div#scoreContainer").addClass("score");
    $(".target").show();
  }

  //-----------------------------------------
  //------------Decide Winner By Score Comparison------
  //-----------------------------------------

  var winner = null;
  function getWinner() {
    if (player1.score > player2.score) {
     winner = "player1 wins";
    } else {
     winner = "player2 wins";
    }
  };
  console.log(winner)



  //-----------------------------------------
  //------------CLICK AND SCORE--------------
  //-----------------------------------------

  function setUpEventListeners() {
    var targets;
    if (keepRunning === true) {
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
       //---Setting-end-screen---
       endScreenShow.html("<p>Score " + targets + "</p>" + "<button class='startButton' >" + "</button>").css("margin","auto");
       //removes element from page when clicked and score already logged
       $(this).hide();

      });
    } else {

      targets = 0;
      var collectedItemsDisplayPanel = $('#scoreDisplay');
      var endScreenShow = $("#scoreContainer");
      $('.target').off();
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
        //---Setting-end-screen---
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
    var timeInSeconds= 10;
    var countDownInterval = window.setInterval(function(){
      timeInSeconds--;
      timerDisplay.html("Timer " + timeInSeconds);

      if(timeInSeconds<1){
        clearInterval(countDownInterval);
        // call function that stops everything
        keepRunning = false;
        startSound.stop();
        secondPlayerAnimate = true;
        // clears screen of objects when time runs out
        $('.target').hide();
        $('.startButton').html("PLAYER2");
       //Show the score div
       showScoreToggle();

        $('.startButton').click(startEverythingForPlayer2);
        }
    }, 1000);
  };

  function theSecondFinalCountDown(){
    var timerDisplay = $("#timerDisplay");
    var timeInSeconds= 10;
    var countDownInterval = window.setInterval(function(){
      timeInSeconds--;
      //console.log(timeInSeconds); // shows the counter reducing - lets put this in a physical element on the page
      timerDisplay.html("Timer " + timeInSeconds);

      if(timeInSeconds<1){
        clearInterval(countDownInterval);
        // call function that stops everything
        startSound.stop();
        // clears screen of objects when time runs out
        $('.target').remove();
        //Show the score div
        showScoreToggle();
        //getWinner();
        //changes functionality of start button to refresh page
        $('.startButton').html("PLAY AGAIN?");
        $('.startButton').click(function(){ document.location.href=""; });

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
  
  //-----------------------------------------------------
  //-------------------FOR EACH IMAGE--------------------
  // issue that if you make it a single function, the images all move together 
  //-----------------------------------------------------
  function animateBillyTarget() {
    if (keepRunning === true || secondPlayerAnimate === true) {
      $('.billy').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 3000, function() {   // console.log('a');
        animateBillyTarget();
      });
    }
  };

  function animateTargetImageA() {
    if (keepRunning === true || secondPlayerAnimate === true) {
      $('.a').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        animateTargetImageB();
      });
    }
  };

  function animateTargetImageB() {
    if (keepRunning === true || secondPlayerAnimate === true) {
      $('.b').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
      animateTargetImageC();
      });
    }
  };

  function animateTargetImageC() {
    if (keepRunning === true || secondPlayerAnimate === true) {
      $('.c').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        animateTargetImageD();
      });
    }
  };

  function animateTargetImageD() {
    if (keepRunning === true || secondPlayerAnimate === true) {
      $('.d').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        animateTargetImageE();
      });
    }
  };

  function animateTargetImageE() {
    if (keepRunning === true || secondPlayerAnimate === true) {
      $('.e').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        animateTargetImageF();
      });
    }
  };

  function animateTargetImageF() {
    if (keepRunning === true || secondPlayerAnimate === true) {
      $('.f').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        animateTargetImageG();
      });
    }
  };

  function animateTargetImageG() {
    if (keepRunning === true || secondPlayerAnimate === true) {
      $('.g').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 1000, function() {
        animateTargetImageH();
      });
    }
  };

  function animateTargetImageRiki() {
    if (keepRunning === true || secondPlayerAnimate === true) {
      $('.riki').animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 333, function() {
        animateTargetImageRiki();
      });
    }
  };

  // var imageClassArray = [".a", ".b", ".g"]
  // function animateTargetImage(){
  //   for (i=0; i<imageClassArray.length; i++){
  //     if (keepRunning === true || secondPlayerAnimate === true) {
  //       console.log("'" + imageClassArray[i] + "'")
  //       $("'" + imageClassArray[i] + "'").animate({top: makeNewPosition()[0], left: makeNewPosition()[1] }, 333, function() {
  //         animateTargetImage();
  //       });
  //     }
  //   }
  // }

  function animateTargetImages(){
    animateBillyTarget();
    // animateTargetImage();
    animateTargetImageA();
    animateTargetImageB();
    animateTargetImageC();
    animateTargetImageD();
    animateTargetImageE();
    animateTargetImageF();
    animateTargetImageG();
    animateTargetImageRiki();
  }

});
