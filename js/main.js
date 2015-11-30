jQuery(document).ready(function(){
	/*$('.container').parallax({
		calibrateX: false,
		calibrateY: true,
		invertX: false,
		invertY: true,
		limitX: false,
		limitY: 10,
		scalarX: 2,
		scalarY: 8,
		frictionX: 0.2,
		frictionY: 0.8,
		originX: 0.0,
		originY: 1.0
	});*/
	$('#scene').parallax({
		relativeInput: true,
		clipRelativeInput: true,
		invertY: true
	});
});

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

	var zoomed = false;

function Storefront(el) {
	this.el = el;


	this.displays = $('.display');
	this.displayItems = $('.item');

	this.currentDisplay = this.displays[0];

	this._init();


};


Storefront.prototype._init = function() {


	var storefrontWidth = ($('.display').width()+100) * $('.display').size() + 100;
	console.log($('.display').width());

	$('.storefront').width(storefrontWidth);

	console.log($('.storefront').width());


};

$( "a.zoom" ).click(function() {
	var scrollLeft = $('.storefront-stage').scrollLeft() / $('.storefront').width();
	console.log('bottom ' + $('.storefront-stage').scrollLeft() / $('.storefront').width());



	if(zoomed) {
		// $('.storefront').css({transform: 'translateZ(-100px)'});
		// console.log($('.storefront-stage').scrollLeft());
		// $('.storefront-wrapper').css({height: '200'});
		// $('.storefront').css('transform-origin', 'top '+$('.storefront-stage').scrollLeft() / $('.storefront').width());
				// $('.storefront').css({transform: 'scale(1,1)'});

		TweenMax.to(".storefront", 0.4, {
            z: 0,
            y: 0,
			ease: Quad.easeInOut
        });

		zoomed = false;
	}
	else {
		// $('.storefront').css({transform: 'translateZ(0px)'});
		// $('.storefront-wrapper').css({height: '600'});
		// $('.storefront').css('transform-origin', 'top '+$('.storefront-stage').scrollLeft() / $('.storefront').width());
		// 		$('.storefront').css({transform: 'scale(0.5,0.5)'});


		TweenMax.to(".storefront", 0.4, {
           z: -100,
           y: 200,
			ease: Quad.easeInOut
        });

		zoomed = true;

	}

});


