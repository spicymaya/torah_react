import React from "react";
import { BrowserRouter as 
  Router,
  Route, 
  Link , 
  Switch
} from "react-router-dom";
import Categories from './CategoriesComponent';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">

          <div className="container">
            <ul>
              <li><Link to="/">Categories</Link>
              </li>
            </ul>
            <hr/>

          <Switch>
            <Route exact path="/" component={Categories} />
          </Switch>


          </div>
        </div>
      </Router>
    );
  }
}

export default App;