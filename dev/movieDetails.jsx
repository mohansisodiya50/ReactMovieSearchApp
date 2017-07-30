import React, { Component } from 'react';
import ReactDOM from "react-dom";

class HelloWorld extends Component{
componentWillMount() {
  document.addEventListener('click', this.handleClick, false);
}

componentWillUnmount() {
  document.removeEventListener('click', this.handleClick, false);
}
    render() {
     let posterIMG = 'https://image.tmdb.org/t/p/w342' + this.props.data.poster_path;
        return (
          <div className="detailsContainer">
          <div className="detailsInfo">
              <h1>{this.props.data.title}</h1>
              <p>{this.props.data.overview}</p>
              <div>Release date: <span>{this.props.data.release_date}</span></div>
              <div>Vote Average: <span>{this.props.data.vote_average}</span></div>
              <div>Running Time: <span>{this.props.data.runtime}</span></div>
              <div>Box Office: <span>{this.props.data.revenue}</span></div>
              <p>{this.props.poster_path}</p>
              </div>
              <div><img id="postertest" className='poster' src={posterIMG}/></div>
          </div>
        )
    }
}

export default HelloWorld
