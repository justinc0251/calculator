let currentOperator = "";
let firstNumber = "";
let secondNumber = "";
let answer = "";
let isOperator = false;
let isAnswer = false;
let isSecondNumber = false;

window.addEventListener("keydown", keyboardInput);

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
}

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
    getOperator(operator.textContent);
  });
});

const equalButton = document.getElementById("equal");

equalButton.addEventListener("click", evaluate);

const clearButton = document.getElementById("clear");

clearButton.addEventListener("click", clear);

const oppositeSignButton = document.getElementById("opposite-sign");

oppositeSignButton.addEventListener("click", () => {
  displayText.textContent *= -1;
});

const decimalButton = document.getElementById("decimal");

decimalButton.addEventListener("click", addDecimal);

function addDecimal() {
  if (displayText.textContent === "") displayText.textContent = "0";
  if (displayText.textContent.includes(".")) {
    return;
  }
  displayText.textContent += ".";
}

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

function updateDisplay(input) {
  // If new number is inputted after answer, display is cleared.
  if (isAnswer == true) {
    clear();
    isAnswer = false;
  }

  if (currentOperator != "" && firstNumber != "") {
    isSecondNumber = true;
  }

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

function evaluate() {
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
  isSecondNumber = false;
  currentOperator = "";
}

function getOperator(operator) {
  if (currentOperator != "" && !isAnswer && isSecondNumber) {
    secondNumber = displayText.textContent;
    displayText.textContent = operate(
      currentOperator,
      Number(firstNumber),
      Number(secondNumber)
    );
  }
  currentOperator = operator;
  isAnswer = false;
  isOperator = true;
  firstNumber = displayText.textContent;
}
