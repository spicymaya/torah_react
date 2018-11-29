import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    HashRouter
  } from 'react-router-dom';
  
const Child = ({ match })  => (
    <div>
      <h3>URL ID parameter: {match.params.id}</h3>
    </div>
);
export default Child;