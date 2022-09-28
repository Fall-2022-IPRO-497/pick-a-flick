//import logo from './logo.PNG';
import LikeButton from './component/Like_button'
import DislikeButton from './component/Dislike_button'
import PassButton from './component/Pass_button'
import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Home from './component/home_page';
import Rating from './component/rating_page';
import Recommendations from './component/recommendations_page';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
           <div >
            <ul className="App-header">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/rating">Rate Movies!</Link>
              </li>
              <li>
                <Link to="/recommendation">See Your Recommendations</Link>
              </li>
            </ul>
           <Routes>
                 <Route exact path='/home' element={< Home />}></Route>
                 <Route exact path='/rating' element={< Rating />}></Route>
                 <Route exact path='/recommendation' element={< Recommendations />}></Route>
          </Routes>
          </div>  
        </Router>
        <div classname = 'button-container'>
          <LikeButton className="button"/>
          <PassButton className="button"/>
          <DislikeButton className="button"/>
        </div>
      </div>
   );
  }
}

export default App;
