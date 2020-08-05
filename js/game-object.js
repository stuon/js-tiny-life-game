class Position {
  x = 0;
  y = 0;
  w = 0;
  h = 0;

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  isHit(x, y) {
    if (x < this.x) return false;
    if (x > this.x + this.w) return false;
    if (y < this.y) return false;
    if (y > this.y + this.h) return false;
    return true;
  }
}

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

    ctx.drawImage(
      this.#image,
      this.#imgPosition.x + (this.#frame % 4) * 33,
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
