(function($) {

// Image Slider
	$("#imageCompare1, #imageCompare2, #imageCompare3, #imageCompare4, #imageCompare5, #imageCompare6, #imageCompare7").twentytwenty({default_offset_pct: .5});

// Nav scroll spy
	$('body').scrollspy({ target: '.wms-nav-container', offset: 130 });

// Tool Tip
	$('.copy-tip').tooltip({'placement': 'top'});
	$('.wms-tip').tooltip({'placement': 'bottom'});

// body padding when fixed navbar
	// if($("#mainNav").hasClass('affix')) 
	// 	{
	// 		$("body").css('padding-top', '50px');
	// 	}

$().ready(function() {
  $("a[href^='\#']").each(function(){ 
    this.href=location.href.split("#")[0]+'#'+this.href.substr(this.href.indexOf('#')+1);
  });
});

})($);