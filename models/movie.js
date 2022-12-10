//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")

////////////////////////////////////////////////
// Movies Model
////////////////////////////////////////////////
const {Schema, model} = mongoose // destructuring

// Make genre schema
const genreSchema = new Schema ({
    name: String,
    movies: [{type: mongoose.Types.ObjectId, ref:"Movie"}]
})

// Make movie schema
const movieSchema = new Schema ({
    title: String,
    notes: String,
    genre: genreSchema,
}, {timestamps: true})

// Make movie model
const Movie = model("Movie", movieSchema)
const Genre = model("Genre", genreSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = {Movie, Genre}