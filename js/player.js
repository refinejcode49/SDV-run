class Player {
    constructor(gameScreen, left, top, width, height, playerImageSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        // on crée un nouvel élement dans Js pour l'image du player
        this.element = document.createElement("img");
        // on définit la source de l'image avec l'argument dans le constructor
        this.element.src = playerImageSrc;
        // pour etre sur que l'image du player puisse de déplacer dans le jeu
        this.element.style.position = "absolute";
        // donner la position du player sur le gamescreen (top & left)
        // !!!!!! A MODIFIER SI JE VEUX CENTRER MON PERSO!!!!!!!!
        this.element.style.top = `${top}px`;
        this.element.style.left = `${left}px`;
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        // pour ajouter les propriétés du player ainsi que son image on doit appendChild ou ajouter l'element player au gamescreen (parce que c'est la qu'on va jouer)
        gameScreen.appendChild(this.element);
    }

    move() {
        this.left += this.directionX;
        this.top += this.directionY;
        //pour faire en sorte que le player ne soit pas dans les arbres et reste dans le background-image
        if (this.left < 10) {
            this.left = 10;
          }
          if (this.left + this.width > 790) {
            this.left = 790 - this.width;
          }
          // pour en haut et en bas du jeu
          if (this.top < 0) {
            this.top = 0;
          }
          if (this.top + this.height > 710) {
            this.top = 710 - this.height;
          }
        this.updatePosition();
               
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        if (
         playerRect.left < obstacleRect.right &&
         playerRect.right > obstacleRect.left &&
         playerRect.top < obstacleRect.bottom &&
         playerRect.bottom > obstacleRect.top
        ) {
          
         return true;
        } else {
         return false;
         }
    }

    // to change the image of the player by pressing V
    changeImage(newImageSrc) {
      this.element.src = newImageSrc;
    }
}