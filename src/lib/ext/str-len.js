




//debug = console.log

//that=this;

//console.log(global.debug)



module.exports = () => {


  return function(stylus){
    //console.log($config.init);
    //
    stylus.define('fx_str_len', function(str) {
      return str.val.length;
    });

    stylus.define('fx_debug', function(...$vars) {
      console.log( $vars.map( arg => arg.val ) );      
    });

  };


};
