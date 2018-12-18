import React from 'react';

export default function getCategoryRsults(category){
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
  return fetch (`/api/esSetup.php?${params}`)
  .then(response => {
    console.log(response);
    return response.json();
  })
 

}
// https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request