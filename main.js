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


//////////////////////////////////////////////////////////////////////////////

var theCity = new terra.Terrarium(128, 32, {
  trails: 0.1,
  periodic: true,
  background: [11, 11, 11]
});

var STATE_COLORS = ['0,0,0,0', '50,200,50,1', '50,50,200,1', '200,200,50,1'];

var between = function (x, min, max){
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
        return x.creature.state === i;
      }).length;
    });


    if (this.state === 0) {
      if (between(surroundings[1], 8,24) && between(surroundings[2], 0,16)  && between(surroundings[2], 0,12)){
        this.state = 2;
      } else if (between(surroundings[2], 6,16)  && between(surroundings[2], 0,8)){
        this.state = 1;
      } else if (between(surroundings[1], 8,24) && between(surroundings[2], 4,24)){
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
    return true;
  }
}, function () {
  this.state = (Math.random() < 0.5) ? Math.floor(Math.random()*4) : 0;
});



theCity.grid = theCity.makeGrid('theCity');
theCity.animate();
