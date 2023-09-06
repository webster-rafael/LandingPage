(function($) {
    'use strict';

    /* popup media */
    $('.has-popup-media').magnificPopup({
        type: 'inline',
        overflowY: 'auto',
        closeBtnInside: true,
        mainClass: 'popup-box-inline',
        callbacks: {
            elementParse: function(item) {
                // Function will fire for each target element
                // "item.el" is a target DOM element (if present)
                // "item.src" is a source that you may modify

                var item_id = item.src.replace('#popup-', '');

                $.ajax({
                    url: portfolio_ajax_loading_data.url,
                    type: 'POST',
                    data: 'action=portfolio_popup&post_id=' + item_id,
                    success: function(html) {
                        $(item.src + ' .content').html(html);
                    }
                });
            },
            open: function() {

            }
        }
    });

})(jQuery);