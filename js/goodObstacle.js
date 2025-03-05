class GoodObstacle {
    constructor(gameScreen){
        this.possibleImages = [
            "./images/SDV_Starfruit.png",
            "./images/SDV_Cauliflower.png",
            "./images/SDV_Coffee_Bean.png",
        ];
        this.possibleXPositions = [150, 40, 80, 270, 80, 150, 270, 80];
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
        this.top += 9;
        this.updatePosition();
        console.log("GoodObstacle created:", this.element);
        console.log("Image source:", this.element.src);
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`;
        //this.element.style.left = `${this.left}px`;
    }

   
}