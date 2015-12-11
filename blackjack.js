
// Thomas Machin - JS Blackjack
// Dec 11 2015
// version 1.01

var timer; //timer for delay when the dealer plays
var gameOver = false;

//FUNCTIONS

//Card Deck creation
function createDeck(deckAmt){
	console.log("Creating " + deckAmt + " deck(s)");
	var cards = [],
	    suits = ['spades','clubs','hearts','diamonds'],
        cardsInSuit = 13;

	for (n = 0; n < deckAmt; n++){

		for (s = 0; s < suits.length; s++){ //create cards for each suit
			currentSuit = suits[s];

			for (i= 1; i <= cardsInSuit  ; i++){ //create 13 cards, ace to king
				var type = 'number',
					suit = currentSuit,
					value = i;

				if (value === 11){
					type = "jack";
                    value = 10;
				} else if ( value === 12) {
					type = "queen";
                    value = 10;
				} else if ( value === 13) {
					type = "king";
                    value = 10;
				} else if ( value === 1) {
					type = "ace";
                    value = 11;
				} else {
                    type = value;
                }
				cards.push([value,suit,type]);
			}
		}
	}
	return cards;

}

//logs each card in the deck to the console
function listDeck(deck){
	if (deck.length < 1 ){
		console.log("No deck created");
	} else {
		for (i = 0; i < deck.length; i++){
		console.log(deck[i][0] + " " + deck[i][1] + " " + deck[i][2]);
		}
		console.log(deck.length + " cards in play");
	}
}

//Shuffle card array, so that it is not always in order
function shuffle(array) { // Shuffle function from stack overflow http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    var counter = array.length,
        temp,
        index;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

//sets up game. Deals cards to player and dealer. Sets inital button visibility.
function startGame(){
    gameOver = false;
    console.log("New Game beginning.");
    playerHand = dealHand(deck, playerHand, 2);
    dealerHand = dealHand(deck, dealerHand, 2);
    dealerHandHidden = dealerHand.slice(0); //duplicate dealer hand used to display version with hidden card

    updateHand(playerHand, playerHandString, playerTotalDisplay);
    updateHandPartial(dealerHandHidden, dealerHandString, dealerTotalDisplay);

    btnDeal.style.visibility = 'hidden';
    btnHit.style.visibility = 'visible';
    btnStand.style.visibility = 'visible';
}
//Deal initial hand
function dealHand(deck, hand, amt){
    if (deck.length < amt){
        deck = reShuffleDeck(); //creates new deck and shuffles it
    }
    if (hand.length > 0){
        console.log('New hand for player');
        hand = [];
    }
        console.log('Dealing cards');
    for (i = 0; i < amt ; i++){
        hand.push(deck.pop());
    }
        return hand;
}

//re-shuffle(re-create) deck if not enough cards remain to deal hand
function reShuffleDeck(action){
    console.log('Not enough cards left in deck : reshuffling deck');
    deck = createDeck(deckNum);
    shuffle(deck);
    return deck;
}

//update the visual/text display of the hand
function updateHand(hand, handstring, handtotal) {
    handstring.innerHTML = "";
    handtotal.innerHTML = "";
    console.log("Updating hand display for " + handstring.id);
    var suitIcons = ["&spades;","&hearts;","&clubs;","&diams;"];
    var value;
    for (i = 0; i < hand.length; i++){

        //choose the Icon based on the card's suit
        if (hand[i][1] == "spades"){
            suitIcon = suitIcons[0];
        } else if (hand[i][1] == "hearts") {
            suitIcon = suitIcons[1];
        } else if (hand[i][1] == "clubs") {
            suitIcon = suitIcons[2];
        } else if (hand[i][1] == "diamonds"){
            suitIcon = suitIcons[3];
        }
        //shorten name of queens, Jacks and Kings to display a single character
        if (hand[i][2].length > 1 && hand[i][2] != 10){
            value = hand[i][2].substring(0,1).toUpperCase();
        } else {
            value = hand[i][2];
        }
        //append the card html
        handstring.innerHTML += "<div class='card'> <span class='" + hand[i][1] + "'>" + value +"<br/>"+ suitIcon + "</span><span class='" + hand[i][1] + " upsidedown" + "'>" + value +"<br/>"+ suitIcon  + "</span></div> ";
    }
    handtotal.innerHTML += "Total: " + handTotal(hand);

}

//Function for updating the display of the dealers hand. Obscures one card, and part of total
function updateHandPartial(hand, handstring, handtotal) {
    handstring.innerHTML = "";
    handtotal.innerHTML = "";
    console.log("Updating partial hand display for " + handstring.id);

    var suitIcons = ["&spades;","&hearts;","&clubs;","&diams;"],
        value;

    for (i = 0; i < hand.length; i++){

        //choose the Icon based on the card's suit
        if (hand[i][1] == "spades"){
            suitIcon = suitIcons[0];
        } else if (hand[i][1] == "hearts") {
            suitIcon = suitIcons[1];
        } else if (hand[i][1] == "clubs") {
            suitIcon = suitIcons[2];
        } else if (hand[i][1] == "diamonds"){
            suitIcon = suitIcons[3];
        }
        //shorten name of queens, Jacks and Kings to display a single character
        if (hand[i][2].length > 1 && hand[i][2] != 10){
            value = hand[i][2].substring(0,1).toUpperCase();
        } else {
            value = hand[i][2];
        }

        if (i === 0){
             handstring.innerHTML += "<div class='card back'></div> ";
        } else {
            handstring.innerHTML += "<div class='card'> <span class='" + hand[i][1] + "'>" + value +"<br/>"+ suitIcon + "</span><span class='" + hand[i][1] + " upsidedown" + "'>" + value +"<br/>"+ suitIcon  + "</span></div> " ;
        }
    }
    console.log()
    hand.shift();
    handtotal.innerHTML += "Total: ? + " + handTotal(hand);


}

function handTotal(hand){
    total = 0;
    for (i = 0; i < hand.length; i++){
        total += hand[i][0];
    }
    if (total > 21){
        //modify total if aces are present
        for (n = 0; n < hand.length; n++){
            if (hand[n][2] === "ace"){
                total -= 10;
                if (total < 21){
                    return total;
                }
            }
        }
    }
    return total;
}

function hit(deck, playerHand, amt){
    if (deck.length < amt){
        deck = reShuffleDeck(); //creates new deck and shuffles it
    }
    playerHand.push(deck.pop());
    if (handTotal(playerHand) > 21){
        btnHit.style.visibility = "hidden";
        btnStand.style.visibility = "hidden";
        console.log("Player has gone bust");
        gameOver = true;
        window.setTimeout(checkWinner,1200);
    }
    return playerHand;
}

function stand(deck, playerHand, dealerHand){
    var dealerStand = false;
    var playerTotal = handTotal(playerHand),
        dealerTotal = handTotal(dealerHand);

    if (!gameOver){
        console.log("Game is not over, so dealer may want cards" )
        if (playerTotal > 21 || dealerTotal > 21){ //don't ask for more cards if player or dealer has already lost
            dealerStand = true;
            console.log("Dealer Stands");
        } else if (playerTotal > dealerTotal && dealerTotal !=21 || playerTotal == dealerTotal && dealerTotal < 17){
            if (deck.length < 1){
                deck = reShuffleDeck(); //creates new deck and shuffles it
            }
            console.log("Dealer hits");
            dealerHand.push(deck.pop());
            dealerStand = false;

        } else {
                console.log("Dealer Stands");
                dealerStand = true;
        }


        //if the dealer stands, check who wins, else run this again with a delay
        if (dealerStand){
            console.log("Dealer is not getting more cards" )
            gameOver = true;
            updateHand(dealerHand, dealerHandString, dealerTotalDisplay);
            clearTimeout(timer);
            window.setTimeout(checkWinner,1200);
        } else {
            updateHand(dealerHand, dealerHandString, dealerTotalDisplay);
            clearTimeout(timer);
            if (handTotal(dealerHand) <= 21){
                console.log("Dealer is pausing before next card" )
                timer = window.setTimeout(stand,1100, deck, playerHand, dealerHand);
            } else {
                console.log("Dealer has gone bust");
                gameOver = true;
                window.setTimeout(checkWinner,1200);
            }
        }
    } else {
        console.log("Error: Game Already ending - no need to give dealer more cards.");
    }
}


function clearCards(handstring){
    handstring.innerHTML = " ";
}
function checkWinner(){
    if (gameOver){
        playerTotal = handTotal(playerHand);
        dealerTotal = handTotal(dealerHand);
        msg = document.getElementById('gameinfo');

        if (playerTotal > 21){
            console.log("Final: Player has busted");
            gameStatusDiv.className = 'lose';
            msg.innerHTML = "<h2>Player has busted</h2><h1>Dealer Wins!</h1>";

        } else if (playerTotal === 21 && dealerTotal !== 21){
            gameStatusDiv.className = 'win';

            if (playerHand.length == 2){
                console.log("Final: Player has blackjack");
                msg.innerHTML = "<h1>Blackjack!</h1><h2>You win!</h2>";
            } else {
                console.log("Final: Player has 21");
                msg.innerHTML = "<h1>21!</h1><h2>You win!</h2>";
            }


        } else if (dealerTotal > 21) {
            console.log("Final: Dealer has busted");
            gameStatusDiv.className = 'win';
            msg.innerHTML = "<h2>Dealer has busted</h2><h1>You Win!</h1>";

        } else if (playerTotal > dealerTotal){
            console.log("Final: Player Wins!");
            gameStatusDiv.className = 'win';
            msg.innerHTML = "<h1>Player Wins!</h1>";

        } else if (playerTotal === dealerTotal){
            console.log("Final: A Push!");
            gameStatusDiv.className = 'tie';
            msg.innerHTML = "<h1>A Push! It's a tie.</h1>";
        } else {
            console.log("Final: Dealer Wins!");
            gameStatusDiv.className = 'lose';
            msg.innerHTML = "<h1>Dealer Wins!</h1>";
        }
        gameStatusDiv.style.display = "block";
        gameOver = false;
    } else {
        console.log("Error: Winner checked before game ended, or after a new game began");
    }
}

function hideDiv (div) {
    var div = document.getElementById(div);
    if (div.style.display == 'block'){
        div.style.display = 'none';
    } else {
       div.style.display = 'block';
    }
}

//PROGRAM
var deckNum = 1;
var deck = createDeck(deckNum);
var playerHand = [],
	dealerHand = [];

shuffle(deck);

var btnDeal = document.getElementById('deal'),
    btnHit = document.getElementById('hit'),
    btnStand = document.getElementById('stand'),
    btnNextGame = document.getElementById('playagain'),
    playerHandString = document.getElementById('playerhand'),
    playerTotalDisplay = document.getElementById('playertotal'),
    dealerHandString = document.getElementById('dealerhand'),
    dealerTotalDisplay = document.getElementById('dealertotal'),
    gameStatusDiv = document.getElementById('infobox'),
    aboutToggle = document.getElementById('aboutbtn'),
    aboutClose = document.getElementById('aboutclose'),
    ruleClose = document.getElementById('rulesclose'),
    ruleToggle = document.getElementById('rulesbtn');

//Buttons for player actions
btnDeal.addEventListener('click', function (){
    startGame();
});

btnHit.addEventListener('click', function (){
    console.log("Player Hits");
    playerHand = hit(deck, playerHand, 1);
    updateHand(playerHand, playerHandString, playerTotalDisplay);
});

btnStand.addEventListener('click', function (){
    console.log("Player Stands");
    btnHit.style.visibility = "hidden";
    btnStand.style.visibility = "hidden";
    //update dealer hand using all cards in hand, to reveal hidden card
    updateHand(dealerHand, dealerHandString, dealerTotalDisplay);
    window.setTimeout(stand,800,deck, playerHand, dealerHand);
});

btnNextGame.addEventListener('click', function (){
    btnNextGame.visibility = "hidden";
    gameStatusDiv.style.display = "none";
    clearCards(playerHandString);
    clearCards(dealerHandString);
    window.setTimeout(startGame,800);
});

ruleToggle.addEventListener('click', function (){
    hideDiv('rules');
});

ruleClose.addEventListener('click', function (){
    hideDiv('rules');
});

aboutToggle.addEventListener('click', function (){
    hideDiv('about');
});
aboutClose.addEventListener('click', function (){
    hideDiv('about');
});