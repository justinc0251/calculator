const displayText = document.getElementById("display-text");
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) =>
  button.addEventListener("click", () => updateDisplay(button.textContent))
);

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function operate(operator, a, b) {
  let answer = operator(a, b);
  return answer;
}

function updateDisplay(input) {
  if ((displayText.textContent == "0")) {
    displayText.textContent = "";
  }
  displayText.textContent += input;
}
