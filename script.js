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
        // Add the result to expression as a starting point if expression is empty
    case 'addition':
    case 'subtraction':
    case 'multiplication':
    case 'division':
        if (calculator__expression === '' && calculator__result !== '') {
          startFromCalculatorResult(value);
        } else if (calculator__expression !== '' && !isLastCharOperator
        ()) {
            addValue(value);
        }
        break;
        case 'submit':
            submit();
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

function isLastCharOperator() {
    return isNaN(parseInt(calculator__expression.slice(-1)));
}

function startFromCalculatorResult(value) {
    calculator__expression += calculator__result + value;
}

function submit() {
    if (!calculator__expression) return; // Prevent submit on empty
    calculator__result = evaluateCalculatorExpression();
    updateDisplay(calculator__expression, calculator__result);
    calculator__expression = '';
    updateDisplay(calculator__expression, calculator__result); // Clear expression from display
}

function evaluateCalculatorExpression() {
    if (!calculator__expression) return '';
    try {
        const safeExpression = calculator__expression
            .replace(/×|x/g, '*')
            .replace(/÷/g, '/');
        // Check for division by zero
        if (/\/0(?!\d)/.test(safeExpression)) {
            return 'Error';
        }
        const evalCalculatorResult = eval(safeExpression);

        if (isNaN(evalCalculatorResult) || !isFinite(evalCalculatorResult)) {
            return 'Error';
        } else if (evalCalculatorResult < 1) {
            return parseFloat(evalCalculatorResult.toFixed(10));
        } else {
            return parseFloat(evalCalculatorResult.toFixed(2));
        }
    } catch (e) {
        return 'Error';
    }
}