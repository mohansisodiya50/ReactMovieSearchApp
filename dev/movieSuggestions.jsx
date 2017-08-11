import React, { Component } from 'react';
import ReactDOM from "react-dom";
import numeral  from "numeral";
import MovieDetails from './movieDetails.jsx';

class MovieSuggestions extends Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			data:'',
			showResults: false,
			total_results: '',
			id: '',
			movieTitle: this.props.movieTitle
		};
	}

  componentWillMount() {
  	document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  componentWillReceiveProps(nextProps) {
		if(nextProps.movieTitle !== '') {
			this.getMovieList(nextProps.movieTitle);
		}
		if(nextProps.movieTitle.length > 0 && this.state.total_results > 0 && nextProps.suggestionsVisisble) {
      this.setState({ showResults: true });
    } else {
      this.setState({ showResults: false });
    }
	}

	handleClick(e) {
		if(e.target.nodeName !== "INPUT") {
			this.setState({ showResults: false });
		}
	}

	getMovieList(value) {
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

  onItemClick(value, id) {
    this.setState({ movieTitle: value, id: id, showResults: false});
  }

	render() {
		var movieTitle = this.state.movieTitle, self = this, movieList;

		movieList =  _.map(this.state.data, function(obj) {
			if(_.includes(obj.title.toLowerCase(), movieTitle.toLowerCase().trim())) {
				return (<li className="suggestions" key={obj.id} id={obj.id} onClick={self.props.suggestionSelected}>{obj.title}</li>);
			}
		});

		return (
			<div className="">
				{self.state.showResults ? <ul className="suggestionDropDown">{movieList}</ul> : "" }
			</div>
		)
    }
}
export default MovieSuggestions
