let currentDisplay = "0";
let resultDisplay=false;

document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', (event) => {
      const value = event.target.textContent;

      if (value === 'C') {
          clearDisplay();
      } else if (value === 'CE') {
          clearLastElement();
      } else if (value === '=') {
          calculateResult();
      } else {
          appendToDisplay(value);
      }
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key >= '0' && key <= '9') {
      appendToDisplay(key);
  } else if (key === '+') {
      appendToDisplay('+');
  } else if (key === '-') {
      appendToDisplay('-');
  } else if (key === '*') {
      appendToDisplay('*');
  } else if (key === '/') {
      appendToDisplay('/');
  } else if (key === '.') {
      appendToDisplay('.');
  } else if (key === 'Enter') {
      calculateResult();
  } else if (key === 'Backspace') {
      clearLastElement();
  } else if (key === 'Escape') {
      clearDisplay();
  }
});

/* document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('.buttons button');

  buttons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
  });

  document.addEventListener('keyup', handleKeyPress);
});

function handleButtonClick(event) {
  const value = event.target.textContent;

  if (value === 'C') {
      clearDisplay();
  } else if (value === 'CE') {
      clearLastElement();
  } else if (value === '=') {
      calculateResult();
  } else {
      appendToDisplay(value);
  }
}

function handleKeyPress(event) {
  const key = event.key;
  console.log(key);
  if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')') {
      appendToDisplay(key);
  } else if (key === 'Enter') {
      calculateResult();
  } else if (key === 'Backspace') {
      clearLastElement();
  } else if (key === 'Escape') {
      clearDisplay();
  }
}*/


function appendToDisplay(value) {
  if (currentDisplay === "0" || resultDisplay) {
    currentDisplay = value;
  } else {
    currentDisplay += value;
  }
  resultDisplay=false;
  updateDisplay();
}

function updateDisplay() {
  const displayElement = document.getElementById("display");
  displayElement.textContent = currentDisplay;
}

function calculateResult() {
  try {
    const result = eval(currentDisplay);
    currentDisplay += "\n"+ result.toString();
    updateDisplay();
  } catch (error) {
    currentDisplay += "\nError";
    updateDisplay();
  }
  resultDisplay=true;
}

function clearLastElement() {
  currentDisplay = currentDisplay.slice(0, -1);
  if (currentDisplay === "") {
    currentDisplay = "0";
  }
  updateDisplay();
}

function clearDisplay() {
  currentDisplay = "0";
  updateDisplay();
}

// Attach handleOverflow to window resize event
window.addEventListener("resize", handleOverflow);

// Call handleOverflow initially to handle any overflow on page load
handleOverflow();
