const SNAKE_COLOR = "#3b719f";
const CANVAS_COLOR = "#fed33c";
const FOOD_COLOR = "#c7372f"
const BORDER_COLOR = "#595959";
const GAME_SPEED = 100;

const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');

let changingDirection = false;
let foodX;
let foodY;
let dx = 0;
let dy = -10;
let lastTime = 0;

let snake = [
    {x: 150, y: 150},  
    {x: 140, y: 150},  
    {x: 130, y: 150},  
    {x: 120, y: 150},  
    {x: 110, y: 150}
];

requestAnimationFrame(main);
createFood();
document.addEventListener('keydown', changeDirection);

function main(currentTime) {
    requestAnimationFrame(main);

    const deltaTime = currentTime - lastTime;

    if (deltaTime >= GAME_SPEED) {
        lastTime = currentTime;
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
    }
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

function randomPoint(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
    let foodIsOnSnake = true;

    while (foodIsOnSnake) {
        foodX = randomPoint(0, canvas.width - 10);
        foodY = randomPoint(0, canvas.height - 10);

        foodIsOnSnake = false;

        for (let i = 0; i < snake.length; i++) {
            const snakePart = snake[i];
            if (snakePart.x === foodX && snakePart.y === foodY) {
                foodIsOnSnake = true; 
                break; 
            }
        }
    }
}

function drawFood() {
    ctx.fillStyle = FOOD_COLOR;
    ctx.fillRect(foodX, foodY, 10, 10);
}