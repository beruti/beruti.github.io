//HTML  ------   <div class='a'></div>


/* CSS

div.a {
width: 50px;
height:50px;
 background-color:red;
position:fixed;                                 //KEY POINT
    
}
*/

$(document).ready(function(){
    animateDiv();
    
});

function makeNewPosition(){                                                 //function to make new position
    
    // Get viewport dimensions (remove the dimension of the div - otherwise box could bounce outside window dimensions)         //divs height is 50px and width is 50px 
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);                                 // math.floor rounds down - to be on the safe side - for cleanliness of code
    var nw = Math.floor(Math.random() * w);                                 // math.random will always be between 1 and 0 
                                                                            // so math.random * vertical dimension will give a point relative to the dimension 
                                                                            // ie if math random = 0.36 then * h will put a vertical coordinate at 36% of total height 
    
    return [nh,nw];                                                         // not sure why in array - am now - is coordinates for NewPosition!
    
}

function animateDiv(){
    var newq = makeNewPosition();                                           // assigning function to variable newq
    $('.a').animate({ top: newq[0], left: newq[1] }, function(){            // without left - only moves up and down, without top - only moves side to side
      animateDiv();        
    });
    
};

// With Speed modifier -- overly complex

$(document).ready(function(){
    animateDiv();
    
});

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $('.a').offset();                                            // Get the current coordinates of the first element, or set the coordinates of every element, in the set of matched elements, relative to the document.
    var speed = calcSpeed([oldq.top, oldq.left], newq);                     // use function calcSpeed with arguments, previous and next position coordinates0
    
    $('.a').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();                                                         // calling the function on itself inplace of where time would normally be set, sets it for an infinite amount of time
    });
    
};
 
function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);                                      

    //The Math.abs() function returns the absolute value of a number

    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}

// ------- How to change cursor

$(document).ready(function(){
console.log($("body").length)
$("div").css('cursor','url(http://images5.fanpop.com/image/photos/30700000/Aladdin-disney-30712030-791-1024.jpg),auto');
});

