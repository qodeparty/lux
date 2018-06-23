
$flags  = $config['flags'];


module.exports = () => {


  return function(stylus){

    stylus.define('fx_css_var', function(key,val,static){
      return ( $flags && $flags['cssvars'] ?  "var(--"+key.val+")" : val.val )
    });
    

    stylus.define('fx_css_canvar', function(){
      return ( $flags && $flags['cssvars']  )
    });


  };
};
