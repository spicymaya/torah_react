import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    HashRouter
  } from 'react-router-dom';
  import categories from './lib/categories';
  
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [] 
    }
    console.log(this.state)
  }
  
  componentDidMount() {
    categories().then(categories => {
      console.log('categories', categories);
      this.setState = {
        categories 
      }
      console.log('state', this.state);
    });
  }
  render () {
    return (
      <Router>
        <div>
            <div className="jumbotron">
                <h1 className="display-3">Categories</h1>
            </div>
          <div className="container">
            <div className="row">
                <div className="col-md-3">
          <ul>
          {
            this.state.categories.map(
              (category, i) => {
                return <li><Link to={`/${category}`}>{category}</Link></li>;
            })
          }
          </ul>
                </div>
                <div className="col-md-9">
                    {/* <Route path={`${match.path}/react`} render={() => { return <h1>React by Fullstack.io book</h1> }}/> */}
                    <Route path={`/:id`} component={Child} />
                </div>
            </div>
            </div>
        </div>
      </Router>   
  );
  }
    
}
const Child = ({ match })  => (
    <div>
      <h3>URL ID parameter: {match.params.id}</h3>
    </div>
);
export default Categories;