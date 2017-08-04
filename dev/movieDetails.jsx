import React, { Component } from 'react';
import ReactDOM from "react-dom";
import numeral  from "numeral";

class MovieDetails extends Component{

	  constructor(props) {
	    super(props);
	    this.state = { data:'', showResults: false, total_results: 0};
	    this.getmovieDetails = this.getmovieDetails.bind(this);
			this.getmovieDetails(278927);
	  }

		componentWillReceiveProps(nextProps) {
			if(nextProps.movieId !== '') {
				this.getmovieDetails(nextProps.movieId);
			}
		}

	getmovieDetails(value) {
		var url = 'https://api.themoviedb.org/3/movie/' + parseInt(value) + '?api_key=989def4a1b101991db8e783b73ee7bd0&language=en-US',
			enteredMovie = value, results;

		fetch(url)
		.then((resp) => resp.json())
		.then((responseJson) => {
			this.setState({
			  title: responseJson.title,
			  overview: responseJson.overview,
			  release_date: responseJson.release_date,
			  vote_average: responseJson.vote_average,
			  poster_path: responseJson.poster_path,
			  runtime: responseJson.runtime,
			  revenue: responseJson.revenue
			});
		});
	}

	validations(value) {
		if(value === undefined || value === '' || value === 0) {
			return '--';
		} else {
			return value;
		}
	}

    render() {
		let posterIMG = 'https://image.tmdb.org/t/p/w342' + this.state.poster_path,
			data = this.state;

		data.revenue = this.validations(data.revenue);
		data.release_date = this.validations(data.release_date);
		data.runtime = this.validations(data.runtime);
		data.vote_average = this.validations(data.vote_average);

		if(data.revenue !== '--') {
			data.revenue = numeral(data.revenue).format('($0,0)');
		}
		if(data.poster_path === undefined || data.poster_path === null) {
			posterIMG = './No_Photo_Available.png';
		}

		return (
			<div className="detailsContainer">
				<img id="postertest" className='poster' src={posterIMG}/>
				<div className="detailsInfo">
					<h1>{data.title}</h1>
					<div className="movieOverview">{data.overview}</div>
					<div className="detailsDiv">Release date: <span>{data.release_date}</span></div>
					<div className="detailsDiv">Running Time: <span>{data.runtime}</span></div>
					<div className="detailsDiv">Vote Average: <span>{data.vote_average}</span></div>
					<div className="detailsDiv">Box Office: <span>{data.revenue}</span></div>
				</div>
			</div>
		)
    }
}
export default MovieDetails
