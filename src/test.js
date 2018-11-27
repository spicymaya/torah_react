import React from 'react';
import ReactDOM from 'react-dom';
class Card extends React.Component {
    render(){
      return (
        <div className="card">
          <p>{this.props.name}</p>
        </div>
      )
    }
  }
  
  class Test extends React.Component {
  
      // fires before component is mounted
      constructor(props) {
          
          // makes this refer to this component
          super(props);
  
          // set local state
          this.state = {
              name: "Michael"
          };
  
      }
  
      render() {
        const {name} = this.state; 
        return (
          <div>  
            <h1>This pen belongs to:</h1>
            <Card name={name} />
          </div>
        )
      }
  }
