$prefix = require('../defs/prefix.json');
$config = require('../defs/lux.json');
$cache  = {}

/* /////////////////////////////////////////////////////////////////////////// */


// function parseConfigKey( param ){
//   let key;
//   let split  = param.split('_');
//   let lookup = split[0];
//   key = ( lookup in $config ? lookup : lookup in $prefix ? $prefix[lookup] : null );
//   return key;
// }


function parseConfigKey( param ){
  let $key, $val, $this;
  let split = param.split('_');
  let lookup = split[0];

  if( lookup === param ){
    $key   = lookup
    $val   = $config[lookup] || null;
    if( $val ) $key = `$local_${$key}`;
  }else{
    $key   = param.substring(param.indexOf('_')+1)
    pre    = $prefix[lookup];
    lookup = pre || lookup;
    $this  = $config[lookup] || null;
    $val   = $this && $this[$key];  
    if( pre ) $key = `$local_${pre}_${$key}`;
  }

  return ( $val === null ) ? null : { key:$key, val:$val };
}



/* /////////////////////////////////////////////////////////////////////////// */
console.log('# PLUGIN LOAD-CONF ~ loads vars from user config file #');

const plugin = (vars) => {

  return function(stylus){

    let localConf = stylus.options.globals['$var_conf_path'].val;

    if( localConf ){
      let data = require(localConf);
      $cache = Object.assign(data, $cache);

      for(let u in $cache){
        let res = parseConfigKey(u);
        if( res === null ){
          let key = `$user_${u}`
          stylus.define(key, $cache[u]) //load unknown keys as $var_user_ keys
        }else{
          console.log("exists key => ", u,res.key)
          let key = res.key
          stylus.define(key, $cache[u]) 
        }        
      }

      //console.log($cache)
      stylus.define("mycache", $cache, true) 
    }

  };

};

module.exports = plugin;
module.exports.path = __dirname;

/* /////////////////////////////////////////////////////////////////////////// */


