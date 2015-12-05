(function(){

  var gameOptions = {
    height: 450,
    width: 700,
    nEnemies: 30,
    padding: 20

  }



var width = 240,
    height = 125,
    radius = 20;

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

var drag = d3.behavior.drag()
             .on('dragstart', function() { circle.style('fill', 'red'); })
             .on('drag', function() { circle.attr('cx', Math.min(Math.max(10,d3.event.x),Math.min(gameOptions.width,690)))
                                            .attr('cy', Math.min(Math.max(10,d3.event.y),Math.min(gameOptions.height,440))); })
             .on('dragend', function() { circle.style('fill', 'black'); });


var circle = svgcontainer.selectAll('.draggableCircle')
                .data([{ x: (gameOptions.width / 2), y: (gameOptions.height / 2), r: 20 }])
                .enter()
                .append('svg:circle')
                .attr('class', 'draggableCircle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'black');






function dragmove(d) {
  d3.select(this)
      .attr("cx", 200)
      .attr("cy", 200);
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

var checkCollisions = function(){
 // debugger;
  var enemies = document.getElementsByClassName('enemy')

 
 
  var playerX = Number(document.getElementsByClassName('draggableCircle')[0].getAttribute('cx'));
  var playerY = Number(document.getElementsByClassName('draggableCircle')[0].getAttribute('cy'));

  for(var i =0; i<enemies.length;i++){
    var x = enemies[i].getAttribute('cx')
    var y = enemies[i].getAttribute('cy')
    if(Math.abs(x-playerX)<=20 && Math.abs(y-playerY)<=20) {
      alert('collision')
    }
  } 

};

setInterval(checkCollisions, 10);
