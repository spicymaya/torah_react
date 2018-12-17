import React from 'react';
import getCategoryResults from './lib/getCategoryResults';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
  }
  getCategories(category) {
    getCategoryResults(category).then(results => {
      this.setState({
        results
      })
    });  
  }
  componentDidMount() {
    const {match} = this.props;
    this.getCategories(match.params.category); 
  }
  componentWillUpdate(prevProps){
    const {match} = this.props;
    if (this.props.match !== prevProps.match) {
      this.getCategories(match.params.category);
    }
  }
  render() {
    const {match} = this.props;
    return (
      <ul>
        {
          this.state.results.map(
            (result, index) => {
              return <h1>{result.title}</h1>;
              
          })
        }
      </ul>
      
        
      
    );
  }
}
export default Category;