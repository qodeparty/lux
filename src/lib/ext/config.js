$prefix = require('../defs/prefix.json');
$config = require('../defs/config.json');
$flags  = $config['flags'];

$devices   = $config['devices']['vals'];
$sizes     = $config['sizes'];
$size_lbls = $sizes['meta']['labels'];

//console.log($size_lbls)

function * listGenerator(iter){
  //let iter = devices;
  let index = 0;
  let names = (Array.isArray(iter)) ? iter : Object.keys(iter);
  for(d in names){
    //console.log('item: '+names[d]);
    yield names[d];
  }
}


//console.log(deviceGenerator)
const deviceGen = listGenerator($devices);

function makeDeviceGenerator(){
  const len =  Object.keys($devices).length;
  return function(getLength){
    if(getLength===1) return len;
    let $this = deviceGen.next();
    if( ! $this.done ) return $this.value; 
    return null;
  }
}


const sizeGen = listGenerator($size_lbls);

function makeSizeGenerator(){
  const len =  Object.keys($size_lbls).length;
  return function(getLength){
    //console.log('len',(getLength?))
    if(getLength===1) return len;
    let $this = sizeGen.next();
    if( ! $this.done ) return ""+$this.value; 
    return null;
  }
}



module.exports = () => {


  return function(stylus){


    stylus.define('fx_get_config', function(param){

      let split  = param.val.split('_');

      let lookup = split[0];
      let key    = split[1];
          lookup = $prefix[lookup] || lookup;
      let $this  = $config[lookup] || null;
      let $val   = $this[key];
      //val = $config[lookup][key] || $config[$prefix[lookup]][key] || null;

      //console.log( lookup, key, $val, $this );
      
      if(typeof $val == 'undefined' ) throw new Error('Invalid config key: ' + param);

      return $val; 

    });


    stylus.define('fx_devices', function(device,param) {
      d = $config['devices'].vals[ id.val ];
      return d; 
    });


    stylus.define('fx_make_device_iter', function(len){
      const gen = makeDeviceGenerator()
      let i = gen(len.val);
      return i;
    });

    stylus.define('fx_device_meta', function(k) {
      return 1;
    });



    stylus.define('fx_make_size_iter', function(len) {
      const gen = makeSizeGenerator()
      let i = gen(len.val);
      return i;
    });


    stylus.define('fx_size_meta', function(param) {
      $meta = $sizes['meta'];
      let lookup = param.val;
      let $val   = $meta[lookup] || null;
      return $val; 
    });


  };

};

