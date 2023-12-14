// Variables para llevar un seguimiento de la entrada del usuario y los cálculos
let currentInput = '';
let previousInput = '';
let operator = null;

// Función para actualizar la pantalla de la calculadora
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = currentInput;
}

// Función para manejar los dígitos y operadores ingresados por el usuario
function inputDigit(digit) {
    if (currentInput === '0' && digit !== '.') {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

function inputDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function inputOperator(nextOperator) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    currentInput = '';
    operator = nextOperator;
}

// Función para cambiar el signo del número actual
function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

// Función para realizar cálculos
function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (operator === '+') {
        result = prev + current;
    } else if (operator === '-') {
        result = prev - current;
    } else if (operator === '*') {
        result = prev * current;
    } else if (operator === '/') {
        result = prev / current;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// Función para borrar la entrada actual
function clear() {
    currentInput = '0';
    operator = null;
    previousInput = '';
    updateDisplay();
}

// Manejar eventos de botones
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('backspace').addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});
document.getElementById('percentage').addEventListener('click', () => {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
});
document.getElementById('divide').addEventListener('click', () => inputOperator('/'));
document.getElementById('multiply').addEventListener('click', () => inputOperator('*'));
document.getElementById('subtract').addEventListener('click', () => inputOperator('-'));
document.getElementById('add').addEventListener('click', () => inputOperator('+'));
document.getElementById('toggle-sign').addEventListener('click', toggleSign);
document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('decimal').addEventListener('click', inputDecimal);

// Manejar eventos de números
for (let i = 0; i <= 9; i++) {
    document.getElementById(i.toString()).addEventListener('click', () => inputDigit(i.toString()));
}

// Inicializar la calculadora
updateDisplay();
