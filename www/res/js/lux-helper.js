      $lorem='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi tempus imperdiet nulla malesuada pellentesque. Turpis massa tincidunt dui ut ornare lectus sit amet. Purus in mollis nunc sed. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Scelerisque eu ultrices vitae auctor eu augue ut lectus. Enim nec dui nunc mattis. Netus et malesuada fames ac turpis egestas. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Nisl rhoncus mattis rhoncus urna neque viverra justo. Aliquet nibh praesent tristique magna sit amet purus gravida. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Turpis massa tincidunt dui ut ornare lectus sit amet est. Amet dictum sit amet justo donec enim diam vulputate. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. At auctor urna nunc id cursus metus aliquam. Tristique sollicitudin nibh sit amet commodo nulla.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi tempus imperdiet nulla malesuada pellentesque. Turpis massa tincidunt dui ut ornare lectus sit amet. Purus in mollis nunc sed. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Scelerisque eu ultrices vitae auctor eu augue ut lectus. liquet nibh praesent tristique magna sit amet purus gravida. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Turpis massa tincidunt dui ut ornare lectus sit amet est. Amet dictum sit amet justo donec enim diam vulputate. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. At auctor urna nunc id cursus metus aliquam. Tristique sollicitudin nibh sit amet commodo nulla.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

      let basis = 16;
      let count = 32;
      let main  = $('._gen');

      let sizes = {
                    spread : [ 16, 15, 1, 14, 2, 13, 3, 12, 4, 11, 5, 10, 6, 9, 7, 8, 8 ]
                  };

      function make_thing(){
        let frag = document.createDocumentFragment();
        let div  = document.createElement('div');
            div.setAttribute('class','thing');
            //..
      }


      function flex_basis(){
        for(let i=0; i<main.length; i++){

          let el = main[i];
          basis = $(el).data('basis');
          count = $(el).data('count');
          let genSet; let gen = $(el).data('gen') || false;

          if( gen  && Array.isArray(sizes[gen]) ){
            genSet = sizes[gen].slice();

            count = Array.isArray(genSet) && genSet.length;
            if(!count) continue;
          }

          console.log( count )

          for(let j=0; j<count; j++){

            let frag = document.createDocumentFragment();
            let div  = document.createElement('div');
                div.setAttribute('alt',el.childElementCount+1);
                div.setAttribute('id','j'+(el.childElementCount+1));
                if( genSet ){
                  div.setAttribute('class','len-' + genSet[j] );
                  div.setAttribute('alt',genSet[j]);
                }
                frag.appendChild(div)
                el.appendChild(frag)
                console.log(el.scrollWidth)
          }

        }
      }



      var screens={
        nano   : { max:360  },
        mobile : { max:768  },
        tablet : { max:1024 },
        desktop: { max:1216 },
        wide :   { max:1440 },
        full :   { max:1920 },
        jumbo:   { max:2560 },
        ultra:   { max:9999 }
      };


      function load_sizer(){
        let keys = Object.keys(screens);
        let frag = document.createDocumentFragment();
        let div  = document.createElement('div');
            div.setAttribute('class', 'debug-display as-display watch-resizer' );

        let res = $("<div class='resizer'>"+`${window.innerWidth}`+"</div>");
            div.appendChild(res[0]);

        for(let i=0;i<keys.length;i++){
          let key  = keys[i]; let size = screens[key].max;
          let cls  = `show-on-${key}`
          let btn  = document.createElement('button');
              btn.setAttribute('class', cls );
              btn.innerHTML = `${key} : ${size}`;
              div.appendChild(btn);
        }

        frag.appendChild(div);
        $('body').append(frag);
      }

      function load_icons(icons=50){
        let frag = document.createDocumentFragment();
        let div   = document.createElement('div');
            div.setAttribute('class', 'icons' );

        for(let i=0;i<icons;i++){
          let ch   = document.createElement('div');
              ch.setAttribute('class', 'icon-'+i );
              ch.setAttribute('title', 'icon-'+i );
              div.appendChild(ch);
        }

        frag.appendChild(div);
        return frag;
      }


      function subLorem(len=16){
        return $lorem.substring(0,len);
      }

      $('.lorem-1').html(subLorem(100));
      $('.lorem-3').html(subLorem(300));
      $('.lorem-5').html(subLorem(500));
      $('.lorem-9').html(subLorem(1500));

      $('.toggle-debug').on('click', (e) => {
        $('body').toggleClass('archxray');
      });


      $(window).on('resize', function(e){
        $('.resizer').html(window.innerWidth);
      });


      let iconElm = $('.iconset')

      if( iconElm.length > 0 ){
        let size = $('.iconset').data('size');
        iconElm.append(load_icons(size));
        console.log(size);
      }

      let sizerElm = $('.debug-sizer');

      //console.log( sizerElm );

      if( sizerElm.length > 0 ){
        load_sizer();
      }
