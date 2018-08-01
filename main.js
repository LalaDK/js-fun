window.onload = function() {
  self = this;
  var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight,
  gravity = new Vector(0, 1);
  var selectedParticle;
  var thrust = new Vector(0,0);


  var objects = [];

  var p1 = new Particle(new Vector(width / 2, height / 2 - 200), new Vector(0, -10), 25);
  var p2 = new Particle(new Vector((width / 2) - 200, height / 2), new Vector(0, -10), 25);
  var p3 = new Particle(new Vector((width / 2) + 200, height / 3), new Vector(0, -10), 25);

  var a = new Particle(new Vector(width / 4, height / 2 - 200), null, 10);
  var b = new Particle(new Vector((width / 2) - 200, height / 2), null, 20);
  var c = new Particle(new Vector((width / 2) - 200, height / 2), null, 30);

  var d = new Particle(new Vector((width / 2) - 200, height / 2), null, 40);
  var e = new Particle(new Vector((width / 2) - 200, height / 2), null, 40);

  objects.push(p1);
  objects.push(p2);
  objects.push(p3);

  objects.push(a);
  objects.push(b);
  objects.push(c);

  objects.push(d);
  objects.push(e);

  var k = 0.1;

  document.body.addEventListener('keydown', function(event) {
    var power = 20;
    var v;
    switch(event.keyCode) {
      case 38: // up
      v = new Vector(0, -(power));
      break;
      case 40:  // down
      v = new Vector(0, (power));
      break;
      case 37:  // left
      v = new Vector(-(power), 0);
      break;
      case 39:  // right
      v = new Vector((power), 0);
      break;
    }
    if(v) {
      objects.forEach(function(obj) {
        obj.velocity.addTo(v);
      });
    }

  });

  document.body.addEventListener('mousedown', function(event) {
    objects.forEach(function(obj) {
      if(obj.within(event.clientX, event.clientY)) {
        selectedParticle = obj;
        selectedParticle.velocity = new Vector();
        return;
      }
    });
  });

  document.body.addEventListener('mousemove', function(event) {
    if(selectedParticle) {
      selectedParticle.stop = true;

      selectedParticle.velocity = new Vector(event.movementX, event.movementY);
      selectedParticle.position = new Vector(event.clientX, event.clientY);
    }
  });

  document.body.addEventListener('mouseup', function(event) {
    if(selectedParticle) {
      selectedParticle.stop = false;
    }
    selectedParticle = null;
  });

  function link(p1, p2, seperation) {
    var d = p2.position.subtract(p1.position);
    var length = (d.getLength() - seperation) / 2;
    d.setLength(length);
    p1.position.addTo(d);
    p2.position.subtractFrom(d);
  }

  function spring(p1, p2, seperation) {
    var distance = p1.position.subtract(p2.position);
    distance.setLength(distance.getLength() - seperation);
    var springForce = distance.multiply(k);
    if(!p2.stop)
    p2.velocity.addTo(springForce);
    if(!p1.stop)
    p1.velocity.subtractFrom(springForce);
  }

  function edgeHandling(object) {
    if(object.position.y + object.radius > height) {
      object.position.y = height - object.radius;
      object.velocity.y = -object.velocity.y;
      //object.velocity.setLength(object.velocity.getLength() * 0.8);
    }
    if(object.position.x + object.radius >= width) {
      object.position.x = width - object.radius;
      object.velocity.x = -object.velocity.x;
      //object.velocity.setLength(object.velocity.getLength() * 0.8);

    } else if(object.position.x <= object.radius) {
      object.position.x = object.radius;
      object.velocity.x = -object.velocity.x;
      //object.velocity.setLength(object.velocity.getLength() * 0.8);
    }
  }

  function drawLine(context, p1, p2) {
    context.beginPath();
    context.moveTo(p1.position.x, p1.position.y);
    context.lineTo(p2.position.x, p2.position.y)
    context.stroke();
  }

  function drawLineVector(context, p1, p2) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y)
    context.stroke();
  }

  render();

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach(function(obj) {
      if(!obj.stop) {
        obj.velocity.addTo(thrust);
        obj.velocity.addTo(gravity);
        obj.update();
      }

    });

    spring(a, b, 200);
    spring(b, c, 200);
    spring(c, a, 200);
    spring(d, e, 300);
    drawLine(context, a, b);
    drawLine(context, b, c);
    drawLine(context, c, a);
    drawLine(context, d, e);

    //link(b, c, 200);
    //drawLine(context, b, c);


    objects.forEach(function(obj) {
      edgeHandling(obj);
      obj.draw(context);
      drawLineVector(context, obj.position, obj.position.add(obj.velocity.multiply(3)));
    });

    requestAnimationFrame(render);
  }
}
