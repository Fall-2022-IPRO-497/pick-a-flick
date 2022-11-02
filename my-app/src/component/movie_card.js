import moviePosterEx from './RevengeOfTheSith.jpg';
import './movie_card.css';
import Image from 'react-bootstrap/Image'
import PropTypes from 'prop-types';
import MovieDetails from '../get_movie_details';


function MovieCard() {

    var test = [354912, 760161, 436270, 642885, 616820, 718930, 916605]

    if (1 == 0){
        return (
            <div className='movie-card-container'>
                <div >
                    <Image className='movie-card-image' src={moviePosterEx} fluid={true} ></Image>
                    <h1>Star Wars: Episode III - Revenge of the Sith</h1>
                    <h2>Year Released: 2005 </h2>
                    <h2>Genre: Action/Sci-Fi</h2>
                    <h3>Run Time: 2h 20m</h3>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <MovieDetails id = {test[0]}/>
            </div>
        );
    }
    
}

export default MovieCard;