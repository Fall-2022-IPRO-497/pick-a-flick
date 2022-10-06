import React from 'react'
import movies from '../modules/movies'

export default function LikeButton(props){
    var expect_user = "dummyUser"
    var expect_movie_name = "dummyMovie"
    

    const click_like = (event) => {
        event.preventDefault()

        var changed_obj
        var rest_obj

        movies.getAll()
            .then(userobj_arr => {

                changed_obj = userobj_arr.filter(obj => obj.userName == expect_user)
                rest_obj = userobj_arr.filter(obj => obj.userName != expect_user)
        
            })

        if (changed_obj.length > 1) {
            console.log("Error:More than one user with the same name detected!")
            return
        } 
        if (changed_obj.length == 0) {
            console.log("New user detected. Adding new information to the database!")
            const newUser = {
                userName: expect_user,
                like:[],
                dislike:[],
                unwatched:[],
            }
            changed_obj.push(newUser)
        }

        changed_obj[0].LikeButton.push(expect_movie_name)

        movies.update(rest_obj.concat(changed_obj))
            .then(console.log('Added a new liked movie to the user history!'))
    }


    return(
        <div className="LikeButton">
            <div>
            <button type="button" onclick={click_like}>Like</button>
            </div>    
        </div>
    )
}