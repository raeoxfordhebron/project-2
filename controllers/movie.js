////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Movie = require("../models/movie")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

// Error Handler
function errorHandler(error, res){
    res.json(error)
}

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
    Movie.deleteMany({}, (error, data) => {
        Movie.create(startMovies, (error, createdMovies) => {
            res.json(createdMovies);
        })
    })
})

// Index Route 
router.get("/", async (req, res) => {
    const movies = await Movie.find({}).catch((error) => errorHandler(error, res))
    res.render("movie/index.ejs", {movies})
})

// New Route 
router.get("/new", (req, res) => {
    res.render("movie/new.ejs")
})

// Delete Route

// Update Route

// Create Route

// Edit Route

// Show Route
router.get("/:id", (req, res) => {
    const id = req.params.id
    Movie.findById(id, (error, movie) => {
        res.render("movie/show.ejs", {movie})
    })
})



//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router