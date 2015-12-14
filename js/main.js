jQuery(document).ready(function(){
	/*$('#scene').parallax({
		relativeInput: true,
		clipRelativeInput: true,
		invertY: true
	});*/

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

	this.currentDisplayIndex = 0;
	this.lastDisplayIndex = 0;
	this._init();



};

$(window).on('resize', function(){
	scaleWin();
});


function scaleWin() {
    var win = $(window); //this = window

    if (win.width() > 1500) {
    }
    else if (win.width() < 750)  {
    }
    else {
    	$(".storefront-wrapper").css("transform","translateX(-50%) translateY(-48%) scale("+(win.width()/($(".storefront-wrapper").width()+438))+")");
    }
}



Storefront.prototype._init = function() {
	var storefront = this;

	var storefrontWidth = ($('.display').width()+100) * $('.display').length;//Took out the + 100 not sure why

	// $('.storefront').width(storefrontWidth);
	// $('.storefront').offset({ top: -100 });

	// toggleZoom();
	advance(); // initial advance for setup
	scaleWin();

	$(".layer-item-highlighted").hide();

	$(".layer-item[title]").css("pointer-events", "auto");

	$(".layer-item[title]").hover(function() {
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
		advance();
	}	

	function goNext() {
		storefront.lastDisplayIndex = storefront.currentDisplayIndex;
		if(storefront.currentDisplayIndex < storefront.displays.length-1) storefront.currentDisplayIndex++;
		advance();
	}	

	function advance() {
		console.log("Advancing to slide "+(storefront.currentDisplayIndex+1)+" of "+storefront.displays.length);

		$("g.indicator-group circle:nth-child("+(storefront.lastDisplayIndex+1)+")").attr("class", "indicator");
		$("g.indicator-group circle:nth-child("+(storefront.currentDisplayIndex+1)+")").attr("class", "indicator active");

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






