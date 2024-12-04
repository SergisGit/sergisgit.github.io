(function () {
  'use strict';

    //appear

    var  appearItem = $('.js-appear');
    if (appearItem.length) {
      appearItem.appear({force_process: true});
  
      appearItem.on('appear', function () {
        var thisItem = $(this);
        window.requestAnimationFrame(function() {
          thisItem.addClass('on-appear');
        });
      });

      window.scrollBy(0,1);
      window.scrollBy(0,-1);
    }

})();