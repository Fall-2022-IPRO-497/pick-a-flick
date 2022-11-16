import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Home from './component/home_page';
import Rating from './component/rating_page';
import Recommendations from './component/recommendations_page';
import './App.css';
import Nav from 'react-bootstrap/Nav'
import movies from './modules/movies.js'
import jwt_decode from 'jwt-decode'
import Image from 'react-bootstrap/Image'
import logo from './cropped_logo.png'

export default function App() {
  const [userDetails, setUserDetails] = useState(null)
  const [movieId, setMovieId] = useState(354912)
  const [movieInformation, setMovieInformation] = useState(null)
  var test = [354912, 760161, 436270, 642885, 616820, 718930, 916605]

    
  useEffect(() => {
    const userDetailsObject = window.localStorage.getItem('userDetailsKey')
    if (userDetailsObject && !userDetails) {
      setUserDetails(JSON.parse(userDetailsObject))
    } else {
      /* global google */
      google.accounts.id.initialize({
      client_id: "947709340210-hceb2ua2gtelguedq4620h8fvdgckvai.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
  

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )}
  }, [userDetails])


  function getNewMovieId() {
    setMovieId(test[Math.floor(Math.random() * test.length)])
  }

  function handleCallbackResponse(response) {
    const user = jwt_decode(response.credential)
    let userData = []
    
    movies.getAll()
      .then(dataEntries => {
        userData = dataEntries.filter(userDataEntry => user.name === userDataEntry.userName)
        if (userData.length === 0) {
          movies.create({userName: user.name, userEmail: user.email, like: [], dislike: [], unwatched: []})
            .then(returnedUser => {
              console.log(returnedUser)
              window.localStorage.setItem('userDetailsKey', JSON.stringify(returnedUser))
              setUserDetails(returnedUser)
          })
        } else {
          window.localStorage.setItem('userDetailsKey', JSON.stringify(userData[0]))
          setUserDetails(userData[0])
        }
      })
  }

  function logOut() {
    window.localStorage.removeItem('userDetailsKey')
    setUserDetails(null)
  }

  function updateMovieRating(event, userDetails, category) {
    event.preventDefault()
    let movieObject = {
      name: movieInformation.details.title,
      voteAverage: movieInformation.voteAverage,
      popularity: movieInformation.popularity,
      year: movieInformation.year,
      genres: movieInformation.genres
    }
    console.log(movieObject)
    var updateData = []

    movies.getAll()
      .then(dataEntries => {
        updateData = dataEntries.filter(userDataEntry => userDataEntry.userEmail === userDetails.userEmail)
          let oldCategory = category === "like" ? updateData[0].like : (category === "dislike" ? updateData[0].dislike : updateData[0].unwatched)
          if (!oldCategory.find(movie => movie.name === movieObject.name)) {
            category === "like" ? updateData[0].like.push(movieObject) : (category === "dislike" ? updateData[0].dislike.push(movieObject) : updateData[0].unwatched.push(movieObject))
            movies.update(updateData[0])
              .then(returnedUser => {
                window.localStorage.setItem('userDetailsKey', JSON.stringify(returnedUser))
                setUserDetails(returnedUser)
              })
          } 
      })
    getNewMovieId()
  }
  
  return (
    <div className="App">
      <Image src = {logo}></Image>
      {userDetails ? <button onClick={logOut}>Log Out</button> : <div id="signInDiv"></div>}
      <Router>
        <div>
          <Nav varient = "tab" className="justify-content-center" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/rating">Rating</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/recommendation">Recommendations</Nav.Link>
              </Nav.Item>
            </Nav>
            <Routes>
              <Route exact path='/home' element={< Home userDetails={userDetails}/>}></Route>
              <Route exact path='/rating' element={< Rating 
                movie_id={movieId} userDetails={userDetails} 
                updateMovieRating={updateMovieRating} 
                movieInformation={movieInformation} 
                setMovieInformation={setMovieInformation}/>}></Route>
              <Route exact path='/recommendation' element={< Recommendations />}></Route>
            </Routes>
        </div>  
      </Router>
    </div>
  )
}
