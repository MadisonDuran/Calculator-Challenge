// Access DOM elements of the calculator
const calculator__inputBox = document.getElementById('calculator__input')
const calculator__expressionDiv = document.getElementById('calculator__expression')
const calculator__resultDiv = document.getElementById('calculator__result')

// Define expression and result variable
let calculator__expression = '';
let calculator__result = '';

// Define event handler for button clicks

function buttonClick(event) {
    // Get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    //console.log(target, action, value);

// Switch case to control the calculator
switch (action) {
    case 'number':
        addValue(value);
        break;
    case 'clear':
        clear();
        break;

}

// Update display
updateDisplay(calculator__expression, calculator__result)
}

calculator__inputBox.addEventListener('click', buttonClick);

function addValue(value) {
    // Add value to expression
    calculator__expression += value;
    //console.log(calculator__expression);
}

function updateDisplay(calculator__expression, calculator__result) {
    calculator__expressionDiv.textContent = calculator__expression;
    calculator__resultDiv.textContent = calculator__result;
}

function clear() {
    calculator__expression = '';
    calculator__result = '';
}