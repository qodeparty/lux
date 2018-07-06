
$devices   = $config['devices']['vals'];

cyan  = process.env['COLOR_CYAN'];
green = process.env['COLOR_GREEN'];
end   = process.env['COLOR_NONE'];

module.exports = () => {


  return function(stylus){

    stylus.define('fx_devices', function(device,param){
      d = $config['devices'].vals[ id.val ];
      return d; 
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
