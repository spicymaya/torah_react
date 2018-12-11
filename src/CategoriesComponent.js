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
  import speakers from './lib/speakers';
  
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [] ,
      speakers: []
    }
  }
  componentDidMount() {
    speakers().then((speakers) => {
      this.setState({
        speakers
      })
    });
    categories().then((categories) => {
      this.setState({
        categories
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
              (category, item) => {
                return <li key={item}><Link to={`/${category}`}>{category}</Link></li>;
                
            })
            
          }
            <li> Speakers
              {
                <ul>
                  {
                    this.state.speakers.map(
                    (speaker, item) => {
                      return <li key={item}><Link to={`/speakers/${speaker.speakerUri}`}>{speaker.speakerName}</Link></li>;
                    });
                  }
                </ul>
              }
            </li>
          </ul>

                </div>
                <div className="col-md-9">
                    {/* <Route path={`${match.path}/react`} render={() => { return <h1>React by Fullstack.io book</h1> }}/> */}
                    <Route path={`/:id`} component={Category} />
                    <Route path={`/speakers/:speaker`} component={Speaker} />
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
      <h3>URL ID parameter: {match.params.speaker}</h3>
    </div>
);
export default Categories;