class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-container");
        this.gameEndScreen = document.getElementById("game-end");
        this.player = new Player(this.gameScreen, 40, 400, 125, 150, "./images/SDV_Sandy.png");
        this.height = 600;
        this.width = 500; 
        //on va push les obtascles de la class obstacles dans l'empty array
        this.obstacles = [];
        this.lives = 4;
        this.score = 0;
        // détermine quand le jeu est en cours et quand il se termine pour commencer un new game
        this.gameIsOver = false;
        this.gameIntervalId = null;
        // indique l'interval en milliseconds (ARRONDI) pour lequel the game loop will execute. pour la plupart des écrans (1000/60) est correct =flipbook exemple.
        this.gameLoopFrequency = Math.round(1000/60);
    }

    start() {
        // pour définir la hauteur et largeur de l'écran start
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        //lorsque l'on commence le jeu on cache le startScreen et montre le GameScreen
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        //call the game loop function at the gameLoopFrequency delay.
        this.gameIntervalId = setInterval(()=>{
            this.gameLoop();
        }, this.gameLoopFrequency);
    }
    gameLoop() {
        console.log("game loop");
        this.update()

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId);
        }
    }

    update() {
        this.player.move()
    }
}