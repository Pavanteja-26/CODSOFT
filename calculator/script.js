// Calculator Variables
let currentDisplay = '0';
let previousValue = null;
let operation = null;
let shouldResetDisplay = false;

// Get display element
const displayElement = document.getElementById('display');

// Function to update display
function updateDisplay() {
    displayElement.textContent = currentDisplay;
}

// Function to append number to display
function appendNumber(number) {
    if (shouldResetDisplay) {
        currentDisplay = number;
        shouldResetDisplay = false;
    } else {
        if (currentDisplay === '0') {
            currentDisplay = number;
        } else {
            currentDisplay += number;
        }
    }
    updateDisplay();
}

// Function to append decimal point
function appendDecimal() {
    if (shouldResetDisplay) {
        currentDisplay = '0.';
        shouldResetDisplay = false;
    } else if (!currentDisplay.includes('.')) {
        currentDisplay += '.';
    }
    updateDisplay();
}

// Function to set operation
function setOperation(op) {
    if (previousValue === null) {
        previousValue = parseFloat(currentDisplay);
    } else if (operation) {
        performCalculation();
        previousValue = parseFloat(currentDisplay);
    }
    
    operation = op;
    shouldResetDisplay = true;
}

// Function to perform calculation
function performCalculation() {
    let result;
    const current = parseFloat(currentDisplay);
    
    if (previousValue === null || operation === null) {
        return;
    }
    
    // Using if-else statements for operations
    if (operation === '+') {
        result = previousValue + current;
    } else if (operation === '-') {
        result = previousValue - current;
    } else if (operation === '*') {
        result = previousValue * current;
    } else if (operation === '/') {
        if (current === 0) {
            alert('Cannot divide by zero!');
            clearDisplay();
            return;
        }
        result = previousValue / current;
    }
    
    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;
    currentDisplay = result.toString();
    updateDisplay();
}

// Function to calculate and display result
function calculate() {
    performCalculation();
    previousValue = null;
    operation = null;
    shouldResetDisplay = true;
}

// Function to clear display
function clearDisplay() {
    currentDisplay = '0';
    previousValue = null;
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// Function to delete last character (backspace)
function backspace() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1);
    } else {
        currentDisplay = '0';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers 0-9
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    
    // Operators
    if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperation(key);
    }
    
    // Decimal point
    if (key === '.' || key === ',') {
        appendDecimal();
    }
    
    // Enter or Equals
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // Backspace
    if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    }
    
    // Escape or Delete to clear
    if (key === 'Escape' || key === 'Delete') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();