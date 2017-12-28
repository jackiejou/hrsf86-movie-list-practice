import React from 'react';

const Search = props => (
  <div>
    <input type='search' value={props.state.searchValue} placeholder='Search' onChange={props.onChange}/>
  </div>
);

export default Search;
