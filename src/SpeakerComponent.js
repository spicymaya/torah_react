import React from 'react';
const Speaker = ({ match, location }) => 
(
  <div>
    <h3>Speaker name: {match.params.speaker}</h3>
  </div>
);
export default Speaker;