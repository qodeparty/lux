module.exports = () => {
  return function(stylus){
    stylus.define('fx_char_in', function(sub, str){
      let a,b;
      if( typeof str != 'string' ) a=str['string'] || '';
      if( typeof sub != 'string' ) b=sub['string'] || '';
      console.log(a,b, a.indexOf(b));
      return a.indexOf(b) || -1;
    });

  };
};
