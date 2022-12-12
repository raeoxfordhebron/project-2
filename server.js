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
const UserRouter = require("./controllers/user")
const session = require('express-session')
const MongoStore = require('connect-mongo')

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
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
}))
app.use("/movie", MovieRouter)
app.use("/user", UserRouter)

/////////////////////////////////////////////////////
// Routes and Routers
/////////////////////////////////////////////////////
// app.get("/", (req, res) => {
//     res.send("Server is working")
// })

app.use("/movie", MovieRouter)


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})