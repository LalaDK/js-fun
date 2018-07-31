window.onload = function() {

  var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;


  var objects = [];

  objects.push(new Particle(new Vector(width / 2, height / 2), null, 200));

  render();

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach(function(object) {
      if(object.update)
      object.update();
      if(object.draw)
      object.draw(context);
      requestAnimationFrame(render);
    });
  }
}
