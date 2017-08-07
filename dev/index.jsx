import React, { Component } from 'react';
import ReactDOM from "react-dom";
import _ from 'lodash';
import MovieDetails from './movieDetails.jsx';
import MovieSuggestions from './movieSuggestions.jsx';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieId: '',
      movieTitle: '',
      suggestionsVisisble: true
    };
    this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this);
  }

  handleSuggestionSelected(ev) {
    this.setState({
      movieId: ev.target.id,
      suggestionsVisisble: false,
      movieTitle: ev.target.textContent,
    });
  }

  onInputChange(value) {
    this.setState({ movieTitle: value, suggestionsVisisble: true });
  }

  render() {
    return (
      <div>
        <div  className="searchBar">
          <input className="movieInput" placeholder="Search Movie..."  value={this.state.movieTitle} onInput={event => this.onInputChange(event.target.value)} />
        </div>
        <MovieSuggestions suggestionsVisisble={this.state.suggestionsVisisble} suggestionSelected={this.handleSuggestionSelected} movieTitle={ this.state.movieTitle }/>
        <MovieDetails movieId={this.state.movieId }/>
      </div>
    );
  }
}

export default Index
