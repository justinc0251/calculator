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
  displayAnswer.textContent *= -1;
});

const percentButton = document.getElementById("percent");

percentButton.addEventListener("click", calculatePercent);

const decimalButton = document.getElementById("decimal");

decimalButton.addEventListener("click", addDecimal);

function addDecimal() {
  if (displayAnswer.textContent === "") displayAnswer.textContent = "0";
  if (displayAnswer.textContent.includes(".")) {
    return;
  }
  displayAnswer.textContent += ".";
}

function backspace() {
  if (displayAnswer.textContent === "0") {
    return;
  }
  if (displayAnswer.textContent.length === 1) {
    displayAnswer.textContent = "0";
  } else {
    displayAnswer.textContent = displayAnswer.textContent
      .toString()
      .slice(0, -1);
  }
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
    displayAnswer.textContent = "";
    isOperator = false;
  } else {
    if (displayAnswer.textContent == "0") {
      displayAnswer.textContent = "";
    }
  }
  displayAnswer.textContent += input;
}

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

function evaluate() {
  if (isAnswer) {
    return;
  }
  if (currentOperator == "") {
    return;
  }

  secondNumber = displayAnswer.textContent;

  answer = roundNumber(
    operate(currentOperator, Number(firstNumber), Number(secondNumber))
  );
  displayAnswer.textContent = answer;
  isAnswer = true;
  isSecondNumber = false;
  displayOperation.textContent = `${firstNumber} ${currentOperator} ${secondNumber} = ${answer}`;
  currentOperator = "";
}

const subtractButton = document.getElementById("subtract");
const addButton = document.getElementById("add");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");

function getOperator(operator) {
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

function changeOperatorButtonColor(operator) {
  if (operator == "x") {
    resetButtonColors();
    multiplyButton.style.backgroundColor = "lightgrey";
  } else if (operator == "+") {
    resetButtonColors();
    addButton.style.backgroundColor = "lightgrey";
  } else if (operator == "-") {
    resetButtonColors();
    subtractButton.style.backgroundColor = "lightgrey";
  } else if (operator == "÷") {
    resetButtonColors();
    divideButton.style.backgroundColor = "lightgrey";
  } else {
    return;
  }
}

function resetButtonColors() {
  multiplyButton.style.backgroundColor = "rgb(231, 231, 231)";
  addButton.style.backgroundColor = "rgb(231, 231, 231)";
  subtractButton.style.backgroundColor = "rgb(231, 231, 231)";
  divideButton.style.backgroundColor = "rgb(231, 231, 231)";
}

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
