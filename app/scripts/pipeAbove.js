window.PipeAbove = (function() {
    'use strict';
    
    var SPEED = 20;
    
    var PipeAbove = function(el, game) {
		this.el = el;
        this.game = game;
        this.player = game.player;
        this.pos = {x: 50, y: randomY()};
        this.width = 12.5;
	};
    PipeAbove.prototype.onFrame = function (delta) {
        this.pos.x -= delta * SPEED;
        
        if(this.pos.x < -14) {
            this.pos.x = 50;
            this.pos.y = randomY();
        }
        
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };
    
    PipeAbove.prototype.reset = function () {
        this.pos.x = 50;
    };
    
    
    function randomY() {
        return 0;
    }
    
    return PipeAbove;
})();