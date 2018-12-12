import React from 'react';
import categories from './lib/categories';
const Category = ({ match, location })  => 
(
    <div>
      <h3>URL ID parameter: {match.params.category}</h3>
    </div>
);
export default Category;