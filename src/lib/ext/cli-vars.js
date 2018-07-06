module.exports = (vars) => {

  return function(stylus){

    for (var name in vars) {

      if( name.indexOf('lux_') >= 0 ){

        let varname = name.replace('lux_','$var_');
        console.log(varname, vars[name]);
        stylus.define(varname, vars[name]);
      }

    }
    
  };
};

