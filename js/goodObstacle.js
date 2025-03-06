class GoodObstacle {
    constructor(gameScreen){
        this.possibleImages = [
            "./images/SDV_Starfruit.png",
            "./images/SDV_Coffee_Bean.png",
        ];
        this.possibleXPositions = [450, 270, 100, 50, 80, 44, 111, 700];
        this.randomIndex = Math.floor(Math.random() * this.possibleXPositions.length);
        this.left = this.possibleXPositions[this.randomIndex];
        this.top = Math.floor(Math.random() * (700 - 90)); //-100;
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
    
        //pour faire disparaitre les goodObstacle après x secondes
    setTimeout(() => {
        this.element.remove();
    }, 3000);

    }
    
    // pour rendre les goodObstacles en static sur le gamescreen éviter de les faire bouger
    /*move() {
        this.top += 9;
        this.updatePosition();
        //console.log("GoodObstacle created:", this.element);
        //console.log("Image source:", this.element.src);
    }*/

    updatePosition() {
        this.element.style.top = `${this.top}px`;
        //this.element.style.left = `${this.left}px`;
    }

   
}