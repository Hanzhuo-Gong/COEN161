const allButtons = document.querySelectorAll('button');
const PASSCODE = '1022';

//add data attributes
for(i = 0; i<allButtons.length; i++) {
  allButtons[i].dataset.value = allButtons[i].innerHTML;
  //console.log(allButtons[i].dataset.value);
}

//return current HTML value
function innerHTMLValue() {
  return document.querySelector('input').innerHTML;
}


//set the value of input
function setInputValue(string) {
  let result = document.querySelector('input').innerHTML;
  result = string;
}


//Problem: I think I still get the problem that the string can not be motified,
// which I can't change the innerHTML of input,so I can't move further
function handleClicked(event) {
  event.style.color = "white";
  event.style.backgroundColor = "#9b69b6";

  //set up values
  let inputPass = document.querySelector('input');
  let inputPassLength = inputPass.innerHTML.length;
  let previousInputValue = innerHTMLValue();
  console.log("previous: " + previousInputValue);
  let inputPassContent = inputPass.innerHTML;
  let buttonValue = event.innerHTML;
  //console.log(currentNumber);
  console.log(inputPassContent);


  //if length is less than 4, return pres + button value
  if(inputPassLength < 4) {

    //remove the class of success and error
    document.querySelector('input').classList.remove("success");
    document.querySelector('input').classList.remove("error");
    //combine the string
    let conString = previousInputValue + buttonValue;
    //Set up the new input value
    setInputValue(conString);
    previousInputValue = conString;
    console.log(previousInputValue);
    //previousInputValue = inputPass.innerHTML;

  }

  //if the length is 4, check if is success or error
  if (inputPass.innerHTML.length === 4) {
    if (inputPass.innerHTML === PASSCODE) {
      document.querySelector('input').classList.add("success");
    }
    else {
      document.querySelector('input').classList.add("error");
    }
  }





}
//add event listener for buttons
for(i = 0; i<allButtons.length; i++) {
  allButtons[i].addEventListener('click', function() {
    handleClicked(this);
  })

}

/*
const combineStanzas = () => {
  // fill in this function
  // type your response here
  return


}

const stanzas = [
    'A hundred point test',
    'with all your skill and wisdom',
    "you don't need no luck"
]


const haiku = stanzas.reduce(combineStanzas, "")
console.log(haiku);
//console.log(haiku.join('\n'))
*/

/* EXPECTED OUTPUT
A hundred point test
With all your skill and wisdom
You don't need no luck
*/


/*
//Query all the button
const allButtons = document.querySelectorAll('button');


//console.log(allButtons[0]);

//Add event listener to each buttons
for(let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener('click', function() {
    handleClicked(this);
  });
}

//function handle clicked
function handleClicked(event) {

  //target the ID and data-value
  const currentTurn = document.getElementById("current-turn");
  let currentSymbol = currentTurn.dataset.value;

  //change the icon to symbol
  event.innerHTML = currentSymbol;

  //change the content to the oppsite side
  if (currentSymbol === "🦄") {
    currentTurn.dataset.value = "🦔";


    //If player 1 wins
    if(checkWinnerFunction(currentSymbol)) {
      const unicorn = document.getElementsByClassName('js-🦄-winner');
      //console.log(unicorn);
      //delete the class of hidden and hidden the current turn
      unicorn[0].classList.remove("hidden");
      document.getElementById("current-turn").classList.add("hidden");

    }
  }
  else {
    currentTurn.dataset.value = "🦄";

    //check if play 2 win
    if(checkWinnerFunction(currentSymbol)) {
      const hedgehog = document.getElementsByClassName('js-🦔-winner');

      //delete the class of hidden and hidden the current turn
      hedgehog[0].classList.remove("hidden");
      document.getElementById("current-turn").classList.add("hidden");
    }

  }

  currentTurn.innerHTML = "Current player's turn: " + currentTurn.dataset.value;
}


function checkWinnerFunction(symbol) {

    if(checkSquares(symbol)) {
      //game is over, return true and disable all buttons

      //disable all buttons
      for(let i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = true;
      }

      return true;
    };
}

function checkSquares(symbol) {

  let buttons = [];

  //get all the innerHTML
  for(let i = 0; i < allButtons.length; i++) {
    buttons.push(allButtons[i]);
  }

  //console.log(buttons);

  for(let i = 0; i < buttons.length; i++) {
    //find out which index for have the same symbol
    if(symbol === buttons[i].innerHTML) {

      //if the horzontal or vertical or diagonal is true
      if(i === 0) {
        if((buttons[1].innerHTML === symbol && buttons[2].innerHTML === symbol) ||
           (buttons[3].innerHTML === symbol && buttons[6].innerHTML === symbol) ||
           (buttons[4].innerHTML === symbol && buttons[8].innerHTML === symbol)) {
             //console.log("index 0 running");
             return true;

           }
      }

      //Only need to check vertical, horzontal is cover by i = 0;
      if(i === 1) {
        if(buttons[4].innerHTML === symbol && buttons[7].innerHTML === symbol) {
             //console.log("index 1 running");
             return true;
          }
      }

      //Check the vertical, diagonal. horzontal cover by i = 0
      if(i === 2) {
        if((buttons[5].innerHTML === symbol && buttons[8].innerHTML === symbol) ||
           (buttons[4].innerHTML === symbol && buttons[6].innerHTML === symbol))  {
             //console.log("index 2 running");
             return true;
          }
      }
      //the vertical cover by i = 0, check horzontal
      if(i === 3) {
        if(buttons[4].innerHTML === symbol && buttons[5].innerHTML === symbol) {
             //console.log("index 3 running");
             return true;
          }
      }

      //i = 4 vertical cover by i = 1, horzontal cover by i = 3
      //i = 5 vertical cover by i = 2, horzontal cover by i = 3

      //the vertical cover by i = 0, diagonal cover by i = 2 ,check horzontal
      if (i === 6) {
        if(buttons[7].innerHTML === symbol && buttons[8].innerHTML === symbol) {
             //console.log("index 6 running");
             return true;
          }
      }

      //i = 7 vertical cover by i = 1, horzontal cover by i = 6
      //i = 8 vertical cover by i = 2, horzontal cover by i = 6, diagonal cover by i = 0
    }
  }
}
*/






/*

//Code below are for lec 8 handout and midterm function problem
const hasClassName = (array, className) => {
    // fill in this function
    let result = [];
    for(let i =0; i < array.length; i++) {
      //console.log(array[i]);
        if (array[i].className === className)
            result.push(array[i])
    }
    return result
}

const elements = Array.from(document.querySelector('button'));
//console.log(elements);
const test = document.querySelectorAll('button');
//console.log(test);
const primaryButtons = hasClassName(test, 'primary');
*/

/*
const convertSnakeToCamelCase = (str) => {
  // fill in this function
  // type your response here

  let upperLetter;
  let eachStr = str.split("_");
  let currentString = "";

  //Nothing to change for the first word, add to that variable directly.
  currentString += eachStr[0];

  //Loop from the second word
  for(let i=1; i<eachStr.length; i++) {
    //Loop each character from the word
    for(let j =0; j< eachStr[i].length; j++) {
      //If the first letter, covert it to upperCase and increment j to avoid repetitive word
      if (j === 0) {
        let upperCase = eachStr[i][j].toUpperCase();
        currentString += upperCase;
        j++;
      }

      currentString += eachStr[i][j];
    }
  }
  return currentString;

}

const snakeCased = [
    'baby_yoda', 'porgs', 'corgis_are_floofy'
]

const converted = snakeCased.map(convertSnakeToCamelCase)
console.log(converted)
*/

/*
// calls the action method if test passes
function unless(test, action) {
  return (array) => {

    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
      if (ifEven(array[i])) {
        action();
      }
    }
  }
}

n = [10, 4, 2, 7, 3, 9]

const ifEven = unless(n % 2 == 1, () => {
  console.log(n, "is odd");
});

ifEven(n);
*/

/*
function unless(test, action) {
  if(test) {
     action();
  }
}

n= 5;

unless(n % 2 == 1, () => {
  console.log(n, "is even");
});

unless();
*/

/*
let flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  ( accumulator, currentValue ) => accumulator.concat(currentValue),
  []
)

console.log(flattened);

let arrays = [[1, 2, 3], [4, 5], [6]];
const flatten = (arrays) => {
  return arrays.reduce((accumulator, array) => accumulator.concat(array), [])
}

console.log(flatten(arrays));
*/
