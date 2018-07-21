
;(function(w, d, $){

"use strict";


  let Lux = ( $.Lux || w.lux || {} );
  let FX  = ( Lux.fx || {} );

  Lux.sheets = {};

  const linkScript = ( ref ) => {
    return new Promise((resolve, reject) => {
      const script = d.createElement('script');
      script.async = true;
      script.src = src;
      script.addEventListener('load', resolve);
      script.addEventListener('error', () => reject('Error loading script.'));
      script.addEventListener('abort', () => reject('Script loading aborted.'));
      fragment = d.createDocumentFragment();
      fragment.appendChild(l);
      d.head.appendChild(script);
    });
  };

  const linkSheet = ( ref ) => {
    let name, l, fragment, h=d.head;
    name = ref && ref.replace(/^.*[\\\/]/, '').replace('.css','');
    l = d.createElement('link');
    l.setAttribute('rel','stylesheet');
    l.setAttribute('type','text/css');
    l.setAttribute('id', 'stylesheet-'+name );
    l.setAttribute('href', u );
    fragment = d.createDocumentFragment();
    fragment.appendChild(l);
    h.appendChild(fragment);
    return l;
  };


  const unloadSheet = ( ref ) => {
    let sheet = findSheet( ref );
    if( sheet ){
      let head = d.head;
      head.removeChild( sheet );
      return sheet;
    }
    return false;
  };


  const toggleSheet = ( ref, state ) => {
    let sheet = findSheet( ref );
    //console.log('find sheet?', ref, sheet );
    if( sheet ){
      sheet.disabled = ( typeof state != 'undefined' ) || !(sheet.disabled);
      //console.log( ref, sheet.disabled, 'toggle');
      return sheet.disabled;
    }
    return false;
  };


  const findSheet = ( ref ) => {
    let el = d.getElementById( ref );

    if( el ) return el;

    //unload by href
    let sheets = d.styleSheets;
    console.log( "find", sheets );


    for( let i=0; i < sheets.length; i++ ){
      let sheet = sheets[i];
      let href  = sheets[i].href;

      console.log( "find", i, href );
      let [ file, name, prefix ] = parseRefName( href );

      //console.log( href, file, typeof sheet, ref);

      if( sheet instanceof StyleSheet && ( ref === name || ref === file || ref === prefix + '/' + file ) ){
        //console.log( href, file );
        return ( sheet.owningElement || sheet.ownerNode || false );
      }
    }

    return false;
  }



  const getSheets = ( list =  w.csslist ) => {
      let sheets = d.styleSheets;
      let res = [];

      if( list ){
        //console.info("CSS List", list );
        list = list.slice(0); //clone to prevent splice from deleting vals
      }else{
        console.warn('not found csslist', list );
      }

      for( let i in sheets ){
        let sheet = sheets[i];
        if( sheet instanceof StyleSheet ){

          let href = sheets[i].href;

          if( href ){
            let [ file, name, prefix ] = parseRefName( href );
            let node = ( sheet.owningElement || sheet.ownerNode || null );
            let id   = node && node.id || null;
            name = id ? id : name;

            if( list ){
              if( prefix ) file = prefix + '/' + file;
              let idx = list.indexOf(file);

              //console.log( prefix, idx, file, href );

              list.splice(idx,1);
            }

            let data = {
              el     : node,
              id     : id,
              index  : parseInt(i),
              file   : file,
              name   : name,
              href   : href,
              active : !sheet.disabled,
              loaded : true,
              locked : ( node.dataset['locked'] == 'true' )
            };

            res.push( data );
            Lux.sheets[ name ] = data.index;
          }

        }
      }

      if( list ){
        let offset = parseInt(res.length);
        for( let i in list ){
          let [ file, name, prefix ] = parseRefName( list[i] );
          let data = {
            el     : null,
            id     : null,
            index  : parseInt(i) + offset,
            file   : file,
            name   : name,
            href   : '/res/css/' + file,
            active : false,
            loaded : false,
            locked : false
          };
          res.push( data );
          Lux.sheets[ name ] = data.index;
        }
      }


      return res;

  }


  let base ='/res/css/'

  //two possible name patterns
  const parseRefName = ( href ) =>{

    if( ! href ) return false;
    let prefix, count = (href.match(/[\/]/g) || []).length;
    let idx = href.lastIndexOf(base);

    //split on base if found href is prefix/file
    if( idx >= 0 ){
      prefix = href.split(base);
      href = prefix[1];
    }

    idx = href.lastIndexOf('/');

    //should be ih module formart now
    if( idx >= 0 ){
      prefix = href.split('/');
      prefix = prefix[0];
    }else{
      prefix = null;
    }

    let file = href && href.replace(/^.*[\\\/]/, '') || false;
    let name = file && file.replace('.css','').replace('.','_') || null;

    //console.log("result", file, name, prefix);

    return [ file, name, prefix ];
  }




  const appendStyle = ( scope ) => {
    // Create a new stylesheet in the bottom
    // of <head>, where the css rules will go
    let style = d.createElement('style');
    let h = d.head;
    h.appendChild(style);

    let stylesheet = style.sheet;
    scope.css = function (selector, property, value) {
      // Append the rule (Major browsers)
      try {
        stylesheet.insertRule( selector + '{'+property+':'+value+'}', stylesheet.cssRules.length );
      } catch(err) {try { stylesheet.addRule(selector, property+':'+value); // (pre IE9)
      } catch(err) {console.log("Couldn't add style");}} // (alien browsers)
    }

  }


  //console.info(d.styleSheets);

  FX = {
    sheets : Lux.sheets,
    tsh : toggleSheet,
    lsh : linkSheet,
    ush : unloadSheet,
    fsh : findSheet,
    get : getSheets,
    appendStyle : appendStyle,
    toggleSheet : toggleSheet,
    linkSheet : linkSheet,
    unloadSheet : unloadSheet,
    findSheet : findSheet,
    appendStyle : appendStyle,
    getSheets : getSheets
  };

  $.Lux = Lux;
  $.Lux.fx = Object.assign(FX,$.Lux.fx);

})(window, document, jQuery);


//console.warn($.Lux.fx);
