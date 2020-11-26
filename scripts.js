jQuery(function($) {
	$('#urban').addClass('active');

	// update the footer and sidebar
	function updateFooter(contentType) {
		if (contentType.indexOf('environmental') > -1) {
			$('.gs-footer__wrapper[data-type="environmental"]').show();
			$('.gs-footer__wrapper[data-type="urban-rural"]').hide();
		} else {
			$('.gs-footer__wrapper[data-type="environmental"]').hide();
			$('.gs-footer__wrapper[data-type="urban-rural"]').show();
		}
	}

	function updateLegend(contentType, subTitle) {
		// update subtitle
		$('.gs-header__legend-subtitle span').text(subTitle);
		
		// update text 
		$('.gs-header__legend-text').removeClass('active');
		$('.gs-header__legend-text[data-type='+contentType+']').addClass('active');

		// toggle icon and subtitle visibility 
		if (contentType.indexOf('urban') > -1) {
			$('.gs-header__legend-key').css('visibility', 'visible');
			$('.gs-header__legend-subtitle').css('visibility', 'visible');
		}

		if (contentType.indexOf('rural') > -1) {
			$('.gs-header__legend-key').css('visibility', 'hidden');
			$('.gs-header__legend-subtitle').css('visibility', 'visible');
		}
		if (contentType.indexOf('environmental') > -1) {
			$('.gs-header__legend-key').css('visibility', 'hidden');
			$('.gs-header__legend-subtitle').css('visibility', 'hidden');
		}
	}

	function updateMapColor(climateScenario) {
		var color = "#fff"
		if (climateScenario === 'dry') {
			color = "#ffffcc";
		}
		if (climateScenario === 'worst') {
			color = "#ffcc99";
		}
		$('#map').css('fill', color);
	}

	// activate buttons
	$('.gs-header__btn').on('click', function() {
	
		var useType = $(this).data('use');
		var buttonTitle = $(this).text();
		var contentType = $(this).data('type');
		var climateScenario = $(this).data('climate');

		var isUseButton = $(this).data('use') !== undefined;
		var parentUseActive = $(this).parent().prev().find('.gs-header__btn').hasClass('active');
		
		if (isUseButton) {
			// update active use button
			$('.gs-header__btn').removeClass('active');
			$(this).addClass('active');

			// update active map layer
			var mapLayer = '#' + useType;
			$('#layers').children().removeClass('active');
			$(mapLayer).addClass('active');

			// set default climate scenario and map color
			$(this).parent().next().find('.gs-header__btn').first().addClass('active');
			$('#map').css('fill', '#fff');

			// update legend title 
			$('.gs-header__legend-title span').text(buttonTitle);

			// show/hide legend and footer sections
			updateLegend(contentType, buttonTitle);
			updateFooter(contentType);
			
		} else {
			if (parentUseActive) {
				// update active climate scenario button
				$(this).siblings().removeClass('active');
				$(this).addClass('active');

				// update base map color
				updateMapColor(climateScenario);

				// update legend 
				updateLegend(contentType, buttonTitle);


			} else {
				// update active use button to parent use
				$('.gs-header__btn').removeClass('active');
				$(this).parent().prev().find('.gs-header__btn').addClass('active');
				$(this).addClass('active');

				// update active map layer
				var parentUseType =  $(this).parent().prev().find('.gs-header__btn').data('use');
				var mapLayer = '#' + parentUseType;
				$('#layers').children().removeClass('active');
				$(mapLayer).addClass('active');

				// update base map colour
				updateMapColor(climateScenario);

				// update legend title
				$('.gs-header__legend-title span').text($(this).parent().prev().find('.gs-header__btn').text());

				// show/hide legend sections
				updateLegend(contentType, buttonTitle);
				updateFooter(contentType);
			}
		}
	})
});
