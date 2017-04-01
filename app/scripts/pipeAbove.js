window.PipeAbove = (function() {
	'use strict';

  var SPEED = 30;
	var INITIAL_POSITION_X = 100;
	var INITIAL_POSITION_Y = 0;

	var PipeAbove = function(el, game, offsetX) {
    this.el = el;
    this.game = game;
    this.offset = offsetX;
    this.pos = {x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y};
	};


	/**
	 * Resets the state of the player for a new game.
	 */
	PipeAbove.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X + this.offset;
    this.pos.y = Math.floor(Math.random() * 15);
	};

  PipeAbove.prototype.onFrame = function(delta) {
    this.pos.x -= delta * SPEED + 0.25;

    if (this.pos.x < -10) {
  		this.pos.x = INITIAL_POSITION_X;
      this.pos.y = Math.floor((Math.random() * 15));
    }

		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
  };

	return PipeAbove;

})();
