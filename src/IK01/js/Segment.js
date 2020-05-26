blindfish.Segment = function(x1, y1, len) {
    this.x1 = x1;
    this.y1 = y1;
    this.len = len;
}

blindfish.Segment.prototype.setTarget = function(targetX, targetY) {
       //TODO: test for appropriate object type
        this.targetX = targetX;
        this.targetY = targetY;
}

blindfish.Segment.prototype.draw = function() {
    var p = blindfish.p5,
        dx = this.targetX - this.x1,
        dy = this.targetY - this.y1,
        angle = Math.atan2(dy, dx);
    
        this.x1 = this.targetX - Math.cos(angle) * this.len;
        this.y1 = this.targetY - Math.sin(angle) * this.len;
    
        var x2 = this.targetX,
                y2 = this.targetY;
    
            p.line(this.x1, this.y1, x2, y2);
    
}