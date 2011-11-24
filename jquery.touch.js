/*! Copyright (c) 2009 Brandon Aaron (http://brandonaaron.net)
 *  Copyright (c) 2011 Takashi Okamoto
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * This plugin is developed under GitHub:
 *
 *  https://github.com/okamototk/jquery-touch-plugin
 * 
 * Version: 0.9.0
 * 
 * Requires: 1.2.2+
 */

(function($) {
/** for gesturechange **/
$.event.special.gesturechange = {
	setup: function() {
		if ( this.addEventListener )
			this.addEventListener( 'gesturechange', handler, false );
		else
			this.ongesturechange = handler;
	},
	
	teardown: function() {
		if ( this.removeEventListener )
			this.removeEventListener( 'gesturechange', handler, false );
		else
			this.ongesturechange = null;
	}
};

$.fn.extend({
	gesturechange: function(fn) {
		return fn ? this.bind("gesturechange", fn) : this.trigger("gesturechange");
	},
	
	ungesturechange: function(fn) {
		return this.unbind("gesturechange", fn);
	}
});


function handler(event) {
	var args = [].slice.call( arguments, 1 );
	event = $.event.fix(event || window.event);
	event.type = "gesturechange";
	args.unshift(event, {scale:event.scale, rotation:event.rotation});
	return $.event.handle.apply(this, args);
}

/** for touchmove **/
$.event.special.touchmove = {
	setup: function() {
		if ( this.addEventListener )
			this.addEventListener( 'touchmove', handler, false );
		else
			this.ontouchmove = handler;
	},
	
	teardown: function() {
		if ( this.removeEventListener )
			this.removeEventListener( 'touchmove', handler, false );
		else
			this.ongesturechange = null;
	}
};

$.fn.extend({
	gesturechange: function(fn) {
		return fn ? this.bind("touchmove", fn) : this.trigger("touchmove");
	},
	
	ungesturechange: function(fn) {
		return this.unbind("touchmove", fn);
	}
});


function handler(event) {
	var args = [].slice.call( arguments, 1 );
	event = $.event.fix(event || window.event);
	event.type = "touchmove";
	args.unshift(event, {scale:event.scale,rotation:event.rotation,touches:event.touches,targetTouches:event.targetTouches,changedTouches:event.changedTouched});
	return $.event.handle.apply(this, args);
}

})(jQuery);