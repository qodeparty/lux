$prefix = require('../defs/prefix.json');
$config = require('../defs/lux.json');
$flags  = $config['flags'];
$vals   = $config['init'];


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

    stylus.define('debug', function(param){
      console.log(process.env['COLOR_CYAN']+param.string);
    });


    stylus.define('fx_get_block', function(param){
      let $this  = $config[param.val];
      return $this;
    });

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

