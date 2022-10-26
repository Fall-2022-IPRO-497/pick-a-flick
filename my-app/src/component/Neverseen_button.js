import movies from '../modules/movies'

export function click_neverseen(event, userDetails){
    event.preventDefault()
    var expect_movie_name = "dummyMovie4"
  
    var changed_obj = []
  
    function checkifusername(obj, email){
      if (obj.userEmail) {
        if (obj.userEmail === email) {
          return true
        }
      }
      return false
    }
  
    movies.getAll()
        .then(movies => {
            changed_obj = movies.filter(userObject => (checkifusername(userObject, userDetails.email)))
            update_data(changed_obj)
        })
  
    function find_same_movie(arr, obj_tofind) {
      for (var obj of arr) {
          if (obj.name === obj_tofind.name) {
              return true
          }
      }
      return false
    }
    
    function update_data(changed_obj){
      if (changed_obj && changed_obj.length > 1) {
          console.log("Error: More than one user with the same name detected!")
      } 
  
      else if (changed_obj.length === 0) {
          console.log("New user detected")
          
          const newUser = {
              userName: userDetails.name,
              userEmail: userDetails.email,
              like:[],
              dislike:[],
              unwatched:[{name: expect_movie_name}],
          }
          movies.create(newUser)
            .then(() => {
              console.log('Successfully added a new unwatched movie to the a new user history!')
          })
      }else{
        console.log("Updating unWatched Array for existing user")
        var oldObj = changed_obj[0]
        var oldUnwatch = oldObj.unwatched
        const add_unwatch_obj = {name: expect_movie_name}
        if (find_same_movie(oldUnwatch, add_unwatch_obj)) {
            console.log("Cannot add same unwatched movie!")
            return
        }
        oldUnwatch.push({name:expect_movie_name})
        var newUnwatch = oldUnwatch
       
        const newObj = {
          ...oldObj,
          unwatch: newUnwatch
        }
        movies.update(newObj)
          .then(() => {
            console.log('Successfully added a new unWatched movie to the existing user history!')
          })
      }   
  
    }
    
  
  }