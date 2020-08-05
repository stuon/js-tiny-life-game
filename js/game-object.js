class GameObject {
  #positionX = 0;
  #positionY = 0;
  #width = 0;
  #height = 0;
  #name = "";

  #image = null;
  #imgPosX = 0;
  #imgPosY = 0;
  #imgWidth = 0;
  #imgHeight = 0;

  constructor(name) {
    this.#name = name;
  }

  init(image, imgPosX, imgPosY, imgWidth, imgHeight, posX, posY) {
    this.#image = image;
    this.#imgPosX = imgPosX;
    this.#imgPosY = imgPosY;
    this.#imgWidth = imgWidth;
    this.#imgHeight = imgHeight;

    this.#positionX = posX;
    this.#positionY = posY;
    this.#width = imgWidth;
    this.#height = imgHeight;
  }

  checkClick(x, y) {
    if (x < this.#positionX) return;
    if (x > this.#positionX + this.#width) return;
    if (y < this.#positionY) return;
    if (y > this.#positionY + this.#height) return;

    console.log("hit!");
  }

  name() {
    return this.#name;
  }

  #frame = 0;
  update(ctx) {
    this.#positionX += 16;
    //this.#positionY = 0;

    ctx.drawImage(
      this.#image,
      this.#imgPosX + (this.#frame % 5) * 96,
      this.#imgPosY,
      this.#imgWidth,
      this.#imgHeight,
      this.#positionX,
      this.#positionY,
      this.#width,
      this.#height
    );

    this.#frame++;
  }
}
