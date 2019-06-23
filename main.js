const player1 = {
    color: null,
    score: 0
};
const player2 = {
    color: null,
    score: 0
};

let flipsLeft = 2,
    player1Turn = true,
    pairsLeft = 9,
    cardsFlipped = [];

function flipCard() {
    //Handle flip card animation
    $('.board').on('click', '.card-front', function (e) {
        if (flipsLeft > 0) {
            flipsLeft--;
            $(setFlipsLeft);
            const flipped = $(e.target).siblings().children('i').attr('class');
            cardsFlipped.push(flipped);
            $(e.target).parent().addClass('show');
            if (flipsLeft === 0)
                $(endTurn);
        }
    })
}

function setFlipsLeft() {
    $('.flips').text(`Flips left: ${flipsLeft}`);
}

function startTurn() {
    const currentPlayerTurn = player1Turn ? '1' : '2';
    $('.about').text(`Player ${currentPlayerTurn}'s turn`);
    $(setFlipsLeft);

}

function endTurn() {
    if (cardsFlipped[0] === cardsFlipped[1]) {
        console.log('match!');
    } else {
        $(handleNotAPair);
        $(nextTurn);
    }

}

function nextTurn() {
    setTimeout(() => {
        flipsLeft = 2;
        player1Turn = !player1Turn;
        cardsFlipped.length = 0;
        $(startTurn);
    }, 1500);

}

function handleNotAPair() {
    cardsFlipped[0] = cardsFlipped[0].split(' ').map(className => className.replace(/^/, '.')).join('');
    cardsFlipped[1] = cardsFlipped[1].split(' ').map(className => className.replace(/^/, '.')).join('');
    setTimeout(() => {
        // $($(cardsFlipped[0])[0]).parent().parent().css({
        //     'transform': 'none',
        //     '-ms-transform': 'none',
        //     '-webkit-transform': 'none',
        //     '-moz-transform': 'none',
        //     '-o-transform': 'none',
        //     '-webkit-backface-visibility': 'hidden'
        // });
        // $($(cardsFlipped[1])[0]).parent().parent().css({
        //     'transform': 'none',
        //     '-ms-transform': 'none',
        //     '-webkit-transform': 'none',
        //     '-moz-transform': 'none',
        //     '-o-transform': 'none',
        //     '-webkit-backface-visibility': 'hidden'
        // });
        console.log($(cardsFlipped[0])[0]);
        $($(cardsFlipped[0])).parent().parent().removeClass('show');
        console.log($(cardsFlipped[1])[0]);
        $($(cardsFlipped[1])).parent().parent().removeClass('show');
    }, 1000);
}

function beginGame() {
    $(reset);
    $(clearGameBoard);
    $(displayScoreBoard)
    $(setGameBoard);
    $(startTurn);
}

function reset() {
    player1.score = player2.score = 0;
    flipsLeft = 2;
    player1Turn = true;
    pairsLeft = 9;
    cardsFlipped.length = 0;
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

function main() {
    $(handleStartClick);
    $(handleColorPickSubmit);
    $(handleColorClick);
    $(flipCard);
}

$(main);