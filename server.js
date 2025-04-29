// server.js

// set up ======================================================================
// get all the tools we need
const express = require('express')
const app = express()
const port     = process.env.PORT || 4040
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const session = require('express-session')
const bcrypt = require('bcrypt')
require('dotenv').config()
const passport = require('passport')

const Shoe = require('./models/shoe')
const configDB = require('./config/database.js');





let db

// configuration ===============================================================

mongoose.connect(configDB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => {
      console.log(`The magic happens on port ${port}`)
    })
  })
  .catch(err => console.error(err))
  // connect to our database



app.set('view engine', 'ejs') // set up ejs for templating
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// required for passport
app.use(session({
  secret: "sneakerDropsSessionKey",// session secret
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

// launch ======================================================================


app.get('/', (req, res) => {
  res.redirect('/shoes')
})

// GET(read) /shoes - List all shoes for the logged-in user 
app.get('/shoes', async (req, res) => {
    try {
      const shoes = await Shoe.find()
      res.render('shoes', { shoes: shoes })
    } catch (err) {
      console.log(err)
      res.redirect('/shoes')
    }
  })

  app.post('/shoes', async (req, res) => {//this Sets up a POST(Create). we making it aysc so we can set up an await bellow
      try { //were gonna use a try block so it runs. good data or bad
        const { name, date, price, img } = req.body //pulling all at the same time instead of one by one/saves time and key strokes
    
        await Shoe.create({// create a new log in mongdb. were making it await so it...... awaits untilll its done
          name,
          date,
          price,
          img,
          hot: 0,
          not: 0,
        })
    
        res.redirect('/shoes')// refresh page
      } catch (err) {
        console.log(err)
        res.redirect('/shoes')// bad thing happen
      }
    })

   // PUT to increment hot
app.put('/shoes/:id/hot', async (req, res) => {
  try { // same rout as the fetch in main.js
    await Shoe.findByIdAndUpdate(req.params.id, { $inc: { hot: 1 } }) // Take the current hot value and add 1 to it
    res.status(200).json({ message: 'Hot count increased' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to increase hot count' })
  }
})

// PUT to increment not
app.put('/shoes/:id/not', async (req, res) => {
  try {
    await Shoe.findByIdAndUpdate(req.params.id, { $inc: { not: 1 } })
    res.status(200).json({ message: 'Not count increased' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to increase not count' })
  }
})

app.delete('/shoes/:id', async (req, res) => {
  try {
    await Shoe.findOneAndDelete({_id: req.params.id}) 
    res.status(200).json({ message: 'Entry deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to delete entry' })
  }
})