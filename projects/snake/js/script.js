const SNAKE_COLOR = "#1a2421";
const SNAKE_BORDER_COLOR = "#cfcfc4";
const CANVAS_COLOR = "#cfcfc4";
const FOOD_COLOR = "#cfcfc4"
const FOOD_BORDER_COLOR = "#1a2421";
const BORDER_COLOR = "#1a2421";
const SNAKE_SPEED = 100;
const SCORE_INCREMENT = 10;
const GRID_SIZE = 15;

const canvas = document.getElementById('snake__canvas');
const ctx = canvas.getContext('2d');

const snakeScore = document.getElementById('snake__score');
const snakeHighscore = document.getElementById('snake__highscore');
const snakeStatus = document.getElementById('snake__status');
const snakeMessage = document.getElementById('snake__message');

let isChangingDirection = false;
let isGameOver = true;
let score = 0;
let highscore = 0;
let foodX;
let foodY;
let dx = GRID_SIZE;
let dy = 0;
let lastTime = 0;

function getStartSnake() {
    return [
        {x: 150, y: 150},  
        {x: 135, y: 150},  
        {x: 120, y: 150},  
        {x: 105, y: 150},  
        {x: 90, y: 150}
    ];
}
let snake = getStartSnake();

requestAnimationFrame(main);
drawSnake();
document.addEventListener('keydown', changeDirection);
document.addEventListener('keydown', restartGame);
connectController();

function main(currentTime) {
    requestAnimationFrame(main);

    if (isGameOver) return;

    if (didGameEnd()) {
        gameOver();
        return;
    }

    const deltaTime = currentTime - lastTime;

    if (deltaTime >= SNAKE_SPEED) {
        lastTime = currentTime;
        isChangingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
    }
}

/* ----------------------------- SNAKE ----------------------------- */

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.strokeStyle = SNAKE_BORDER_COLOR;

    ctx.lineWidth = 2; 

    ctx.fillRect(snakePart.x, snakePart.y, GRID_SIZE, GRID_SIZE);
    ctx.strokeRect(snakePart.x, snakePart.y, GRID_SIZE, GRID_SIZE);
}

function advanceSnake() {  
    const head = {
        x: snake[0].x + dx, 
        y: snake[0].y + dy
    };
    snake.unshift(head);
    const didEatFood = head.x === foodX && head.y === foodY;
    if (didEatFood) {
        incrementScore();
        createFood();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const keyPressed = typeof(event) === 'object' ? event.keyCode : event;
    console.log('keypressed: ', keyPressed);

    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (isChangingDirection) return;
    isChangingDirection = true;

    const goingUp = dy === -GRID_SIZE;
    const goingDown = dy === GRID_SIZE;
    const goingRight = dx === GRID_SIZE;
    const goingLeft = dx === -GRID_SIZE;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -GRID_SIZE;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -GRID_SIZE;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = GRID_SIZE;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = GRID_SIZE;
    }
}

/* ----------------------------- FOOD ----------------------------- */

function randomPoint(max) {
    return Math.floor(Math.random() * (max / GRID_SIZE)) * GRID_SIZE;
}

function createFood() {
    let foodIsOnSnake = true;

    while (foodIsOnSnake) {
        foodX = randomPoint(canvas.width);
        foodY = randomPoint(canvas.height);

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
    ctx.strokeStyle = FOOD_BORDER_COLOR;

    ctx.lineWidth = 2;

    ctx.fillRect(foodX + 2, foodY + 2, 11, 11);
    ctx.strokeRect(foodX + 2, foodY + 2, 11, 11);
}

/* ----------------------------- MISC ----------------------------- */

function clearCanvas() {
    ctx.fillStyle = CANVAS_COLOR;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function didGameEnd() {
    for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - GRID_SIZE;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - GRID_SIZE;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function setScore() {
    highscore = score > highscore ? score : highscore;
    score = 0;
    snakeScore.textContent = score;
    snakeHighscore.textContent = highscore;
}

function incrementScore() {
    score += SCORE_INCREMENT;
    snakeScore.textContent = score;
}

function restartGame(event) {
    if (!isGameOver) return;
    const keys = [37, 38, 39, 40];
    const keyPressed = typeof(event) === 'object' ? event.keyCode : event;

    if (keys.includes(keyPressed)) {
        snake = getStartSnake();
        isGameOver = false;
        isChangingDirection = false;
        lastTime = performance.now(); 
        dx = GRID_SIZE;
        dy = 0;
        
        setScore();
        clearCanvas(); 
        createFood();
        drawSnake();
        drawFood();

        snakeStatus.textContent = 'GAME ON';
        snakeMessage.textContent = 'Play well!';

        changeDirection(event);
    }
}

function gameOver() {
    snakeStatus.textContent = 'GAME OVER';
    snakeMessage.textContent = 'Press any arrow key to start';
    isGameOver = true;
}

/* ------------------------- CONTROLLER ----------------------- */

function connectController() {
    document.addEventListener('click', function(event) {
        const key = event.target.closest('[data-direction]');
        console.log('clicked: ', key);

        if (key) {
            const direction = key.dataset.direction;
            console.log('direction: ', direction);
            const directionMap = {
                left: 37,
                right: 39,
                up: 38,
                down: 40
            }
            const keyCode = directionMap[direction];

            changeDirection(keyCode);
            restartGame(keyCode);
        }
    });
}