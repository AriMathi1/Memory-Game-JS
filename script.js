const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
const movesCounterElement = document.getElementById('movesCounter');


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    incrementMoves();
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework ===
        secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}


function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 20);
        card.style.order = randomPos;
    });
};

function incrementMoves() {
    moves += 1;
    movesCounterElement.textContent = `Moves: ${moves}`; 
};

function restartGame() {
    moves = 0;
    movesCounterElement.textContent = `Moves: ${moves}`;
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    resetBoard();
    shuffle();
};

shuffle();

document.getElementById('restartButton').addEventListener('click', restartGame);

cards.forEach(card => card.addEventListener('click', flipCard));