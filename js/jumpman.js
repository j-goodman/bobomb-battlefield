var Sprite; var Jumpman;
// REQUIRE DEPENDENCIES
Sprite = require('./sprite.js');
objects = require('./objects.js');

Jumpman = function () {};

Jumpman.prototype.move = function () {
  this.age++;
  this.pos.x += this.speed.x;
  this.pos.y += this.speed.y;
  this.speed.x += this.accel.x;
  if (this.speed.y < this.terminalVelocity) {
    this.speed.y += this.accel.y;
  }
  this.groundLevel = 448;
  this.updateSprite();
  this.checkCollisions();
  this.wrap();
};

Jumpman.prototype.checkCollisions = function () {
  this.land();
};

Jumpman.prototype.wrap = function () {
  if (this.pos.x < 0-this.spriteSize) {
    this.pos.x = 860+this.spriteSize;
  } else if (this.pos.x > 860+this.spriteSize) {
    this.pos.x = 0-this.spriteSize;
  }
};

Jumpman.prototype.landed = function () {
  var oo; var landed; var obj;
  landed = false;
  for (oo=0 ; oo<objects.length ; oo++) {
    obj = objects[oo];
    if (obj.class === 'ground') {
      if (
          (this.pos.x > obj.pos.x - this.spriteSize)&&
          (this.pos.x < obj.pos.x + this.spriteSize)&&
          (this.pos.y < obj.pos.y)&&
          (this.pos.y + this.spriteSize > obj.pos.y)&&
          true
         ) {
        landed = obj.pos.y-this.spriteSize;
      }
    }
  }
  return landed;
};

Jumpman.prototype.land = function () {
  if (this.landed()) {
    this.pos.y = this.landed();
    this.speed.y = 0;
  }
};

Jumpman.prototype.setSprites = function (delay) {
  this.sprites = {
    standing_right: new Sprite(this.spriteSize, this.spriteSize, 0, [this.spriteRoot+"/right/standing.gif"]),
    jumping_right: new Sprite(this.spriteSize, this.spriteSize, 0, [this.spriteRoot+"/right/jumping.gif"]),
    standing_left: new Sprite(this.spriteSize, this.spriteSize, 0, [this.spriteRoot+"/left/standing.gif"]),
    jumping_left: new Sprite(this.spriteSize, this.spriteSize, 0, [this.spriteRoot+"/left/jumping.gif"]),
    walking_right: new Sprite(this.spriteSize, this.spriteSize, delay, [
      this.spriteRoot+"/right/walking/0.gif",
      this.spriteRoot+"/right/walking/1.gif",
    ]),
    walking_left: new Sprite(this.spriteSize, this.spriteSize, delay, [
      this.spriteRoot+"/left/walking/0.gif",
      this.spriteRoot+"/left/walking/1.gif",
    ])
  };
  if (this.setExtraSprites) {
    this.setExtraSprites();
  }
};

Jumpman.prototype.spriteCenter = function () {
  return {
    x: this.pos.x + this.sprite.width/2,
    y: this.pos.y + this.sprite.height/2
  };
};

Jumpman.prototype.updateSprite = function () {
  if (this.speed.x === 0) {
    if (this.facing === "left") {
      this.sprite = this.sprites.standing_left;
    } else {
      this.sprite = this.sprites.standing_right;
    }
  } else if (this.speed.x > 0) {
    this.sprite = this.sprites.walking_right;
  } else if (this.speed.x < 0) {
    this.sprite = this.sprites.walking_left;
  }
};

module.exports = Jumpman;
