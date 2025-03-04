class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.scoreElement = document.getElementById("score");
        this.livesElement = document.getElementById("lives");
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
    }

    start() {
        // pour définir la hauteur et largeur de l'écran start
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        //lorsque l'on commence le jeu on cache le startScreen et montre le GameScreen
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        //call the game loop function at the gameLoopFrequency delay.
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
    }
    gameLoop() {
        this.counter++;
        if (this.counter % 180 === 0) {
            this.obstacle.push(new Obstacle(this.gameScreen));
        }
        this.update();

        if (this.gameIsOver) {
            this.gameEndScreen;
        }
    }

    update() {
        //move player
        this.player.move();

        // move obstacle 
        for (let i = 0; i < this.obstacle.length; i++) {
            const currentObstacle = this.obstacle[i];
            currentObstacle.move();
            if (this.player.didCollide(currentObstacle)) {
                console.log("bang !");
                this.obstacle.splice(i, 1);
                i --;
                currentObstacle.element.remove();
                this.lives --;
                this.livesElement.innerText = this.lives;
                if (this.lives === 0) {
                    this.gameIsOver = true;
                }
            } else {
                console.log("did not collide");
            }

            if (currentObstacle.top > 600) {
                this.score ++;
                this.scoreElement.innerText = this.score;
                this.obstacle.splice(i, 1);
                i --;
                currentObstacle.element.remove();
            }
        // si on ne touche pas l'obstacle, on augmente le score et on l'enleve de l'array des obstacles
        }
    }

    gameEndScreen() {
        clearInterval(this.gameIntervalId);
        //cache le game screen
        this.gameScreen.style.display = "none";
        // montre le game end screen
        this.gameEndScreen.style.display = "block";
    }
}