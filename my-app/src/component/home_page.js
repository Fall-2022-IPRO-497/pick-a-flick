import React from 'react'
import Image from 'react-bootstrap/Image'
import logo from './logo.PNG'



 function Home({userDetails}){
    console.log("userDetails ->", userDetails)
    return (
        <div>
            <h1>{userDetails ? "Welcome Back! " + userDetails.name : "Welcome!\n Please sign in for customized experience!"}</h1>
        </div>
    
    );
}

export default Home;
