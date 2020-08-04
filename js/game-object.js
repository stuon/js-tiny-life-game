class GameObject {
  #positionX = 0;
  #positionY = 0;
  #name = "";
  #image = null;
  constructor(name, image, positionX, positionY) {
    this.#name = name;
    this.#image = image;
    this.#positionX = positionX;
    this.#positionY = positionY;
  }

  name() {
    return this.#name;
  }

  update(ctx) {
    ctx.drawImage(
      this.#image,
      0,
      0,
      50,
      50,
      this.#positionX,
      this.#positionY,
      50,
      50
    );
  }
}
