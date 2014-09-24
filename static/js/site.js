(function($) {

// Image Slider
	$("#imageCompare1, #imageCompare2, #imageCompare3, #imageCompare4, #imageCompare5, #imageCompare6, #imageCompare7").twentytwenty({default_offset_pct: .5});

// Nav scroll spy
	$('body').scrollspy({ target: '.wms-nav-container', offset: 130 });

// body padding when fixed navbar
	if($("#mainNav").hasClass('affix')) 
		{
			$("body").css('padding-top', '50px');
		}

})($);