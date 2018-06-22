$prefix = require('../defs/prefix.json');
$config = require('../defs/config.json');
$flags  = $config['flags'];




keys = Object.keys($config)



module.exports = () => {


  return function(stylus){

    stylus.define('fx_get_config', function(param){

      let split  = param.val.split('_');

      let lookup = split[0];
      let key    = split[1];
          lookup = $prefix[lookup] || lookup;
      let $this  = $config[lookup] || null;
      let $val   = $this[key];

      if(typeof $val == 'undefined' ) throw new Error('Invalid config key: ' + param);

      return ($val || null); 

    });

    stylus.define('devices', function(id) {
      d = $config['devices'].vals[ id.val ];
      return d; 
    });

  };

};
