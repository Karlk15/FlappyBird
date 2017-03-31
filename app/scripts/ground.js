window.Ground = (function() {
    'use strict';

    var SPEED = 2;

    var Ground = function(el, game) {
        this.el = el;
        this.game = game;
        this.pos = { x: 0, y: 0};
    };

    Ground.prototype.onFrame = function(delta) {
        this.pos.x -= delta * SPEED;

        if(this.pos.x <= -108) {
            this.pox.x = 0;
        }

        this.el.css('transform', 'translateZ(0) translate(' + this.pox.x + 'em, ' + this.pos.y + 'em)');
    };
    return Ground;

})();