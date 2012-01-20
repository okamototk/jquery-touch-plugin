/*!
 * jQuery Touch Event Plugin 0.8
 * 
 * https://github.com/okamototk/jquery-touch-plugin
 *
 * Copyright 2012 Takashi Okamoto
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function($) {

  $.event.special.touchmove = {

    setup: function() {
      if ( this.addEventListener ){
        this.addEventListener( "touchmove", handler, false );
        this.addEventListener( "touchend", touchendHandler, false );
      } else {
        this.ontouchmove = handler;
      }
    },

    teardown: function() {
      if ( this.removeEventListener ) {
        this.removeEventListener( "touchmove", handler, false );
        this.removeEventListener( "touchend", touchendHandler, false );
      } else {
        this.ontouchmove = null;
      }
    }
    
  };

  function touchendHandler(event){
    _gestureInit = false;
  }

  var _scrLen = 0,_srcX,_srcY;
  var _gestureInit = false;

  function initGesture(e){
    _gestureInit = true;
    var x1 = e.touches[0].pageX;
    var y1 = e.touches[0].pageY;
    var x2 = e.touches[1].pageX;
    var y2 = e.touches[1].pageY;
    _srcX = x2-x1;
    _srcY = y2-y1;
    _srcLen = Math.sqrt(_srcX*_srcX+_srcY*_srcY);
  }

  function calcGesture(e){
    
    if(e.touches.length==2){
      if(!_gestureInit){
        initGesture(e);
      } else {
        var
          x1 = event.touches[0].pageX,
          y1 = event.touches[0].pageY,
          x2 = event.touches[1].pageX,
          y2 = event.touches[1].pageY,
          destX = x2-x1,
          destY = y2-y1,

        // calc scale
        destLen = Math.sqrt(destX*destX+destY*destY);
        e.scale = destLen / _srcLen;

        // calc rotation
        var
          ip = _srcX * destX + _srcY * destY, // innter product
          ep = _srcX * destY - _srcY * destX, // exterior product
          cos = ip / ( _srcLen * destLen ),
          sin = ep / ( _srcLen * destLen );
        if ( ip != 0 ){
          e.rotation = Math.atan( ep / ip ) * 360 / ( Math.PI * 2 );
        } else {
          e.rotation = 90;
        }
        if ( cos < 0 ) {
          if ( sin > 0 ) {
            e.rotation = e.rotation + 180;
          } else {
            e.rotation = e.rotation - 180;
          }
        }
        
      }
    }
  }

  function handler(event) {
    origEvent = event;
    event = $.event.fix( event || window.event );
    event.type = "touchmove";
    event.touches = origEvent.touches;
    
    if( typeof(origEvent.scale) === "undefined" ){
      calcGesture(event);
    } else {
      event.scale = origEvent.scale;
      event.rotation = origEvent.rotation;
    }

    var args = [this,event];
    args.unshift(event);
    return $.event.handle.apply(this, args);
  }

})(jQuery);
