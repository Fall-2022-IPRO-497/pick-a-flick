import movies from '../modules/movies'

export function click_neverseen(event){
    event.preventDefault()
    var expect_user = "dummyUser4"
    var expect_movie_name = "dummyMovie"
  
    var changed_obj = []
  
    function checkifusername(obj, expect_user){
      if (obj.userName) {
        if (obj.userName === expect_user) {
          return true
        }
      }
      return false
    }
  
    movies.getAll()
        .then(movies => {
            changed_obj = movies.filter(e => (checkifusername(e, expect_user)))
            update_data(changed_obj)
        })
  
    function find_same_movie(arr, obj_tofind) {
      for (var obj of arr) {
          if (obj.userName === obj_tofind.userName) {
              return true
          }
      }
      return false
  }
    
    function update_data(changed_obj){
      if (changed_obj && changed_obj.length > 1) {
          console.log("Error:More than one user with the same name detected!")
      } 
  
      else if (changed_obj.length === 0) {
          console.log("New user detected")
          
          const newUser = {
              userName: expect_user,
              like:[],
              dislike:[],
              unwatched:[{name: expect_movie_name}],
          }
          movies.create(newUser)
            .then(movies => {
              console.log('Successfully added a new unwatched movie to the a new user history!')
              console.log(movies)
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
          .then(newObj => {
            console.log('Successfully added a new unWatched movie to the existing user history!')
            console.log(newObj)
          })
      }   
  
    }
    
  
  }