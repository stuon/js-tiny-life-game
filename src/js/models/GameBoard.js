/* 
Board for pixel color game
*/

export default class GameBoard {
  init(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.reset();
  }

  reset() {
    this.gameObjects = [];
    this.backgroundImage;
  }

  setBackground(backgroundImage) {
    this.backgroundImage = backgroundImage;
  }

  addGameObject(gameObject) {
    this.gameObjects[gameObject.getName()] = gameObject;
  }

  checkClick(x, y) {
    for (var i in this.gameObjects) {
      this.gameObjects[i].checkClick(x, y);
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.backgroundImage) {
      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.backgroundImage.width,
        this.backgroundImage.height,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }

    for (var i in this.gameObjects) {
      this.gameObjects[i].update(this.ctx);
    }
  }
}
