import React, { Component } from 'react';
import ReactDOM from "react-dom";
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import HelloWorld from './movieDetails.jsx';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { data:'',  showResults: false, total_results: 0, releaseDate: '', id: '', list: '', term: '', sendMovieQuery: _.debounce((value) => {this.getMovie(value)}, 100)};
    this.getMovie = this.getMovie.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick(e) {
    if(e.target.nodeName !== "LI" && e.target.nodeName !== "INPUT") {
      this.setState({ showResults: false });
    }
  }

  getMovie(value) {
    var url = 'https://api.themoviedb.org/3/search/movie?query=' + value + '&api_key=989def4a1b101991db8e783b73ee7bd0';
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.total_results == 0) {
            this.setState({ showResults: false, total_results: responseJson.total_results });
          }
      this.setState({data: responseJson.results, total_results: responseJson.total_results });
    })
  }

  movieDetails(value) {
    var url = 'https://api.themoviedb.org/3/movie/' + parseInt(value) + '?api_key=989def4a1b101991db8e783b73ee7bd0&language=en-US';

    //jQuery("#mm").html("");
      var enteredMovie = value, results;

      fetch(url)
      .then((resp) => resp.json())
      .then((responseJson) => {
        this.setState({
          title: responseJson.title.toUpperCase(),
          overview: responseJson.overview,
          release_date: responseJson.release_date,
          vote_average: responseJson.vote_average,
          poster_path: responseJson.poster_path,
          runtime: responseJson.runtime,
          revenue: responseJson.revenue,
          repeatTitle: responseJson.title
        });
      });
  this.setState({ showResults: false });
  }

  componentDidMount() {
    this.movieDetails(278927);
  }

  onInputChange(value) {
    if(value.length > 0 && this.state.total_results > 0) {
      this.setState({ showResults: true });
    } else {
    this.setState({ showResults: false });
    }
    this.setState({ term: value });
    this.getMovie(value);
  }

  onItemClick(value, id) {
    this.setState({ term: value, id: id});
    this.movieDetails(id);
  }

  render() {
    var term = this.state.term, self = this;

    var movieList =  _.map(this.state.data, function(obj) {
      if(_.includes(obj.title.toLowerCase(), term.toLowerCase().trim())) {
        return (<li className="suggestions" key={obj.id} id={obj.id} onClick={event => self.onItemClick(obj.title, obj.id)}>{obj.title}</li>);
      }
    });

    return (
      <div>
        <div  className="searchBar">
          <input className="movieInput" placeholder="Search Movie..."  value={this.state.term} id={this.state.id} onInput={event => this.onInputChange(event.target.value)} />
          {self.state.showResults ? <ul className="suggestionDropDown">{movieList}</ul> : "" }
        </div>
          <HelloWorld data={this.state}/>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Search />
  </div>,
  document.querySelector("#container")
);
