import express from "express"
import mongoose from "mongoose"
import errorhandler from "errorhandler"
import path from "path"
import methodOverride from "method-override"
// import cors from "cors"
import fileUpload from "express-fileupload"

import Routes from "./src/routes.js"
import { loggedInUser as auth } from "./src/user/user.controller.js"

const app = express()
const PORT = process.env.PORT || 5555

// get all data/stuff of the body (POST) parameters
// parse application/json
// app.use(cors())
app.use(errorhandler())
app.use(
    express.json({ limit: "10mb", extended: true, type: "application/json" })
)
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(fileUpload())

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride("X-HTTP-Method-Override"))
var __dirname = path.resolve()

//Authenticate Session Data while calling api
app.use(auth)

//Apply routers
app.use("/api", Routes)

//'mongodb://127.0.0.1:27017/erp-database

// local mongoDb
//  mongoose.connect("mongodb://localhost:27017/ERPVU?readPreference=primary&appname=MongoDB%20Compass&ssl=false", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
mongoose.connect("mongodb://127.0.0.1:27017/ERPVU", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(_ => console.log("Local Database connected!")).catch(err => {
    console.log(`Unable to connect to Local Database: ${err}`)
})

mongoose.set('useCreateIndex', true)

app.use(express.static(__dirname + "/FrontEndBuild"))
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "/FrontEndBuild", "index.html"))
})

app.use(function(req, next) {
    console.log("/" + req.method)
    next()
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})