import React from 'react';
import Button from 'react-bootstrap/Button';
import MovieCard from './movie_card';
import './rating_page.css'



 function Rating(){
    return (
    <div>
        <MovieCard></MovieCard>
        <div classname = 'button-container'>
          <Button variant="success">  Like </Button>{' '}
          <Button variant="secondary">Haven't Seen</Button>{' '}
          <Button variant="danger">Dislike</Button>{' '}
        </div>
    </div>
    );

}

export default Rating;
