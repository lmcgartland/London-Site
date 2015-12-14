jQuery(document).ready(function(){
	/*$('#scene').parallax({
		relativeInput: true,
		clipRelativeInput: true,
		invertY: true
	});*/

(function() {
	var storefront = new Storefront($('.storefront'));
})();
});

var zoomed = false;

function Storefront(el) {
	this.el = el;


	this.displays = $('.display');
	this.displayItems = $('.item');

	this.currentDisplayIndex = 0;
	this.lastDisplayIndex = 0;
	this._init();



};

$(window).load(function(){
	TweenMax.fromTo(".welcome-c-1", 0.75, {
		autoAlpha:1,
		x: -1000,
		y: -500,
		rotation: -50,
		ease: Cubic.easeOut
	}, {
		autoAlpha:1,
		x: -350,
		y: -230,
		rotation: -10,
		ease: Cubic.easeOut,
		delay: 0.5,
	});

		TweenMax.fromTo(".welcome-c-2", 0.9, {
		autoAlpha:1,
		x: 1000,
		y: -500,
		rotation: 30,
		ease: Cubic.easeOut
	}, {
		autoAlpha:1,
		x: -100,
		y: -50,
		rotation: 5,
		ease: Cubic.easeOut,
		delay: 0.7,
	});

});

	$(".welcome-card").click(function() {
	TweenMax.to(".welcome-c-1", 1.1, {
		autoAlpha:0,
		y: 500,
		rotation: -50,
		ease: Cubic.easeInOut,
				delay: 0.2

	});

		TweenMax.to(".welcome-c-2", 0.75, {
		autoAlpha:0,
		x: -100,
		y:700,
		rotation: 30,
		ease: Cubic.easeInOut
	});

		TweenMax.fromTo(".welcome-overlay", 0.9, {
		autoAlpha:1,
		ease: Cubic.easeInOut
	}, {
		autoAlpha:0,
		ease: Cubic.easeInOut,
		delay: 1.1
	});

	});



$(window).on('resize', function(){
	scaleWin();
});

$(".prev").click(function(){

	var tl = new TimelineLite();

	tl.to(this, 0.1, {
		x: -25,
		ease: Elastic.easeInOut
	}).to(this, 0.1, {
		x: 10,
		ease: Elastic.easeInOut,
	}).to(this, 0.1, {
		x: 0,
		ease: Elastic.easeInOut,
	});


});

$(".next").click(function(){

	var tl = new TimelineLite();

	tl.to(this, 0.1, {
		x: 25,
		ease: Elastic.easeInOut
	}).to(this, 0.1, {
		x: -10,
		ease: Elastic.easeInOut,
	}).to(this, 0.1, {
		x: 0,
		ease: Elastic.easeInOut,
	});


});


function scaleWin() {

	      var win = $(window); //this = window

      if (win.width() > 1500) {
      }
      else if (win.width() < 750)  {
      }
      else {
      $(".storefront-wrapper").css("transform","translateX(-50%) translateY(-48%) scale("+(win.width()/($(".storefront-wrapper").width()+800))+")");
      }
}






$(".layer-item").mouseenter( function(){
	var title = $(this).attr('data-title');

	$(".tooltip").html(title);

	TweenMax.to(".tooltip", 1, {
		autoAlpha:1,
		scale: 1,
		ease: Elastic.easeOut
	});

} ).mouseleave( function(){
	TweenMax.to(".tooltip", 0.2, {
		autoAlpha:0,
		scale: 0,
		ease: Cubic.easeIn
	});

} ).mousemove(function(e) {
	var mousex = e.pageX + 10; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip')
        .css({ top: mousey, left: mousex })
});



Storefront.prototype._init = function() {
	var storefront = this;

	var storefrontWidth = ($('.display').width()+100) * $('.display').length;//Took out the + 100 not sure why

	// $('.storefront').width(storefrontWidth);
	// $('.storefront').offset({ top: -100 });

	// toggleZoom();
	advance(); // initial advance for setup
	scaleWin();

	$(".layer-item-highlighted").hide();

	$(".layer-item[data-title]").css("pointer-events", "auto");

	$(".layer-item[data-title]").hover(function() {
		thisID = "#" + $(this).attr("id") + "_highlighted";
		console.log("Item with overlay-content attr moused over. ID: " + thisID);
		$(thisID).show();
	}, function() {
		thisID = "#" + $(this).attr("id") + "_highlighted";
		console.log("Item with overlay-content attr moused out. ID: " + thisID);
		$(thisID).hide();
	});


	/* Paging controls */

	$( "a.next" ).click(function() {
		goNext();
	});


	$( "a.prev" ).click(function() {
		goPrev();
	});

	$( "g.indicator-group circle" ).click(function() {
		storefront.lastDisplayIndex = storefront.currentDisplayIndex;
		storefront.currentDisplayIndex = $("g.indicator-group circle").index(this);
		advance();
	});

	$("body").keydown(function(e) {
	  if(e.keyCode == 37) { // left
	  	goPrev();
	  }
	  else if(e.keyCode == 39) { // right
	  	goNext();
	  }
	  else if(e.keyCode == 32) { // space`
	  	toggleZoom();
	  }
	});

	$( "a.zoom" ).click(function() {
		toggleZoom();
	});

	function goPrev() {
		storefront.lastDisplayIndex = storefront.currentDisplayIndex;
		if(storefront.currentDisplayIndex > 0) storefront.currentDisplayIndex--;
		// if(storefront.currentDisplayIndex+1 > 0) $(".prev").addClass("disabled");
		// else $(".prev").removeClass("disabled");
		advance();
	}	

	function goNext() {
		storefront.lastDisplayIndex = storefront.currentDisplayIndex;
		if(storefront.currentDisplayIndex < storefront.displays.length-1) storefront.currentDisplayIndex++;
		// if(storefront.currentDisplayIndex+1 <0) $(".next").addClass("disabled");
		// else $(".next").removeClass("disabled");
		advance();
	}	

	function advance() {
		console.log("Advancing to slide "+(storefront.currentDisplayIndex+1)+" of "+storefront.displays.length);

		$("g.indicator-group circle:nth-child("+(storefront.lastDisplayIndex+1)+")").attr("class", "indicator");
		$("g.indicator-group circle:nth-child("+(storefront.currentDisplayIndex+1)+")").attr("class", "indicator active");

		var displayTitle = $(storefront.displays[storefront.currentDisplayIndex]).attr("data-title");
		var displayCreds = $(storefront.displays[storefront.currentDisplayIndex]).attr("creds");

		$("h2.display-title").html(displayTitle);
		$("span.display-creds").html(displayCreds);


		TweenMax.to(".storefront", 0.4, {
			x: -$(storefront.displays[storefront.currentDisplayIndex]).width()*storefront.currentDisplayIndex, 
			ease: Quad.easeInOut
		});
	}

	function toggleZoom() {
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
			y: 0,
			ease: Quad.easeInOut
		});

		zoomed = true;

	}
}

};






