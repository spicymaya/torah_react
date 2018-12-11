export default () => {
  return fetch('http://apps.wearetouro.com/api/torahSubcategories/catsSubcats%7CtouroMain')
  .then((response) => {
      return response.json();
  })
  .then((data) => {
      //console.log(data);
      let categoriesRepeated = [];
      data.forEach(function(item){
        categoriesRepeated.push(item.categoryValue);

      });
      var categories = categoriesRepeated.filter(function(item, index){
        return categoriesRepeated.indexOf(item) >= index;
      });
      //console.log(categories);
      return categories;
  });
}