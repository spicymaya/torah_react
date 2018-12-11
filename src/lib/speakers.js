<<<<<<< HEAD
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







||||||| merged common ancestors
=======
export default () => {
  return fetch('http://apps.wearetouro.com/api/torahSpeakers/touroMain')
  .then((response) => {
      return response.json();
  })
  .then((data) => {
      //console.log(data);
      let speakers = [];
      data.forEach(function(item){
        speakers.push(item);
        speaker.speakerUri = speaker.speakerName.replace(/\s+/g, '-').toLowerCase();

      });
      //console.log(categories);
      return speakers;
  });
}
>>>>>>> 23f3d19d39c79adef8f2629c048ea3b8c2f0158e
