const calculator = document.getElementById('calculator');
const expressionSpan = document.querySelector('#calculator__expression span');
const resultSpan = document.querySelector('#calculator__result span');

let expressionString = '';
let result = '';

let last_is_operator = false;

calculator.querySelectorAll('.js-button').forEach(function(button) {
    button.addEventListener('click', function(event) {
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
                break;
        }
        console.log(expressionString);
    });
});

function appendToExpression(value) {
    expressionString += value;
}

function renderExpression() {
    expressionSpan.textContent = expressionString; 
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