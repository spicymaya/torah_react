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