const player1 = {
    color: null,
    score: 0
};
const player2 = {
    color: null,
    score: 0
};

let flipsLeft = 2;

function flipCard() {
    //Handle flip card animation
    $('.board').on('click', '.card-front', function (e) {
        $(e.target).parent().css({
            'transform': 'rotateY(180deg)',
            '-ms-transform': 'rotateY(180deg)',
            '-webkit-transform': 'rotateY(180deg)',
            '-moz-transform': 'rotateY(180deg)',
            '-o-transform': 'rotateY(180deg)'
        });
    })
}

function beginGame() {
    $(clearGameBoard);
    $(displayScoreBoard)
    $(setGameBoard);
}

function clearGameBoard() {
    //clear board for each game
    $('.board').empty();
}

function setGameBoard() {
    //Shuffle cards and append to board
    shuffle(deck).forEach(card => makeCard(card).appendTo('.board'));
}

function makeCard(card) {
    //Create div elements for card with icon arugment
    const cardDiv = $('<div class="card"></div>'),
        cardContainer = $('<div class="card-container"></div>'),
        cardFront = $('<div class="card-front"></div>'),
        cardBack = $(`<div class="card-back"><i class="fas ${card}"></i></div>`);

    //Place created divs
    cardContainer.appendTo(cardDiv);
    cardFront.appendTo(cardContainer);
    cardBack.appendTo(cardContainer);

    return cardDiv;
}

function setScores() {
    //Update DOM with updated scores
    $('.player1-score').text(player1.score);
    $('.player2-score').text(player2.score);
}

function displayScoreBoard() {
    //Show scoreboard on game start
    $('.js-scoreboard').show();
    $(setScores);
}

function handleColorPickSubmit() {
    $('.js-color-form').submit(function (e) {
        e.preventDefault();
        //Assign player 1 & 2 colors based on player 1 choice
        if ($('#red').prop('checked')) {
            player1.color = 'red';
            $('.player1').css('color', 'var(--red)');
            player2.color = 'blue';
            $('.player2').css('color', 'var(--blue)');
        } else {
            player1.color = 'blue';
            $('.player1').css('color', 'var(--blue)');
            player2.color = 'red';
            $('.player2').css('color', 'var(--red)');
        }
        //Hide modal after play click
        $('.js-modal').hide();

        $(beginGame);
    });
}

function handleColorClick() {
    //Display play button after color is chosen
    $('#red, #blue').click(function (e) {
        $('.js-submit-btn').show();
    });
}

function handleStartClick() {
    //Display color picker on start click
    $('.js-start-game').on('click', function (e) {
        $('.js-modal').show();
    });
}

function handleStartGameClick() {
    $(handleStartClick);
    $(handleColorPickSubmit);
    $(handleColorClick);
    $(flipCard);
}

function main() {
    $(handleStartGameClick);

}

$(main);