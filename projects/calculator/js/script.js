const calculator = document.getElementById('calculator');
const expressionSpan = document.querySelector('#calculator__expression span');
const resultSpan = document.querySelector('#calculator__result span');

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
        console.log(expressionString);
    });
});

function appendToExpression(value) {
    expressionString += value;
}

function renderExpression() {
    expressionSpan.textContent = expressionString; 
}