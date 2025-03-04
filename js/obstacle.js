class Obstacle {
    constructor(gameScreen){
        this.left = 80;
        this.top = 40;
        this.width = 125;
        this.height = 180;
        this.element = document.createElement("img");
        this.element.src = "./images/SDV-red-slime.png";
        this.element.style.position = "absolute";
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        gameScreen.appendChild(this.element);
    }
}