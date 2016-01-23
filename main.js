terra.registerCreature({
  type: 'secondCreature',
  color: [120, 0, 240],
  sustainability: 6,
  reproduceLv: 1
});

// create a simple plant creature
terra.registerCreature({
  type: 'simplePlant',
  color: [166, 226, 46],
  size: 10,
  reproduceLv: 0.8,
  wait: function() { this.energy += 3; },
  move: false
});

// initialize our environment
//var ex1 = new terra.Terrarium(25, 25, {id: 'ex1'});
//ex1.grid = ex1.makeGridWithDistribution([['secondCreature', 10], ['simplePlant', 90]]);

//ex1.animate(500);


var gameOfLife = new terra.Terrarium(128, 32, {
  trails: 0.4,
  periodic: true,
  background: [22, 44, 66]
});

var foo = 32;

terra.registerCA({
  type: 'GoL',
  color: [255, 200, 100],
  colorFn: function () { return this.alive ? this.color + ',1' : '0,0,0,0'; },
  process: function (neighbors, x, y) {
    var surrounding = neighbors.filter(function (spot) {
      return spot.creature.alive;
    }).length;
    this.alive = surrounding === 3 || (surrounding === 2 && this.alive) ;
    return true;
  }
}, function () {
  this.alive = Math.random() < 0.3;//--foo > 0; //
});

gameOfLife.grid = gameOfLife.makeGrid('GoL');
gameOfLife.animate();
//////////////////////////////////////////////////////////////////////////////

var lifeLike = new terra.Terrarium(128, 32, {
  trails: 0.1,
  neighborhood: 'vonNeumann', //well crap. It will always be size 1.
  periodic: true,
  background: [33, 11, 22]
});

var once = true;

function loggit(x){
  if (once) {
    console.log(x);
    once = false;
  }
}
var foo = 32;

terra.registerCA({
  type: 'lifelike',
  actionRadius: 2,
  color: [100, 255, 200],
  colorFn: function () { return this.alive ? this.color + ',1' : '0,0,0,0'; },
  process: function (neighbors, x, y) {
    var surrounding = neighbors.filter(function (spot) {
      return spot.creature.alive;
    }).length;
    this.alive = (surrounding === 7) || (surrounding === 6) || (surrounding === 5) || (surrounding === 4 && this.alive) ;
    loggit(this);
    return true;
  }
}, function () {
  this.alive = Math.random() < 0.3;//--foo > 0; //
});

lifeLike.grid = lifeLike.makeGrid('lifelike');
lifeLike.animate();
//////////////////////////////////////////////////////////////////////////////
var theCity = new terra.Terrarium(128, 32, {
  trails: 0.1,
  periodic: true,
  background: [11, 11, 11]
});

var STATE_COLORS = ['0,0,0,0', '50,200,50,1', '150,150,50,1', '50,50,200'];

funciton between(x, min, max){
  return (x >= min) && (x <= max);
}

terra.registerCA({
  type: 'theCity',
  actionRadius: 2,
  // 4 states...
  colorFn: function () { return STATE_COLORS[this.state]; },
  process: function (neighbors, x, y) {
    var surroundings = [0,1,2,3].map(function(i) {
      return neighbors.filter(function (x) {
        return x.state === i;
      }).length;
    });
    if (this.state === 0) {
      if (between(surroundings[1], 8,24) && between(surroundings[2], 0,16)  && between(surroundings[2], 0,12)){
        this.state = 2;
      } else if (between(surroundings[2], 6,16)  && between(surroundings[2], 0,8)){
        this.state = 1;
      } else (between(surroundings[1], 8,24) && between(surroundings[2], 4,24)){
        this.state = 3;
      } else {
        this.state = 0;
      }
    }
    else if (this.state === 1) {
      if (between(surroundings[2], 4,24)  && between(surroundings[2], 0,12)){
        this.state = 1;
      } else {
        this.state = 0;
      }
    }
    else if (this.state === 2) {
      if (between(surroundings[1], 6,24) && between(surroundings[2], 0,16)  && between(surroundings[2], 0,16)){
        this.state = 2;
      } else {
        this.state = 0;
      }
    }
    else if (this.state === 3) {
      if (between(surroundings[1], 6,24) && between(surroundings[2], 2,24)){
        this.state = 3;
      } else {
        this.state = 0;
      }
    }
    loggit(this);
    return true;
  }
}, function () {
  this.state = (Math.random() < 0.5) ? Math.floor(Math.random()*4) : 0;
});

lifeLike.grid = lifeLike.makeGrid('lifelike');
lifeLike.animate();
