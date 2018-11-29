import React from "react";
import { BrowserRouter as 
  Router,
  Route, 
  Link , 
  Switch,
  HashRouter
} from "react-router-dom";
<<<<<<< HEAD
import Child from './CategoriesComponent';
||||||| merged common ancestors
import Books from './BooksComponent';
=======
import Categories from './CategoriesComponent';
>>>>>>> 7fd568272315ac16c1cd46e2d6d7449815e30bba

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [] 
    }
  }
  getCategories() {
    fetch('http://apps.wearetouro.com/api/torahSubcategories/catsSubcats%7CtouroMain')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      let categoriesRepeated = [];
      data.forEach(function(item){
        // console.log(item.categoryValue);
        categoriesRepeated.push(item.categoryValue);
        
      });
      var categories = categoriesRepeated.filter(function(item, index){
        return categoriesRepeated.indexOf(item) >= index;
      });
      this.setState({
        categories
      });
      console.log('categories', categories);
    });
  }
  
  componentDidMount() {
    this.getCategories();
  }
 
  render() {
    const {match, location} = this.props;
    console.log(match);
    return (
      <Router>
        <div className="App">
            <div className="jumbotron">
                <h1 className="display-3">My Books</h1>
            </div>
          <div className="container">
<<<<<<< HEAD
            <div className="row">
                <div className="col-md-3">
          <ul>
          {
            this.state.categories.map(
              (category, i) => {
              return <li><Link to={`${match.url}/${category}`}>{category}</Link></li>;
            })
          }
          </ul>
                </div>
                <div className="col-md-9">
                    {/* <Route path={`${match.path}/react`} render={() => { return <h1>React by Fullstack.io book</h1> }}/> */}
                    <Route path={`${match.path}/:id`} component={Child} />
                </div>
            </div>
            </div>
||||||| merged common ancestors
            <ul>
              <li><Link to="/books">Books</Link>
              </li>
            </ul>
            <hr/>

          <Switch>
            <Route path="/books" component={Books} />
          </Switch>


          </div>
=======
            <ul>
              <li><Link to="/">Categories</Link>
              </li>
            </ul>
            <hr/>

          <Switch>
            <Route exact path="/" component={Categories} />
          </Switch>


          </div>
>>>>>>> 7fd568272315ac16c1cd46e2d6d7449815e30bba
        </div>
      </Router>
    );
  }
}

export default App;

