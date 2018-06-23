module.exports = () => {

  
  return function(stylus){
    //console.log($config.init);
    stylus.define('fx_str_len', function(str) {
      return str.val.length;
    });
    
  };
};
