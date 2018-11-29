<?php 


function indent($json) {

    $result      = '';
    $pos         = 0;
    $strLen      = strlen($json);
    $indentStr   = '  ';
    $newLine     = "\n";
    $prevChar    = '';
    $outOfQuotes = true;

    for ($i=0; $i<=$strLen; $i++) {

        // Grab the next character in the string.
        $char = substr($json, $i, 1);

        // Are we inside a quoted string?
        if ($char == '"' && $prevChar != '\\') {
            $outOfQuotes = !$outOfQuotes;

        // If this character is the end of an element,
        // output a new line and indent the next line.
        } else if(($char == '}' || $char == ']') && $outOfQuotes) {
            $result .= $newLine;
            $pos --;
            for ($j=0; $j<$pos; $j++) {
                $result .= $indentStr;
            }
        }

        // Add the character to the result string.
        $result .= $char;

        // If the last character was the beginning of an element,
        // output a new line and indent the next line.
        if (($char == ',' || $char == '{' || $char == '[') && $outOfQuotes) {
            $result .= $newLine;
            if ($char == '{' || $char == '[') {
                $pos ++;
            }

            for ($j = 0; $j < $pos; $j++) {
                $result .= $indentStr;
            }
        }

        $prevChar = $char;
    }

    return $result;
}


function __autoload_elastica ($class) {
    $path = str_replace('\\', '/', substr($class, 0));

    if (file_exists('/srv/app/Elastica/lib/' . $path . '.php')) {
        require_once('/srv/app/Elastica/lib/' . $path . '.php');
    }
}
function object_to_array($data)
{
    if (is_array($data) || is_object($data))
    {
        $result = array();
        foreach ($data as $key => $value)
        {
            $result[$key] = object_to_array($value);
        }
        return $result;
    }
    return $data;
}
function sanitize($data)
{
    // remove whitespaces (not a must though)
    $data = trim($data); 

    // apply stripslashes if magic_quotes_gpc is enabled
    if(get_magic_quotes_gpc()) 
    {
    $data = stripslashes($data); 
    }

    // a mySQL connection is required before using this function
    $data = mysql_real_escape_string($data);

    return $data;
}






$elasticaClient = null;

$doloades = true;
if($doloades) {
    spl_autoload_register('__autoload_elastica');
     
  //Or using anonymous function PHP 5.3.0>=
    spl_autoload_register(function($class){
     
    if (file_exists('/srv/app/Elastica/lib/' . $class . '.php')) {
        require_once('/srv/app/Elastica/lib/' . $class . '.php');
    }
  
    });
  
    $elasticaClient = new Elastica\Client(array(
        'host' => 'search.touro.edu',
        'port' => '80'
    ));
  
  
  
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':       
          
      	 	if(isset($_GET['byid'])) {
              include('byid.php');
          	} else { 


             if(isset($_GET['fieldquery']))
            {
              $queryString = new Elastica\Query\Field($_GET['fieldquery'],$_GET['q']);
              
            } else {
              $queryString = new Elastica\Query\QueryString($_GET['q']);
              $queryString->setDefaultOperator($_GET['default_operator']);





            }            
                $isFiltered = false;

                if(isset($_GET['collection'])  && $_GET['collection'] != 'all') {  

                    $collection = str_replace('-', ' ', $_GET['collection']);
                    $queryMatch = new Elastica\Query\Match();
                    $queryMatch->setFieldQuery('content_type', $collection);
                      
                    $elasticaTypeFilter = new Elastica\Filter\Query();
                    $elasticaTypeFilter->setQuery($queryMatch);
                      
                      
                    $elasticaFilterAnd  = new Elastica\Filter\BoolAnd();
                    $elasticaFilterAnd->addFilter($elasticaTypeFilter);
                      
                      
                    //print_r($elasticaTypeFilter);
                    $filteredQuery = new Elastica\Query\Filtered(
                        $queryString,
                        $elasticaTypeFilter
                    );
                    $isFiltered = true;
                }
                
                
                
                if(isset($_GET['torahItem_shortStoryFlag'])  && $_GET['torahItem_shortStoryFlag'] != '') {  

                    $shorts = str_replace('-', ' ', $_GET['torahItem_shortStoryFlag']);
                    $queryMatch = new Elastica\Query\Match();
                    $queryMatch->setFieldQuery('torahItem_shortStoryFlag', $shorts);
                      
                    $elasticaTypeFilter = new Elastica\Filter\Query();
                    $elasticaTypeFilter->setQuery($queryMatch);
                      
                      
                    $elasticaFilterAnd  = new Elastica\Filter\BoolAnd();
                    $elasticaFilterAnd->addFilter($elasticaTypeFilter);
                      
                      
                    //print_r($elasticaTypeFilter);
                    $filteredQuery = new Elastica\Query\Filtered(
                        $queryString,
                        $elasticaTypeFilter
                    );
                    $isFiltered = true;
                }

              
              //Keyword filter code
                if(isset($_GET['keyword']) && $_GET['keyword'] != '') { 
                  
                    $kwds = explode(",", $_GET['keyword']);
                       
                    foreach ($kwds as $k) {
                        $queryMatchTypeOf = new Elastica\Query\Match();
                        $queryMatchTypeOf->setFieldQuery('keword_array',$k);

                        $elasticaTypeOfFilter = new Elastica\Filter\Query();
                        $elasticaTypeOfFilter->setQuery($queryMatchTypeOf);
                        
                        $elasticaFilterAnd  = new Elastica\Filter\BoolAnd();
                        $elasticaFilterAnd->addFilter($elasticaTypeOfFilter);
            
                        //print_r($elasticaTypeFilter);
                        if ($isFiltered) {
                            $filteredQuery = new Elastica\Query\Filtered(
                                $filteredQuery,
                                $elasticaTypeOfFilter
                            );       

                        } else {
                            //print_r($queryString);
                            $filteredQuery = new Elastica\Query\Filtered(
                                $queryString,
                                $elasticaTypeOfFilter
                            );                 
                        }
                      
                        $isFiltered = true;
                    }
                    
                }

   
				$search = new Elastica\Search($elasticaClient);
				$searchThrough = $search->addIndex($_GET['index']); 
              
              
              //EVENT DATE QUERY
/*
                if(isset($_GET['range'])) {
                  
                  $elasticaFilterRange  = new Elastica\Filter\Range();
                  $elasticaFilterRange ->addField('start_date',array("from"=>$_GET['start'],'to'=>$_GET['end']));
                  $filteredQuery = new Elastica\Query\Filtered(
                    $filteredQuery,
                    $elasticaFilterRange
                  );
                  $isFiltered = true;
                }
*/
                
				if(isset($_GET['categories']) && $_GET['categories'] != '') { 
                
              $queryMatchTypeOf = new Elastica\Query\Match();
              $queryMatchTypeOf->setFieldQuery('categories_array',$_GET['categories']);
              $elasticaTypeOfFilter = new Elastica\Filter\Query();
              $elasticaTypeOfFilter->setQuery($queryMatchTypeOf);
              
              $elasticaFilterAnd  = new Elastica\Filter\BoolAnd();
              $elasticaFilterAnd->addFilter($elasticaTypeOfFilter);
              
              //print_r($elasticaTypeFilter);
              if ($isFiltered) {
                  $filteredQuery = new Elastica\Query\Filtered(
                      $filteredQuery,
                      $elasticaTypeOfFilter
                  );       

              } else {
                  $filteredQuery = new Elastica\Query\Filtered(
                      $queryString,
                      $elasticaTypeOfFilter
                  );                 
              }
               $isFiltered = true;

            }
				if(isset($_GET['subcategories']) && $_GET['subcategories'] != '') { 
                
              $queryMatchTypeOf = new Elastica\Query\Match();
              $queryMatchTypeOf->setFieldQuery('subcategories_array',$_GET['subcategories']);
              $elasticaTypeOfFilter = new Elastica\Filter\Query();
              $elasticaTypeOfFilter->setQuery($queryMatchTypeOf);
              
              $elasticaFilterAnd  = new Elastica\Filter\BoolAnd();
              $elasticaFilterAnd->addFilter($elasticaTypeOfFilter);
              
              //print_r($elasticaTypeFilter);
              if ($isFiltered) {
                  $filteredQuery = new Elastica\Query\Filtered(
                      $filteredQuery,
                      $elasticaTypeOfFilter
                  );       

              } else {
                  $filteredQuery = new Elastica\Query\Filtered(
                      $queryString,
                      $elasticaTypeOfFilter
                  );                 
              }
               $isFiltered = true;

            }      
            
            
                if(isset($_GET['torahItem_speaker'])) {  

            //   $boolQuery = new Elastica\Query\Bool();
              $query_collection = new Elastica\Query\Match();
              $query_collection->setFieldQuery('torahItem_speaker', $_GET['torahItem_speaker'])->setFieldParam('torahItem_speaker', 'type', 'phrase');

              

              $elasticaTypeOfFilter = new Elastica\Filter\Query();
              $elasticaTypeOfFilter->setQuery($query_collection);

              $elasticaFilterAnd  = new Elastica\Filter\BoolAnd();
              $elasticaFilterAnd->addFilter($elasticaTypeOfFilter);
	              
	              
	              $filteredQuery = new Elastica\Query\Filtered(
                        $queryString,
                        $elasticaTypeOfFilter
                    );
                    $isFiltered = true;

            }       
   


	            if ($isFiltered) {
	                $query = new Elastica\Query($filteredQuery);
	            }    else  {
	              $query = new Elastica\Query($queryString);
	            }
       
            
            $query->setFrom($_GET['from'])->setLimit($_GET['size']);
            
             
            // Create the search object and inject the client
            $search = new Elastica\Search($elasticaClient);
            
            
             if(isset($_GET['sort-by'])) {
                $sortby = $_GET['sort-by'];
                
                if(isset($_GET['sort-by-direction'])){
                    $sortdirection = $_GET['sort-by-direction'];
                }
                
                if (is_array($sortby)) {
                    $sort = [];
                    foreach ($sortby as $key => $sort_item) {
                        if (is_array($sortdirection) && $sortdirection[$key]) {
                            $direction_item = $sortdirection[$key];
                        } else {
                            $direction_item = "desc";
                        }
                        array_push($sort, array($sort_item => array("order" => $direction_item)));
                    }
                } else {
                    $sort = array($_GET['sort-by'] => array("order" => (isset($sortdirection) ? $sortdirection : "desc")));  //order by clause
                }
                
                $query->setSort($sort);
              }
            if(isset($_GET['sort_by'])) {              
                if(isset($_GET['sort_by_direction'])){
                  $sortdirection =  $_GET['sort_by_direction'];
                } else {
                  $sortdirection =  "desc";
                }
                $sort = array($_GET['sort_by'] => array("order" => $sortdirection));  //order by clause
                $query->setSort($sort);
              }

            
             
            // Configure and execute the search
   
             $searchThrough = $search->addIndex($_GET['index']); 
            // Configure and execute the search
            // Create the search object and inject the client
            if(isset($_GET['type'])) {
              $searchthis = $searchThrough->addType($_GET['type']);
              //print_r($type);
              
            }

            if (isset($_GET['facets']) && $_GET['facets'] != '') {

              $facets = explode(",", $_GET['facets']);
                   
                    foreach ($facets as $f) {
                       
                        $elasticaFacet    = new \Elastica\Facet\Terms($f);
                        $elasticaFacet->setField($f);
                        $elasticaFacet->setSize(100);
                        // Add that facet to the search query object.
                        $query->addFacet($elasticaFacet);
                    }

                
            }
            if (isset($_GET['debug'])) {
                echo '<pre>';
                print_r($query);
                echo '</pre>';
                
            }

            $resultSet = $searchThrough->search($query);

           
            
            $data = array();
            foreach($resultSet as $result){
                $itemdata = $result->getData();
                $itemdata['id'] = $result->getId();
                $data[] = $itemdata;
                
            }
           
           $response['torahdata'] = $data;
            $response['total'] = $resultSet->getTotalHits();
            
          }
          break;
      case 'PUT':
          
          break;
      case 'POST':

          break;
      case 'DELETE':

          break;
  }
  
  header('Content-Type: application/json');
  
  
  $json =  json_encode($response);
  $json = str_replace(PHP_EOL, '', $json);
  $json = str_replace("\\n", "", $json);
  $json = str_replace("\\r", "", $json);
  $json = str_replace("\\'", "\'", $json);
  $json = str_replace("\\\'", "'", $json);
  
  if (!isset($_GET['debug'])) echo indent($json);

}

?>