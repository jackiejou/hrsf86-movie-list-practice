import React from 'react';

const MovieDetails = (props) => (
  <div className='details'>
    {props.movie.year}
  </div>
);

export default MovieDetails;
