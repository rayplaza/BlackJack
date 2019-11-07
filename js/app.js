

// ---------------------------------functions--------------------------------------------//

// PLAY function
// First 2 cards will "randomly" be drawn from the "deck" array and placed in the  "playerHand" array and add
// the sum of the "playerHand" array to the "playerScore" variable. Run sum function to see if player wins, loses or
// draws with dealer. Run Dealer
// (display both cards showing on the screen.)

// (DEALER) another 2 cards will be "randomly" drawn from the "deck" array and placed in the "dealerHand" array and
// add the sum of the "dealerHand" array to a hidden "dealerScore" variable. Run a dealer sum function. Wait for player
// (display Front of card shown on one and back of card of the other.)

// Player sum function to calculate win loss or draw. If player reaches 5 cards player wins(5 card Nacho) (nacho libre audio 
// quote plays depending on status)

// Dealer sum function to provide some AI. If dealer sum is less then 18 hit. If dealer sum is between 18 and 21 stay.

//-----------------------------------Event Listeners--------------------------------------------------//

// when "HIT" is clicked function starts to randomly take a card from the "deck" array and place in the "playerHand"
// array. (display facing front) run sum function to see if win loss or draw. If all false then Dealer turn.

// when "STAND" is clicked players game is done and dealerHand runs.

// "DEAL" button resets the game at any point and starts play function


// ---------------------------------------Cashed Element Ref-----------------------------------------------------//
//                                      Storing the DOM element in a variable.
var dealerScore = document.querySelector('#dealer-score').getElementsByTagName('span')[0];
var playerScore = document.querySelector('#player-score').getElementsByTagName('span')[0];
var dealButton = document.querySelector('#deal');
var hitButton = document.querySelector('#hit');
var standButton = document.querySelector('#stand');
var nachoMessage = document.querySelector('#message');
var playerContainer = document.querySelector('#player');
var dealerContainer = document.querySelector('#dealer');





// ------------------------------------------App State (variables)-------------------------------------------//
//                         Objects the app needs to rememeber throughout execution

// deck Array or keys (the deck)
//      assign a value to each card in the "cards" array x 4: Maybe I will have to have a key of Cards with each card having
//      a value for each card for later summing. Ace can be 1 or 11(figure that out??)
let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A'];
let deck, playerHand, dealerHand;
let playerVal = 0;
let dealerVal = 0;
let numOfHits = 0;



const numVals = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    "T": 10,
    "J": 10,
    "Q": 10,
    "K": 10,
    "A": 11
}

class Card {
    constructor(suit, rank, isFaceUp = true) {
        this.suit = suit;
        this.rank = rank;
        this.isFaceUp = isFaceUp;
    }
    computeValue(hand){
        let total = 0
        console.log(hand)
        hand.forEach(e => {
            console.log("card rank", numVals[e.rank])
            total += numVals[e.rank]
        })
        return total
    }
}

class Deck {
    constructor() {
        this.deck = []
    }

    createDeck(suits, ranks) {
        for(let suit of suits) {
            for(let rank of ranks) {
                this.deck.push(new Card(suit, rank))
            }
        }
        return this.deck;
    }
    shuffle() {
        
        let counter = this.deck.length, temp, i;
        // This is called the Fisher-Yates algorithm. Flips indices within an array and randomize.
        while(counter) {
            i = Math.floor(Math.random() * counter--);
            temp = this.deck[counter];
            this.deck[counter] = this.deck[i];
            this.deck[i] = temp;
        }
        return this.deck;
    }

    playerDeal() {
        playerHand = [];
        while(playerHand.length < 2) {
            playerHand.push(this.deck.pop());
        }
        return playerHand;
    }

    dealerDeal() {
        dealerHand = [];
        while(dealerHand.length < 1) {
            dealerHand.push(this.deck.pop());
            dealerContainer.innerHTML = '<img id= card-back src="images/backs/red.svg">';
        }
        return dealerHand;
    }
}


// EVENT LISTENERS!!!!!!!!!!!!

dealButton.addEventListener('click', dealButtonInit);
hitButton.addEventListener('click', hitButtonInit);
standButton.addEventListener('click', standButtonInit)

// FUNCTIONS!!!!!!!!!



// My Deal Initializer function
function dealButtonInit(){
    hitButton.disabled = false;
    standButton.disabled = false;
    // need to clear for a reset()
    deck = new Deck();
    deck.createDeck(suits, ranks);
    deck.shuffle();
    console.log(playerHand = deck.playerDeal());
    console.log(dealerHand = deck.dealerDeal());
    playerCards();
    dealerCards();
    playerVal = calSum(playerHand)
    playerScore.textContent = playerVal;
    dealerVal = calSum(dealerHand)
    dealerScore.textContent = dealerVal;
}



// My Hit Initializer function
function hitButtonInit() {
    console.log("DECK: ", deck)
    playerHand.push(deck.deck.pop());
    playerCards();
    playerVal = calSum(playerHand)
    playerScore.textContent = playerVal;
    if (playerVal > 21) {
        hitButton.disabled = true;
        standButton.disabled = true;
        nachoMessage.textContent = 'YOU LOSE!';
        nachoMessage.style.color = 'red';
    } else if (playerVal == 21) {
        hitButton.disabled = true;
        standButton.disabled = true;
        nachoMessage.textContent = 'YOU WIN!';
    }
}

// My Stand Initializer function
function standButtonInit() {
    hitButton.disabled = true;

}


// Calculates the sum of the players hand
function calSum(hand){
    let total = 0
    hand.forEach(e => {
        console.log("card rank", numVals[e.rank])
        total += numVals[e.rank]
    })
    return total
}


function playerCards() {
    console.log(playerContainer)
    if(numOfHits == 1){
        playerHand.forEach(function(i) {
            let nextCardImg = document.createElement('img');
            nextCardImg.setAttribute('src', cardImg(i));
            nextCardImg.style.width = "100px";
            nextCardImg.style.border = "1px solid black";
            nextCardImg.style.borderRadius = "5px";
            nextCardImg.style.margin = "10px";
            nextCardImg.style.backgroundColor = "rgb(152, 210, 230)";
            playerContainer.appendChild(nextCardImg);
        })
    } else {
        playerHand.forEach(function(i, x) {
            if(x >= numOfHits){
                let nextCardImg = document.createElement('img');
                nextCardImg.setAttribute('src', cardImg(i));
                nextCardImg.style.width = "100px";
                nextCardImg.style.border = "1px solid black";
                nextCardImg.style.borderRadius = "5px";
                nextCardImg.style.margin = "10px";
                nextCardImg.style.backgroundColor = "rgb(152, 210, 230)";
                playerContainer.appendChild(nextCardImg);
            }
        })
    }
    numOfHits++
}


// Get these cards to display????????
function dealerCards() {
    console.log(dealerContainer)
    if(numOfHits == 1){
        dealerHand.forEach(function(i) {
            let nextCardImg = document.createElement('img');
            nextCardImg.setAttribute('src', cardImg(i));
            nextCardImg.style.width = "100px";
            nextCardImg.style.border = "1px solid black";
            nextCardImg.style.borderRadius = "5px";
            nextCardImg.style.margin = "10px";
            nextCardImg.style.backgroundColor = "rgb(152, 210, 230)";
            dealerContainer.appendChild(nextCardImg);
        })
    } else {
        dealerHand.forEach(function(i, x) {
            if(x >= numOfHits){
                let nextCardImg = document.createElement('img');
                nextCardImg.setAttribute('src', cardImg(i));
                nextCardImg.style.width = "100px";
                nextCardImg.style.border = "1px solid black";
                nextCardImg.style.borderRadius = "5px";
                nextCardImg.style.margin = "10px";
                nextCardImg.style.backgroundColor = "rgb(152, 210, 230)";
                dealerContainer.appendChild(nextCardImg);
            }
        })
    }
    numOfHits++
}

function cardImg(card) {
    if(card.isFaceUp)
        return `images/${card.suit}/${card.suit}-r${card.rank}.svg`;
    return "images/backs/red.svg";

}

// Create a flip hidden card that removes the back image and adds a card from the deck on the board.????????

function outcome() {
    playerVal = calSum(playerHand)
    playerScore.textContent = playerVal;
    
    if(playerVal > 21) {
        nachoMessage.textContent = 'Ramses is the best!';
        nachoMessage.style.color = 'red';
        hitButton.disabled = true;
        standButton.disabled = true;
    } else if (dealerVal > 21 && playerVal <= 21) {
        nachoMessage.textContent = 'You are like a WINNER!!';
        hitButton.disabled = true;
        standButton.disabled = true;
    } else if (dealerVal === 21 && playerVal < 21) {
        nachoMessage.textContent = 'You are like a Floosy';
        nachoMessage.style.color = 'red';
        hitButton.disabled = true;
        standButton.disabled = true;
    } else if (playerVal < 21 && dealerVal < 21 && dealerVal < playerVal) {
        nachoMessage.textContent = 'YOU SAVED THE ORPHANS';
        hitButton.disabled = true;
        standButton.disabled = true;
    } else if (playerVal < 21 && dealerVal < 21 && dealerVal > playerVal) {
        nachoMessage.textContent = 'Ramses Wins';
        nachoMessage.style.color = 'red';
        hitButton.disabled = true;
        standButton.disabled = true;
    } else if (dealerVal === playerVal) {
        nachoMessage.textContent = 'Tie Match...'
        hitButton.disabled = true;
        standButton.disabled = true;
    }


}






