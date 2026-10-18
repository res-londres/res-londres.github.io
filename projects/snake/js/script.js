const SNAKE_COLOR = "#3b719f";
const CANVAS_COLOR = "#fed33c";
const BORDER_COLOR = "#595959";

const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');

let changingDirection = false;
let dx = 0;
let dy = -10;

let snake = [
    {x: 150, y: 150},  
    {x: 140, y: 150},  
    {x: 130, y: 150},  
    {x: 120, y: 150},  
    {x: 110, y: 150}
];

main();
document.addEventListener('keydown', changeDirection);

function main() {  
    setTimeout(function onTick() {  
        changingDirection = false;
        clearCanvas();  
        advanceSnake();
        drawSnake();

        main();
    }, 100);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_COLOR;

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function advanceSnake() {  
    const head = {
        x: snake[0].x + dx, 
        y: snake[0].y + dy
    };
    snake.unshift(head);
    snake.pop();
}

function clearCanvas() {
    ctx.fillStyle = CANVAS_COLOR;
    ctx.strokestyle = BORDER_COLOR;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}