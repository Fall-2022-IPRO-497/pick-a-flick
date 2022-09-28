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
    const movie = new Movie({
        movieName: "Test"
    })
    movie.save()
        .then(savedMovie => {
            res.json(savedMovie)
        })
        .catch(error => console.log(error))
})

app.delete('/api/movies/:id', (req, res) => {
    console.log(req.params.id)
    Movie.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => console.log(error))
})

app.put('/api/movies/:id', (req, res) => {
    console.log("Update: need to know schema before adding actual logic")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})