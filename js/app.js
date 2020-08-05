function repeatXI(callback, interval, repeats, immediate, finalCallback) {
  let timer, trigger;

  trigger = function () {
    let success = callback();

    if (success) {
      success = --repeats > 0;
    }

    if (!success) {
      clearInterval(timer);

      if (finalCallback) finalCallback();
    }
  };

  interval = interval <= 0 ? 1000 : interval; // default: 1000ms
  repeats = parseInt(repeats, 10) || 0; // default: repeat forever
  timer = setInterval(trigger, interval);

  if (!!immediate) {
    // Coerce boolean
    trigger();
  }
}

var app = (function (board) {
  let canvas;
  let animalSheet;

  var GAME_STATES = {
    Normal: 1,
    Pause: 2,
    Completed: 3,
  };

  let gameState = GAME_STATES.Normal;

  let getMousePos = function (canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  let writeMessage = function (canvas, message) {
    console.log(message);
  };

  let newGame = function () {
    var sheep = new Animal("sheet", 10, 10);
    board.addGameObject(sheep);
  };

  let setupEventListeners = function () {
    canvas.addEventListener(
      "mousemove",
      function (evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = "Mouse position: " + mousePos.x + "," + mousePos.y;
        //  writeMessage(canvas, message);
      },
      false
    );
    canvas.addEventListener(
      "click",
      function (evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = "Click position: " + mousePos.x + "," + mousePos.y;
        writeMessage(canvas, message);

        board.checkClick(mousePos.x, mousePos.y);
      },
      false
    );

    document.getElementById("clear").onclick = function () {
      newGame();
    };
  };

  let start = function () {
    console.log("game starting");
  };

  let update = function () {
    board.update();
  };

  return {
    init: function () {
      canvas = document.querySelector("#game");

      // Canvas size depends on the windows grid
      canvas.height = canvas.getBoundingClientRect().height;
      canvas.width = canvas.getBoundingClientRect().width;

      setupEventListeners();

      animalSheet = new Image();
      animalSheet.onload = start;
      animalSheet.src =
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/925b15f6-d2a5-48f2-8b7c-374de8979662/ddfchqu-26d70e22-38d1-4335-9bee-765f6951ad5b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOTI1YjE1ZjYtZDJhNS00OGYyLThiN2MtMzc0ZGU4OTc5NjYyXC9kZGZjaHF1LTI2ZDcwZTIyLTM4ZDEtNDMzNS05YmVlLTc2NWY2OTUxYWQ1Yi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.xj2nBs_iGbFpJkNtFUMcOiotIivlfeJ7HsDayhR3HPk";

      board.init(canvas, animalSheet);

      let animal = new Animal("animal1");
      animal.init(animalSheet, 24, 385, 72, 95, 0, 10);
      animal.setMovement(walk);
      board.addGameObject(animal);

      let animal2 = new Animal("animal2");
      animal2.init(animalSheet, 24, 385, 72, 95, 0, 150);
      board.addGameObject(animal2);

      setInterval(update, 150); // 33 milliseconds = ~ 30 frames per sec
    },
  };
})(gameBoard);

app.init();
