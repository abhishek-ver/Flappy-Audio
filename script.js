// Board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// Bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

// Pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// Physics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;
let micEnabled = false; // Prevent bird movement before mic activation

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";
    
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    startVoiceRecognition();
};

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        let gameOverImg = new Image();
        gameOverImg.src = "./qw.png";
        gameOverImg.onload = function () {
            context.drawImage(gameOverImg, boardWidth / 4, boardHeight / 3, 180, 90);
        };
    
        document.getElementById("restartButton").style.display = "block"; // Show button
        return;
    }
    

    context.clearRect(0, 0, board.width, board.height);

    if (micEnabled) {
        velocityY += gravity;
        bird.y = Math.max(bird.y + velocityY, 0);
    }

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) gameOver = true;

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) gameOver = true;
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);
}

// Restart function
function restartGame() {
    location.reload();
}

function placePipes() {
    if (gameOver) return;
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;
    
    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(bottomPipe);
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function startVoiceRecognition() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            micEnabled = true; // Enable gravity only after mic is allowed
            let audioContext = new (window.AudioContext || window.webkitAudioContext)();
            let analyser = audioContext.createAnalyser();
            let microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 256;
            let bufferLength = analyser.frequencyBinCount;
            let dataArray = new Uint8Array(bufferLength);

            function analyzeAudio() {
                analyser.getByteFrequencyData(dataArray);
                let volume = dataArray.reduce((a, b) => a + b) / bufferLength;
                if (volume > 60) {  // Adjusted sensitivity for better response
                    velocityY = -4;
                }
                requestAnimationFrame(analyzeAudio);
            }
            analyzeAudio();
        })
        .catch(error => console.error("Microphone access denied", error));
}
