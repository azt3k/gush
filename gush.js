/**
 * Made awesome by AzT3k.
 */

;(function($, window, document, undefined) {

    "use strict"

    var pluginName = "gush",
        pluginVersion = "0.1.1",
        defaults = {
            x: true,
            y: true,
            start: {
                stopPropagation: false,
                preventDefault: false,
            },
            move: {
                stopPropagation: false,
                preventDefault: true
            }
        };

    function Plugin(element, options) {
        this.$element = $(element);
        this.settings = $.extend(true, {}, defaults, options);
        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var $elem = this.$element;

            // do the ua sniffing
            this.sniffUA();

            // do the bizzo
            if ($('html').is('.in-need-of-gush')) {
                $elem.addClass('gushing');
                this.touchScroll($elem[0]);
            }

        },

        sniffUA: function() {
            var ua = navigator.userAgent,
                is_android = /Android/.test(ua),
                is_chrome = /Chrome/.test(ua);

            // Android
            if (is_android && !is_chrome) {
                var res = ua.match(/Android ([^;]+)/),
                    v = parseFloat(res[1].split(' ').join('-'));

                if (res.length && v < 3)
                    $('html')
                        .addClass('in-need-of-gush')
                        .addClass('native-android')
                        .addClass('native-android-' + v);
            }
        },

        hasTouch: function() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },

        touchScroll: function (el) {
            if (this.hasTouch()) {
                var scrollStartLeft = 0,
                    scrollStartTop = 0,
                    conf = this.settings,
                    start = function(event) {
                        if (conf.x) scrollStartLeft = this.scrollLeft + event.touches[0].pageX;
                        if (conf.y) scrollStartTop = this.scrollTop + event.touches[0].pageY;
                        if (conf.start.preventDefault) event.preventDefault();
                        if (conf.start.stopPropagation) event.stopPropagation();
                    },
                    move = function(event) {
                        if (conf.x) this.scrollLeft = scrollStartLeft - event.touches[0].pageX;
                        if (conf.y) this.scrollTop = scrollStartTop - event.touches[0].pageY;
                        if (conf.move.preventDefault) event.preventDefault();
                        if (conf.move.stopPropagation) event.stopPropagation();
                    };

                this.handler.unbind(el, "touchstart", start);
                this.handler.bind(el, "touchstart", start);
                this.handler.unbind(el, "touchmove", move);
                this.handler.bind(el, "touchmove", move);
            }
        },

        handler: {
            bind:function(el, ev, fn){
                if(window.addEventListener){ // modern browsers including IE9+
                    el.addEventListener(ev, fn, false);
                } else if(window.attachEvent) { // IE8 and below
                    el.attachEvent('on' + ev, fn);
                } else {
                    el['on' + ev] = fn;
                }
            },

            unbind:function(el, ev, fn){
                if(window.removeEventListener){
                    el.removeEventListener(ev, fn, false);
                } else if(window.detachEvent) {
                    el.detachEvent('on' + ev, fn);
                } else {
                    elem['on' + ev] = null;
                }
            },

            stop:function(ev) {
                var e = ev || window.event;
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();
            }
        }

    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
