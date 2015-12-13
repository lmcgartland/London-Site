jQuery(document).ready(function(){
	$('#scene').parallax({
		relativeInput: true,
		clipRelativeInput: true,
		invertY: true
	});

	$("#display-1").click(function(){
		$("#ov-1").animate({"margin-top": "0vh"});
		$("#oc-1").animate({"visibility": "visible"});
	});
	$("#display-2").click(function(){
		$("#ov-1").animate({"margin-top": "0vh"});
		$("#oc-2").animate({"visibility": "visible"});
	});
	$("#ov-1").click(function(){
		$("#ov-1").animate({"margin-top": "100vh"});
		$(".overlay-content").animate({"visibility": "hidden"});
	});

	(function() {
		var storefront = new Storefront($('.storefront'));
	})();
});

var zoomed = false;

function Storefront(el) {
	this.el = el;


	this.displays = $('.display');
	this.displayItems = $('.item');

	this.currentDisplay = this.displays[0];

	this._init();


};


Storefront.prototype._init = function() {


	var storefrontWidth = ($('.display').width()+100) * $('.display').size();//Took out the + 100 not sure why
	console.log($('.display').width());

	$('.storefront').width(storefrontWidth);
	$('.storefront').offset({ top: -100 });
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

				TweenMax.to(".storefront", 0.1, {
					z: 0,
					y: 0,
					ease: Linear
				});

				zoomed = false;
			}
			else {
		// $('.storefront').css({transform: 'translateZ(0px)'});
		// $('.storefront-wrapper').css({height: '600'});
		// $('.storefront').css('transform-origin', 'top '+$('.storefront-stage').scrollLeft() / $('.storefront').width());
		// 		$('.storefront').css({transform: 'scale(0.5,0.5)'});


		TweenMax.to(".storefront", 0.1, {
			z: -100,
			y: 0,
			ease: Linear
		});

		zoomed = true;

	}

});


