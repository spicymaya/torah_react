import React from 'react';
import { 
  Navbar,
  Nav, 
  NavItem,
  NavLink,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
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
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
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
     
    // console.log('state', this.state);
    });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render () {
    return (
      <HashRouter>
        <div className="container">
          <Navbar color="light" expand="lg">
            <NavbarBrand href="/">Torah</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
              {
                this.state.categories.map(
                  (category, item) => {
                    return <NavLink key={item}><Link to={`/${category}`}>{category}</Link></NavLink>;
                    
                })
                
              }
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Speakers
                  </DropdownToggle>
                  {
                    <DropdownMenu>
                      {
                        this.state.speakers.map(
                        (speaker, item) => {
                          return <DropdownItem key={item}><Link to={`/speakers/${speaker.speakerUri}`}>{speaker.speakerName}</Link></DropdownItem>;
                        })
                      }
                    </DropdownMenu>
                  }
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>

                
                <div className="col-md-9">
                    {/* <Route path={`${match.path}/react`} render={() => { return <h1>React by Fullstack.io book</h1> }}/> */}
                    <Route path={`/:id`} component={Category} />
                </div>
            </div>

      </HashRouter>   
  );
  }
    
}
const Category = ({ match, location })  => 
(
    <div>
      <h3>URL ID parameter: {match.params.id}</h3>
    </div>
);
const Speaker = ({ match, location }) => 
(
  <div>
    <h3>Speaker name: {match.params.speakerName}</h3>
  </div>
);
export default Categories;