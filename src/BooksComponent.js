import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';
  
class Books extends React.Component {
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
  render () {
    const {match} = this.props;
    console.log(this.state);
    return (
      <div>
          <div className="jumbotron">
              <h1 className="display-3">My Books</h1>
          </div>
        <div className="container">
          <div className="row">
              <div className="col-md-3">
        <ul>
        {
           this.state.categories.map(
            (category, i) => {
            return <li><Link to={`${match.url}/${category}`}>{category}</Link></li>;
            // return <li><a href={`${match.url}/${category}`}> {category} </a></li>
           })
        }
           
            {/* <li><Link to={`${match.url}/css`}>CSS</Link></li> */}
            {/* <li><Link to={`${match.url}/react`}>React</Link></li> */}
        </ul>
              </div>
              <div className="col-md-9">
                  {/* <Route path={`${match.path}/html`} render={() => { return <h1>HTML by Ducket book</h1> }}/> */}
                  {/* <Route path={`${match.path}/html`} component={Categories}/> */}
                  {/* <Route path={`${match.path}/css`} render={() => { return <h1>CSS by Racheal Andrews</h1> }}/> */}
                  {/* <Route path={`${match.path}/react`} render={() => { return <h1>React by Fullstack.io book</h1> }}/> */}
                  <Route path={`${match.path}/:id`} component={Child} />
              </div>
          </div>
          </div>
      </div>
  );
  }
    
}
const Child = ({ match }) => (
    <div>
      <h3>URL ID parameter: {match.params.id}</h3>
    </div>
);
export default Books;