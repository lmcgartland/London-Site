/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	function getMousePos(e) {
		var posx = 0;
		var posy = 0;
		if (!e) var e = window.event;
		if (e.pageX || e.pageY) 	{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
		}
		return {
			x : posx,
			y : posy
		}
	}

	function Slideshow(el, options) {
		// if no support for preserve3d then return
		if( !support.preserve3d ) {
			return false;
		}

		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );

		// the slides
		this.slides = [].slice.call(this.el.querySelectorAll('.display-container'));
		// total slides
		this.slidesTotal = this.slides.length;
		// the items
		this.current = 0;

		this._init();
	}

	Slideshow.prototype.options = {
		// how much each slider/scene will rotate when the user moves the mouse
		movement : {
			rotateX : 5, // a relative rotation of -5deg to 5deg on the x-axis
			rotateY : 10 // a relative rotation of -10deg to 10deg on the y-axis
		}
	};



	Slideshow.prototype._rotateSlide = function(mousepos) {
		// transform values
		var rotX = this.options.movement.rotateX ? 2 * this.options.movement.rotateX / this.slideSizes.height * mousepos.y - this.options.movement.rotateX : 0,
			rotY = this.options.movement.rotateY ? 2 * this.options.movement.rotateY / this.slideSizes.width * mousepos.x - this.options.movement.rotateY : 0;
		
		this.currentScene.style.WebkitTransform = this.currentScene.style.transform = 'rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg)';
	};


	window.Slideshow = Slideshow;

})(window);




