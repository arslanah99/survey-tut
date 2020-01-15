const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

let surveys = {};

app.post("/doasurvey", (req, res) => {
    if(req.body.email in surveys){
        surveys[req.body.email].push(req.body.data)
        console.log(surveys)
    } else {
        surveys[req.body.email] = []
        surveys[req.body.email].push(req.body.data)
        console.log(surveys)

    }
    res.end()
})

app.get("/:email/surveys", (req, res) => {
    console.log(surveys[req.params.email])

    if(surveys[req.params.email] === undefined){
        res.json([])
    } else {
        res.json(surveys[req.params.email])
    }
})
  

app.get("/", (req, res) => {
    res.send("Hello")
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port)


