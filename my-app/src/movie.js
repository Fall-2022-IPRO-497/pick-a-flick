import React, {Component} from "react"
import PopularMoviesList from './popular_movies_list.js'

export default class Movie extends Component {

	state = {
		movies: {},
		searchTerm: ""
	}


	// function when the PopularMoviesList loads movies
	handleMovies = (error, movies) => {
		this.setState({
			movies: movies
		})
	}

	onSearchTermChange = (searchTerm) => {
		this.setState({
			searchTerm: searchTerm
		})

	}

	render = () => {
		return (
				<div className="container">
					<PopularMoviesList onMovies={this.handleMovies} />
				</div>
			)
	}
}