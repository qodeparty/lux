$prefix = require('../defs/prefix.json');
$config = require('../defs/lux.json');
$flags  = $config['flags'];
$vals   = $config['init'];

$devices   = $config['devices']['vals'];
$sizes     = $config['sizes'];
$size_lbls = $sizes['meta']['labels'];

$percs     = $config['percs']['vals'];

//console.log($size_lbls)

function * listGenerator(iter){
  //console.info('list generator',iter)
  //let iter = devices;
  let index = 0;
  let names = (Array.isArray(iter)) ? iter : Object.keys(iter);
  for(d in names){
    //console.log('item: '+names[d]);
    yield names[d];
  }
}


//console.log(deviceGenerator)
var deviceGen = listGenerator($devices);

function makeDeviceGenerator(){
  const len =  Object.keys($devices).length;
  function restart(){
    console.log('restarting generator...');
    deviceGen = listGenerator($devices);
  }
  function generate(getLength){
    if(getLength===1) return len;
    if(!deviceGen)    return restart;
    let $this = deviceGen.next();
    if( !$this.done ) return $this.value; 
    if( $this.done ){
      console.error('generator done, sending restart()');
      return restart;
    }
  }
  return generate; 
}



var sizeGen = listGenerator($size_lbls);

function makeSizeGenerator(){
  const len =  Object.keys($size_lbls).length;
  function restart(){
    //console.log('restarting generator...');
    sizeGen = listGenerator($size_lbls);
  }
  function generate(getLength){
    if(getLength===1) return len;
    if(!deviceGen)    return restart;
    let $this = sizeGen.next();
    if( !$this.done ) return ""+$this.value; 
    if( $this.done ){
      //console.error('generator done, sending restart()');
      return restart;
    }
  }


  return generate; 

  // return function(getLength){
  //   //console.log('len',(getLength?))
  //   if(getLength===1) return len;
  //   let $this = sizeGen.next();
  //   if( ! $this.done ) return ""+$this.value; 
  //   return null;
  // }
}


const percGen = listGenerator($percs);

function makePercGenerator(){
  const len =  Object.keys($percs).length;
  return function(getLength){
    if(getLength===1) return len;
    let $this = percGen.next();
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

      //console.log( 'hi', lookup, key, $val, $this );
      
      if(typeof $val == 'undefined' ) throw new Error('Invalid config key: ' + param);

      return $val; 

    });


    stylus.define('fx_devices', function(device,param){
      d = $config['devices'].vals[ id.val ];
      return d; 
    });


    stylus.define('fx_make_device_iter', function(len){

      const gen = makeDeviceGenerator()
      let i = gen(len.val);

      if( typeof i === 'function' ){
        let restart = i;
        restart();
        i = gen();
      } 

      return i;
    });


    stylus.define('fx_device_size', function(device,getVals=false){
      let $val;
      device  = device.val
      getVals = getVals.val;
      if( device ){
        $val  = ( getVals ? $devices[device]['range'] : $devices[device]['alt'] );
        return ($val||null); 
      }
      return null;
    });



    stylus.define('fx_make_size_iter', function(len){

      const gen = makeSizeGenerator()
      let i = gen(len.val);

      if( typeof i === 'function' ){
        let restart = i;
        restart();
        i = gen();
      } 

      return i;
    });


    stylus.define('fx_size_meta', function(param){
      $meta = $sizes['meta'];
      let lookup = param.val;
      let $val   = $meta[lookup] || null;
      return $val; 
    });

    stylus.define('fx_make_perc_iter', function(len){
      const gen = makePercGenerator()
      let i = gen(len.val);
      return i;
    });

    stylus.define('fx_perc_frac', function(i,param){
      let f=i.val; let b=$vals['basis']; let n=$flags['nat-basis'];
      let val,cl,t,q = Math.trunc(f*100/b);

      const keys=Object.keys($percs);

      if( Array.isArray(keys) ){
        val = q+'per';
        if( keys.indexOf(val) > -1 ){
          t = $percs[val];
          cl = t && t['frac'] ? t['frac'] : ( t['alias'] ? t['alias'] : '' );         
        }
      }
      //console.log(f + '/' + b + ' = ' + Math.trunc(f*100/b)+'%', n?'nat':'any', val, cl?cl:'')
      return cl;
    });    
  };

};

