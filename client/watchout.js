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
    this.x= Math.random() * gameOptions.width,
    this.y= Math.random() * gameOptions.height

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



  window.svgcontainer = d3.select('.board')
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
              .data([{ x: (gameOptions.width / 2), y: (gameOptions.height / 2), r: 7 }])
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
      .append('svg:image')
      .attr('xlink:href','asteroid.png')
      .attr('width','20')
      .attr('height', '20')
      .attr('x', function(d){return d.x})
      .attr('y', function(d){return d.y})
      .attr('r',7)
      .style('fill','purple')
      .attr('class','enemy')







var moveEnemies = function(){

  return enem
  .data(createEnemies(gameOptions.nEnemies))
      .transition()
      .duration(3000)
      .attr('x', function(d){return d.x})
      .attr('y', function(d){return d.y})

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

  var highscore = 0;
  var collisions = 0;
  var score = 0;
  var checkCollisions = function(){
   // debugger;
    var enemies = document.getElementsByClassName('enemy')

   
   
    var playerX = Number(document.getElementsByClassName('draggableCircle')[0].getAttribute('cx'));
    var playerY = Number(document.getElementsByClassName('draggableCircle')[0].getAttribute('cy'));

    for(var i =0; i<enemies.length;i++){
      var x = enemies[i].getAttribute('x')
      var y = enemies[i].getAttribute('y')
      if(Math.abs(x-playerX)<=7 && Math.abs(y-playerY)<=25) {
        if(score > highscore){
          highscore = score;
          d3.selectAll('.hscore')
          .data([highscore])
          .text(function(d){ return d })
        }
        score = 0;
        var explosion = svgcontainer.selectAll('.explosions')
            .data([])
            .enter()
            .append('svg:circle')
            .attr('cx', 2)
            .attr('cy', 2)
            .attr('r',7) 
            .attr('class','explosions')        
            .transition()
            .duration(1000)
            .attr('r', 7)
            .style('fill','red')
           

         d3.selectAll('.col')
          .data([collisions++])
          .text(function(d){ return d })  

      }
    } 

  };

  setInterval(checkCollisions, 50);



  var scoreTimes = function(){
    d3.selectAll('.cur')
      .data([score++])
      .text(function(d){ return d })  

  }

setInterval(scoreTimes, 100);