var Crystals = function (div) {
    var self=this;
    this.div = div
    this.width = parseInt(this.div.style.width);
    this.height = parseInt(this.div.style.height);
    this.pos = new Vector(this.div.offsetLeft, this.div.offsetTop);

    this.canvas = document.createElement("canvas");
//    this.canvases[i].style.position = "absolute";
//    this.canvases[i].style.top = this.pos.y + 1;
//    this.canvases[i].style.left = this.pos.x + 1;

    this.div.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    

    this.fps = 60;

    this.interval = 1000 / this.fps;

    this.start = function () {
        //little hack so that when this.update is called 'this' works as you expect
        this.thread = setInterval(function () {
            self.update.call(self);
        }, this.interval);
    };

    this.update = function () {
        //main loop
        this.ctx.clearRect(0,0,this.width+1,this.height+1);
        this.ctx.beginPath();
        this.ctx.arc(95,50,40,0,Math.PI);
        this.ctx.stroke();
    };

}
