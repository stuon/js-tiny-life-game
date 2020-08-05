/* 
Board for pixel color game
*/

let gameBoard = (function Board() {
  this.gameObjects = [];
  this.ctx;
  this.canvas;
  this.backgroundImage = null;

  return {
    init: function (canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
    },
    setBackground: function (backgroundImage) {
      this.backgroundImage = backgroundImage;
    },
    addGameObject: function (gameObject) {
      gameObjects[gameObject.name()] = gameObject;
    },
    checkClick: function (x, y) {
      for (var i in gameObjects) {
        gameObjects[i].checkClick(x, y);
      }
    },
    update: function () {
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

      for (var i in gameObjects) {
        gameObjects[i].update(this.ctx);
      }
    },
  };
})();
