import React from 'react';
import Button from 'react-bootstrap/Button';
import MovieCard from './movie_card';
import './rating_page.css'
import thumbsUp from './thumbs-up.png';
import thumbsDown from './thumbs-down.png';
import Image from 'react-bootstrap/Image'
import movies from '../modules/movies.js'

const click_like = (event) => {
  event.preventDefault()
  console.log("Get in click_like event")
  var expect_user = "dummyUser4"
  var expect_movie_name = "dummyMovie"

  var changed_obj = []

  function checkifusername(obj, expect_user){
    if (obj.userName) {
      if (obj.userName === expect_user) {
        return true
      }
    }
    return false
  }

  movies.getAll()
      .then(movies => {
          changed_obj = movies.filter(e => (checkifusername(e, expect_user)))
          update_data(changed_obj)
      })

  
  function update_data(changed_obj){
    if (changed_obj && changed_obj.length > 1) {
        console.log("Error:More than one user with the same name detected!")
    } 
    else if (changed_obj.length === 0) {
        console.log("New user detected. Adding new information to the database!")
        const newUser = {
            userName: expect_user,
            like:[{name:expect_movie_name}],
            dislike:[],
            unwatched:[],
        }
        movies.create(newUser)
          .then(movies => {
            console.log('Added a new liked movie to the a new user history!')
            console.log(movies)
        })
    }else{
      console.log("length is "+ changed_obj.length)
      var oldObj = changed_obj[0]
      var oldLike = oldObj.like
      
      oldLike.push({name:expect_movie_name, _id:(oldLike.length+1).toString()})
      var newLike = oldLike
      console.log("newLike is " + newLike)
     
      
      const newObj = {
        ...oldObj,
        like: newLike
      }
      console.log(newObj)

      movies.update(newObj)
        .then(newObj => {
          console.log('Added a new liked movie to the existing user history!')
          console.log(newObj)
        })
    }   

  }
  

}

 function Rating(){
    return (
    <div>
        <MovieCard></MovieCard>
        <div classname = 'button-container'>
          <Button variant="success" ><Image className='thumb-button' src = {thumbsUp} onClick = {click_like} fluid={true}></Image></Button>{' '}
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
