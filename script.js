let currentOperator = "";
let firstNumber = "";
let secondNumber = "";
let isOperator = false;
const displayText = document.getElementById("display-text");

const numbers = document.querySelectorAll(".number");

numbers.forEach((button) => {
  button.addEventListener("click", () => {
  });
});

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
  operator.addEventListener("click", () => {

    }
  });
});

const clearButton = document.getElementById("clear");

clearButton.addEventListener("click", () => {
  displayText.textContent = "0";
  currentOperator = "";
  firstNumber = "";
  secondNumber = "";
});

function operate(operator, a, b) {
  if (operator == "add") {
    return a + b;
  }
  if (operator == "subtract") {
    return a - b;
  }
  if (operator == "divide") {
    return a / b;
  }
  if (operator == "multiply") {
    return a * b;
  }
}

