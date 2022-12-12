////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Movie = require("../models/movie")
const mongoose = require('mongoose')

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

// Error Handler
function errorHandler(error, res){
    res.json(error)
}

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if(req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login")
    }
})

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// Home Page
router.get("/home", async (req, res) => {
    const movies = await Movie.find({}).catch((error) => errorHandler(error, res))
    res.render("movie/home.ejs", {movies})
})

// About Page
router.get("/about", (req, res) => {
    res.render("movie/about.ejs")
})


// Index Route 
router.get("/", async (req, res) => {
    const movies = await Movie.find().catch((error) => errorHandler(error, res))
    console.log(movies)
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
    req.body.username = req.session.username
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