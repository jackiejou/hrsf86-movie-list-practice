import React from 'react';

const MovieDetails = (props) => (
  <div className='details'>
    <img className='poster' src={'https://image.tmdb.org/t/p/w1280/' + props.movie.poster_path}/>
    <div className='detailtext'>
      <div className='text'>
        {props.movie.overview}
      </div>
      <div className='year'>
        Released on {props.movie.release_date}
      </div>
    </div>
  </div>
);

export default MovieDetails;
