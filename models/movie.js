//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")

////////////////////////////////////////////////
// Movies Model
////////////////////////////////////////////////
const {Schema, model} = mongoose // destructuring

// Make movie schema
const movieSchema = new Schema ({
    title: String,
    notes: String,
    isLiked: Boolean,
    genre: String
}, {timestamps: true})


// Make movie model
const Movie = model("Movie", movieSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = {Movie}