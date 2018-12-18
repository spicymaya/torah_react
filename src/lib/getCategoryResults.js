export default function getCategoryResults(category){
var http = new XMLHttpRequest();
var url = "/api/esSetup.php";
var params = {
  default_operator: 'AND',
  fieldquery: 'torahItem_categories',
  from: 0,
  index: 'torah-new',
  size: 18,
  'sort-by-direction': 'desc',
  'sort-by': 'torahItem_recordingDate',
  q: category
}
return 
  http.open("GET", url+"?"+params, true);
  http.onreadystatechange = function() {
    console.log('test',http.responseText);
  }
  
}