$prefix = require('../defs/prefix.json');
$config = require('../defs/config.json');
$flags  = $config['flags'];

devices = $config['devices']['vals'];

//console.log(devices)

function * listGenerator(iter){
  //let iter = devices;
  let index = 0;
  let names = Object.keys(iter);
  for(d in names){
    //console.log('item: '+d);
    yield names[d];
  }
}


//console.log(deviceGenerator)
const gen = listGenerator(devices);

function makeDeviceGenerator(){

  const len =  Object.keys(devices).length;
  //console.log('LENGTH is',len);

  return function(getLength){
    if(getLength) return len;
    let $this = gen.next();
    if( ! $this.done ) return $this.value; 
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






    stylus.define('fx_make_device_iter', function(g){
      const gen = makeDeviceGenerator()
      let i = gen(g.val);
      return i;

    });


  };

};
