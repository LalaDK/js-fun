function Particle(position, velocity, radius) {
  this.position = position || new Vector();
  this.velocity = velocity || new Vector();
  this.radius = radius || 20;
  this.update = function() {
  }

  this.draw = function(context) {

    context.fillStyle = " #ADD8E6";
    context.beginPath();
    context.arc(this.position.x,this.position.y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  }
}
