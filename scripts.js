jQuery(function($) {
	$('#urban').addClass('active');

	// activate buttons
	$('.gs-controls__btn').on('click', function() {
	
		var useType = $(this).data('use');
		var isUseButton = $(this).data('use') !== undefined;
		var parentUseActive = $(this).parent().prev().find('.gs-controls__btn').hasClass('active');

		if (isUseButton) {
			// update active use button
			$('.gs-controls__btn').removeClass('active');
			$(this).addClass('active');

			// update active map layer
			var mapLayer = '#' + useType;
			$('#layers').children().removeClass('active');
			$(mapLayer).addClass('active');

			// set default climate scenario
			$(this).parent().next().find('.gs-controls__btn').first().addClass('active');
			$('#map').css('fill', '#fff');

		} else {
			if (parentUseActive) {
				// update active climate scenario button
				$(this).siblings().removeClass('active');
				$(this).addClass('active');

				// update base map color
				var climateScenario = $(this).data('climate');
				var color = "#fff"
				if (climateScenario === 'dry') {
					color = "#ffffcc";
				}
				if (climateScenario === 'worst') {
					color = "#ffcc99";
				}
				$('#map').css('fill', color);

			} else {
				// update active use button to parent use
				$('.gs-controls__btn').removeClass('active');
				$(this).parent().prev().find('.gs-controls__btn').addClass('active');
				$(this).addClass('active');

				// update active map layer
				var parentUseType =  $(this).parent().prev().find('.gs-controls__btn').data('use');
				var mapLayer = '#' + parentUseType;
				$('#layers').children().removeClass('active');
				$(mapLayer).addClass('active');

				// update base map colour
				var climateScenario = $(this).data('climate');
				var color = "#fff"
				if (climateScenario === 'dry') {
					color = "#ffffcc";
				}
				if (climateScenario === 'worst') {
					color = "#ffcc99";
				}
				$('#map').css('fill', color);
			}
		}
	})
});
