module.exports = () => {
  return function(stylus){

    let utils = stylus.utils;

    console.log(util);

    stylus.define('i', function(sub, str){
      console.log('I seen an eye!');
      return true;
    });


  };
};
