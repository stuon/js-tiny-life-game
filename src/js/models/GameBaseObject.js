import Position from "./Position";

export default class GameBaseObject {
  constructor(name) {
    this.name = name;
    this.position = null;
    this.image = null;
    this.imgPosition = null;
    this.movementFunction = null;
    this.frame = 0;
  }

  init(image, imgPosX, imgPosY, imgWidth, imgHeight, posX, posY) {
    this.image = image;
    this.imgPosition = new Position(imgPosX, imgPosY, imgWidth, imgHeight);
    this.position = new Position(posX, posY, imgWidth, imgHeight);
  }

  setMovement(movementFunction) {
    this.movementFunction = movementFunction;
  }

  checkClick(x, y) {
    if (this.position.isHit(x, y)) console.log("hit!");
  }

  getName() {
    return this.name;
  }

  update(ctx) {
    if (this.movementFunction) {
      this.position = this.movementFunction(this.position);
    }

    const imageSheet = [0, 1, 2, 1];

    ctx.drawImage(
      this.image,
      this.imgPosition.x + imageSheet[this.frame % 4] * 33,
      this.imgPosition.y,
      this.imgPosition.w,
      this.imgPosition.h,
      this.position.x,
      this.position.y,
      this.position.w,
      this.position.h
    );

    this.frame++;
  }
}
