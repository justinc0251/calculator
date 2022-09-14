let currentOperator = "";
let firstNumber = "";
let secondNumber = "";
let answer = "";
let isOperator = false;
let isAnswer = false;
const displayText = document.getElementById("display-text");

const numbers = document.querySelectorAll(".number");

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    updateDisplay(button.textContent);
  });
});

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (currentOperator != "" && !isAnswer) {
      secondNumber = displayText.textContent;
      displayText.textContent = operate(
        currentOperator,
        Number(firstNumber),
        Number(secondNumber)
      );
    }
    currentOperator = operator.textContent;
    isAnswer = false;
    isOperator = true;
    firstNumber = displayText.textContent;
  });
});

const equalButton = document.getElementById("equal");

equalButton.addEventListener("click", () => {
  if (isAnswer) {
    return;
  }
  if (currentOperator == "") {
    return;
  }

  secondNumber = displayText.textContent;

  answer = operate(currentOperator, Number(firstNumber), Number(secondNumber));
  displayText.textContent = answer;
  isAnswer = true;
});

const clearButton = document.getElementById("clear");

clearButton.addEventListener("click", () => {
  clear();
});

const oppositeSignButton = document.getElementById("opposite-sign");

oppositeSignButton.addEventListener("click", () => {
  displayText.textContent *= -1;
});

function operate(operator, a, b) {
  if (operator == "+") {
    return a + b;
  }
  if (operator == "-") {
    return a - b;
  }
  if (operator == "÷") {
    return a / b;
  }
  if (operator == "x") {
    return a * b;
  }
}

function updateDisplay(input) {
  newNumber();
  if (isOperator == true && firstNumber != "") {
    displayText.textContent = "";
    isOperator = false;
  } else {
    if (displayText.textContent == "0") {
      displayText.textContent = "";
    }
  }
  displayText.textContent += input;
}

function clear() {
  displayText.textContent = "0";
  currentOperator = "";
  firstNumber = "";
  secondNumber = "";
  answer = "";
}

// If new number is inputted after answer, display is cleared.
function newNumber() {
  if (isAnswer == true) {
    clear();
    isAnswer = false;
  }
}
