

//Math Operations
function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
  return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
  //Cannot divide by zero
  if (b !== 0) {
    return parseFloat(a) / parseFloat(b);
  } else {
    alert("Cannot divide by zero!");
    clearbutton.click();
  }
}

function modulus(a, b) {
  return parseFloat(a) % parseFloat(b);
}

function doMath(operator, operand1, operand2) {

  const calc = document.getElementById('calculator');
  const disp = document.getElementById('display');
  const input = document.getElementById('inputarea');
  const output = document.getElementById('answerarea');

  const oper1 = document.getElementById('operand1');
  const oper2 = document.getElementById('operand2');
  const operatorinput = document.getElementById('operator');


  if (operator === '+') {
    return add(operand1, operand2);
  } else if (operator === '-') {
    return subtract(operand1, operand2);
  } else if (operator === '*') {
    return multiply(lperand1, operand2);
  } else if (operator === '/') {
    return divide(operand1, operand2);
  } else if (operator === '%') {
    return modulus(operand1, operand2);
  }

  document.querySelectorAll('.digitbutton').forEach(item => {
    item.addEventListener('click', event => {
      updateOperands(item.textContent);
    })
  });

  

}