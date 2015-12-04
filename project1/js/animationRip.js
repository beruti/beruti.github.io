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

