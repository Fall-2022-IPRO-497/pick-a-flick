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

 function Rating({userDetails}){
    console.log("in rating->", userDetails)
    return (
    <div>
        <MovieCard></MovieCard>
        <div>
          <Button variant="success" ><Image className='thumb-button' src = {thumbsUp} onClick = {event => click_like(event, userDetails)} fluid={true}></Image></Button>{' '}
          <Button variant="secondary" onClick = {event => click_neverseen(event, userDetails)}>Havent Seen It</Button>{' '}
          <Button variant="danger" ><Image  className='thumb-button' src = {thumbsDown} onClick = {event => click_dislike(event, userDetails)}fluid={true}></Image></Button>{' '}
        </div>
    </div>
    );
}

export default Rating;
