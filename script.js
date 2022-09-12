const displayText = document.getElementById("display-text");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Multiply "a" by 1.0
function divide(a, b) {
  return (a * 1.0) / b;
}

function multiply(a, b) {
  return a * b;
}

function operate(operator, a, b) {
  let answer = operator(a, b);
  return answer;
}

console.log(operate(divide, 1, 2));
