function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;

  this.addTo = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
  };

  this.add = function(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  };

  this.subtractFrom = function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  };

  this.add = function(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  };

  this.getMagnitude = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  };

  this.getAngle = function() {
    return Math.atan2(this.y, this.x);
  };

  this.setMagnitude = function(length) {

  };

  this.multiplyBy = function(vector) {
    this.x = this.x * vector.x;
    this.y = this.y * vector.y;
  };
}
