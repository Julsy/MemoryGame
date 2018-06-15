/*
 * Create a list that holds all of your cards
 */

let lastFlipped = null;
let totalClicked = 0;
let matchedPair = 0;
let stars = document.querySelectorAll('ul.stars');
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
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

createBoard();
startGame();

function showCard(card) {
  console.log("showing card");
  card.classList.add('open', 'show');
}

function closeCards(cardA, cardB) {
  console.log("closing cards");
  cardA.classList.remove('open', 'show');
  cardB.classList.remove('open', 'show');
}

function lockCards(cardA, cardB) {
  console.log("locking cards");
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

// to remove children:

// stars.removeChild([0]);

function createBoard() {
  shuffledCards = shuffle(Array.from(allCards));
  console.log(shuffledCards)
  // document.querySelector('.score-panel').append(shuffledCards);
  // then appened shuffled cards back to the DOM
  // let elem = document.createElement(tagName[, options]);
}

function generateGameboard() {

}

function compareCards(cardA, cardB) {
  console.log("comparing: ", cardA, cardB)
  if (cardA.innerHTML === cardB.innerHTML) {
      console.log("MATCH");
      lockCards(cardA, cardB);
      matchedPair += 1;
      if (matchedPair == 7) {
        gameOver();
      }
      return true;
  }
  else {
    console.log("NO match");
    setTimeout(function(){ closeCards(cardA, cardB); }, 400);
    return false;
  };
}

function gameOver() {
  console.log("WINNER");

}

function updateMoves(totalClicked) {
  document.querySelector('.moves').innerHTML = totalClicked;
}

// get list of al cards and loop through each:

function startGame() {
  // add event listeners
  allCards.forEach(function(card) {
    card.addEventListener('click', function _handler() {
      totalClicked += 1;
      updateMoves(totalClicked);
      console.log(totalClicked);
      showCard(card);
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

change score/stars

local storage??

*/
