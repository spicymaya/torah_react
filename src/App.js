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
      <Router>
        <div className="App">

          <div className="container">
            <ul>
              <Link to="/categories">Categories</Link>
            </ul>
            <hr/>

          
            <Route path="/categories" component={Categories} />
         


          </div>
        </div>
      </Router>
    );
  }
}

export default App;