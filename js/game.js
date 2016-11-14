Window.newGame = function () {
  var initializeCanvas; var initializeKeyControls; var initializeWorld; var play; var ctx;
  // 1. REQUIRE DEPENDENCIES
  var objects = require('./objects.js');
  var Player = require('./player.js');
  var Grass = require('./grass.js');
  var Sky = require('./sky.js');

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
