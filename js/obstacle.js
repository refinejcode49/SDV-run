class Obstacle {
    constructor(gameScreen){
        this.possibleImages = [
            "./images/SDV_Bat.png",
            "./images/SDV_Ghost.png",
            "./images/SDV_Haunted_Skull.png",
            "./images/Special_Red_Slime.png"
        ]
        this.possibleXPositions = [700, 450, 2, 622, 27, 44, 27, 400, 622, 2, 450, 700];
        this.randomIndex = Math.floor(Math.random() * this.possibleXPositions.length);
        this.left = this.possibleXPositions[this.randomIndex];
        this.top = -100;
        this.width = 90;
        this.height = 90;
        this.randomImageIndex = Math.floor(
            Math.random() * this.possibleImages.length
          );
        this.element = document.createElement("img");
        this.element.src = this.possibleImages[this.randomImageIndex];
        this.element.style.position = "absolute";
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        gameScreen.appendChild(this.element);
    }

    move() {
        this.top += 8;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`;
        //this.element.style.left = `${this.left}px`;
    }

   
}