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

// Home Page
router.get("/home", (req, res) => {
    res.render("movie/home.ejs")
})

// Genres Page
router.get("/genres", (req, res) => {
    res.render("movie/genre.ejs", {movies})
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
router.delete("/:id", (req, res) => {
    const id = req.params.id
    Movie.findByIdAndRemove(id, (error, movie) => {
        res.redirect("/movie")
    })
})

// Update Route
router.put("/:id", (req, res) => {
    const id = req.params.id
    req.body.isLiked = req.body.isLiked === "on" ? true : false
    Movie.findByIdAndUpdate(id, req.body, {new: true}, (error, movie) => {
        res.redirect("/movie")
    })
})

// Create Route
router.post("/", (req, res) => {
    req.body.isLiked = req.body.isLiked === "on" ? true : false
    Movie.create(req.body, (error, fruit) => {
        res.redirect("/movie")
    })
})

// Edit Route
router.get("/:id/edit" , (req, res) => {
    const id = req.params.id
    Movie.findById(id, (error, movie) => {
        res.render("movie/edit.ejs", {movie})
    })
})

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