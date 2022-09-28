//import logo from './logo.PNG';
import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Home from './component/home_page';
import Rating from './component/rating_page';
import Recommendations from './component/recommendations_page';
import './App.css';
import Nav from 'react-bootstrap/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
           <div >
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
                 <Route exact path='/rating' element={< Rating />}></Route>
                 <Route exact path='/recommendation' element={< Recommendations />}></Route>
          </Routes>
          </div>  
        </Router>
      </div>
   );
  }
}

export default App;
