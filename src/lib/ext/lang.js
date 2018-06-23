$lang = require('../defs/lang.json');

module.exports = () => {

  return function(stylus){
    //console.log($config.init);
    stylus.define('_', function(param) {
      let key   = param.val;
      let $val = $lang[ key ] || null;
      if(typeof $val === null ) throw new Error('Invalid lang key: ' + param);
      return $val;
    });
    
  };
};
