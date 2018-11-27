import React from "react";
import { BrowserRouter as 
  Router,
  Route, 
  Link , 
  Switch
} from "react-router-dom";
import Books from './BooksComponent';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">

          <div className="container">
            <ul>
              <li><Link to="/books">Books</Link>
              </li>
            </ul>
            <hr/>

          <Switch>
            <Route path="/books" component={Books} />
          </Switch>


          </div>
        </div>
      </Router>
    );
  }
}

export default App;