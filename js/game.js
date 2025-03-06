class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        //this.gameEndScreenElement = document.getElementById("game-end");
        this.victoryGameEndScreenElement = document.getElementById("victory-screen");
        this.defeatGameEndScreenElement = document.getElementById("defeat-screen");
        this.highScoreElement = document.getElementById("highscores");
        this.statsElement = document.getElementById("stats");
        this.scoreElement = document.getElementById("score");
        this.livesElement = document.getElementById("lives");
        this.timerElement = document.getElementById("timer");
        this.player = new Player(this.gameScreen, 85, 400, 90, 90, "./images/SDV_Perso.png");
        this.playerSpeed = 10;
        this.height = 700;
        this.width = 800; 
        //on va push les obtascles de la class obstacle dans l'empty array
        this.obstacle = [];
        this.goodObstacle = [];
        this.lives = 4;
        this.score = 0;
        this.victory = new Audio("./media/SDV_Victory.mp3")
        this.victory.volume = 0.4;
        this.defeat = new Audio("./media/SDV_Defeat.mp3")
        this.defeat.volume = 0.4;
        // détermine quand le jeu est en cours et quand il se termine pour commencer un new game
        this.gameIsOver = false;
        this.gameIntervalId = null;
        // indique l'interval en milliseconds (ARRONDI) pour lequel the game loop will execute. pour la plupart des écrans (1000/60) est correct =flipbook exemple.
        this.gameLoopFrequency = Math.round(1000/60);
        this.counter = 0;
        this.time = 16;
        this.playerInterval;
    };

    start() {
        // pour définir la hauteur et largeur de l'écran start
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.lives = 4;
        this.livesElement.innerText = this.lives;
        /*this.score = 0;
        this.scoreElement.innerText = this.score;
        this.time = 22;
        this.timerElement = this.time;*/
        //lorsque l'on commence le jeu on cache le startScreen et montre le GameScreen
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "flex";
        this.statsElement.style.display = "flex";
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
        if (this.counter % 20 === 0) {
            this.obstacle.push(new Obstacle(this.gameScreen));
        }

        if (this.counter % 100 === 0) {
            this.goodObstacle.push(new GoodObstacle(this.gameScreen));
        }

        this.update();

        if (this.gameIsOver) {
            clearInterval(this.playerInterval);
            //console.log("defeat !")
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
                //this.player.ghost.play();

                    if (this.lives === 0) {
                        this.gameIsOver = true;
                    };
            };
            
            if (currentObstacle.top > 620) {
                // si on ne touche pas l'obstacle, on augmente le score et on l'enleve de l'array des obstacles
                this.score ++;
                this.scoreElement.innerText = this.score;
                this.obstacle.splice(i, 1);
                i --;
                currentObstacle.element.remove();
            };
         }
            //this is for the 'good' obstacle
            for (let i = 0; i < this.goodObstacle.length; i++) {
                const currentGoodObstacle = this.goodObstacle[i];
                
                //currentGoodObstacle.move(); GoodObstacle static on the gamescreen
                //check if the obstacle is colliding with the player
                if (this.player.didCollide(currentGoodObstacle)) {
                 //remove the red car from the array in JS
                     this.goodObstacle.splice(i, 1);
                    i--;
                    //dont forget to remove the img element from the html
                    currentGoodObstacle.element.remove();
                    this.score = this.score +5;
                    this.scoreElement.innerText = this.score;
                }

                if (currentGoodObstacle.top > 620) {
                    // si on ne touche pas le bonus, il faut le retirer 
                    this.goodObstacle.splice(i, 1);
                    i --;
                    currentGoodObstacle.element.remove();
                };
            }
     };

     //to remove the obstacle when I restart the game
     clearObstacles() {
        this.obstacle.forEach(obstacle => obstacle.element.remove());
        this.obstacle = [];
        //this.lives = 4;
    }

    //to remove the good obstacle when I restart the game
    cleargoodObstacles() {
        this.goodObstacle.forEach(goodObstacle => goodObstacle.element.remove());
        this.obstacle = [];
    }

    victoryEndGame() {
        clearInterval(this.gameIntervalId);
        //cache le game screen
        this.gameScreen.style.display = "none";
        // montre le victory screen
        this.victoryGameEndScreenElement.style.display = "block";
        this.victory.play();
        //pour les highscores
        const scoreInStorage = JSON.parse(localStorage.getItem("highscores"));
        if (scoreInStorage) {
            scoreInStorage.push(this.score);
            const topFourScores = scoreInStorage.sort((a, b) => b - a).slice(0, 4);
            localStorage.setItem("highscores", JSON.stringify(topFourScores));
        } else {
            localStorage.setItem("highscores", JSON.stringify([this.score]));
        }
       const updatedScoresInStorage = JSON.parse(localStorage.getItem("highscores"));
       
       updatedScoresInStorage.forEach((oneScore) => {
         const ourLiElement = document.createElement("li");
         ourLiElement.innerText = oneScore;
         this.highScoreElement.appendChild(ourLiElement);
       });
    };

    defeatEndGame() {
        clearInterval(this.gameIntervalId);
        //cache le game screen
        this.gameScreen.style.display = "none";
        // montre le defeat screen
        this.defeatGameEndScreenElement.style.display = "block";
        this.defeat.play();
    };

}   
