

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
var message = document.querySelector('#message');
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
let numOfHits = 1;



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
        while(dealerHand.length < 2) {
            dealerHand.push(this.deck.pop());
        }
        return dealerHand;
    }
}


// EVENT LISTENERS!!!!!!!!!!!!

dealButton.addEventListener('click', dealButtonInit);
hitButton.addEventListener('click', hitButtonInit);
// standButton.addEventListener('click', standButtonInit)

// FUNCTIONS!!!!!!!!!



// My Deal Initializer function
function dealButtonInit(){
    deck = new Deck();
    deck.createDeck(suits, ranks);
    deck.shuffle();
    console.log(playerHand = deck.playerDeal());
    console.log(dealerHand = deck.dealerDeal());
    renderCards();
    outcome();
    
}


// My Hit Initializer function
function hitButtonInit() {
    console.log("DECK: ", deck)
    playerHand.push(deck.deck.pop());
    renderCards();
    outcome();
}

// My Stand Initializer function
// function standButtonInit() {

// }

// Dealer Play function
// function dealerPlay() {
//     if (dealerHand < 17) {
//         setTimeout(function() {
//             var card = Deck.deck.pop();
//             dealerHand.push(card);
//         }, 1000);
//     } else if (dealerHand >= 21) {
//         setTimeout(function() {
//             gameOver();
//         }, 1100);
//     } else if (dealerHand >= 17) {
//         setTimeout(function() {
//             gameOver();
//         }, 1100);
//     }
// }

// Calculates the sum of the players hand
function calSum(hand){
    let total = 0
    hand.forEach(e => {
        console.log("card rank", numVals[e.rank])
        total += numVals[e.rank]
    })
    return total
}






function renderCards() {
    console.log(playerContainer)
    if(numOfHits == 1){
        playerHand.forEach(function(i) {
            let nextCardImg = document.createElement('img');
            nextCardImg.setAttribute('src', cardImg(i));
            nextCardImg.style.width = "100px";
            nextCardImg.style.border = "1px solid black";
            nextCardImg.style.borderRadius = "5px";
            nextCardImg.style.margin = "10px";
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
                playerContainer.appendChild(nextCardImg);
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

function outcome() {
    playerScore.textContent = calSum(playerHand);
}






