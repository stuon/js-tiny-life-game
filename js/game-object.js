class GameObject {
  #name = "";
  #position = null;

  #image = null;
  #imgPosition = null;

  constructor(name) {
    this.#name = name;
  }

  init(image, imgPosX, imgPosY, imgWidth, imgHeight, posX, posY) {
    this.#image = image;
    this.#imgPosition = new Position(imgPosX, imgPosY, imgWidth, imgHeight);
    this.#position = new Position(posX, posY, imgWidth, imgHeight);
  }

  #movementFunction = null;
  setMovement(movementFunction) {
    this.#movementFunction = movementFunction;
  }

  moveTo(speed) {}

  checkClick(x, y) {
    if (this.#position.isHit(x, y)) console.log("hit!");
  }

  name() {
    return this.#name;
  }

  #frame = 0;
  update(ctx) {
    if (this.#movementFunction)
      this.#position = this.#movementFunction(this.#position);

    const imageSheet = [0, 1, 2, 1];

    ctx.drawImage(
      this.#image,
      this.#imgPosition.x + imageSheet[this.#frame % 4] * 33,
      this.#imgPosition.y,
      this.#imgPosition.w,
      this.#imgPosition.h,
      this.#position.x,
      this.#position.y,
      this.#position.w,
      this.#position.h
    );

    this.#frame++;
  }
}
