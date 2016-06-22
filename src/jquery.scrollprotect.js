/**
 * Created by falk on 22.06.16.
 * https://github.com/daCyberpunk/scrollProtect
 *
 */
$.fn.extend({
    scrollProtect:function(params){
        var conf = {};
        $.extend(conf, params);
        return $(this).each(function(){
            var thiz = $(this),
                $body = $('body'),
                pointerEvent,
                overlay,
                overlayInfo,
                dragging;
            /*ios hack*/
            dragging = false;
            $body.on("touchmove", function(){
                dragging = true;
            });
            $body.on("touchstart", function(){
                dragging = false;
            });
            thiz.css('position','relative');
            overlay = $('<div class="scroll-protect-overlay"></div>').prependTo(thiz);
            overlayInfo = $('<div class="scroll-protect-info"><p>Klicken für interaktive Funktionen</p></div>').prependTo(thiz);
            overlay.css({
                height: '100%',
                width: '100%',
                position: 'absolute',
                'z-index': 9999
            });
            overlayInfo.css({
                position: 'absolute',
                'z-index': 99,
                width: '100%',
                'text-align': 'center',
                padding: '10px'
            });
            overlayInfo.find('p').css({
                'background-color':'white',
                display: 'inline',
                padding: '10'
            });
            overlay.on('click touch touchend', function () {
                if (dragging) return;
                overlay.css('pointerEvents', 'none');
                pointerEvent = false;
                overlayInfo.hide();
            });
            $body.on('click touch touchstart', function (e) {
                if($(e.target).closest(thiz).length == 0 && pointerEvent === false) {
                    overlay.css('pointerEvents', 'auto');
                    pointerEvent = true;
                    overlayInfo.show();
                }
            });

        });
    }
});