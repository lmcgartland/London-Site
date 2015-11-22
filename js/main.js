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