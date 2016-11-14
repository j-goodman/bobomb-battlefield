var Grass; var Util;
// REQUIRE DEPENDENCIES
Util = require('./util.js');
Sprite = require('./sprite.js');
objects = require('./objects.js');

Grass = function (index, x, y) {
  this.name = 'grass';
  this.class = 'ground';
  this.age = 0;
  this.index = index;
  this.spriteSize = 16;
  this.pos = {
    x: x,
    y: y,
  };
  this.speed = {
    x: 0,
    y: 0,
  };
  this.facing = 'right';
  this.accel = {
    x: 0,
    y: 1,
  };
  this.spriteRoot = 'grass';
  this.setSprites(4);
  this.sprite = this.sprites.middle;

  // STATS
  this.stats = {
    runSpeed: 4,
    jumpPower: 12,
  };
};

Grass.prototype.move = function () {
  if (!this.age) { this.initialize(); }
  this.age++;
};

Grass.prototype.initialize = function () {
  var oo; var leftright; var spritelist;
  leftright = '00';
  for (oo=0 ; oo<objects.length ; oo++) {
    if (objects[oo].name === 'grass') {
      if (objects[oo].pos.x === this.pos.x-this.spriteSize) {
        leftright = (leftright === '00' || leftright === '01') ? '01' : '11';
      } else if (objects[oo].pos.x === this.pos.x+this.spriteSize) {
        leftright = (leftright === '00' || leftright === '10') ? '10' : '11';
      }
    }
  }
  spritelist = {
    '00': 'middle',
    '01': 'right',
    '10': 'left',
    '11': 'middle',
  };
  this.sprite = this.sprites[spritelist[leftright]];
};

Grass.prototype.setSprites = function (delay) {
  this.sprites = {
    left: new Sprite(this.spriteSize, this.spriteSize*2, 0, [this.spriteRoot+"/left.gif"]),
    middle: new Sprite(this.spriteSize, this.spriteSize*2, 0, [this.spriteRoot+"/middle.gif"]),
    right: new Sprite(this.spriteSize, this.spriteSize*2, 0, [this.spriteRoot+"/right.gif"]),
  };
};



module.exports = Grass;
