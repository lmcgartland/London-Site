jQuery(document).ready(function(){
	var data;

	$.getJSON('data/travel_window_data.json', function(response){
		data = response;
	})
	.success(function() { 
		var template = $.templates("#layerTemplate");
		var htmlOutput = template.render(data);
		$("#scene").html(htmlOutput);
	});
});