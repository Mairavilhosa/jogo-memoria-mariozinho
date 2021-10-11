const cards = document.querySelectorAll('.card');
let hasFlipperedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() { /* pra virar carta*/
    if(lockBoard) return;
    if(this === firstCard) return; /* condicional que trava o jogo */

    this.classList.add('flip');
    if(!hasFlipperedCard) {
        hasFlipperedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlipperedCard = false;
    checkForMatch();
}

function checkForMatch() { /* checa se as cartas são iguais, senão ela desvira */
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

/* caso não seja igual, a carta precisa se virar de novo*/
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip'); /* as cartas voltam ao que era antes */
        secondCard.classList.remove('flip'); /* as cartas voltam ao que era antes */
       
        resetBoard();
    }, 1500);
}    
/*bloquear o tabuleiro = lockBoard antes e depois do settimeout*/

function resetBoard() {
/* desestruturar o array com variaveis iniciais e lockBoard. É basicamente criar um outro array com a propriedade de cada um dos indices que a gente ta tratando*/
    [hasFlipperedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() { /* embaralha cartas. mexe com tributo ordem do css */
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

/* adiciona evento de clique na carta */
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});




