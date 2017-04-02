
window.Game = (function() {
	'use strict';

	var Controls = window.Controls;
	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var offset = 18;

	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipeBelow = new window.PipeBelow(this.el.find('.PipeBelow'), this, offset*1);
		this.pipeAbove = new window.PipeAbove(this.el.find('.PipeAbove'), this, offset*0);
		this.isPlaying = false;
		this.GameSoundtrack = new Audio('../audio/backgroundmusic.mp3');
		this.DeathSound = new Audio('../audio/IamaGod.mp3');
		this.ResetAudio = new Audio('../audio/kanyeEGO.mp3');
		this.CameraSound = new Audio('../audio/CameraSound.mp3');
		this.Rockstar = new Audio('../audio/kanyeRockstar.mp3');
		this.kanyeWalmart = new Audio('../audio/BiggerThanWalmart.mp3');
		this.president = new Audio('../audio/kanyePresident.mp3');
		this.score = 0;
		this.highScore = 0;
		this.isPlaying = false;
		var fontSize = Math.min(
		window.innerWidth / Game.prototype.WORLD_WIDTH,
		window.innerHeight / Game.prototype.WORLD_HEIGHT
		);
		el.css('fontSize', fontSize + 'px');

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
		document.querySelector('#score').innerHTML = 'Score: ' + this.score;
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}
		if(Controls.isVolumeOn()){
			this.SoundManager(0);
		}
		else{
			this.SoundManager(1);
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;
		if(this.score === 10){
			this.Rockstar.play();
			this.isPlaying = true;
		}
		else if(this.score === 15){
			this.kanyeWalmart.play();
			this.isPlaying = true;
		}
		else if(this.score === 20){
			this.president.play();
			this.isPlaying = true;
		}
		else if (this.score === 22){
			this.president.pause();
		}


		// Update game entities.
		this.player.onFrame(delta);
		this.pipeBelow.onFrame(delta);
		this.pipeAbove.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();
		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};


	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.DeathSound.pause();
		this.ResetAudio.pause();
		this.CameraSound.pause();
		this.GameSoundtrack.play();
		this.player.reset();
		this.pipeBelow.reset();
		this.pipeAbove.reset();
		this.score = 0;
		document.querySelector('#score').innerHTML = 'Score: ' + this.score;
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		this.GameSoundtrack.pause();
		this.DeathSound.play();
		this.ResetAudio.play();
		this.CameraSound.play();
		if(this.highScore < this.score) {
			this.highScore = this.score;
		}
		document.querySelector('.score').innerHTML = 'Score: ' + this.score;
		document.querySelector('.highscore').innerHTML = 'High Score: ' + this.highScore;
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	Game.prototype.SoundManager = function(newVol) {
		this.GameSoundtrack.volume = newVol;
		this.DeathSound.volume = newVol;
		this.ResetAudio.volume = newVol;
		this.CameraSound.volume = newVol;
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();
