
//check to see if dashboard element exists, otherwise its probably an adapter page

let dash = document.getElementById('dashboard');

const preloadScripts=['res/js/lux-meta','res/js/lux-helper','res/js/lux-gx','res/js/lux-sheets'];
      preloadScripts.push( !dash ? 'res/js/lux-adapter' : 'res/js/lux-dashboard' );



//console.warn(preloadScripts);
 ////////////////////////////////////////////////////////////////////////////////////////

;(function(w, d, $, preload){

  "use strict";
  let Lux = ( $.Lux || w.lux || {} );
  let FX  = ( Lux.fx || {} );

  Lux.events  = {};
  Lux.scripts = {};
  Lux.sheets  = {};

  const baseURL = w.location.origin +'/';


 //////////////////////////////////////////////////////////


  function cacheBuster( file, id ){
    let buster = id || ""+ new Date().valueOf();
    if(file){
      file=file.split('?')[0];
      file+=`?cache=${buster}`;
      console.info(file)
    }else{
      file=`?cache=${buster}`;
    }
    return file;
  }

 //////////////////////////////////////////////////////////

  const ScriptLoadEvent = new Event('scriptload',{bubbles:true});

  Lux.events['scriptload'] = ScriptLoadEvent;

  function indexOfScript( href ){
    let scripts = Array.from(d.scripts);
    for(let i in scripts){
      let script = scripts[i];
          script = script.src.split('?')[0];
      if( script.split(baseURL)[1] === href ){
        console.warn("Already loaded",href);
        return i;
      }
    }
    return -1;
  }

  function createScript( href, res, err ){
    let cached   = cacheBuster();
    let id       = 'cache'+cached.split('=')[1];
    let script   = d.createElement('script');
    script.async = true;
    script.src   = href + cached;
    script.type  = 'text/javascript';
    script.id    = id;
    script.addEventListener('load', (e) => {
      ScriptLoadEvent.detail={src:href,id:id};
      d.dispatchEvent(ScriptLoadEvent);
      if(res) res(e);
    });
    script.addEventListener('error', () => err && err('Error loading script.'));
    script.addEventListener('abort', () => err && err('Script loading aborted.'));
    return script;
  }

  function attachScript( script, head=false ){
    if(head){
      let fragment = d.createDocumentFragment();
      fragment.appendChild(script);
      d.head.appendChild(fragment);
    }else{
      let el = d.getElementById('luxloader');
      el && el.insertAdjacentElement('afterend',script);
    }
    return script;
  }


  function loadScript( href ){
    if(!href) throw ('Missing File Name');
    if( Lux.scripts[href] ){
      throw("Script already loaded >" + href);
    }else{
      return new Promise( (res, err) => {
        let el = attachScript( createScript( href, res, err ) );
      }).catch(err=>{
         console.error('RequireError:',err);
      });
    }
  }


  function requireScripts(){
    let files   = Array.from(arguments);
    //console.info(files);
    let promise = loadScript(files.pop());
    if(promise)
      files.forEach((file)=>{
        promise = promise.then(loadScript(file));
      });
      //promise.finally(()=>{console.log('done loading')})
    return promise;
  }

  d.addEventListener('scriptload', function (e) {
    //console.info('scriptload event', e.detail);
    Lux.scripts[ e.detail.src ] = e.detail;
    //console.info(Lux.scripts);
  }, false);

 //////////////////////////////////////////////////////////



 //////////////////////////////////////////////////////////

  preload = Array.from(preload);
  preload = preload.map(el=>baseURL + el+'.js');
  let promise = requireScripts.apply(this,preload);


 //////////////////////////////////////////////////////////

  FX.cacheBuster = cacheBuster;
  FX.loadScript  = loadScript;
  FX.require     = requireScripts;

  $.Lux = Lux;
  $.Lux.fx = FX;

})(window, document, jQuery, preloadScripts);

if(typeof Vue!='undefined'){ Vue.config.productionTip = false; }

//console.info($.Lux.fx);


