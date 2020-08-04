/* 
Board for pixel color game
*/

let gameBoard = (function Board() {
  this.gameObjects = [];
  this.ctx;
  this.imageSheet;
  this.canvas;

  return {
    init: function (canvas, imageSheet) {
      this.canvas = canvas;
      this.imageSheet = imageSheet;
      this.ctx = canvas.getContext("2d");
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
      for (var i in gameObjects) {
        gameObjects[i].update(this.ctx, this.imageSheet);
      }
    },
  };
})();
