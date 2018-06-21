let lastFlipped = null;
let totalClicked = 0;
let matchedPair = 0;

const TOTAL_PAIRS = 8;
const pop = document.querySelector('.pop');
const deck = document.querySelector('ul.deck');
const resetButton = document.querySelector('.restart');
const stars = document.querySelector('ul.stars');

let cardList = ['fa-diamond', 'fa-diamond',
				'fa-paper-plane-o', 'fa-paper-plane-o',
				'fa-anchor', 'fa-anchor',
				'fa-bolt', 'fa-bolt',
				'fa-cube', 'fa-cube',
				'fa-leaf', 'fa-leaf',
				'fa-bicycle', 'fa-bicycle',
				'fa-bomb', 'fa-bomb'];


createBoard();
startGame();

/*
 * Functions for star rating
 */

function starRating(moves) {
  if (moves === 32) {
    stars.children[0].remove();
  }
  else if (moves === 42) {
    stars.children[0].remove();
  }
  else if (moves === 52) {
    stars.children[0].remove();
  }
  else if (moves === 62) {
    stars.children[0].remove();
  }
}

function resetStars() {
  stars.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    stars.innerHTML += ('<li><i class="fa fa-star"></i></li>');
  }
}

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */

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

function generateCardHTML(card) {
	return `<li class="card"><i class="fa ${card} open show"></i></li>`;
}

/*
 * Functions for cards
 */

function showCard(card) {
  card.classList.add('open', 'show');
	card.style.pointerEvents = 'none';
}

function closeCards(cardA, cardB) {
  cardA.classList.remove('open', 'show');
  cardB.classList.remove('open', 'show');
	jQuery(cardA).removeClass('animated shake');
	jQuery(cardB).removeClass('animated shake');
}

function lockCards(cardA, cardB) {
	jQuery(cardA).addClass('animated tada');
	jQuery(cardB).addClass('animated tada');
  cardA.classList.add("match");
  cardB.classList.add("match");
}

function compareCards(cardA, cardB) {
  if (cardA.innerHTML === cardB.innerHTML) {
      lockCards(cardA, cardB);
      matchedPair += 1;
      if (matchedPair == TOTAL_PAIRS) {
        gameOver();
      }
      return true;
  }
  else {
		jQuery(cardA).addClass('animated shake');
		jQuery(cardB).addClass('animated shake');
    setTimeout(function(){ closeCards(cardA, cardB); }, 600);
    return false;
  };
}

/*
 * General game flow functions
 */

function createBoard() {
  shuffledCards = shuffle(cardList);
  shuffledCardsHTML = cardList.map(function(card) {
    return generateCardHTML(card)
  });
  deck.innerHTML = shuffledCardsHTML.join('');
}

function updateMoves(totalClicked) {
  document.querySelector('.moves').innerHTML = totalClicked;
}

resetButton.addEventListener('click', function() {
  restartGame();
})

function restartGame() {
  $('.popup-bkgr').hide();
  lastFlipped = null;
  totalClicked = 0;
  matchedPair = 0;
  updateMoves(0);
  stopTimer();
  resetStars();
  createBoard();
  startGame();
}

function gameOver() {
  clearTimeout(t);
  $('.popup-bkgr').show();
  document.getElementById('time-counter').innerHTML = timer.textContent;
  document.getElementById('moves-counter').innerHTML = totalClicked;
  document.getElementById('stars-counter').innerHTML = stars.childElementCount;;
}

function startGame() {
  const allCards = document.querySelectorAll('ul.deck li');
  allCards.forEach(function(card) {
    card.addEventListener('click', function _handler() {
      totalClicked += 1;
      if (totalClicked == 1) { startTimer(); }
      updateMoves(totalClicked);
      starRating(totalClicked);
      showCard(card);
      if (lastFlipped) {
        if (compareCards(lastFlipped, card) === false) {
					lastFlipped.style.pointerEvents = 'auto';
					card.style.pointerEvents = 'auto';
				}
        lastFlipped = null;
      }
      else {
        lastFlipped = card;
      };
    })
  });
};

/*
 * Functions for timer
 */

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

/*
 * Functions for pop-up
 */

$('.header').click(function(){
   gameOver();
});

$('.popup-close-button').click(function(){
   $('.popup-bkgr').hide();
});

/* TODO:

local storage
leaderboard

*/
