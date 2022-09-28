import React from 'react';
import Button from 'react-bootstrap/Button';



 function Rating(){
    return (
    <div>
        <h1>Welcome to the Rating page!</h1>
        
        <div classname = 'button-container'>
          <Button variant="success">  Like </Button>{' '}
          <Button variant="secondary">Haven't Seen</Button>{' '}
          <Button variant="danger">Dislike</Button>{' '}
        </div>
    </div>
    );

}

export default Rating;
