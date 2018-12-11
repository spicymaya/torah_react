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
<<<<<<< HEAD
      categories: [],
      speakers: []
||||||| merged common ancestors
      categories: [] 
=======
      categories: [] ,
      speakers: []
>>>>>>> 23f3d19d39c79adef8f2629c048ea3b8c2f0158e
    }
  }
  componentDidMount() {
<<<<<<< HEAD
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
||||||| merged common ancestors
    categories().then(categories => {
      console.log('categories', categories);
      this.setState = {
        categories 
      }
      console.log('state', this.state);
=======
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
>>>>>>> 23f3d19d39c79adef8f2629c048ea3b8c2f0158e
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
<<<<<<< HEAD
              (category, i) => {
                return <li key={i}><Link to={`/${category}`}>{category}</Link></li>;
||||||| merged common ancestors
              (category, i) => {
                return <li><Link to={`/${category}`}>{category}</Link></li>;
=======
              (category, item) => {
                return <li key={item}><Link to={`/${category}`}>{category}</Link></li>;
                
>>>>>>> 23f3d19d39c79adef8f2629c048ea3b8c2f0158e
            })
            
          }
<<<<<<< HEAD
            <ul>
            {
              this.state.speakers.map(
                (speaker, i) => {
                  return <li key={i}><Link to={`/${speaker.speakerUri}`}>{speaker.speakerName}</Link> <Button color="success">Danger!</Button></li>;
                })
              }
            </ul>
||||||| merged common ancestors
=======
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
>>>>>>> 23f3d19d39c79adef8f2629c048ea3b8c2f0158e
          </ul>

                </div>
                <div className="col-md-9">
                    {/* <Route path={`${match.path}/react`} render={() => { return <h1>React by Fullstack.io book</h1> }}/> */}
<<<<<<< HEAD
                    <Route path={`/:id`} component={Category} />
||||||| merged common ancestors
                    <Route path={`/:id`} component={Child} />
=======
                    <Route path={`/:id`} component={Category} />
                    <Route path={`/speakers/:speaker`} component={Speaker} />
>>>>>>> 23f3d19d39c79adef8f2629c048ea3b8c2f0158e
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
<<<<<<< HEAD
const Speaker = ({ match })  => (
  <div>
    <h3>Speaker name: {match.params.speakerName}</h3>
  </div>
);
||||||| merged common ancestors
=======
const Speaker = ({ match })  => (
    <div>
      <h3>URL ID parameter: {match.params.speaker}</h3>
    </div>
);
>>>>>>> 23f3d19d39c79adef8f2629c048ea3b8c2f0158e
export default Categories;