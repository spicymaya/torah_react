import React from 'react';
import { Button } from 'reactstrap';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    HashRouter
  } from 'react-router-dom';
  import categories from './lib/categories';
  import speakers from './lib/speakers';
  
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      speakers: []
    }
  }
  
  componentDidMount() {
    categories().then(categories => {
      this.setState ({
        categories 
      });
    });
    speakers().then(speakers => {
      this.setState ({
        speakers 
      });
      console.log('state', this.state);
    });
  }
  render () {
    return (
      <HashRouter>
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
                return <li key={i}><Link to={`/${category}`}>{category}</Link></li>;
            })
          }
            <ul>
            {
              this.state.speakers.map(
                (speaker, i) => {
                  return <li key={i}><Link to={`/${speaker.speakerUri}`}>{speaker.speakerName}</Link> <Button color="success">Danger!</Button></li>;
                })
              }
            </ul>
          </ul>
                </div>
                <div className="col-md-9">
                    {/* <Route path={`${match.path}/react`} render={() => { return <h1>React by Fullstack.io book</h1> }}/> */}
                    <Route path={`/:id`} component={Category} />
                </div>
            </div>
            </div>
        </div>
      </HashRouter>   
  );
  }
    
}
const Category = ({ match })  => (
    <div>
      <h3>URL ID parameter: {match.params.id}</h3>
    </div>
);
const Speaker = ({ match })  => (
  <div>
    <h3>Speaker name: {match.params.speakerName}</h3>
  </div>
);
export default Categories;