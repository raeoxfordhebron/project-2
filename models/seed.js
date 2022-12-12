///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Movie = require("./movie")

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// Make sure code is not run till connected 
mongoose.connection.on("open", () => {
    router.get("/seed",  async (req, res) => {
        const startMovies = [
            {title: "Titanic", notes: "I loved it!", genre: "Romance", isLiked: true},
            {title: "Eternal Sunshine of the Spotless Mind", notes: "Deep!", genre: "Drama", isLiked: true},
            {title: "Terrifier 2", notes: "too gory!", isLiked: false, genre: "Horror"},
        ]
        Movie.deleteMany({}, (error, data) => {})
        const newMovies = await Movie.create(startMovies)
        res.json({newMovies})
        mongoose.connection.close()
    })
})