const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())
require('dotenv').config()

const Movie = require('./models/movies')

app.get('/api/movies', (req, res) => {
    
    Movie.find({})
      .then(movies => {
        res.json(movies)
      })
      .catch(error => console.log(error))
})

app.post('/api/movies/', (req, res) => {
    console.log("get in post")
    const object = {
        userName: req.body.userName,
        like: req.body.like,
        dislike: req.body.dislike,
        unwatched: req.body.unwatched,
    }
    const movie = new Movie(object)
    movie.save()
        .then(savedMovie => {
            res.json(savedMovie)
        })
        .catch(error => console.log(error))
})

app.delete('/api/movies/:id', (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => console.log(error))
})

app.put('/api/movies/:id', (req, res) => {
    console.log("get in put")
    const body = req.body
    console.log("req body is " + body)
    Movie.findByIdAndUpdate({_id: req.params.id },
    {
        "$set": {
            userName: body.userName,
            like: body.like,
            dislike: body.dislike,
            unwatched: body.unwatched
        }
    }, {new : true})
    .then(updatedMovie => res.json(updatedMovie))
    .catch(error => console.log(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})