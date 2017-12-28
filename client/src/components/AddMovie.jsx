import React from 'react';

const AddMovie = props => (
  <div>
    <input type='text' placeholder='Add a movie' value={props.state.addValue} onChange={props.onChange}/>
    <button onClick={props.handleAddMovie}>Add</button>
  </div>
);

export default AddMovie;
