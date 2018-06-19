module.exports = () => {
  return function(stylus){
    stylus.define('fx_char_in', function(sub, str){
      let a,b;
      a = str.val || "";
      b = sub.val || "";
      console.log('index-of', a,b, a.indexOf(b), b.indexOf(a));
      return a.indexOf(b);
    });

  };
};
