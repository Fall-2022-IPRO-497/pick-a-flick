import React from 'react'
import Image from 'react-bootstrap/Image'
import logo from './logo.PNG'



 function Home(){
    return (
        <div>
            <h1>Welcome to the Home page!</h1>
            <Image src = {logo}></Image>
        </div>
    
    );
}

export default Home;
