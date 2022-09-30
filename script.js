// Global Variables
let currentOperator = "";
let firstNumber = "";
let secondNumber = "";
let answer = "";
let isOperator = false;
let isAnswer = false;
let isSecondNumber = false;

const displayAnswer = document.getElementById("display-answer");
const displayOperation = document.getElementById("display-operation");

window.addEventListener("keydown", keyboardInput);

// Handles keyboard inputs and assigns them to keys
function keyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    updateDisplay(e.key);
  }
  if (e.key === "=" || e.key === "Enter") {
    evaluate();
  }
  if (e.key === "/") {
    getOperator("÷");
  }
  if (e.key === "+") {
    getOperator("+");
  }
  if (e.key === "-") {
    getOperator("-");
  }
  if (e.key === "*" || e.key === "x") {
    getOperator("x");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Escape" || e.key === "c") {
    clear();
  }
  if (e.key === "Backspace") {
    backspace();
  }
  if (e.key === "%") {
    calculatePercent();
  }
}

// Click listener for numbers
const numbers = document.querySelectorAll(".number");
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    updateDisplay(button.textContent);
  });
});

// Click listeners for operators
const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    getOperator(operator.textContent);
  });
});

// Click listener for equal button
const equalButton = document.getElementById("equal");
equalButton.addEventListener("click", evaluate);

// Click listener for clear button
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

// Click listener for opposite sign button
const oppositeSignButton = document.getElementById("opposite-sign");
oppositeSignButton.addEventListener("click", () => {
  displayAnswer.textContent *= -1;
});

// Click listener for percent button
const percentButton = document.getElementById("percent");
percentButton.addEventListener("click", calculatePercent);

// Click listener for decimal button
const decimalButton = document.getElementById("decimal");
decimalButton.addEventListener("click", addDecimal);

// Decimal functionality, prevents two decimals
function addDecimal() {
  if (displayAnswer.textContent === "") {
    displayAnswer.textContent = "0";
  }
  if (displayAnswer.textContent.includes(".")) {
    return 0;
  }
  displayAnswer.textContent += ".";
}

// Deletes last inputted number
function backspace() {
  if (displayAnswer.textContent === "0") {
    return;
  }
  if (displayAnswer.textContent.length === 1) {
    displayAnswer.textContent = "0";
  } else {
    displayAnswer.textContent = displayAnswer.textContent.toString().slice(0, -1);
  }
}

// Operator functions
function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

// Runs operator function based on operator and number inputs
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) {
        return;
      } else {
        return divide(a, b);
      }
    default:
      return;
  }
}

// Updates display 
function updateDisplay(input) {
  // If new number is inputted after answer, display is cleared.
  if (isAnswer == true) {
    clear();
    isAnswer = false;
  }

  // Prevents display from overflowing by limiting characters on display to 15
  if (!isOperator) {
    if (displayAnswer.textContent.length == 15) {
      return;
    }
  }

  // If only firstNumber and operator is inputted, recognizes number on display as secondNumber
  if (currentOperator != "" && firstNumber != "") {
    isSecondNumber = true;
  }

  // Clears display before secondNumber is inputted
  if (isOperator == true && firstNumber != "") {
    displayAnswer.textContent = "";
    isOperator = false;
  // Clears display before firstNumber is inputted
  } else {
    if (displayAnswer.textContent == "0") {
      displayAnswer.textContent = "";
    }
  }

  // Adds input to display
  displayAnswer.textContent += input;
}

// Clears display
function clear() {
  displayAnswer.textContent = "0";
  displayOperation.textContent = "";
  currentOperator = "";
  firstNumber = "";
  secondNumber = "";
  answer = "";
  isOperator = false;
  isAnswer = false;
  isSecondNumber = false;
  resetButtonColors();
}

// Evaluates operation
function evaluate() {
  // Returns if user already pressed equal button once without inputting another operator or number
  if (isAnswer) {
    return;
  }
  // Returns if no operator is being used
  if (currentOperator == "") {
    return;
  }

  secondNumber = displayAnswer.textContent;

  answer = roundNumber(operate(currentOperator, Number(firstNumber), Number(secondNumber)));
  displayAnswer.textContent = answer;
  isAnswer = true;
  isSecondNumber = false;
  displayOperation.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
  currentOperator = "";
}

// Operator elements
const subtractButton = document.getElementById("subtract");
const addButton = document.getElementById("add");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");

function getOperator(operator) {
  // Evaluates operation if another operator is inputted
  if (currentOperator != "" && !isAnswer && isSecondNumber) {
    secondNumber = displayAnswer.textContent;
    displayAnswer.textContent = roundNumber(operate(currentOperator, Number(firstNumber), Number(secondNumber)));
    isSecondNumber = false;
  }
  changeOperatorButtonColor(operator);
  currentOperator = operator;
  isAnswer = false;
  isOperator = true;
  firstNumber = displayAnswer.textContent;
  displayOperation.textContent = `${firstNumber} ${currentOperator}`;
}

// Change operator button color after it is pressed
function changeOperatorButtonColor(operator) {
  if (operator == "x") {
    resetButtonColors();
    multiplyButton.style.backgroundColor = "rgb(100, 100, 100)";
  } else if (operator == "+") {
    resetButtonColors();
    addButton.style.backgroundColor = "rgb(100, 100, 100)";
  } else if (operator == "-") {
    resetButtonColors();
    subtractButton.style.backgroundColor = "rgb(100, 100, 100)";
  } else if (operator == "÷") {
    resetButtonColors();
    divideButton.style.backgroundColor = "rgb(100, 100, 100)";
  } else {
    return;
  }
}

// Resets operator button colors
function resetButtonColors() {
  multiplyButton.style.backgroundColor = "rgb(55, 55, 55)";
  addButton.style.backgroundColor = "rgb(55, 55, 55)";
  subtractButton.style.backgroundColor = "rgb(55, 55, 55)";
  divideButton.style.backgroundColor = "rgb(55, 55, 55)";
}

// Percent function
function calculatePercent() {
  if (firstNumber == "") {
    firstNumber = 1;
  }
  displayOperation.textContent += ` ${displayAnswer.textContent}%`;
  displayAnswer.textContent = (Number(displayAnswer.textContent) / 100) * Number(firstNumber);
}

// Rounding function
function roundNumber(number) {
  return Math.round(number * 10000) / 10000;
}
