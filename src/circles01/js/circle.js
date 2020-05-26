blindfish.CircleManager = (function() {
  var p = blindfish.p5,
    circles = [],

      addCircle = function(args) {
          return new blindfish.Circle(args);
      };

    return {
      addCircle : addCircle
    };


})();

blindfish.Circle = function(args) {

    this.x = args.x;
    this.y = args.y;
    this.rad = args.rad;
    this.diameter = this.rad * 2;


    this.divisions = args.divisions || 6;
    this.depth = args.depth || 0;
    this.maxDepth = args.maxDepth || 2;



    this.children = [];
    this.childrenLength = this.children.length;
    this.addChildren(this.depth);

};


blindfish.Circle.prototype.draw = function () {
    var p = blindfish.p5;

    p.ellipse(this.x, this.y, this.diameter, this.diameter);

    for(var i=0; i<this.childrenLength; i++) {
     this.children[i].draw();
    }
};



blindfish.Circle.prototype.updateChildren = function() {
    this.removeChildren();
    this.addChildren();
};


blindfish.Circle.prototype.removeChildren = function() {

    var childrenLength = this.children && this.children.length;
    for(var i=0; i<childrenLength; i++) {
        this.children[i].removeChildren();
    }

    this.children = [];
    this.childrenLength = this.children.length;
};


blindfish.Circle.prototype.addChildren = function () {

    if(this.depth < this.maxDepth) {
        this.angle = Math.PI * 2 / this.divisions;

        for(var i=0; i < this.divisions; i++) {

            var pointX = this.x + this.rad * Math.cos(this.angle*i),
                pointY = this.y + this.rad * Math.sin(this.angle*i);

            this.children[i] = new blindfish.Circle({
                x: pointX,
                y: pointY,
                rad: this.rad,
                depth: this.depth+1,
                //TODO: ommission of this appears to be a bug,
                // but leads to nice results...
                divisions: this.divisions,
                maxDepth : this.maxDepth
            });
        }
        this.childrenLength = this.children.length;
    }

};
