module.exports = () => {
  return function(stylus){

    stylus.define('fx_str_len', function(str) {
      return str.val.length;
    });
    
  };
};
