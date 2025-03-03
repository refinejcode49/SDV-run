window.onload = function () {
    const startButtonElement = document.getElementById("start-button");
    const restartButtonElement = document.getElementById("restart-button");
    let ourNewGame;

    //all the event listeners here
    startButtonElement.addEventListener("click", function () {
      ourNewGame = new Game();
      startGame();
    });
    //all the functions here: 
    function startGame () {
        ourNewGame.start()
    }
}