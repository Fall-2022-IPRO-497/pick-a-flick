import movies from '../modules/movies'

export function click_dislike(event){
    event.preventDefault()
    var expect_user = "dummyUser1"
    var expect_movie_name = "dummyMovie3"
  
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
            if (obj.name === obj_tofind.name) {
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
              dislike:[{name:expect_movie_name}],
              unwatched:[],
          }
          movies.create(newUser)
            .then(movies => {
              console.log('Successfully added a new disliked movie to the a new user history!')
              console.log(movies)
          })
      }else{
        console.log("Updating Dislike Array for existing user")
        var oldObj = changed_obj[0]
        var oldDislike = oldObj.dislike
        const add_dislike_obj = {name: expect_movie_name}
        if (find_same_movie(oldDislike, add_dislike_obj)) {
            console.log("Cannot add same disliked movie!")
            return
        }
        oldDislike.push({name:expect_movie_name})
        var newDislike = oldDislike
       
        const newObj = {
          ...oldObj,
          dislike: newDislike
        }
        movies.update(newObj)
          .then(newObj => {
            console.log('Successfully added a new Disliked movie to the existing user history!')
            console.log(newObj)
          })
      }   
  
    }
    
  
  }