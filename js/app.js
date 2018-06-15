/*
 * Create a list that holds all of your cards
 */

let lastFlipped = null;
let totalClicked = 0;
let matchedPair = 0;
let stars = document.querySelectorAll('ul.stars');
const deck = document.querySelector('ul.deck');
const resetButton = document.querySelector('.restart');

let cardList = ['fa-diamond', 'fa-diamond',
				'fa-paper-plane-o', 'fa-paper-plane-o',
				'fa-anchor', 'fa-anchor',
				'fa-bolt', 'fa-bolt',
				'fa-cube', 'fa-cube',
				'fa-leaf', 'fa-leaf',
				'fa-bicycle', 'fa-bicycle',
				'fa-bomb', 'fa-bomb'];

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

// to remove children:

// stars.removeChild([0]);

function generateCardHTML(card) {
	return `<li class="card"><i class="fa ${card}"></i></li>`;
}

function createBoard() {
  console.log(cardList);
  shuffledCards = shuffle(cardList);
  console.log(shuffledCards)
  shuffledCardsHTML = cardList.map(function(card) {
    return generateCardHTML(card)
  });
  deck.innerHTML = shuffledCardsHTML.join('');
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
  // create pop-up with WINNER => final score => restart the game? button
  console.log("WINNER");
}

function updateMoves(totalClicked) {
  document.querySelector('.moves').innerHTML = totalClicked;
}

// get list of al cards and loop through each:

function startGame() {
  const allCards = document.querySelectorAll('ul.deck li');
  allCards.forEach(function(card) {
    card.addEventListener('click', function _handler() {
      totalClicked += 1;
      updateMoves(totalClicked);
      // console.log(totalClicked);
      showCard(card);
      if (lastFlipped) {
        compareCards(lastFlipped, card);
        lastFlipped = null;
      }
      else {
        lastFlipped = card;
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

create Gameboard

create card

change stars

local storage??

responsivness

pop up

*/
