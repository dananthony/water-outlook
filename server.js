jQuery(function($) {
	$('#urban').addClass('active');
	$('.gs-map__marker [data-climate-scenario="average"]').addClass('active');
	$('.gs-map__marker').hide();
	$('.gs-map__marker[data-layer="urban"]').show();

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

	function updateIcons(climateScenario) {
		var greenIcon = './?a=502033';
		var yellowIcon = './?a=502035';
		var redIcon = './?a=502034';
		if (climateScenario === "average") {
			$('#barwon').attr('src', greenIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #00ae42');
			$('#east-gippsland').attr('src', greenIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #00ae42');
			$('#goulburn-valley').attr('src', greenIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #00ae42');
			$('#north-east').attr('src', greenIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #00ae42');
			$('#south-gippsland').attr('src', greenIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #00ae42');

		} 
		if (climateScenario === 'dry') {
			$('#barwon').attr('src', yellowIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #fed925');
			$('#east-gippsland').attr('src', redIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #b8232f');
			$('#goulburn-valley').attr('src', yellowIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #fed925');
			$('#north-east').attr('src', greenIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #00ae42');
			$('#south-gippsland').attr('src', greenIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #00ae42');
		}
		if (climateScenario === 'worst') {
			$('#barwon').attr('src', redIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #b8232f');
			$('#east-gippsland').attr('src', redIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #b8232f');
			$('#goulburn-valley').attr('src', yellowIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #fed925');
			$('#north-east').attr('src', yellowIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #fed925');
			$('#south-gippsland').attr('src', redIcon).siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #b8232f');
		}
	}

	// position points over map
	$('.gs-map__marker').each(function() {
		$(this).css({
			left: $(this).data('x') + '%',
			top: $(this).data('y') + '%'
		});
	});

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

			// update map data
			$('.gs-map__marker').hide();
			$('.gs-map__marker[data-layer="'+useType+'"]').show();

			// set default climate scenario and map color
			$(this).parent().next().find('.gs-header__btn').first().addClass('active');
			$('#map').css('fill', '#fff');

			// set default popup text
			$('.gs-map__marker-info-inner [data-climate-scenario="average"]').addClass('active').siblings().removeClass('active');

			// set default markers
			if (useType === "urban") {
				$('.gs-map__marker[data-layer="urban"] .gs-map__marker-icon').attr('src', './?a=502033').siblings('.gs-map__marker-info').children('.gs-map__marker-info-inner').css('border', '1px solid #00ae42');
			}
			
            // update subtitle
			$('.gs-header__legend-subtitle span').text($(this).parent().next().find('.gs-header__btn').first().text());

			// update legend title 
			$('.gs-header__legend-title span').text(buttonTitle);

			// show/hide legend and footer sections
			updateLegend(contentType, buttonTitle);
			updateFooter(contentType);
			
		} else {
            // update subtitle
            $('.gs-header__legend-subtitle span').text(buttonTitle);
            
			if (parentUseActive) {
				// update active climate scenario button
				$(this).siblings().removeClass('active');
				$(this).addClass('active');

				// update base map color
				updateMapColor(climateScenario);

				// update popup content
				var markerContent = $('.gs-map__marker-info-inner [data-climate-scenario="'+climateScenario+'"]');
				$(markerContent).addClass('active').siblings().removeClass('active');

				// update marker if urban 
				if (contentType.indexOf('urban') > -1) {
					updateIcons(climateScenario);
					if (climateScenario === "average") {
						$('#urban-map-images').show();
					} else {
						$('#urban-map-images').hide();
					}
				}

				// ide inactive rural markers and map illustrations 
				if (contentType.indexOf('rural') > -1) {
					if (climateScenario === "average") {
						$('#coliban, #grampians').show();
						$('#rural-map-images').show();
					} else {
						$('#coliban, #grampians').hide();
						$('#rural-map-images').hide();
					}
				}

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

				// update map data
				$('.gs-map__marker').hide();
				$('.gs-map__marker[data-layer="'+parentUseType+'"]').show();

				// update markers for urban climate scenarios 
				if (contentType.indexOf('urban') > -1) {
					updateIcons(climateScenario);
					if (climateScenario === "average") {
						$('#urban-map-images').show();
					} else {
						$('#urban-map-images').hide();
					}
				}

				// hide inactive rural markers and map illustrations 
				if (contentType.indexOf('rural') > -1) {
					if (climateScenario === "average") {
						$('#coliban, #grampians').show();
						$('#rural-map-images').show();
					} else {
						$('#coliban, #grampians').hide();
						$('#rural-map-images').hide();
					}
				}

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
