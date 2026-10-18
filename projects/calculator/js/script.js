const calculator = document.getElementById('calculator');
const displayExpression = document.getElementById('calculator__expression');
const displayResult = document.getElementById('calculator__result');

let expressionString = '';
let result = '';

calculator.querySelectorAll('.js-button').forEach(function(button) {
    button.addEventListener('click', function(event) {
        const role = this.dataset.role;
        const value = this.dataset.value;

        switch (role) {
            case 'operator':
                appendToExpression(value);
                renderExpression();
                break;
            case 'number':
                appendToExpression(value);
                renderExpression();
                break;
            case 'misc':
                break;
        }
    });
});

function appendToExpression(value) {
    expressionString += value;
}

function renderExpression() {
    displayExpression.textContent = expressionString;
}