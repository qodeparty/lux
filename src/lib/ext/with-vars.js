

module.exports = () => {


  return function(stylus){

    stylus.define('fx_css_var', function(key,val,static) {

      return ( $flags && $flags['cssvars'] ?  "var(--"+key.val+")" : val.val )

    });
    
  };
};
