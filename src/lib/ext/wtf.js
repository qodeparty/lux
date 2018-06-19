module.exports = () => {
  return function(stylus){
    stylus.define('fx_wtf', function(arg) {
      console.debug(arg);
      return true;
    });
  };
};
