window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	//var SPEED = 30  ; // * 10 pixels per second
	//var SPEEDDOWN = 10;
	var WIDTH = 5;
	var HEIGHT = 10;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 10;


	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.rotation = -20;
		this.gravity = 0.04;
		this.velocity = 0;
		this.lift = -1.13;
	};



	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.rotation = 0;
		this.lift = -1.13;
		this.velocity = 0;
	};

	Player.prototype.onFrame = function() {
		if (Controls.didJump()) {
			this.velocity += this.lift;
		} else {
			this.velocity += this.gravity;
			this.velocity *= 0.95;
		}

		this.pos.y += this.velocity;

		if(this.velocity < 0) {
			this.rotation = -20;
		}
		else {
			this.rotation = 10;
		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate('+ this.rotation+ 'deg)' );
	};

	Player.prototype.checkCollisionWithBounds = function() {

		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT ||
			this.checkCollisionWithPipes()) {
			this.rotation = 130;
			return this.game.gameover();
		} else if(this.NotCollisionWithPipes()){
			this.game.score++;
			document.querySelector('#score').innerHTML = 'Score: ' + this.game.score;
		}
	};

	Player.prototype.checkCollisionWithPipes = function() {
		return (this.pos.x > this.game.pipeBelow.pos.x &&
			this.pos.x < this.game.pipeBelow.pos.x + 3 &&
			((this.pos.y < this.game.pipeBelow.pos.y + 15) ||
			(this.pos.y > this.game.pipeBelow.pos.y + 35))) ||
			(this.pos.x > this.game.pipeAbove.pos.x &&
			this.pos.x < this.game.pipeAbove.pos.x + 3 &&
			((this.pos.y < this.game.pipeAbove.pos.y + 15) ||
			(this.pos.y > this.game.pipeAbove.pos.y + 35)));
	};


	Player.prototype.NotCollisionWithPipes = function() {
	return (this.pos.x > this.game.pipeBelow.pos.x &&
		 this.pos.x < this.game.pipeBelow.pos.x + 1) ||
		 (this.pos.x > this.game.pipeAbove.pos.x &&
		 this.pos.x < this.game.pipeAbove.pos.x + 1);
}
	return Player;

})();
