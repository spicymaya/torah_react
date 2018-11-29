<?php
//http://www.hebcal.com/converter/?cfg=json&gy=2011&gm=6&gd=2&g2h=1
header('Content-type: text/json');
header('Content-type: application/json');
// Get cURL resource
$curl = curl_init();

// Set some options - we are passing in a useragent too here
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'http://www.hebcal.com/converter/?cfg=json&gy='.$_GET['gy'].'&gm='.$_GET['gm'].'&gd='.$_GET['gd'].'&g2h='.$_GET['g2h']
));
// Send the request & save response to $resp
$resp = curl_exec($curl);
// Cose request to clear up some resources
curl_close($curl);

echo $resp;
?>