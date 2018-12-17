import React from 'react';

export default () => {
  return fetch('http://apps.wearetouro.com/api/torahSpeakers/touroMain')
  .then((response) => {
      return response.json();
  })
  .then((data) => {
      //console.log(data);
      let speakers = [];
      data.forEach(function(item){
        item.speakerUri = item.speakerName.replace(/\s+/g, '-').toLowerCase();
        speakers.push(item);

      });
      return speakers;
  });
}







