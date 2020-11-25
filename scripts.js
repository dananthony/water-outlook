jQuery(function($) {
	$('#urban').addClass('active');

	// activate buttons
	$('.gs-header__btn').on('click', function() {
	
		var useType = $(this).data('use');
		var contentType = $(this).data('type');
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

			// set default climate scenario
			$(this).parent().next().find('.gs-header__btn').first().addClass('active');
			$('#map').css('fill', '#fff');

			// update legend title
			$('.gs-header__legend-title span').text($(this).text());

			// set default legend text
			$('.gs-header__legend-text').removeClass('active');
			$('.gs-header__legend-text[data-type='+contentType+']').addClass('active');

			// show/hide legend sections
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

				// update legend subtitle
				$('.gs-header__legend-subtitle span').text($(this).text());

				// update legend text
				$('.gs-header__legend-text').removeClass('active');
				$('.gs-header__legend-text[data-type='+contentType+']').addClass('active');

				// show/hide legend sections
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
				var climateScenario = $(this).data('climate');
				var color = "#fff"
				if (climateScenario === 'dry') {
					color = "#ffffcc";
				}
				if (climateScenario === 'worst') {
					color = "#ffcc99";
				}
				$('#map').css('fill', color);

				// update legend title
				$('.gs-header__legend-title span').text($(this).parent().prev().find('.gs-header__btn').text());

				// update legend subtitle
				$('.gs-header__legend-subtitle span').text($(this).text());

				// show/hide legend sections
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
		}
	})
});
