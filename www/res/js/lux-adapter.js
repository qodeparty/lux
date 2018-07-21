

if(parent!==self){

  $(()=>{

      window.name = $('html').attr('id') || 'id'+ +(new Date());
      console.log(`Child Adapater <${window.name}> loaded` );

      setTimeout( ()=>{
        console.warn("sending message to parent...");
        parent.$(window.parent.document).trigger('childready');
      },1000);

      let $lux = window.parent.$.Lux;

      document.body.addEventListener('keydown', function(e) {
        //console.log( e.keyCode );
        if( e.keyCode == 113 ){
          $lux.toggleDashboard();
        }
      });

      $(document).on('parentmessage', (e)=>{
        console.log(`Window <${window.name}> sees your PARENT`);
      });



  });

}else{

  console.error("Cannot load Dashboard Adapter because current window is not a child.");
}
