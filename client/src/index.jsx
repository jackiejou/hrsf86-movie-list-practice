import React from 'react';
import ReactDOM  from 'react-dom';
import Search from './components/Search.jsx';
import AddMovie from './components/AddMovie.jsx';
import Movie from './components/Movie.jsx';
const http = require('http');

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: props.movies,
      filter: function() {return true},
      searchFilter: function() {return true},
      searchValue: '',
      addValue: '',
    }
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleWatch = this.handleWatch.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
  }
  handleFilterClick(event) {
    if (event.target.value === 'watched') {
      this.setState({filter: function (movie) {return movie.watched}});
    } else if (event.target.value === 'towatch') {
      this.setState({filter: function (movie) {return !movie.watched}});
    } else {
      this.setState({filter: function () {return true}});
    }
  }
  handleWatch(index) {
    let arr = this.state.movies.slice();
    arr[index].watched = !arr[index].watched;
    this.setState({movies: arr});
  }
  handleToggle(index) {
    let arr = this.state.movies.slice();
    arr[index].show = !arr[index].show;
    this.setState({movies: arr});
  }
  handleSearchChange(event) {
    this.setState({searchValue: event.target.value});
    let regex = new RegExp('\\w*' + event.target.value + '\\w*', 'i');
    this.setState({searchFilter: function(movie) {return regex.test(movie.title)}});
  }
  handleAddChange(event) {
    this.setState({addValue: event.target.value});
  }
  handleAddMovie() {
    let arr = this.state.movies.slice();
    // post request
    let options = {
      host: '127.0.0.1',
      port: 3000,
      path: '/movies',
      method: 'POST'
    };
    let req = http.request(options, res => {
      res.on('data', results => {
        arr.push(JSON.parse(results));
      });
      res.on('end', () => {
        this.setState({movies: arr});
      });
    });
    req.write(this.state.addValue);
    req.end();
    this.setState({addValue: ''});
  }

  render() {
    return (
      <div>
        <form>
          <div>
            Filter:
            <label>
              <input type="radio" id="filter1" name="filter" value="all" onClick={this.handleFilterClick} defaultChecked/>
              All
            </label>
            <label>
              <input type="radio" id="filter2" name="filter" value="watched" onClick={this.handleFilterClick}/>
              Watched
            </label>
            <label>
              <input type="radio" id="filter3" name="filter" value="towatch" onClick={this.handleFilterClick}/>
              To watch
            </label>
          </div>
        </form>
        <br/>
        <Search state={this.state} onChange={this.handleSearchChange}/>
        <br/>
        <div className='movies'>
          {this.state.movies.filter(this.state.filter).filter(this.state.searchFilter).map((movie, index) =>
            <Movie key={index} movie={movie} index={index} handleWatch={this.handleWatch} handleToggle={this.handleToggle}/>
          )}
        </div>
        <br/>
        <AddMovie state={this.state} onChange={this.handleAddChange} handleAddMovie={this.handleAddMovie}/>
      </div>
    )
  }
}

http.get('http://127.0.0.1:3000/load', (res) => {
  res.on('data', (results) => {
    var data = JSON.parse('' + results);
    ReactDOM.render( <MovieList movies={data} />, document.getElementById('app'));
  });
});
