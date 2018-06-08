/*
 * Create a list that holds all of your cards
 */

const allCards = document.querySelectorAll('ul.deck li');

const resetButton = document.querySelector('.restart');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

startGame();

function showCard(card) {
  card.classList.add('open', 'show');
  //card.classList.add("show");
}

function closeCards(cardA, cardB) {
  cardA.classList.remove('open', 'show');
  cardB.classList.remove('open', 'show');
  //cardA.classList.remove("show");
  //cardB.classList.remove("show");
}

function lockCards(cardA, cardB) {
  cardA.classList.add("match");
  cardB.classList.add("match");
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// to access stars using DOM

var stars = document.querySelectorAll('ul.stars');

// to remove children:

// stars.removeChild([0]);

function createCard(className) {
  // let elem = document.createElement(tagName[, options]);
}

function generateGameboard() {

}

function compareCards(cardA, cardB) {
  console.log("comparing: " + cardA, cardB)
  if(cardA.innerHTML === cardB.innerHTML) {
      console.log("MATCH");
      return true;
      // deactiveteCards(cardA, cardB);
  }
  else {
    console.log("NO match");
    closeCards(cardA, cardB);
    return false;
  };
}

function gameOver() {
  // if matchedCards.length === 16 it's a win!
  // else - gameOver
}

let lastFlipped = null;
let totalClicked = 0;

// get list of al cards and loop through each:

function startGame() {
  // add event listeners
  document.querySelectorAll('li.card').forEach(function(card) {
    card.addEventListener('click', function _handler() {
      totalClicked += 1;
      console.log(totalClicked);
      setTimeout(function(){ showCard(card); }, 200);
      if (lastFlipped) {
        console.log(lastFlipped, card);
        compareCards(lastFlipped, card);
        lastFlipped = null;
      }
      else {
        lastFlipped = card;
        console.log("else " + card);
      };
    })
  });
};

// to reset Event listener:

function deactiveteCards(cardA, cardB) {

}

// to shuffle:

shuffle(Array.from(allCards));
// then appened shuffled cards back to the DOM

// to start-reset timer:

let time = 0;
let timer;
let initialClick = false; // once clicked - change to true, startTimer

function startTimer() {
   timer = setInterval(function() {
    time++;
    console.log(time);
  }, 1000);
};

function clearTImer() {
  clearInterval(timer);
};

resetButton.addEventListener('click', function() {
  clearTImer();
  startTimer();
})

// do not start the timer when user clicks off the Gameboard !!!



/* TODO:

OUTLINE features first:

create Gameboard

create card

flip card

match cards

change score/stars

local storage??

*/
