class Position {
  x = 0;
  y = 0;
  w = 0;
  h = 0;
  d = null; // direction in degree, 0-up, 90->right, 180-down, 270-left;
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

const solid = function () {};

const walk = function (position) {
  position.x += 10;
  position.d = 90;
  return position;
};
