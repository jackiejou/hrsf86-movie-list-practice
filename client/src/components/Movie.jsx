import React from 'react';
import MovieDetails from './MovieDetails.jsx';

const Movie = props => {
  let toggleWatch = event => {
    props.handleWatch(props.index);
    event.stopPropagation();
  };
  let toggleDetails = () => {
    props.handleToggle(props.index);
  };

  return (
    <div className='movie'>
      <div className='watched'>
        <input type='checkbox' onChange={toggleWatch} checked={props.movie.watched}/>
        {props.movie.watched ? 'Watched' : ''}
      </div>
      <div className='movietext' onClick={toggleDetails}>
        {props.movie.title}
      </div>
      <div>
        {props.movie.show ? <MovieDetails movie={props.movie}/> : ''}
      </div>
    </div>
  );
};

export default Movie;
