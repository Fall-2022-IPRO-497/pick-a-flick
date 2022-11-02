import React from 'react';
import Button from 'react-bootstrap/Button';
import MovieCard from './movie_card';
import './rating_page.css'
import thumbsUp from './thumbs-up.png';
import thumbsDown from './thumbs-down.png';
import Image from 'react-bootstrap/Image'
import {click_like} from './Like_button.js'
import {click_dislike} from './Dislike_button.js'
import {click_neverseen} from './Neverseen_button.js'

 function Rating({userDetails, updateMovieRating}){
    return (
    <div>
        <MovieCard></MovieCard>
        <div classname = 'button-container'>
          <Button variant="success" ><Image className='thumb-button' src = {thumbsUp} onClick = {event => updateMovieRating(event, userDetails, "like")} fluid={true}></Image></Button>{' '}
          <Button variant="secondary" onClick = {event => updateMovieRating(event, userDetails, "unwatched")}>Havent Seen It</Button>{' '}
          <Button variant="danger" ><Image  className='thumb-button' src = {thumbsDown} onClick = {event => updateMovieRating(event, userDetails, "dislike")}fluid={true}></Image></Button>{' '}
        </div>
    </div>
    );
}

export default Rating;
