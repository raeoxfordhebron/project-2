/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 4000
const MovieRouter = require("./controllers/movie")

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express()


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use(express.static("public"))

/////////////////////////////////////////////////////
// Routes and Routers
/////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("Server is working")
})

app.use("/movie", MovieRouter)


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})