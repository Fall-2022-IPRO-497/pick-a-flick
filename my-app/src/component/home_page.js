import React from 'react'

 function Home({userDetails}){
    console.log("userDetails ->", userDetails)
    return (
        <div>
            <h1>{userDetails ? "Welcome Back! " + userDetails.userName : "Welcome!\n Please sign in for customized experience!"}</h1>
        </div>
    
    );
}

export default Home;
