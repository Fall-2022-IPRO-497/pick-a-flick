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

export default function App() {
  const [userDetails, setUserDetails] = useState(null)
    
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


  function handleCallbackResponse(response) {
    const user = jwt_decode(response.credential)
    setUserDetails({
      name: user.name,
      email: user.email
    })
    window.localStorage.setItem('userDetailsKey', JSON.stringify({name: user.name, email: user.email}));
  }

  function logOut() {
    window.localStorage.removeItem('userDetailsKey')
    setUserDetails(null)
  }
  
  return (
    <div className="App">
      {userDetails ? <button onClick={logOut}>Log Out</button> : <div id="signInDiv"></div>}
      <Router>
        <div>
          <Nav className="justify-content-center" activeKey="/home">
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
              <Route exact path='/home' element={< Home />}></Route>
              <Route exact path='/rating' element={< Rating userDetails={userDetails} />}></Route>
              <Route exact path='/recommendation' element={< Recommendations />}></Route>
            </Routes>
        </div>  
      </Router>
    </div>
  )
}
