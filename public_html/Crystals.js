var Crystals = function (div) {
    var self = this;
    this.div = div;
    this.width = parseInt(this.div.style.width);
    this.height = parseInt(this.div.style.height);
    this.pos = new Vector(this.div.offsetLeft, this.div.offsetTop);
    this.particles = [];
    

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

    this.metresToPixels = function (metresVector, offsetInMetres, pixelsPerMetre) {
        return (metresVector.subtract(offsetInMetres)).multiply(pixelsPerMetre)
    };

    this.draw = function (offsetInMetres, pixelsPerMetre) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (var i = 0; i < this.particles.length; i++) {
            screenPos = this.metresToPixels(this.particles[i].position, offsetInMetres, pixelsPerMetre)

            this.ctx.beginPath();
            this.ctx.arc(screenPos.x, screenPos.y, 1, 0, Math.PI * 2);
            this.ctx.fill();


        }



    };

    this.update = function () {
        //main loop
        pixelsPerMetre = 10;
        this.draw(new Vector(-this.width*0.5/pixelsPerMetre,-this.height*0.5/pixelsPerMetre), pixelsPerMetre);
    };

    this.randomPosition = function () {
        return new Vector(Math.random() - 0.5, Math.random() - 0.5);
    }

    this.spawnParticles = function (num, maxDistance) {
        if (typeof (maxDistance) === "undefined") {
            maxDistance = 100;
        }
        this.particles = [];
        for (var i = 0; i < num; i++) {
            this.particles.push(new Particle(this.randomPosition().multiply(maxDistance)))
        }
    };
};

var Particle = function (position) {
    this.position = position;
};