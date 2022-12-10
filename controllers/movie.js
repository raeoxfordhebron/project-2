////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const {Movie, Genre} = require("../models/movie")
const mongoose = require('mongoose')
const toId = mongoose.Types.ObjectId

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
router.get("/seed",  async (req, res) => {
    const startMovies = [
        {title: "Titanic", notes: "I loved it!", isLiked: true},
        {title: "Eternal Sunshine of the Spotless Mind", notes: "Deep!", isLiked: true},
        {title: "Terrifier 2", notes: "too gory!", isLiked: false},
    ]

    const startGenres = [
        {name: "Romance"},
        {name: "Drama"},
        {name: "Horror"}
    ]
    const newMovies = await Movie.create(startMovies)
    const newGenres = await Genre.create(startGenres)
    res.json({newMovies, newGenres})
})

// Link Route
router.get("/linkmovies/:genreid/:movieid", async (req, res) => {
    req.params.genreid = toId(req.params.genreid)
    const movie = await Movie.findById(req.params.movieid)
    movie.genre = req.params.genreid
    movie.save()
    res.json()
})

// Home Page
router.get("/home", (req, res) => {
    res.render("movie/home.ejs")
})

// Genres Page
router.get("/genres", async (req, res) => {
    const movies = await Movie.find({}).catch((error) => {errorHandler(error, res)})
    const genres = await Genre.find({}).populate("movies").catch((error) => errorHandler(error, res))
    res.render("movie/genre.ejs", {movies, genres})
})

// Index Route 
router.get("/", async (req, res) => {
    const movies = await Movie.find({}).catch((error) => errorHandler(error, res))
    const genres = await Genre.find({}).populate("movies").catch((error) => errorHandler(error, res))
    res.render("movie/index.ejs", {movies, genres})
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
    Movie.create(req.body, (error, movie) => {
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