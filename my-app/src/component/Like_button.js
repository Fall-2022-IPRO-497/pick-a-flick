import React from 'react'


export default function LikeButton(props){

    return(
        <div className="LikeButton">
            <div>
            <button type="button" onclick="alert('liked button')">Like</button>
            </div>    
        </div>
    )
}