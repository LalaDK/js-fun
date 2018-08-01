function Particle(position, velocity, radius, friction, mass) {
  this.position = position || new Vector();
  this.velocity = velocity || new Vector();
  this.friction = friction || 0.98;
  this.mass = mass || 1;
  this.radius = radius || this.mass;
  this.stop = false;

  this.update = function() {
    if(!this.stop) {
      this.velocity.setLength(this.velocity.getLength() * this.friction);
      this.position.addTo(this.velocity);
    }
  };

  this.draw = function(context) {
    context.fillStyle = this.stop ? "red" : "#ADD8E6";
    context.beginPath();
    context.arc(this.position.x,this.position.y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  };

  this.angleTo = function(particle) {
    Math.atan2(particle.position.y - this.position.y, particle.position.x - this.position.x);
  };

  this.distanceTo = function(particle) {
    var distanceX = particle.position.x - this.position.x;
    var distanceY = particle.position.y - this.position.y;
    return Math.sqrt(Math.pow(distanceX, 2), Math.pow(distanceY, 2));
  };

  this.gravitateTo = function(particle) {
    var gravity = new Vector(),
    distance = this.distanceTo(particle);
    gravity.setLength(particle.mass / Math.pow(distance, 2));
    gravity.setAngle(this.angleTo(particle));
    this.velocity.addTo(gravity);
  };

  this.within = function(x, y) {
    return this.position.subtract(new Vector(x, y)).getLength() <= this.radius;
  };
}
