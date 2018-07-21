/*/////////////////////////////////////////////////////////////////////////////

  LUX!

/////////////////////////////////////////////////////////////////////////////*/
;(function(w, d, $){


  let Lux = ( $.Lux || w.lux || {} );

  const mr = Math.random,
        mf = Math.floor,
        tl='toLowerCase',
        tu='toUpperCase',
        isa=Array.isArray,
        sfc=String.fromCharCode,
        log=console.log;

/*/////////////////////////////////////////////////////////////////////////////
// GX Lib
/////////////////////////////////////////////////////////////////////////////*/


  const timestamp    = ()   => { return +new Date(); }
  const stringify    = (s)  => { return JSON.stringify(s) + ""; }
  const keyParse     = (u)  => { let q=Object.keys(u); return(q.length ? q : '--'); }
  const quickRand    = (m,n)=> { n=n||0;m=(isa(m)?m.length:m); return mf(mr()*m)+n; }
  const hexGen       = (n)  => { function b(a){ return a?(a^mr()*16>>a/4).toString(16):([1e7]+1e3+4e3+'').replace(/[018]/g,b); } return b(n); }
  const clockGen     = (m,c)=> { c=c||1;return (x)=>{ if(m!==null && c<=m){ if(x) c=0;return c++;} return null;}};
  const counter      = clockGen(true);


  const randString = (x) => {
      var s = "";
      while(s.length<x&&x>0){
          var r = Math.random();
          s+= String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65));
      }
      return s;
  }

  const alnumGen = (l,a)=>{
    a=a&&a[tl](),s="",i=0,m=a=="a"?10:0,n=a=="n"?10:62;
    for(;i++<l;){let r=mr()*(n-m)+m<<0; s+=sfc(r+=r>9?r<36?55:61:48);}
    return s;
  }

  const kvGen = (f,i=0) =>{
    let len = f||quickRand(5,1);
    let s = alnumGen(len,'a')[tl]();
    s = s.split('');
    clk = clockGen(s.length);
    dd = usDateRangeGen( toDate([3,22,1905]), toDate([3,22,2015]) );
    let o = { row : i, id : alnumGen(len,'n'), name : nameGen(), bday : dd()  };
    while(s.length >= 1) o[`key_${clk()}`] = `val_${s.pop()}`;
    return o;
  }

  const randColor = () =>{
    return '#'+(~~(Math.random()*(1<<24))).toString(16);
  }


  function hexGen2(length) {
    var ret = "";
    while (ret.length < length) {
      ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0,length);
  }


  const dataGen = (x,f) => {
    var res=[],i=0,c=clockGen(x),f = f||quickRand(5,1);
    while(i!==null){ i = c(); if(i==null) continue; res.push(kvGen(f,i)); }
    return res;
  }

  const nameGen = (dict) => {
    let i=0, j=0, fl='', nl='';
    dict = dict || {
      pre:[ 'tom', 'ark', 'far', 'shi', 'zag', 'mar', 'dav', 'jen', 'rob', 'bren', 'sam' ],
      suf:[ 'is', 'malo', 'zak', 'ben', 'wonk', 'quez', 'ender', 'ali', 'son', 'kor' ]
    }
    let fnl = clockGen(1);
    let lnl = clockGen(quickRand(3));
    while(i!==null){ i = fnl(); fl +=dict.pre[quickRand(dict.pre)] + dict.suf[quickRand(dict.suf)]; }
    while(j!==null){ j = lnl(); nl +=dict.suf[quickRand(dict.suf)]; }
    function tcase(a){ return a.charAt(0)[tu]() + a.substr(1)[tl]();}
    var name = tcase(fl)+" "+tcase(nl);
    return (name);
  }



  const dateRangeGen = (s,e,cb) => {
    return ()=>{ d=new Date(s.getTime() + Math.random() * (e.getTime() - s.getTime())); if(cb) return cb(d); return d; }
  }

  const toDate = (d) => {
    if(isa(d)) return new Date(d[2],d[1],d[0]);
    return new Date();
  }

  const usDate = (d) => { d = new Date(d); return d.toLocaleDateString('en-US'); }

  const usDateRangeGen = (s,e, cb) => {
    return dateRangeGen(s,e,usDate);
  }


  //usDateGenerator =>  var dd = fx.dg( fx.td([3,22,1900]), fx.td(), locale );
  //dateGen(new Date(2012, 0, 1), new Date())

  const $lorem=`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi tempus imperdiet nulla malesuada pellentesque. Turpis massa tincidunt dui ut ornare lectus sit amet. Purus in mollis nunc sed. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Scelerisque eu ultrices vitae auctor eu augue ut lectus. Enim nec dui nunc mattis. Netus et malesuada fames ac turpis egestas. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Nisl rhoncus mattis rhoncus urna neque viverra justo. Aliquet nibh praesent tristique magna sit amet purus gravida. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Turpis massa tincidunt dui ut ornare lectus sit amet est. Amet dictum sit amet justo donec enim diam vulputate. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. At auctor urna nunc id cursus metus aliquam. Tristique sollicitudin nibh sit amet commodo nulla.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi tempus imperdiet nulla malesuada pellentesque. Turpis massa tincidunt dui ut ornare lectus sit amet. Purus in mollis nunc sed. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Scelerisque eu ultrices vitae auctor eu augue ut lectus. liquet nibh praesent tristique magna sit amet purus gravida. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Turpis massa tincidunt dui ut ornare lectus sit amet est. Amet dictum sit amet justo donec enim diam vulputate. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. At auctor urna nunc id cursus metus aliquam. Tristique sollicitudin nibh sit amet commodo nulla.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`

  function subLorem(len=16){
    return $lorem.substring(0,len);
  }


/*/////////////////////////////////////////////////////////////////////////////
// GX Driver
/////////////////////////////////////////////////////////////////////////////*/

  Lux.gx = {
    t : timestamp,
    j : stringify,
    k : keyParse,
    c : counter,
    r : quickRand,
    h : hexGen,
    a : alnumGen,
    d : dataGen,
    cg : clockGen,
    dg : dateRangeGen,
    td : toDate,
    ud : usDate,
    udg: usDateRangeGen,
    ng : nameGen,
    kv : kvGen,
    rst: randString,
    rcol: randColor
  };

  $.Lux = Lux;

  //console.info(Lux);

})(window, document, jQuery);
