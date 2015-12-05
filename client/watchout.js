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
var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", dragmove);

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
    .attr('class','player')
    .call(drag)

  var width = 240,
    height = 125,
    radius = 20;
function dragmove(d) {
  d3.select(this)
      .attr("cx", d.x = Math.max(, Math.min(width - radius, d3.event.x)))
      .attr("cy", d.y = Math.max(radius, Math.min(height - radius, d3.event.y)));
}



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
      .duration(3000)
      .attr('cx', function(d){return d.cx})
      .attr('cy', function(d){return d.cy})

}

moveEnemies();
setInterval(function(){
  moveEnemies();
},3000)

  var gameStats = {
    score: 0,
    bestScore: 0,
  }



      

}).call(this);


