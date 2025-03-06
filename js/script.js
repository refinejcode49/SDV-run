window.onload = function () {
    const startButtonElement = document.getElementById("start-button");
    const victoryRestartButtonElement = document.getElementById("victory-restart-button");
    const defeatRestartButtonElement = document.getElementById("defeat-restart-button");
    let ourNewGame;

    //all the event listeners here
    startButtonElement.addEventListener("click", () => {
      ourNewGame = new Game();
      startGame();
    });

    victoryRestartButtonElement.addEventListener("click", () => {
        // cache l'écran victoire fin de jeu
        ourNewGame.victoryGameEndScreenElement.style.display = "none";
        //montre l'écran pour recommencer le jeu direct
        ourNewGame.gameScreen.style.display = "block";
        //remove the image of the player from the first game
        ourNewGame.player.element.remove();
        //to remove the past obstacles from the game container
        ourNewGame.clearObstacles();
        ourNewGame.cleargoodObstacles();
        //this reassigns the ourNewGame variable
        ourNewGame = new Game();
        ourNewGame.start();
      });

      defeatRestartButtonElement.addEventListener("click", () => {
        // cache l'écran victoire fin de jeu
        ourNewGame.defeatGameEndScreenElement.style.display = "none";
        //montre l'écran pour recommencer le jeu direct
        ourNewGame.gameScreen.style.display = "block";
        //remove the image of the player from the first game
        ourNewGame.player.element.remove();
        //to remove the past obstacles from the game container
        ourNewGame.clearObstacles();
        ourNewGame.cleargoodObstacles();
        //this reassigns the ourNewGame variable
        ourNewGame = new Game();
        ourNewGame.start();
      });

    // pour les touches clavier pour déplacer le player quand la touche est pressée
    window.addEventListener("keydown", (event) => {
        //console.log("a key was pressed", event); pour vérifier si ca marche
        if (event.code === "ArrowUp") {
            ourNewGame.player.directionY = - 10;
        } else if (event.code === "ArrowDown") {
            ourNewGame.player.directionY = 10;
        } else if (event.code === "ArrowLeft") {
            ourNewGame.player.directionX = - 10;
        } else if (event.code === "ArrowRight") {
            ourNewGame.player.directionX = 10;
        } else if(event.code === "KeyV") {
                ourNewGame.player.changeImage("./images/cute_venom.png")
            }
        });
    
    // meme qu'au dessus mais pour quand la touche est relachée ca arrete de deplacer le player
    window.addEventListener("keyup", (event1) => {
        //console.log("a key was pressed", event); pour vérifier si ca marche
        if (event1.code === "ArrowUp") {
            ourNewGame.player.directionY = 0;
        } else if (event1.code === "ArrowDown") {
            ourNewGame.player.directionY = 0;
        } else if (event1.code === "ArrowLeft") {
            ourNewGame.player.directionX = 0;
        } else if (event1.code === "ArrowRight") {
            ourNewGame.player.directionX = 0;
         }
        }
    );


    //all the functions here: 
    function startGame() {
       //console.log("start game");
        ourNewGame.start();
    }
};