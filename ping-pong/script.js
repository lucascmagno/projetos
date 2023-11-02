const table = document.querySelector(".table");
const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");
const ball = document.getElementById("ball");

let ballX = 300;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;
let leftPaddleY = 160;
let rightPaddleY = 160;

const paddleSpeed = 5;

function updateGame() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Detecção de colisão com as bordas
    if (ballY < 0 || ballY > 390) {
        ballSpeedY = -ballSpeedY;
    }

    // Detecção de colisão com as raquetes
    if (ballX < 20 && ballY > leftPaddleY && ballY < leftPaddleY + 80) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX > 570 && ballY > rightPaddleY && ballY < rightPaddleY + 80) {
        ballSpeedX = -ballSpeedX;
    }

    // Ponto do jogador da esquerda
    if (ballX < 0) {
        ballX = 300;
        ballY = 200;
        ballSpeedX = 5;
        ballSpeedY = 5;
    }

    // Ponto do jogador da direita
    if (ballX > 600) {
        ballX = 300;
        ballY = 200;
        ballSpeedX = -5;
        ballSpeedY = 5;
    }

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    // Movimento da raquete esquerda (controlada pelos botões)
    document.getElementById("leftPaddleUp").addEventListener("click", function () {
        if (leftPaddleY > 0) {
            leftPaddleY -= paddleSpeed;
        }
    });

    document.getElementById("leftPaddleDown").addEventListener("click", function () {
        if (leftPaddleY < 320) {
            leftPaddleY += paddleSpeed;
        }
    });

    // Movimento da raquete direita (controlada pelos botões)
    document.getElementById("rightPaddleUp").addEventListener("click", function () {
        if (rightPaddleY > 0) {
            rightPaddleY -= paddleSpeed;
        }
    });

    document.getElementById("rightPaddleDown").addEventListener("click", function () {
        if (rightPaddleY < 320) {
            rightPaddleY += paddleSpeed;
        }
    });

    leftPaddle.style.top = leftPaddleY + "px";
    rightPaddle.style.top = rightPaddleY + "px";
}

function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();
