// const dotenv = require('dotenv')
import express from "express"
import mysql from "mysql"
import bodyParser from "body-parser"

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())

// Connection DB
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "netflix"
})

db.connect(err => {
  if (!err) {
    console.log("Connected to db")
  } else {
    console.log(`Error : ${err}`)
  }
})

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello Netflix")
})

// GET all titles 
app.get("/titles", (req, res) => {
  if (req.body.title) {
    db.query("SELECT * FROM netflix_titles WHERE title = ?", req.body.title, (err, rows, fields) => {
      if (!err) {
        res.send(rows)
      } else {
        res.send("Bad routes, please retry with an other url")
        console.log(`Error: ${err}`)
      }
    })
  } else {
    db.query("SELECT * FROM netflix_titles", (err, rows, fields) => {
      if (!err) {
        res.send(rows)
      } else {
        res.send("Bad routes, please retry with an other url")
        console.log(`Error: ${err}`)
      }
    })
  }
})
// TEST Route 
app.get("/test", (req, res) => {
  const data = req.body
  const col = ["type", "title", "director", "release_year", "description"]
  let result;
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      result = col.filter(el => el === key)
    }
    result = result.toString()
    db.query(`SELECT * FROM netflix_titles WHERE ${result} = ?`, data[result], (err, rows, fields) => {
      if (!err) {
        res.send(rows)
      } else {
        res.send("Server error, please retry later")
        console.log(`Error: ${err}`)
      }
    })
  }
})

// GET a specific titles
app.get("/titles/:id", (req, res) => {
  db.query("SELECT * FROM netflix_titles WHERE show_id = ?", req.params.id, (err, rows, fields) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send("Bad routes, please retry with an other url")
      console.log(`Error: ${err}`)
    }
  })
})

// POST a specific titles
app.post("/titles", (req, res) => {
  const data = req.body
  const uid = Math.floor(Date.now() / 90000)
  const reqSQL = "INSERT INTO netflix_titles VALUES (?, ?, ?, ?, ?, ?);"
  db.query(reqSQL, [uid, data.type, data.title, data.director, data.releaseYear, data.description], (err, rows, fields) => {
    if (!err) {
      res.send([Date.now(), data.type, data.title, data.director, data.releaseYear, data.description])
    } else {
      res.send([uid, data.type, data.title, data.director, data.releaseYear, data.description])
      console.log(`Error: ${err}`)
    }
  })
})

// DELETE a specific titles
app.delete("/titles/:id", (req, res) => {
  db.query("DELETE * FROM netflix_titles WHERE show_id = ?", req.params.id, (err, rows, fields) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send("Bad routes, please retry with an other url")
      console.log(`Error: ${err}`)
    }
  })
})

// Defaut Route
app.get('*', function (req, res) {
  res.status(404).send('Please refer to the docs');
});

app.listen(port, () => console.log(`Listen on http://localhost:${port}`))