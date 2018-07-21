

if(parent!==self){

  $(()=>{

      window.name = $('html').attr('id') || 'id'+ +(new Date());
      console.log(`child "${window.name}" loaded` );

      parent.$(window.parent.document).trigger('childready');

      let $lux = window.parent.$.Lux;

      document.body.addEventListener('keydown', function(e) {
        //console.log( e.keyCode );
        if( e.keyCode == 113 ){
          $lux.toggleDashboard();
        }
      });
  });

}else{

  console.error("Cannot load Dashboard adapter because window is not child of controller window");
}
