const calculator = document.getElementById('calculator');
const expressionSpan = document.querySelector('#calculator__expression span');
const resultSpan = document.querySelector('#calculator__result span');
const operatorConversion = {};
initOperatorConversion();

let expressionString = '';
let result = '';

let last_is_operator = false;

calculator.querySelectorAll('.js-button').forEach(function(button) {
    button.addEventListener('click', function() {
        const role = this.dataset.role;
        const func = this.dataset.function;
        const value = this.dataset.value;

        switch (role) {
            case 'operator':
                if (blockOperator(role, func)) return;
                appendToExpression(value);
                renderExpression();
                break;
            case 'number':
                if (blockOperator(role, func)) return;
                appendToExpression(value);
                renderExpression();
                break;
            case 'misc':
                if (func === 'equal') {
                    calculateResult();
                    renderResult();
                } else if (func === 'clear') {
                    clearDisplay();
                } else if (func === 'decimal-point') {
                    if (blockOperator(role, func)) return;
                    appendToExpression(value);
                    renderExpression();
                }
                break;
        }
    });
});

function appendToExpression(value) {
    expressionString += value;
}

function renderExpression() {
    expressionSpan.textContent = expressionString; 
}

function calculateResult() {
    try {
        result = eval(cleanExpression());
        result = parseFloat(Number(result).toFixed(8))
    } catch {
        result = 'ERROR';
    }
}

function renderResult() {
    resultSpan.textContent = result;
}

function blockOperator(role, func) {
    if (role === 'operator') {
        if (expressionString === '' && ['multiply', 'divide'].includes(func)) return true;
        if (last_is_operator) return true;
        last_is_operator = true;
    } else {
        last_is_operator = false;
        return false;
    }
}

function cleanExpression() {
    let cleanExpression = expressionString;
    Object.entries(operatorConversion).forEach(function([key, value]) {
        cleanExpression = cleanExpression.replaceAll(key, value);
    });
    return cleanExpression;
}

function clearDisplay() {
    expressionString = '';
    result = '';
    renderExpression();
    renderResult();
}

function initOperatorConversion() {
    operatorConversion[document.querySelector('.js-button[data-function="add"]').dataset.value] = '+';
    operatorConversion[document.querySelector('.js-button[data-function="subtract"]').dataset.value] = '-';
    operatorConversion[document.querySelector('.js-button[data-function="multiply"]').dataset.value] = '*';
    operatorConversion[document.querySelector('.js-button[data-function="divide"]').dataset.value] = '/';
}