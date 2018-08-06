/* //////////////////////////////////////////////////////////////////////////////
 Lux Stylus Plugin - PreVars
////////////////////////////////////////////////////////////////////////////// */

const plugin = (vars) => {
  return function(stylus){

    stylus.include(__dirname);
    //console.log( stylus );

    for (var name in vars) {
      if( name.indexOf('lux_') >= 0 ){
        let varname = name.replace('lux_','$var_');
        //console.log(varname, vars[name]);
        stylus.define(varname, vars[name]);
      }
    }
  };
};

module.exports = plugin;
module.exports.path = __dirname;
