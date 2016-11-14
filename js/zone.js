var Grass = require("./grass.js");

var Zone = function (name, blueprint) {
  this.name = name;
  this.blueprint = blueprint;
};

// X Top of a platform
// Y Middle of a platform

Zone.prototype.build = function (blocks, movers, players, metaBlocks, callback) {
  this.blueprint.forEach(function (yLine, yIndex) {
    yLine.split("").forEach(function (square, xIndex) {
      if (square === "X") {
        blocks.push( new Block (xIndex*48, yIndex*48) );
      } else if (square === "Y") {
        blocks.push( new Block (xIndex*48, yIndex*48, "middle") );
      } else if (square === "F") {
        blocks.push( new Block (xIndex*48, yIndex*48, "bolted_hang") );
      } else if (square === "T") {
        blocks.push( new Block (xIndex*48, yIndex*48, "hanging") );
      } else if (square === "H") {
        movers.push( new Boneheap (movers.length, {x: xIndex*48, y: yIndex*48}) );
      } else if (square === "!") {
        movers.push( new Skeleton (movers.length, xIndex*48, yIndex*48) );
      } else if (square === "¡") {
        movers.push( new Burningman (movers.length, xIndex*48, yIndex*48) );
      } else if (square === "$") {
        movers.push( new Shoggoth (movers.length, xIndex*48, yIndex*48) );
      } else if (square === "*") {
        movers.push( new Pigeon (movers.length, xIndex*48, yIndex*48) );
      } else if (square === "%") {
        movers.push( new Madbomber (movers.length, xIndex*48, yIndex*48) );
      } else if (square === "1") {
        if (!players[0]) {
          players.push( new Player (movers.length, xIndex*48, yIndex*48) );
        } else {
          players[0].pos = {
            x: xIndex*48,
            y: yIndex*48
          };
        }
      }
    });
  });
  callback();
};
module.exports = Zone;
