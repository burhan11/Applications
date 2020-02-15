var scores, roundScore, activePlayer, gameStatus, count;

initialize();

// Roll Buton Click
document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gameStatus) {
        var d = document.querySelector('.dice');
        // Display the number image
        var dice = Math.floor(Math.random() * 6) + 1;
        count = dice;
        d.style.display = 'block';
        d.src = 'Images/dice-' + dice + '.png';

        if (count === 6) {
            previous += count;
        } else {
            previous = 0;
        }

        // update the roundScore if dice value is not 1
        if (dice !== 1) {
            if (previous / 6 === 2) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                document.querySelector('#current-' + activePlayer).textContent = scores[activePlayer];
                count = 0;
                nextPlayer();
            } else {
                roundScore = roundScore + dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                count = 0;
            }
        } else {
            roundScore = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            count = 0;
            nextPlayer();
        }
    }
});

// Hold Buton Click
document.querySelector('.btn-hold').addEventListener('click', function() {

    count = 0;
    if (gameStatus) {
        // Add Current score to Global Score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#current-' + activePlayer).textContent = 0;
        roundScore = 0;

        // Check if activePlayer won the game or not
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameStatus = false;
        } else {
            // Update the UI    
            nextPlayer();
        }
    }
});

function nextPlayer() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // we can use togge also
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //ternary Operator
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}

// New Buton Click
document.querySelector('.btn-new').addEventListener('click', initialize);

function initialize() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    count = 0;
    previous = 0;
    gameStatus = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector("#score-0").textContent = '0';
    document.querySelector("#score-1").textContent = '0';
    document.querySelector("#current-0").textContent = '0';
    document.querySelector("#current-1").textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}