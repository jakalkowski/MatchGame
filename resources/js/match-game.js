var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $("#game");
  var randomCards = MatchGame.generateCardValues();
  console.log(randomCards);
  MatchGame.renderCards(randomCards, $game);
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {

  /*
  Create a sequentially-ordered — in ascending order — array with two copies
  of every number from 1 through 8
  */
  var orderedArray = [];
  for (var i = 1; i <= 8 ; i++){
    orderedArray.push(i, i);
  };

  /*
  Randomly transfer those values to a new array
  */
  var randomArray = [];
  var x = 0;
  var y = 16;
  while (x < 16){
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
    "hsl(220,85%,65%)", "hsl(265,85%,65%)", "hsl(310,85%,65%)", "hsl(360,85%,65%)"];

  for (var i = 0; i < cardValues.length; i++){

    var value = cardValues[i];
    var color = colorArray[value - 1];
    var data = {value: value, color: color, flipStatus: false};

    var $card = $("<div class='col-xs-3 card'></div>")
    $card.data(data);
    /*
    Add the card objects to the $game object.
    */
    $game.append($card);
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
 */

MatchGame.flipCard = function($card, $game) {

 console.log("beginning of function: " + $game.data("flippedCards").length)

 if ($card.data("flipStatus")){
   return;
 }

 $card.css("background-color", $card.data("color")).text($card.data("value")).data("flipStatus", true);

 $game.data("flippedCards").push($card);

 console.log("after pushing: " + $game.data("flippedCards").length)

 //console.log("game, flippedCards array has: " + $game.data("flippedCards")[0].data("value"))

 if ($game.data("flippedCards").length == 2) {

   if ($game.data("flippedCards")[0].data("value") === $game.data("flippedCards")[1].data("value")) {
     var matching = {
       backgroundColor: "rgb(153,153,153)",
       color: "rgb(204,204,204)"
       };

       $game.data("flippedCards")[0].css(matching);
       $game.data("flippedCards")[1].css(matching);

     } else {
       var resetCss = {
         backgroundColor: "rgb(32,64,86)",
         color: "rgb(255,255,255)"
       };


       $game.data("flippedCards")[0].css(resetCss).text("").data("flipStatus", false);
       $game.data("flippedCards")[1].css(resetCss).text("").data("flipStatus", false);
     }
   /* Add a delay to the flip. */

   $game.data("flippedCards", []);
   }

};
