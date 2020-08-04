/* 
Board for pixel color game
*/

let gameBoard = (function Board() {
  this.gameObjects = [];
  this.ctx;
  this.imageSheet;

  return {
    init: function (ctx, imageSheet) {
      this.ctx = ctx;
      this.imageSheet = imageSheet;
    },
    addGameObject: function (gameObject) {
      gameObjects[gameObject.name()] = gameObject;
    },
    update: function () {
      for (var i in gameObjects) {
        gameObjects[i].update(this.ctx, this.imageSheet);
      }
    },
  };
})();
