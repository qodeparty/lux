;(function(w, d, $, preload){

  "use strict";
  let Lux = ( $.Lux || w.lux || {} );
  let FX  = ( Lux.fx || {} );

 //////////////////////////////////////////////////////////

 	function luxKey(key){
 		return 'lux_' + key;
 	}

 	function store_save(key,val){
 		localStorage.setItem(luxKey(key),val);
 	}

 	function store_load(key){
 		return localStorage.getItem(luxKey(key));
 	}

 	function store_delete(key){
 		localStorage.removeItem(luxKey(key));
 	}

 	function store_clear(){
 		localStorage.clear();
 	}

 //////////////////////////////////////////////////////////

  FX.store_save   = store_save;
  FX.store_load   = store_load;
  FX.store_delete = store_delete;
  FX.store_clear  = store_clear;

 //////////////////////////////////////////////////////////

  $.Lux = Lux;
  $.Lux.fx = FX;

})(window, document, jQuery, preloadScripts);
