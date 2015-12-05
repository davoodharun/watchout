(function(){

  var gameOptions = {
    height: 450,
    width: 700,
    nEnemies: 30,
    padding: 20
  }




var Enemies = function(id){
   
  this.id=id,
  this.cx= Math.random() * gameOptions.width,
  this.cy= Math.random() * gameOptions.height
    
};

var createEnemies = function(numberOfEnemies){
  var arr = [];
  for(var i=1; i<=numberOfEnemies;i++){
    arr.push(new Enemies(i))
  }

  return arr;

}

var Player = function(){
  this.cx = gameOptions.width/2;
  this.cy = gameOptions.height/2;
}




var svgcontainer = d3.select('.board')
  .append('svg')
  .attr('width' ,gameOptions.width)
  .attr('height', gameOptions.height)
  .attr('class','container');

var player = svgcontainer
    .selectAll('.players')
    .data([new Player()])
    .enter()
    .append('svg')
    .append('circle')
    .attr('cx', function(d){return d.cx})
    .attr('cy', function(d){return d.cy})
    .attr('r',20)
    .style('fill','red')
    .attr('class','player');


var enem = svgcontainer
    .selectAll('.enemies')
    .data(createEnemies(gameOptions.nEnemies))
    .enter()
    .append('svg')
    .append('circle')
    .attr('cx', function(d){return d.cx})
    .attr('cy', function(d){return d.cy})
    .attr('r',7)
    .style('fill','purple')
    .attr('class','enemy');


var moveEnemies = function(){

  return enem
  .data(createEnemies(gameOptions.nEnemies))
      .transition()
      .duration(4500)
      .attr('cx', function(d){return d.cx})
      .attr('cy', function(d){return d.cy})

}

moveEnemies();
setInterval(function(){
  moveEnemies();
},4500)

  var gameStats = {
    score: 0,
    bestScore: 0,
  }



      

}).call(this);


