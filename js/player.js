var Jumpman; var Player; var Util;
// REQUIRE DEPENDENCIES
Jumpman = require('./jumpman.js');
Util = require('./util.js');

Player = function (index, x, y) {
  this.name = 'player';
  this.age = 0;
  this.index = index;
  this.terminalVelocity = 12;
  this.spriteSize = 16;
  this.equipment = 'parachute';
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
  this.spriteRoot = 'player';
  this.setSprites(4);
  this.sprite = this.sprites.standing_right;

  // STATS
  this.stats = {
    runSpeed: 4,
    jumpPower: 12,
  };
};

Util.inherits(Player, Jumpman);

Player.prototype.rightKeyDown = function () {
  this.facing = 'right';
  this.speed.x = this.stats.runSpeed;
};

Player.prototype.leftKeyDown = function () {
  this.facing = 'left';
  this.speed.x = 0-this.stats.runSpeed;
};

Player.prototype.upKeyDown = function () {
  if (this.landed) {
    this.speed.y = 0-this.stats.jumpPower;
  }
};

Player.prototype.downKeyDown = function () {};

Player.prototype.spaceKeyDown = function () {
  if (this.equipment === 'parachute') {
    this.terminalVelocity = 2;
  }
};

Player.prototype.spaceKeyUp = function () {
  this.terminalVelocity = 12;
};

Player.prototype.rightKeyUp = function () {
  if (this.speed.x > 0) {
    this.speed.x = 0;
  }
};

Player.prototype.leftKeyUp = function () {
  if (this.speed.x < 0) {
    this.speed.x = 0;
  }
};

module.exports = Player;
