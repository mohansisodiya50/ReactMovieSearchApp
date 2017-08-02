import React, { Component } from 'react';
import ReactDOM from "react-dom";
import numeral  from "numeral";

class MovieDetails extends Component{
	componentWillMount() {
	  document.addEventListener('click', this.handleClick, false);
	}

	componentWillUnmount() {
	  document.removeEventListener('click', this.handleClick, false);
	}

	validations(value) {
		if(value === undefined || value === '' || value === 0) {
			return '--';
		} else {
			return value;
		}
	}
	
    render() {
		let posterIMG = 'https://image.tmdb.org/t/p/w342' + this.props.data.poster_path,
			data = this.props.data;

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
					<h1>{this.props.data.title}</h1>
					<div className="movieOverview">{this.props.data.overview}</div>
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
