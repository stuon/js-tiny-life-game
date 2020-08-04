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
  let ctx;
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
    //var message = "frame update";
    // writeMessage(canvas, message);
  };

  return {
    init: function () {
      canvas = document.querySelector("#game");

      // Canvas size depends on the windows grid
      canvas.height = canvas.getBoundingClientRect().height;
      canvas.width = canvas.getBoundingClientRect().width;

      ctx = canvas.getContext("2d");

      setupEventListeners();

      animalSheet = new Image();
      animalSheet.onload = start;
      animalSheet.src =
        "https://cdn-learn.adafruit.com/assets/assets/000/074/996/original/gaming_marioSNESSheet.png?1556309093";

      board.init(ctx, animalSheet);

      let animal = new Animal("animal1", animalSheet, 0, 0);
      board.addGameObject(animal);

      let animal2 = new Animal("animal2", animalSheet, 100, 100);
      board.addGameObject(animal2);

      setInterval(update, 330); // 33 milliseconds = ~ 30 frames per sec
    },
  };
})(gameBoard);

app.init();
