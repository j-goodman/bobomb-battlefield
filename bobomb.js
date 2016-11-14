/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Window.newGame = function () {
	  var initializeCanvas; var initializeKeyControls; var initializeWorld; var play; var ctx;
	  // 1. REQUIRE DEPENDENCIES
	  var objects = __webpack_require__(1);
	  var Player = __webpack_require__(2);
	  var Grass = __webpack_require__(6);
	  var Sky = __webpack_require__(7);
	
	  // 3. INITIALIZE CANVAS
	  initializeCanvas = function () {
	    window.onload = function () {
	      canvas = document.getElementById('canvas');
	      this.canvas = canvas;
	      ctx = canvas.getContext('2d');
	      var canvas;
	      this.ctx = ctx;
	      ctx.clearRect(0, 0, canvas.width, canvas.height);
	    }.bind(this);
	  };
	
	  // 4. INITIALIZE KEY CONTROLS
	  initializeKeyControls = function (player) {
	    document.onkeydown = function (event) {
	      if (event.keyCode === 39) {
	        player.rightKeyDown();
	      } else if (event.keyCode === 37) {
	        player.leftKeyDown();
	      } else if (event.keyCode === 38) {
	        player.upKeyDown();
	      } else if (event.keyCode === 40) {
	        player.downKeyDown();
	      } else if (event.keyCode === 32) {
	        player.spaceKeyDown();
	      }
	    };
	    document.onkeyup = function (event) {
	      if (event.keyCode === 39) {
	        player.rightKeyUp();
	      } else if (event.keyCode === 37) {
	        player.leftKeyUp();
	      } else if (event.keyCode === 32) {
	        player.spaceKeyUp();
	      }
	    };
	  };
	
	  // 5. INITIALIZE WORLD
	  initializeWorld = function () {
	    var player; var aa; var slotMap;
	    player = new Player (objects.length, 200, 368-32);
	    objects.push(player);
	    initializeKeyControls(player);
	    objects.push(new Grass (objects.length, 200+(16*0), 384));
	    objects.push(new Grass (objects.length, 200+(16*1), 384));
	    objects.push(new Grass (objects.length, 200+(16*2), 384));
	    objects.push(new Grass (objects.length, 200+(16*3), 384));
	    objects.push(new Grass (objects.length, 200+(16*4), 384));
	    objects.push(new Grass (objects.length, 200+(16*5), 384));
	    objects.push(new Grass (objects.length, 200+(16*6), 384));
	    objects.push(new Grass (objects.length, 200+(16*7), 384));
	    objects.push(new Grass (objects.length, 200+(16*8), 384));
	    objects.push(new Grass (objects.length, 200+(16*9), 384));
	    objects.push(new Grass (objects.length, 200+(16*11), 304));
	    objects.push(new Grass (objects.length, 200+(16*12), 304));
	    objects.push(new Grass (objects.length, 200+(16*13), 304));
	    objects.push(new Grass (objects.length, 200+(16*14), 304));
	    objects.push(new Grass (objects.length, 200+(16*15), 304));
	    objects.push(new Grass (objects.length, 200-(16*3), 304));
	    objects.push(new Grass (objects.length, 200-(16*2), 304));
	  };
	
	  // 6. PLAY
	  play = function () {
	    var interval; var sky; var ctx; var oo;
	    initializeWorld();
	    sky = new Sky ();
	    interval = setInterval(function () {
	      ctx = window.canvas.getContext('2d');
	      ctx.fillStyle = sky.color;
	      ctx.fillRect(0, 0, canvas.width, canvas.height);
	      for (oo=0 ; oo<objects.length ; oo++) {
	        if (objects[oo]) {
	          if (objects[oo].sprite) {
	            objects[oo].sprite.draw(ctx, objects[oo].pos);
	          }
	          if (objects[oo].move) {
	            objects[oo].move();
	          }
	        }
	      }
	    }, 32);
	  };
	
	  initializeCanvas();
	  play();
	};
	
	Window.newGame();


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = [];


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Jumpman; var Player; var Util;
	// REQUIRE DEPENDENCIES
	Jumpman = __webpack_require__(3);
	Util = __webpack_require__(5);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite; var Jumpman;
	// REQUIRE DEPENDENCIES
	Sprite = __webpack_require__(4);
	objects = __webpack_require__(1);
	
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Sprite = function (width, height, frameDelay, sourcePathArray) {
	  this.frames = [];
	  this.width = width;
	  this.height = height;
	  this.frameDelay = 0;
	  this.frameDelayMax = frameDelay;
	  this.angle = 0;
	  sourcePathArray.forEach(function (path, index) {
	    this.frames[index] = new Image (width, height);
	    this.frames[index].src = "./sprites/"+path;
	  }.bind(this));
	  this.endCallback = null;
	};
	
	Sprite.prototype.frame = 0;
	
	Sprite.prototype.addAnimationEndCallback = function (callback) {
	  this.endCallback = function () {
	    callback();
	    this.endCallback = null;
	  }.bind(this);
	};
	
	Sprite.prototype.animate = function () {
	  if (this.frames.length > 1) {
	    if (this.frameDelay === 0) {
	        this.frame++;
	        if (this.frame === this.frames.length) {
	          this.frame = 0;
	          if (this.endCallback) {
	            this.endCallback();
	          }
	        }
	    }
	    this.frameDelay-=1;
	    if (this.frameDelay < 0) {
	      this.frameDelay = this.frameDelayMax;
	    }
	  }
	};
	
	Sprite.prototype.draw = function (ctx, pos, viewAnchor) {
	  if (!viewAnchor) { viewAnchor = {x: 0, y: 0,}; }
	  if (ctx) {
	    ctx.drawImage(
	      this.frames[this.frame],
	      pos.x-viewAnchor.x,
	      pos.y-viewAnchor.y,
	      this.width,
	      this.height
	    );
	    this.animate();
	  }
	};
	
	Sprite.prototype.depthDraw = function (ctx, pos, viewAnchor, depthFactor) {
	  //The depth factor should be a multiple of 0.5 between 1.5 and 5 (including)
	  if (ctx) {
	    ctx.drawImage(
	      this.frames[this.frame],
	      pos.x-(viewAnchor.x/depthFactor),
	      pos.y-(viewAnchor.y),
	      this.width,
	      this.height
	    );
	    this.animate();
	  }
	};
	
	module.exports = Sprite;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Util = {};
	
	Util.inherits = function (ChildClass, BaseClass) {
	  function Surrogate () { this.constructor = ChildClass; }
	  Surrogate.prototype = BaseClass.prototype;
	  ChildClass.prototype = new Surrogate();
	};
	
	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Grass; var Util;
	// REQUIRE DEPENDENCIES
	Util = __webpack_require__(5);
	Sprite = __webpack_require__(4);
	objects = __webpack_require__(1);
	
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


/***/ },
/* 7 */
/***/ function(module, exports) {

	var sky;
	
	sky = function () {
	  this.palette = {
	    red: 158,
	    green: 202,
	    blue: 239,
	  };
	  this.day = {
	    red: 158,
	    green: 202,
	    blue: 239,
	  };
	  this.dusk = {
	    red: 240,
	    green: 172,
	    blue: 40,
	  };
	  this.night = {
	    red: 16,
	    green: 20,
	    blue: 45,
	  };
	  this.time = 0; this.hour = 0;
	  this.interval = setInterval(function () {
	    var progress;
	    this.time += 0.1;
	    this.hour = this.time%2400;
	    if (this.hour>=0 && this.hour<600) {
	    // SUNSET
	      progress = this.hour/500;
	      this.palette.red = Math.floor((this.day.red*(1-progress) + this.dusk.red*(progress)));
	      this.palette.green = Math.floor((this.day.green*(1-progress) + this.dusk.green*(progress)));
	      this.palette.blue = Math.floor((this.day.blue*(1-progress) + this.dusk.blue*(progress)));
	    } else if (this.hour>=600 && this.hour<1200) {
	    // DUSK
	      progress = (this.hour-600)/600;
	      this.palette.red = Math.floor((this.dusk.red*(1-progress) + this.night.red*(progress)));
	      this.palette.green = Math.floor((this.dusk.green*(1-progress) + this.night.green*(progress)));
	      this.palette.blue = Math.floor((this.dusk.blue*(1-progress) + this.night.blue*(progress)));
	    } else if (this.hour>=1200 && this.hour<1800) {
	    // SUNRISE
	      progress = (this.hour-1200)/600;
	      this.palette.red = Math.floor((this.night.red*(1-progress) + this.dusk.red*(progress)));
	      this.palette.green = Math.floor((this.night.green*(1-progress) + this.dusk.green*(progress)));
	      this.palette.blue = Math.floor((this.night.blue*(1-progress) + this.dusk.blue*(progress)));
	    } else if (this.hour>=1800 && this.hour<2400) {
	    // SUNRISE
	      progress = (this.hour-1800)/600;
	      this.palette.red = Math.floor((this.dusk.red*(1-progress) + this.day.red*(progress)));
	      this.palette.green = Math.floor((this.dusk.green*(1-progress) + this.day.green*(progress)));
	      this.palette.blue = Math.floor((this.dusk.blue*(1-progress) + this.day.blue*(progress)));
	    }
	    this.color = '#'+
	      this.palette.red.toString(16)+
	      this.palette.green.toString(16)+
	      this.palette.blue.toString(16);
	  }.bind(this), 32);
	};
	
	module.exports = sky;


/***/ }
/******/ ]);
//# sourceMappingURL=bobomb.js.map