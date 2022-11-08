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
function output_data(body) {
    console.log("Outputing data to a text file")
    const fs = require('fs')
    var data = 'UserName: '
    data += body.userName
    data += '\n'
    data += 'UserEmail: '
    data += body.userEmail
    data += '\n'
    data += 'Dislike: ['
    for (var movie of body.dislike) {
        data += movie.name
        data += ' '
    }
    data += ']\n'
    data += 'Like: ['
    for (var movie of body.like) {
        data += movie.name
        data += ' '
    }
    data += ']\n'
    data += 'Unwatched: ['
    for (var movie of body.unwatched) {
        data += movie.name
        data += ' '
    }
    data += ']'

    fs.writeFile('./algorithm/data.txt', data, (err) =>  {
        if (err) throw err;
      })

}
app.post('/api/movies/', (req, res) => {
    console.log("get in post")
    const body = req.body
    output_data(body)
    const object = {
        userName: body.userName,
        userEmail: body.userEmail,
        like: body.like,
        dislike: body.dislike,
        unwatched: body.unwatched,
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
    output_data(body)
    Movie.findByIdAndUpdate({_id: req.params.id },
    {
        "$set": {
            userName: body.userName,
            userEmail: body.userEmail,
            like: body.like,
            dislike: body.dislike,
            unwatched: body.unwatched
        }
    }, {new : true})
    .then(updatedMovie => {
        res.json(updatedMovie)
    })
    .catch(error => console.log(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})