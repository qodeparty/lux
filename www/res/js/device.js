 /* =========================================================
  Janky Device Detection Service
 * ========================================================= */
 var $body = $('body');

 function devCheck(){
    var build;
    var dev = getDevice();
    var dim = resizePort();
    var height = dim.h; 
    var width  = dim.w;
    if ( width === 480 ){ build='iphone4';  }
    if ( width === 568  || width === 320  ){ build='iphone5';  }
    if ( width === 1334 || width === 750  ){ build='iphone6';  } 
    if ( width === 1920 || width === 1080 ){ build='iphone6p';  }    
    if ( width === 519  || width === 360  ){ build='nexus5';   }
    if ( width === 601  || width === 906  ){ build='nexus7';   }
    build = build || 'desktop';
    $body.addClass( dev  );
    $('html').removeClass( 'nojs' );
    $('#device').html( build );
    screenUpdate();
 }

  function getDevice(){
    var ua = window.navigator.userAgent;
    if( ua.indexOf('Android') > -1 ) return 'android';
    if( ua.indexOf('iPod')  > -1 ) return 'iphone';
    return 'desktop';
  }

  function sensorUpdate(){
    var portrait = window.matchMedia("(orientation: portrait)");
    if( portrait.matches ){
      $body.addClass( '_op' ).removeClass( '_ol' );
      return 'portrait';
    }else{
      $body.addClass( '_ol' ).removeClass( '_op' );
      return 'landscape';
    }
  }

  function resizePort(){
    var sensor = sensorUpdate();
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height; 
    var width  = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    return { h:height, w:width, o:sensor };
  }

  function screenUpdate( event ) {
    var dim = resizePort();
    $('#resolution').text('Resolution is: ' + dim.h + 'x' + dim.w );
    $('#rotation').text('Device is in ' + (dim.o).toUpperCase() + ' mode!' );
  }

  var oc_timer;
  $(window).on( 'orientationchange resize' , function ( e ) {
      clearTimeout(oc_timer);
      oc_timer = setTimeout(function () {
          screenUpdate( e );
      }, 500);
  });

devCheck();
