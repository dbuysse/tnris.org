(function($) {
  'use strict';

  $(function() {

    //check for flash
    //if flash is available, the html tag will have 'flash' as a class
    // if not, the html tag will have 'no-flash' as a class
    $('html').addClass(typeof swfobject !== 'undefined' &&
      swfobject.getFlashPlayerVersion().major !== 0 ? 'flash' : 'no-flash'
    );


    // Nav scroll spy
    $('body').scrollspy({ target: '.wms-nav-container', offset: 130 });

    // Tool Tip
    $('.copy-tip').tooltip({'placement': 'top'});
    $('.wms-tip').tooltip({'placement': 'bottom'});

    //zclip + ZeroClipboard url copy buttons
    $('.copy-url-container').each(function (index, node) {
      var $node = node;
      var $btn = $('.copy-url-btn', $node);
      var origInner = $btn.html();
      var val = $('.copy-url-input', $node).val();

      if ($('html').hasClass('no-flash')) {
        $btn.css('visibility', 'hidden');
      }
      else {
        $btn.zclip({
          path: 'bower_components/jquery-zclip/ZeroClipboard.swf',
          copy: val,
          afterCopy: function () {
            $btn.html('Copied!');
            window.setTimeout(function () {
              $btn.html(origInner);
            }, 4000);
          }
        });
      }
    });


    $('.nav-cat').affix({
      offset: {
        top: function () {
          return (this.top = $('header').outerHeight(true));
        }
       }
    });

    $("a[href^='\#']").each(function(){
      this.href=location.href.split("#")[0]+'#'+this.href.substr(this.href.indexOf('#')+1);
    });

  });


  $(window).load(function() {
    // Image Slider
    $("#imageCompare1, #imageCompare2, #imageCompare3, #imageCompare4, #imageCompare5, #imageCompare6, #imageCompare7").twentytwenty({default_offset_pct: .5});
  });

})(jQuery);
