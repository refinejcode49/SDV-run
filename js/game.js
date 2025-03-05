class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        //this.gameEndScreenElement = document.getElementById("game-end");
        this.victoryGameEndScreenElement = document.getElementById("victory-screen");
        this.defeatGameEndScreenElement = document.getElementById("defeat-screen");
        this.statsElement = document.getElementById("stats");
        this.scoreElement = document.getElementById("score");
        this.livesElement = document.getElementById("lives");
        this.timerElement = document.getElementById("timer");
        this.player = new Player(this.gameScreen, 85, 400, 90, 90, "./images/SDV_Sandy.png");
        this.playerSpeed = 2;
        this.height = 600;
        this.width = 500; 
        //on va push les obtascles de la class obstacle dans l'empty array
        this.obstacle = [];
        this.lives = 4;
        this.score = 0;
        // détermine quand le jeu est en cours et quand il se termine pour commencer un new game
        this.gameIsOver = false;
        this.gameIntervalId = null;
        // indique l'interval en milliseconds (ARRONDI) pour lequel the game loop will execute. pour la plupart des écrans (1000/60) est correct =flipbook exemple.
        this.gameLoopFrequency = Math.round(1000/60);
        this.counter = 0;
        this.time = 10;
        this.playerInterval;
    };

    start() {
        // pour définir la hauteur et largeur de l'écran start
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        //lorsque l'on commence le jeu on cache le startScreen et montre le GameScreen
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.statsElement.style.display = "block";
        //call the game loop function at the gameLoopFrequency delay.
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
        this.playerInterval = setInterval(() => {
            this.time --;
            this.timerElement.innerText = this.time;
            if (this.time === 0) {
                clearInterval(this.playerInterval);
                console.log("victory !");
                this.victoryEndGame();
            }
        }, 1000);
    };

    gameLoop() {
        this.counter++;
        if (this.counter % 40 === 0) {
            this.obstacle.push(new Obstacle(this.gameScreen));
        }

        this.update();

        if (this.gameIsOver) {
            clearInterval(this.playerInterval);
            console.log("defeat !")
            this.defeatEndGame();
        }
    };

    update() {
        //move player
        this.player.move();

        // move obstacle 
        for (let i = 0; i < this.obstacle.length; i++) {
            const currentObstacle = this.obstacle[i];
            currentObstacle.move();

            if (this.player.didCollide(currentObstacle)) {
                this.obstacle.splice(i, 1);
                i --;
                currentObstacle.element.remove();
                this.lives--;
                this.livesElement.innerText = this.lives;

                    if (this.lives === 0) {
                        this.gameIsOver = true;
                    };
            };
            
            if (currentObstacle.top > 650) {
                // si on ne touche pas l'obstacle, on augmente le score et on l'enleve de l'array des obstacles
                this.score ++;
                this.scoreElement.innerText = this.score;
                this.obstacle.splice(i, 1);
                i --;
                currentObstacle.element.remove();
            };
         }
     };
     //to remove the obstacle when I restart the game
     clearObstacles() {
        this.obstacle.forEach(obstacle => obstacle.element.remove());
        this.obstacle = [];
    }
     /*endGame() {
        clearInterval(this.gameIntervalId);
        //cache le game screen
        this.gameScreen.style.display = "none";
        // montre le game end screen
        this.gameEndScreenElement.style.display = "block";
    };*/

    victoryEndGame() {
        clearInterval(this.gameIntervalId);
        //cache le game screen
        this.gameScreen.style.display = "none";
        // montre le victory screen
        this.victoryGameEndScreenElement.style.display = "block";
    };

    defeatEndGame() {
        clearInterval(this.gameIntervalId);
        //cache le game screen
        this.gameScreen.style.display = "none";
        // montre le defeat screen
        this.defeatGameEndScreenElement.style.display = "block";
    };
};
