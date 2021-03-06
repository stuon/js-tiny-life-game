import repeatXI from "./helperFunctions";
import GameBoard from "./models/GameBoard";
import Animal from "./models/Animal";
import { walk } from "./movements";

const elements = {
  canvas: document.querySelector("#game"),
  clearButton: document.getElementById("clear"),
};

const app = (function () {
  let canvas;
  let animalImageSheet;
  let backgroundImage;
  let board = new GameBoard();

  const GAME_STATES = {
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
    board.reset();

    board.setBackground(backgroundImage);
    let animal = new Animal("animal1");
    animal.init(animalImageSheet, 91, 320, 30, 30, 0, 10);
    animal.setMovement(walk);
    board.addGameObject(animal);

    let animal2 = new Animal("animal2");
    animal2.init(animalImageSheet, 91, 320, 30, 30, 0, 150);
    board.addGameObject(animal2);
  };

  let setupEventListeners = function () {
    /*
    canvas.addEventListener(
      "mousemove",
      function (evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = "Mouse position: " + mousePos.x + "," + mousePos.y;
        writeMessage(canvas, message);
      },
      false
    );
*/
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

    elements.clearButton.onclick = function () {
      newGame();
    };
  };

  let start = function () {
    var backgroundLoaded =
      backgroundImage.complete && backgroundImage.naturalHeight !== 0;
    var animalImageSheetLoaded =
      animalImageSheet.complete && animalImageSheet.naturalHeight !== 0;

    if (backgroundLoaded && animalImageSheetLoaded)
      console.log("game starting");
  };

  let update = function () {
    board.update();
  };

  return {
    init: function () {
      canvas = elements.canvas;

      // Canvas size depends on the windows grid
      canvas.height = canvas.getBoundingClientRect().height;
      canvas.width = canvas.getBoundingClientRect().width;

      setupEventListeners();

      backgroundImage = new Image();
      backgroundImage.onload = start;
      backgroundImage.src = "https://i.imgur.com/brRdck7.png";

      animalImageSheet = new Image();
      animalImageSheet.onload = start;
      animalImageSheet.src =
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3a29bffb-b0ad-46ad-b5a1-15ef7501b677/datsnt7-949b4894-6a57-4b59-b79d-cdcc015ff582.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvM2EyOWJmZmItYjBhZC00NmFkLWI1YTEtMTVlZjc1MDFiNjc3XC9kYXRzbnQ3LTk0OWI0ODk0LTZhNTctNGI1OS1iNzlkLWNkY2MwMTVmZjU4Mi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.tT1Ez6uLOVAcxqdEj0W6VvAEVoLL0IwnHViPV73a4To";

      board.init(canvas);

      setInterval(update, 150); // 33 milliseconds = ~ 30 frames per sec
    },
  };
})();

app.init();
