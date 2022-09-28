import React from 'react';
import Button from 'react-bootstrap/Button';
import MovieCard from './movie_card';
import './rating_page.css'
import thumbsUp from './thumbs-up.png';
import thumbsDown from './thumbs-down.png';
import Image from 'react-bootstrap/Image'

 function Rating(){
    return (
    <div>
        <MovieCard></MovieCard>
        <div classname = 'button-container'>
          <Button variant="success" ><Image className='thumb-button' src = {thumbsUp} fluid={true}></Image></Button>{' '}
          <Button variant="secondary">Havent Seen It</Button>{' '}
          <Button variant="danger" ><Image  className='thumb-button' src = {thumbsDown} fluid={true}></Image></Button>{' '}
        </div>
    </div>
    );

    /*
    function thumbsUpClicked (){
      // do stuff

    }

    function thumbsDownClicked (){
      //do stuff
    }

    function seenItClicked (){
      //do stuff
    }*/

}

export default Rating;
