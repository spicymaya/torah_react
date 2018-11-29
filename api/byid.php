<?php
$elasticaIndex = $elasticaClient->getIndex($_GET['index']);
$type = $elasticaClient->getIndex($_GET['index'])->getType($_GET['type']);
$elasticaType = $elasticaIndex->getType($_GET['type']);
$response = $elasticaType->getDocument($_GET['byid']);
$response  = $response->getData();

?>