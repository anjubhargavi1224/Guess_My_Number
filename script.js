'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const winSound = new Audio('Tada.mp3');
const loseSound = new Audio('Womp.mp3');


const displayMessage = message =>{
    document.querySelector('.message').textContent = message

}

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.score').textContent = score;

  displayMessage('Start Guessing.....');

  document.querySelector('.number').textContent = '?';

  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';

  document.querySelector('.number').style.width = '15rem';
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('No Number! ❌');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('Yayyy!! you have guessed it right 🥳');

    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

     winSound.currentTime = 4;
    winSound.play();

     confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  //When guess is wrong
  else if (guess !== secretNumber) {
  document.querySelector('body').style.backgroundColor = '#FF0000';
  if (score > 1) {
    displayMessage (guess > secretNumber ? 'Your guess is too High!!⬆️' : 'Your guess is too low!! ⬇️');
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    displayMessage('You lost the game 😔 :( ');
    document.querySelector('.score').textContent = 0;
     loseSound.play();
  }
}
});

document.addEventListener('keydown', function (e){
  if(e.key === 'Enter' && document.querySelector('.guess').value){
    document.querySelector('.check').click();
  }
})
