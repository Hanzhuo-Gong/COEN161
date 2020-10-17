const undoStackContainer = document.getElementById("undo-stack");
const redoStackContainer = document.getElementById("redo-stack");

const undoButton = document.getElementById("undo-button");
const redoButton = document.getElementById("redo-button");

const gridButtons = document.querySelectorAll(".row button");

// this line will error until you FIND the undoStackContainer
// and redoStackContainer elements
const undoStack = new Stack(undoStackContainer);
const redoStack = new Stack(redoStackContainer);

// this array is a bunch of hex values for colors so that
// our random grid will be colored nicely.
const COLORS = [
    '#1abc9c', '#16a085', '#f1c40f', '#f39c12',
    '#2ecc71', '#27ae60', '#e67e22', '#d35400',
    '#3498db', '#2980b9', '#e74c3c', '#c0392b',
    '#9b59b6', '#8e44ad', '#bdc3c7', '#34495e',
    '#2c3e50', '#7f8c8d', '#95a5a6',
]

/**
 * @function handleGridButtonClick
 *
 * @param {MouseEvent} event - the dispatched click event
 * @returns {void}
 *
 * @description This function is an event handler for the grid buttons. When
 * a grid button is clicked, it should change to a random color from the COLORS
 * Array. Because each grid button has a data-position property (which can
 * be accessed using event.currentTarget.dataset.position) you'll be able
 * to figure out which button was clicked as well as what style it currently has.
 *
 */
function handleGridButtonClick(event) {
  //get the event number, and set up a random background
  let currentEventText = event.textContent;
  let randomNumber = Math.floor(Math.random() * COLORS.length);
  let randomColor = COLORS[randomNumber];

  //create a new element with the event number
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode(currentEventText);
  newDiv.style.backgroundColor = event.style.backgroundColor;
  newDiv.appendChild(newContent);

  //append div to the undo section
  undoButton.appendChild(newDiv);
  undoStack.push(newDiv);

  //change the background color of the event
  event.style.backgroundColor = randomColor;

}

/**
 * @function handleStackButtonClicked
 *
 * @param {Stack} fromStack - the stack to pop from
 * @param {Stack} toStack - the stack to push onto
 * @returns {void}
 *
 * @description This function can be used to undo or redo a button click. The functionality
 * is roughly the same between undo and redo. The only difference is which stack is an action
 * being moved to and which stack is an action being moved from. Don't worry if you're not
 * sure how to do this on Lab day. We'll go over some stuff with functions on Week 4 Tuesday
 *
 */
function handleStackButtonClicked(fromStack, toStack) {
  //undo event
  if (fromStack.id === "undo-button") {

    //pop the item out
    if (undoStack.size() === 0 ){
      console.log("empty undo stack, can not pop");
    }
    else {
      let popItem = undoStack.pop();
      let popAttribute = window.getComputedStyle(popItem);
      let popBackgroundColor = popAttribute.backgroundColor;

      //find out which number and the background color got pop
      let popNumber = popItem.textContent;
      let buttonBackgroundColor = gridButtons[popNumber].style.backgroundColor;

      //append the pop item to redo
      popItem.style.backgroundColor = buttonBackgroundColor;
      redoButton.appendChild(popItem);
      redoStack.push(popItem);

      //After appending uodo to redo, undo the event background color
      //check if the background is rgba(0, 0, 0, 0) (white), if so, change the background color to #eee, rgba(238, 238, 238, 1)
      if (popBackgroundColor === "rgba(0, 0, 0, 0)") {
        gridButtons[popNumber].style.backgroundColor = "rgba(238, 238, 238, 1)";
      }
      else {
        gridButtons[popNumber].style.backgroundColor = popBackgroundColor;
      }

    }


  }
  //redo event
  else {

    //pop the redo items
    if (redoStack.size() === 0) {
      console.log("empty redo stack, can not pop");
    }
    else {
      let popItem = redoStack.pop();
      let redoArribute = window.getComputedStyle(popItem);
      //background color of the redo item
      let redoBackgroundColor = redoArribute.backgroundColor;

      //get the current background color of the number
      let popNumber = popItem.textContent;
      let buttonBackgroundColor = gridButtons[popNumber].style.backgroundColor;

      //append the redo item to pop
      popItem.style.backgroundColor = buttonBackgroundColor;
      undoButton.appendChild(popItem);
      undoStack.push(popItem);

      //redo the background color of the target
      gridButtons[popNumber].style.backgroundColor = redoBackgroundColor;
    }

  }
}

/**
 * @method main
 *
 * @returns {void}
 *
 * @description We could just run this Javascript as the document is being read. But I like
 * keeping functions separately and then calling them later. Peep the very last line of this
 * file.
 */
function main() {
    // attach event handlers here
    for (var i = 0; i < gridButtons.length; i++) {
      gridButtons[i].addEventListener("click", function() {
        handleGridButtonClick(this);
      });
    }

    //let undoButton = document.getElementById("undo-button");
    //let redoButton = document.getElementById("redo-button");

    undoButton.addEventListener("click", function() {
      handleStackButtonClicked(undoButton,redoButton);
    });


    redoButton.addEventListener("click", function() {
      handleStackButtonClicked(redoButton,undoButton);
    });
}

// run our main function (even though Javascript doesn't actually need one)
main()
