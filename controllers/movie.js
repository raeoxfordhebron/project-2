////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Movie = require("../models/movie")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// Seed Router
router.get("/seed", (req, res) => {
    const startMovies = [
        {title: "Titanic", notes: "I loved it!", genre: "Romance", isLiked: true},
        {title: "Eternal Sunshine of the Spotless Mind", notes: "Deep!", genre: "Drama", isLiked: true},
        {title: "Terrifier 2", notes: "too gory!", genre: "Horror", isLiked: false},
    ]
    Movie.deleteMany({}, (err, data) => {
        Movie.create(startMovies, (err, createdMovies) => {
            res.json(createdMovies);
        })
    })
})

// Index Route



//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router