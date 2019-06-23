const pizza = 'fa-pizza-slice',
    ice_cream = 'fa-ice-cream',
    bacon = 'fa-bacon',
    fish = 'fa-fish',
    burger = 'fa-hamburger',
    hotdog = 'fa-hotdog',
    bread = 'fa-bread-slice',
    apple = 'fa-apple-alt',
    egg = 'fa-egg';

const cards = [
    pizza,
    ice_cream,
    bacon,
    fish,
    burger,
    hotdog,
    bread,
    apple,
    egg
];

const deck = [...cards, ...cards];

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}