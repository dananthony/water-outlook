jQuery(function($) {
	$('#urban').addClass('active');

	// activate buttons
	$('.gs-controls__btn').on('click', function() {
		var mapLayer = '#' + $(this).data('type');
		// activate map layer
		$('#layers').children().removeClass('active');
		$(mapLayer).addClass('active');
		if ($(this).hasClass('primary')) {
			$('.gs-controls__btn').removeClass('active');
			$(this).addClass('active');
			$(this).parent().next().find('.gs-controls__btn').first().addClass('active');

		} else {
			if ($(this).parent().prev().find('.gs-controls__btn').hasClass('active')) {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
			} else {
				$('.gs-controls__btn').removeClass('active');
				$(this).parent().prev().find('.gs-controls__btn').addClass('active');
				$(this).addClass('active');
			}
		}
	})
});
