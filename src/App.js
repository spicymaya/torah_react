import React from "react";
import { BrowserRouter as 
  Router,
  Route, 
  Link , 
  Switch,
  HashRouter
} from "react-router-dom";
import Categories from './CategoriesComponent';

class App extends React.Component {
  
  render() {
    return (
      <Categories />
    );
  }
}

export default App;