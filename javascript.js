const calc = document.getElementById('calculator');
const disp = document.getElementById('display');
const input = document.getElementById('inputarea');
const output = document.getElementById('answerarea');

const result = document.getElementById('equals');
const clear = document.getElementById('clear');
const deleteme = document.getElementById('backspace');

const dot = document.getElementById('dot');

const oper1 = document.getElementById('operand1');
const oper2 = document.getElementById('operand2');
const operatorinput = document.getElementById('operator');

let decimalPlaces = 4;
const rounder = document.getElementById('getdigits');

//Working on rounding changing values
// document.querySelectorAll('#rounding').forEach(item => {
//   item.addEventListener('')
// })
rounder.addEventListener('input', updateValue);

function updateValue(val) {
  decimalPlaces = val.target.value;
}

//Gets information for update of operands
document.querySelectorAll('.digitbutton').forEach(item => {
  item.addEventListener('click', event => {
    updateOperands(item.textContent);
  })
});

//Getting the operator from input
document.querySelectorAll('.operatorbutton').forEach(item => {
  item.addEventListener('click', event => {
    updateOperator(item.textContent);
  })
});



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
    clear.click();
    return 0;
  }
}
function modulus(a, b) {
  return parseFloat(a) % parseFloat(b);
}


function doMath(operator, operand1, operand2) {
  if (operator === '+') {
    return add(operand1, operand2);
  } else if (operator === '-') {
    return subtract(operand1, operand2);
  } else if (operator === 'X') {
    return multiply(operand1, operand2);
  } else if (operator === '/') {
    return divide(operand1, operand2);
  } else if (operator === '%(Mod)') {
    return modulus(operand1, operand2);
  }
}



//Will update the numbers for operation
function updateOperands(value) {
  //Checks to see if the operator has a value - then look at second operand
  if (operatorinput.textContent == '') {
    oper1.textContent += value;
  } else {
    oper2.textContent += value;
  }
}

function updateOperator(value) {
  if (oper1.textContent !== '' && oper2.textContent === '') {
    operatorinput.textContent = value;
  } //If there are values present for both operands, do initial math (like '=')
  else if (oper1.textContent !== '' && oper2.textContent !== '') {
    //Performing mathematical operations
    let tempAns = roundAnswer(doMath(operatorinput.textContent, oper1.textContent, oper2.textContent));
    //This sets the answer the first operator for future maths
    oper1.textContent = tempAns;
    operatorinput.textContent = value;
    oper2.textContent = '' //Resets the second operator if math is done
  } 
  else if (oper1.textContent === '' && output.textContent !== '') {
    oper1.textContent = output.textContent;
    operatorinput.textContent = value;
  }
}

function roundAnswer(value) {
  return parseFloat(value.toFixed(decimalPlaces));
}

result.onclick = function() {
  if (oper1.textContent !== '' && operatorinput !== '' && oper2.textContent !== '') {
    let tempAns = roundAnswer(doMath(operatorinput.textContent, oper1.textContent, oper2.textContent));
    output.textContent = tempAns;
    oper1.textContent = '';
    operatorinput.textContent = '';
    oper2.textContent = '';
  } else {
    alert("Incorrect formatting!");
  }
}

//Clear the operators and answer
clear.onclick = function() {
  oper1.textContent = '';
  oper2.textContent = '';
  operatorinput.textContent = '';
  output.textContent = '';
}

//Function for deleting one element at a time
deleteme.onclick = function() {
  if (oper2.textContent != '') {
    //Removing the last character
    oper2.textContent = oper2.textContent.slice(0,-1);
  } else if (operatorinput.textContent !== '') {
    operatorinput.textContent = '';
  } else if (oper1.textContent !== '') {
    oper1.textContent = oper1.textContent.slice(0,-1);
  } else {
    alert("Nothing left to delete!");
  }
}

dot.onclick = function() {
  if (oper1.textContent == '') {
    oper1.textContent += '0.';
  } else if (oper1.textContent !== '' && operatorinput.textContent === '') {
    let checkdec = oper1.textContent.split('');
    //Check if there is NOT already a decimal in the number
    if (!checkdec.includes('.')) {
      //Add the decimal in, must come after number
      oper1.textContent += '.';
    } 

  } else if (operatorinput !== '' && oper2.textContent === '') {
    oper2.textContent += '0.';
  } else {
    let checkdec = oper2.textContent.split('');
    if (!checkdec.includes('.')) {
      oper2.textContent += '.';
    }
  }
}
