module.exports = () => {
  return function(stylus){
    stylus.define('fx_hex_pad', function($num,$len=3){
    	$num = ($num.val).toString(16);

    	let $s = String($num);
    	while ($s.length < ($len || 2)) {$s = "0" + $s;}

    	//console.log($num,$s)
      return $s;
    });
  }
}
