// BILD EINBINDEN: 'src="./resources/' + theme + '/' + cardValue + '.png'"
var MatchGame = {};

/* Hide win animation before game is loaded. */
var $confetti = $(".indicate-win-animation");
$confetti.hide();

/* Add functionality for buttons to choose difficulty level using numbers on cards. */
var pairs = $("#difficulty > .active").attr("pairs");

$("#difficulty").on("click", ".btn", function(){
  pairs = $(this).attr("pairs");
  $("#difficulty > .btn").removeClass("active");
  $(this).addClass("active");
  $("#game").empty();
  for (var i = 0; i < pairs * 2; i++){
    $("#game").append($("<div class='col-xs-3 card grey'></div>"))
  };
});

/* Add functionality for buttons to choose image theme. */
var theme = $("#theme > .active").attr("theme");

$("#theme").on("click", ".btn-theme", function(){
  theme = $(this).attr("theme");
  $("#theme > .btn-theme").removeClass("active");
  $(this).addClass("active");
});

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards for small board size.
*/

/* On click of "Start Game" button, sets up a new game. */
$(document).on("click", ".btn-start", function(){
    var $game = $("#game");
    var randomCards = MatchGame.generateCardValues(pairs);
    console.log(randomCards);
    MatchGame.renderCards(randomCards, $game);
    $confetti.hide();
});

/* Add timer that starts running when start button is pressed
   Stopp timer when game is not played. Start gamer by clicking start button.*/
function timer(num) {
    return (num < 10 ? "0" : "") + num;
  };

 var start = new Date;

 setInterval(function() {
  var total_seconds = (new Date - start) / 1000;

  var hours = Math.floor(total_seconds / 3600);
  total_seconds = total_seconds % 3600;

  var minutes = Math.floor(total_seconds / 60);
  total_seconds = total_seconds % 60;

  var seconds = Math.floor(total_seconds);

  hours = timer(hours);
  minutes = timer(minutes);
  seconds = timer(seconds);

  var currentTimer = hours + ":" + minutes + ":" + seconds;

  $(".timer").text(currentTimer);
}, 1000);

//var timer = setInterval(myFunction, 3000);
//clearInterval(timer);

/*$("<div class='col-xs-3 card'></div>").click(function(){
  if($("#game").data("cardsRemaining") == 0) {
    $(".timer").clearInterval();
  };
});*/


/*
  Generates and returns an array of matching card values.
*/

MatchGame.generateCardValues = function (pairs) {

  /*
  Create a sequentially-ordered — in ascending order — array with two copies
  of every number from 1 through 8
  */
  var orderedArray = [];
  for (var i = 1; i <= pairs ; i++){
    orderedArray.push(i, i);
  };

  /*
  Randomly transfer those values to a new array
  */
  var randomArray = [];
  var x = 0;
  var y = (pairs * 2);
  while (x < (pairs * 2)){
    var index = Math.floor(Math.random() * y);
    randomArray.push(orderedArray.splice(index,1)[0]);
    y--;
    x++;
  };

  /*
  Return the randomly-ordered array
  */
  return randomArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

  /*
  Empty the $game object's HTML
  */
  $game.empty();

  /*
  Add a data attribute to $game which keeps track of the flipped cards.
  This should be initially set equal to an empty array.
  */
  $game.data("flippedCards", []);

  /*
  Generate jQuery objects for each card, including data about the value,
  color, and flipped status of each card.
  */

  var colorArray = ["hsl(25,85%,65%)", "hsl(55,85%,65%)", "hsl(90,85%,65%)", "hsl(160,85%,65%)",
    "hsl(220,85%,65%)", "hsl(265,85%,65%)", "hsl(310,85%,65%)", "hsl(360,85%,65%)",
    "hsl(25,85%,65%)", "hsl(55,85%,65%)", "hsl(90,85%,65%)", "hsl(160,85%,65%)",
    "hsl(123,85%,65%)", "hsl(83,85%,65%)", "hsl(10,85%,65%)", "hsl(37,85%,65%)"];

  for (var i = 0; i < cardValues.length; i++){
// BILD EINBINDEN: 'src="./resources/' + theme + '/' + cardValue + '.png'"
    var value = cardValues[i];
    var color = colorArray[value - 1];
    var data = {value: value, color: color, flipStatus: false};

    var $card = $("<div class='col-xs-3 card'></div>");
    $card.data(data);

    /* var $card = $("<div class='col-xs-3 card'></div>").data("value", {
      value: cardValues[i], color: colorArray[cardValues[i] - 1], flipStatus: "false"
    })*/

    /*
    Add the card objects to the $game object.
    */
    $game.append($card);

    /* Initialize card counter. */
    $game.data("cardsRemaining", cardValues.length);
  };

  /*
  Add an event listener at the end of .renderCards(). This listener should call
  .flipCard() whenever a card is clicked.
  */
   $(".card").click(function(){
     MatchGame.flipCard($(this), $game);
   });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

 /*
 Check if card is already flipped.
 If card not flipped yet, create card:
   Flip card, change background color, add number, change flipStatus to true
   Push card into game array.
   Check if two cards are flipped and match.
     If both cards match:
       leave cards flipped over, change color to grey.
     If both cards do not match:
       flip back over, clear game array of flipped cards.
 If card flipped already:
   Exit function.
 Add a delay to the flip.
 */

MatchGame.flipCard = function($card, $game) {

 if ($card.data("flipStatus")){
   return;
 }

 $card.css("background-color", $card
  .data("color"))
  .data("flipStatus", true)
  .append('<img class="card-image" src="./resources/images/theme/' + theme + '/' + $card.data("value") + '.png" />');
 $game.data("flippedCards").push($card);

 if ($game.data("flippedCards").length == 2) {
   if ($game.data("flippedCards")[0].data("value") === $game.data("flippedCards")[1].data("value")) {
     var matching = {
       backgroundColor: "rgb(153,153,153)",
       color: "rgb(204,204,204)"
       };
       $game.data("flippedCards")[0].css(matching);
       $game.data("flippedCards")[1].css(matching);
       $game.data("flippedCards", []);

       /* If match found update card counter. */
       var newRemaining = $game.data("cardsRemaining") - 2;
       $game.data("cardsRemaining", newRemaining);
       //console.log("after substract: " + $game.data("cardsRemaining"))

       /* Check win condition. */
       if ($game.data("cardsRemaining") == 0) {
         $confetti.show();
       };

    } else {

      /* No match found. Deactivate click events. */
        $(".card").off("click");
        /* Start timer for 350ms. */
        setTimeout(function(){
          /* After timer expired, flip cards back and enable click events again. */
          var resetCss = {
            backgroundColor: "rgb(32,64,86)",
            color: "rgb(255,255,255)"
          };

          $game.data("flippedCards")[0].css(resetCss).text("").data("flipStatus", false);
          $game.data("flippedCards")[1].css(resetCss).text("").data("flipStatus", false);
          $game.data("flippedCards", []);

          $(".card").click(function(){
            MatchGame.flipCard($(this), $game);
          });

        }, 350);

    }
   }
};
