function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;

  this.getLength = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  };

  this.getAngle = function() {
    return Math.atan2(this.y, this.x);
  };

  this.setAngle = function(angle) {
    var length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  };

  this.setLength = function(length) {
    var angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  };

  this.addTo = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
  };

  this.add = function(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  };

  this.subtract = function(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  };

  this.multiply = function(value) {
    return new Vector(this.x * value, this.y * value);
  };

  this.divide = function(value) {
    return new Vector(this.x / value, this.y / value);
  };

  this.multiplyBy = function(value) {
    this.x = this.x * value;
    this.y = this.y * value;
  };

  this.subtractFrom = function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  };
}
