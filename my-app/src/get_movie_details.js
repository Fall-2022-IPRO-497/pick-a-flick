import React from "react"
import theMovieDb from  './moviedb.js'
import { useEffect, useState } from "react";
import './get_movie_details.css';

export default function MovieDetails(props){

    var [details, setDetails] = useState();
    var [url, setUrl] = useState();
    var [year, setYear] = useState();
    var [genres, setGenres] = useState();
    var [overview, setOverview] = useState();
    var [voteAverage, setVoteAverage] = useState();
    var [popularity, setPopularity] = useState()
    useEffect(() => GetMovieDetails(props.id), [props.id]);

    function GetMovieDetails(id) {

        theMovieDb.movies.getById({
    
            "id" : id
            
        }, function( data ) {
            data = JSON.parse( data );
            setDetails(data)
            setUrl("https://image.tmdb.org/t/p/original/" + data.poster_path)
            setGenres(data.genres[0].name + "/" + data.genres[1].name)
            setOverview(data.overview)
            setYear((data.release_date).substring(0,4))
            setPopularity(data.popularity)
            setVoteAverage(data.vote_average)
        }, function( err ) {
            console.error(err)
        });
    }

    //poster url example:  https://image.tmdb.org/t/p/original//3zXceNTtyj5FLjwQXuPvLYK5YYL.jpg
    return (
        <div className='movie-card-container'>
            <div >
                <img className = 'movie-poster' src = {url} alt={"new"}/>
                <h1>{details?.title}</h1>
                <h2>{year}  {genres}</h2>
                <h4 className = 'overview'>{overview}</h4>
            </div>
        </div>
    );
}