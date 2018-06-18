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
  clearTimeout(t);
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
      if (totalClicked == 1) {
        console.log("Starting timer! totalClicked: " + totalClicked);
          startTimer();
      }
      updateMoves(totalClicked);
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

let seconds = 0;
let minutes = 0;
let hours = 0;
let t;
const timer = document.querySelector('.timer');

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    timer.textContent = "Time: " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    startTimer();
}

function startTimer() {
   t = setTimeout(add, 1000);
};

function stopTimer() {
  console.log("STOP timer");
  timer.textContent = "Time: 00:00:00";
  clearTimeout(t);
  seconds = 0;
  minutes = 0;
  hours = 0;
};

resetButton.addEventListener('click', function() {
  lastFlipped = null;
  totalClicked = 0;
  matchedPair = 0;
  updateMoves(0);
  stopTimer();
  createBoard();
  startGame();
})

/* TODO:

change stars

local storage??

responsivness

pop up

*/
