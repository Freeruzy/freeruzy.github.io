/*========================================================*/  
/* Hack Icon BG
/*========================================================*/
var HackBGLoader = function(c, cw, ch){
	
	var _this = this;
	this.c = c;
	this.ctx = c.getContext('2d');
	this.cw = cw;
	this.ch = ch;			
	this.dots = [];
	this.particles = [];

	this.particleRate = 500;
    //particle color
    this.r = 60;
    this.g = 255;
    this.b = 55;
	this.age = 0;
    this.rgbString = "rgba("+this.r+","+this.g+","+this.b+",";
    this.speed = 1;
    this.change = 1;
    this.OkNum = 0;
    this.zheng = true;
    /*========================================================*/
	/* Initialize
	/*========================================================*/
	this.init = function(){
		//this.getimg();
        this.getimgData("F");
		_this.createParticles();
		this.loop();
	};
	
	/*========================================================*/	
	/* Particles
	/*========================================================*/
	this.Particle = function(){
        var i = _this.dots.length;
        var dot = _this.dots[Math.floor(Math.random() * i)];
		this.x = dot.x;
        this.dx = dot.x;
		this.y = dot.y;
        this.dy = dot.y;
		this.vx = 0
		this.vy = 0;
		this.flake = Math.random() > 0.5 ? "1" : "0";
        this.timeout = Math.random()*30;
        this.dead = false;
        this.resetx = false;
        this.resety = false;
        this.change = 5;
	};
	
	this.Particle.prototype.update = function(i) {
		if (!this.dead) {
			this.vx += Math.random();
			this.vy += Math.random();
			if (this.x < _this.cw / 2 && this.y < _this.ch / 2) {
				this.x += -this.vx * _this.speed;
				this.y += -this.vy * _this.speed;
			} else if (this.x < _this.cw / 2 && this.y >= _this.ch / 2) {
				this.x += -this.vx * _this.speed;
				this.y += this.vy * _this.speed;
			} else if (this.x >= _this.cw / 2 && this.y < _this.ch / 2) {
				this.x += this.vx * _this.speed;
				this.y += -this.vy * _this.speed;
			} else {
				this.x += this.vx * _this.speed;
				this.y += this.vy * _this.speed;
			}
            this.change += _this.change;
            if (this.y > _this.ch+this.change || this.x > _this.cw+this.change || this.y < 0-this.change || this.x < 0-this.change) {
                this.dead = true;
                _this.OkNum += 1;
                if (_this.OkNum >= _this.particleRate) {
                	_this.zheng = false;
                    _this.age = 0;
				}
            }
		}
	};

    this.Particle.prototype.updateRev = function(i) {

        if (this.dead) {
            this.vx += -Math.random()*0.5;
            this.vy += -Math.random()*0.5;
            if (this.vx < 0.5) {
            	this.vx = 0.5;
			}
            if (this.vy < 0.5) {
                this.vy = 0.5;
            }

            if (this.resetx != true) {
                if (this.x < this.dx) {
                    this.x += this.vx * _this.speed;
                } else {
                    this.x += -this.vx * _this.speed;
                }

                if (Math.abs(this.x - this.dx) < 3) {
                    this.resetx = true;
                }
            }
            if (this.resety != true) {
                if (this.y < this.dy) {
                    this.y += this.vy * _this.speed;
                } else {
                    this.y += -this.vy * _this.speed;
                }

                if (Math.abs(this.y - this.dy) < 3) {
                    this.resety = true;
                }
            }

            this.change += -_this.change;
            if (this.change < 5) {
            	this.change = 5;
			}
            if (this.resetx == true && this.resety == true) {
                this.dead = false;
                this.resetx = false;
                this.resety = false;
                _this.OkNum += -1;
                if (_this.OkNum <= 0) {
                    _this.zheng = true;
                    _this.age = 0;
                }
            }
        }
    };
	
	this.Particle.prototype.render = function(){
        _this.ctx.beginPath();
        _this.ctx.fillStyle = _this.rgbString + "0.8" + ")";
        _this.ctx.font = this.change+"px sans-serif"
        _this.ctx.fillText(this.flake,this.x, this.y);
        _this.ctx.closePath();
        _this.ctx.fill();
	};
	
	this.createParticles = function(){
		var i = this.particleRate;
		while(i--){
			this.particles.push(new this.Particle());
		}
	};
					
	this.updateParticles = function(){					
		var i = this.particles.length;						
		while(i--){
			var p = this.particles[i];
			if (p.timeout < _this.age) {
                if (_this.zheng == true) {
                    p.update(i);
                } else {
                    p.updateRev(i);
                }
            }
		}
	};
	
	this.renderParticles = function(){
		var i = this.particles.length;						
		while(i--){
			var p = this.particles[i];
			p.render();											
		}
	};

    this.getimgData = function(text){
        this.drawText(text);
        var imgData = this.ctx.getImageData(0,0,this.cw , this.ch);
        this.ctx.clearRect(0,0,this.cw , this.ch);
        for(var x=0;x<imgData.width;x++){
            for(var y=0;y<imgData.height;y++){
                var i = (y*imgData.width + x)*4;
                if(imgData.data[i] >= 128){
                    var dot = new Dot(x , y);
                    this.dots.push(dot);
                }
            }
        }
    };

	this.getimg = function(){
        var img = new Image();
		img.src = "clxh.jpg";
		img.onload = function() {
			_this.ctx.drawImage(img,0,0);
			var imgData = _this.ctx.getImageData(0,0,_this.cw , _this.ch);
			//_this.ctx.clearRect(0,0,_this.cw , _this.ch);
			for(var x=0;x<imgData.width;x++){
				for(var y=0;y<imgData.height;y++){
					var i = (y*imgData.width + x)*4;
					//alert(imgData.data[i-3]+" " +imgData.data[i-2]+" " +imgData.data[i-1] +" " +imgData.data[i] );
					if(imgData.data[i] >= 128 && !(imgData.data[i-1] > 250 && imgData.data[i-2] > 250 && imgData.data[i-3] > 250)){
						var dot = new Dot(x , y);
						_this.dots.push(dot);
					}
				}
			}
			_this.createParticles();
			_this.loop();
		}
    };

    this.drawText = function(text){
        this.ctx.save();
        this.ctx.font = "300px sans-serif";
        this.ctx.fillStyle = "rgba(168,168,168,1)";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text , this.c.width/2 , this.c.height/2);
        this.ctx.restore();
    };

    function Dot(centerX , centerY){
        this.x = centerX;
        this.y = centerY;
    }
	/*========================================================*/	
	/* Clear Canvas
	/*========================================================*/
	this.clearCanvas = function(){
		this.ctx.globalCompositeOperation = 'source-over';
		this.ctx.clearRect(0,0,this.cw,this.ch);					
		this.ctx.globalCompositeOperation = 'lighter';
	};
	
	/*========================================================*/	
	/* Animation Loop
	/*========================================================*/
	this.loop = function(){
		var loopIt = function(){
			requestAnimationFrame(loopIt, _this.c);
			_this.clearCanvas();

			_this.updateParticles();

			_this.renderParticles();
            _this.age += 0.2 ;
		};
		loopIt();					
	};

};

/*========================================================*/	
/* Check Canvas Support
/*========================================================*/
var isCanvasSupported = function(){
	var elem = document.createElement('canvas');
	return !!(elem.getContext && elem.getContext('2d'));
};

/*========================================================*/	
/* Setup requestAnimationFrame
/*========================================================*/
var setupRAF = function(){
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	};
	
	if(!window.requestAnimationFrame){
		window.requestAnimationFrame = function(callback, element){
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	};
	
	if (!window.cancelAnimationFrame){
		window.cancelAnimationFrame = function(id){
			clearTimeout(id);
		};
	};
};

/*========================================================*/	
/* Define Canvas and Initialize
/*========================================================*/
if(isCanvasSupported){
  var c = document.createElement('canvas');
  c.width = 900;
  c.height = 520;
  var cw = c.width;
  var ch = c.height;	
  document.body.appendChild(c);	
  var cl = new HackBGLoader(c, cw, ch);				
  
  setupRAF();
  cl.init();
}
