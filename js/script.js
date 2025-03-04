window.onload = function () {
    const startButtonElement = document.getElementById("start-button");
    const restartButtonElement = document.getElementById("restart-button");
    let ourNewGame;

    //all the event listeners here
    startButtonElement.addEventListener("click", () => {
      ourNewGame = new Game();
      startGame();
    });

    // pour les touches clavier pour déplacer le player quand la touche est pressée
    window.addEventListener("keydown", (event) => {
        //console.log("a key was pressed", event); pour vérifier si ca marche
        if (event.code === "ArrowUp") {
            ourNewGame.player.directionY = -1;
        } else if (event.code === "ArrowDown") {
            ourNewGame.player.directionY = 1;
        } else if (event.code === "ArrowLeft") {
            ourNewGame.player.directionX = -1;
        } else if (event.code === "ArrowRight") {
            ourNewGame.player.directionX = 1;
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
        console.log("start game");
        ourNewGame.start();
    }
};