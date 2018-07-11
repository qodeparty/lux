$prefix = require('../defs/prefix.json');
$config = require('../defs/lux.json');
$user   = {}

/* /////////////////////////////////////////////////////////////////////////// */


function parseConfigKey( param ){
  let key;
  let split  = param.split('_');
  let lookup = split[0];
  key = ( lookup in $config ? lookup : lookup in $prefix ? $prefix[lookup] : null );
  return key;
}

/* /////////////////////////////////////////////////////////////////////////// */


const plugin = (vars) => {

  return function(stylus){



    let localConf = stylus.options.globals['$var_local_conf_path'].val;

    if( localConf ){ 
      let data = require(localConf);
      $user = Object.assign(data, $user);

      for(let u in $user){
        let key = parseConfigKey(u);
        if( key === null ){
          key = `$var_user_${u}`
          stylus.define(key, $user[u]) //load unknown keys as $var_user_ keys
        }
        //console.log(u,key,typeof key)
      }

      //console.log($user)
    }

    $my = 'banana';
    stylus.define('myvar', $my);


  };

};

module.exports = plugin;
module.exports.path = __dirname;

/* /////////////////////////////////////////////////////////////////////////// */

