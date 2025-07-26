// Access DOM elements of the calculator
const calculator__inputBox = document.getElementById('calculator__input')
const calculator__expressionDiv = document.getElementById('calculator__expression')
const calculator__resultDiv = document.getElementById('calculator__result')

// Define expression and result variable
let calculator__expression = '';
let calculator__result = '';

// Event Listener - Handles all button clicks
calculator__inputBox.addEventListener('click', buttonClick);

function buttonClick(event) {
    // Get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;

// Switch case to control the calculator
switch (action) {
    case 'number': // Numbers (0-9, ., 00)
        addValue(value);
        break;
    case 'clear': // C - clears current input
    case 'all-clear': // AC - clears everything
        clear();
        break;
        // Operators (+, -, x, /,)
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
            submit(); // evaluates the final expression
            break;
        case 'percentage': // % percentage
            if (calculator__expression !== '' && !isLastCharOperator()) {
                addValue('/100');
            }
            break;
        case 'square-root': // square root 
            if (calculator__expression !== '' && !isLastCharOperator()) {
              applySquareRoot();
            }
            break;
}

// Update display
updateDisplay(calculator__expression, calculator__result)
}
// Add value - Add numbers or symbols to the expression
function addValue(value) {
    // Add value to expression
    calculator__expression += value;
    //console.log(calculator__expression);
}
// Updates display - Updates the expression & result on screen
function updateDisplay(calculator__expression, calculator__result) {
    calculator__expressionDiv.textContent = calculator__expression;
    calculator__resultDiv.textContent = calculator__result;
}
// Clear - Reset calculator display
function clear() {
    calculator__expression = '';
    calculator__result = '';
}
// Check Last character - prevents multiple operators
function isLastCharOperator() {
    return isNaN(parseInt(calculator__expression.slice(-1)));
}
// Start from result - continues calculation from previous result
function startFromCalculatorResult(value) {
    calculator__expression += calculator__result + value;
}
// Submit - evaluates the full expression and shows result
function submit() {
    if (!calculator__expression) return; // Prevent submit on empty
    calculator__result = evaluateCalculatorExpression();
    updateDisplay(calculator__expression, calculator__result);
    calculator__expression = '';
}
// Evaluate expression - Safety evaluates mathematical expressions
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
// Covnvert to percentage - Taking a number and turning it into percentage form by dividing it by 100
function convertToPercentage() {
    try {
        const match = calculator__expression.match(/(\d+(\.\d+)?)$/);
        if (match) {
            const lastNumber = parseFloat(match[0]);
            const percentageValue = (lastNumber / 100).toString();
            calculator__expression =calculator__expression.replace(/(\d+(\.\d+)?)$/, percentageValue);
            updateDisplay(calculator__expression, calculator__result);
        }
    } catch (e) {
        calculator__result = 'Error';
        updateDisplay(calculator__expression, calculator__result);
    }
}
// Apply square root - calculates the square root of the last entered number and updates the display
function applySquareRoot() {
    try {
        const match = calculator__expression.match(/(\d+(\.\d+)?)$/);
        if (match) {
          const lastNumber = parseFloat(match[0]);
          if (lastNumber < 0) {
            calculator__result = 'Error';
            updateDisplay(calculator__expression, calculator__result);
            return;
          }
          const sqrtValue = Math.sqrt(lastNumber). toString();
          calculator__expression = calculator__expression.replace(/(\d+(\.\d+)?)$/, sqrtValue);
          updateDisplay(calculator__expression, calculator__result);
        } 
    } catch (e) {
        calculator__result = 'Error';
        updateDisplay(calculator__expression, calculator__result);
    }
}
   