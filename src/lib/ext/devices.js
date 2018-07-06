
$devices   = $config['devices']['vals'];

cyan  = process.env['COLOR_CYAN'];
green = process.env['COLOR_GREEN'];
end   = process.env['COLOR_NONE'];


function * listGenerator(iter){
  let index = 0;
  let names = (Array.isArray(iter)) ? iter : Object.keys(iter);
  for(d in names){
    yield names[d];
  }
}


//console.log(deviceGenerator)
var deviceGen = listGenerator($devices);

function makeDeviceGenerator(){
  const len =  Object.keys($devices).length;
  function restart(){
    //console.log('restarting generator...');
    deviceGen = listGenerator($devices);
  }
  function generate(getLength){
    if(getLength===1) return len;
    if(!deviceGen)    return restart;
    let $this = deviceGen.next();
    if( !$this.done ) return $this.value; 
    if( $this.done ){
      //console.error('generator done, sending restart()');
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

}



module.exports = () => {


  return function(stylus){


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
      
      device  = device.string
      getVals = getVals.val;
      //console.log($devices,device)

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

    stylus.define('fx_device_ranges', function(){

      let ranges=[];
      let nbp=0, wbp=0, dbp=0, hbp=0, fbp=0, jbp=0;
      let abs_max=9999;
      
      let options = {
        use_nano    : arguments[0].val,
        use_touch   : arguments[1].val,
        use_desktop : arguments[2].val,
        use_hd      : arguments[3].val,
        use_ultra   : arguments[4].val
      }

      if(options.use_nano){ 
        nbp = $devices['nano'].break;
        console.log( $devices['nano'] )
        ranges.push( [ 0, nbp ] );
        console.log( green + 'nano is true' + end, options.use_nano );
      }

      mbp=$devices['mobile'].break;
      tbp=$devices['tablet'].break;

      tmin = ( nbp > 0 ? nbp : 0 );

      if(options.use_touch){ 
        ranges.push( [ tmin, nbp-1 ] );
      }else{
        ranges.push( [ tmin, mbp-1 ],
                     [ mbp,  tbp-1 ]); 
      }

      dbp=$devices['desktop'].break;
      wbp=$devices['wide'].break;
      fbp=$devices['full'].break;
      jbp=$devices['jumbo'].break;

      if(options.use_desktop){ 
        dbp = abs_max;
      }else{
        if(options.use_hd){ 
          dbp = wbp-1;
          hbp = abs_max;
        }
      }

      if(options.use_ultra){ 
        if( dbp >= jbp ) dbp = jbp - 1;
        if( hbp >= jbp ) hbp = jbp - 1;
      }else{
        jbp = abs_max
      }

      ranges.push( [ tbp, dbp ] );

      if(options.use_hd){
         ranges.push( [ wbp, hbp ] ); 
      }else{
        if(!options.use_desktop){ 
          ranges.push( [ dbp, wbp-1 ], 
                       [ wbp, fbp-1 ],
                       [ fbp, jbp   ]);
        } 
      }

      if(options.use_ultra) ranges.push( [ jbp, abs_max ] ); 

      //console.log( ranges );

    });
  }
}
