var bgm;
var cardsArray = [{
  'name': 'sun',
  'img': 'img/sun1.png'
}, {
  'name': 'apple',
  'img': 'img/apple1.png'
}, {
  'name': 'violin',
  'img': 'img/violin1.png'
}, {
  'name': 'umbrella',
  'img': 'img/umbrella1.png'
}, {
  'name': 'rocket',
  'img': 'img/rocket1.png'
}, {
  'name': 'queen',
  'img': 'img/queen1.png'
}, {
  'name': 'orange',
  'img': 'img/orange1.png'
}, {
  'name': 'moon',
  'img': 'img/moon1.png'
}, {
  'name': 'heart',
  'img': 'img/heart1.png'
}, {
  'name': 'fly',
  'img': 'img/fly1.png'
}, {
  'name': 'flower',
  'img': 'img/flower1.png'
}, {
  'name': 'cat',
  'img': 'img/cat1.png'
}];

function sketchPreload()
{
bgm = loadSound("https://mrleungvsa.github.io/y10-p5js-criterion-a-submission-y10-april-ching-a/By The Seaside - iOS Ringtone.mp4");
}

function sketchSetupTables()
{
  if (!bgm.isPlaying())
  {
    bgm.play();
  }
}

const gameGrid = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
    const {
        name,
        img
    } = item;

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

// function to record a match of two cards
const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
};

// function to reset the cards if no match was made
const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

grid.addEventListener('click', event => {
    const clicked = event.target;
    if (
        // if click was not on a card
        clicked.nodeName === 'SECTION' ||

        // if already matched, do not click
        clicked.parentNode.classList.contains('match')
    ) {
        return;
    }
    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
            }
            setTimeout(resetGuesses, delay);
        }
    }

});