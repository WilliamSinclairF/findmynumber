//get document ids
const radioInputs = document.getElementById('radioinputs');
const numberInputField = document.getElementById('numberfield');
const numberInputButton = document.getElementById('numberinputbutton');
const indicatorContainer = document.getElementById('indicators');
const triesLeftContainer = document.getElementById('triesleftcontainer');
const selectedNumberIndicator = document.getElementById('selectednumber');
const clueIndicator = document.getElementById('clue');
const myNumberWasIndicator = document.getElementById('mynumberwas');
const triesLeftIndicator = document.getElementById('triesleft');
const highestNumberIndicator = document.getElementById('highestnumber');
const errorIndicator = document.getElementById('errors');
const gameoverButtonContainer = document.getElementById(
  'gameoverbuttoncontainer'
);
const formcontainer = document.getElementById('form');
const resetbuttonsContainer = document.getElementById('resetbuttonscontainer');
const heading = document.getElementById('heading');

//game variables
// difficulty level objects
// (number of tries, max number)
const difficultyLevels = {
  veryeasy: [Infinity, 10],
  easy: [5, 10],
  medium: [5, 100],
  difficult: [8, 500],
  deadly: [9, 1000],
};

let gameOver = false;

let userSelectedNumber = 0;
let triesLeft = 0;
let maxNumber = 0;
let myNumber = 0;

const setDifficulty = (property) => {
  indicatorContainer.classList.remove('hidden');
  triesLeftContainer.classList.remove('hidden');

  triesLeft = difficultyLevels[property][0];
  maxNumber = difficultyLevels[property][1];
  triesLeftIndicator.textContent = triesLeft;
  highestNumberIndicator.textContent = maxNumber;
};

const getMyNumber = () => {
  myNumber = Math.floor(Math.random() * maxNumber) + 1;
};

const checkInputedNumber = () => {
  if (userSelectedNumber <= 0) {
    return (errorIndicator.textContent = 'Your number must be greater than 1!');
  } else if (userSelectedNumber > maxNumber) {
    return (errorIndicator.textContent = `Your number, ${userSelectedNumber}, is greater than my maximum number!`);
  }
  //returning true if the user didnt pull any shenanigans
  errorIndicator.textContent = '';
  return true;
};

const isGameOver = () => {
  if (triesLeft === 0) {
    myNumberWasIndicator.textContent = `My number was: ${myNumber}`;
    resetGame();
    return true;
  } else {
    return false;
  }
};

const isInputedNumberCorrect = () => {
  let numberToCheck = userSelectedNumber;

  if (numberToCheck === myNumber) {
    clueIndicator.textContent = `Wow, you won! My number was ${myNumber}`;
    gameOver = true;
    resetGame();
  } else if (numberToCheck > myNumber) {
    clueIndicator.textContent = 'lower';
    triesLeft = triesLeft - 1;
    triesLeftIndicator.textContent = triesLeft;
    isGameOver();
  } else if (numberToCheck < myNumber) {
    clueIndicator.textContent = 'higher';
    triesLeft = triesLeft - 1;
    triesLeftIndicator.textContent = triesLeft;
    isGameOver();
  } else return;
};

//add event listeners
const radioButtonEventListeners = () => {
  radioInputs.addEventListener('change', (e) => {
    switch (e.target.value) {
      //
      case 'veryeasy':
        setDifficulty('veryeasy');
        getMyNumber();
        'tries', triesLeft, 'maxnumber', maxNumber, 'mynumber: ', myNumber;

        break;

      case 'easy':
        setDifficulty('easy');
        getMyNumber();
        'tries', triesLeft, 'maxnumber', maxNumber, 'mynumber: ', myNumber;
        break;

      case 'medium':
        setDifficulty('medium');
        getMyNumber();
        'tries', triesLeft, 'maxnumber', maxNumber, 'mynumber: ', myNumber;
        break;

      case 'difficult':
        setDifficulty('difficult');
        getMyNumber();
        break;

      case 'deadly':
        setDifficulty('deadly');
        getMyNumber();
        break;

      default:
        return;
    }
  });
};

const inputFieldEventListeners = () => {
  numberInputButton.addEventListener('click', () => {
    userSelectedNumber = parseInt(numberInputField.value);
    if (checkInputedNumber() === true) {
      selectedNumberIndicator.textContent = userSelectedNumber;
      isInputedNumberCorrect(userSelectedNumber);
    }
  });
};

const gameResetEventListener = () => {
  resetbuttonsContainer.addEventListener('click', (e) => {
    switch (e.target.id) {
      case 'yes':
        gameOver = false;
        userSelectedNumber = undefined;
        triesLeft = undefined;
        maxNumber = undefined;
        myNumber = undefined;
        formcontainer.reset();
        myNumberWasIndicator.textContent = '';
        indicatorContainer.classList.add('hidden');
        triesLeftContainer.classList.add('hidden');
        resetbuttonsContainer.classList.add('hidden');
        numberInputField.value = '';
        errorIndicator.textContent = '';
        selectedNumberIndicator.textContent = '...';
        clueIndicator.textContent = 'Waiting for your number';

        break;

      case 'no':
        formcontainer.reset();
        heading.textContent = 'Ha. I win again.';
        resetbuttonsContainer.classList.add('hidden');
        myNumberWasIndicator.textContent = '';
        indicatorContainer.classList.add('hidden');
        triesLeftContainer.classList.add('hidden');
        numberInputField.value = '';
        errorIndicator.textContent = '';
        selectedNumberIndicator.textContent = '...';
        clueIndicator.textContent = 'Waiting for your number';

        break;

      default:
        return;
    }
  });
};

const resetGame = () => {
  resetbuttonsContainer.classList.remove('hidden');
};

radioButtonEventListeners();
inputFieldEventListeners();
gameResetEventListener();
