const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }))
const MyData = require('./models/CustomerSchema')
app.set('view engine', 'ejs')
app.use(express.static('public'))
const moment = require('moment')
app.locals.moment = moment

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// Live reload
const path = require('path')
const livereload = require('livereload')
const liveReloadServer = livereload.createServer()
const connectLivereload = require('connect-livereload')
app.use(connectLivereload())
liveReloadServer.watch(path.join(__dirname, 'public'))
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/')
  }, 100)
})

// Display the home page with a list of customers
app.get('/', (req, res) => {
MyData.find()
  .then((result) => {
    res.render('index', { MyTitle: 'Home', arr: result });
  }).catch((err) => {
  res.status(500).send('Error retrieving customers');
  })
})

// Display the add user page
app.get('/user/add.html', (req, res) => {
  MyData.find()
    .then((result) => {
      res.render('user/add', { MyTitle: 'Add User', arr: result });
    }).catch((err) => {
      console.log(err)
    })
})

// Display the edit user page
app.get('/edit/:id', (req, res) => {
  MyData.findById(req.params.id)
    .then((result) => {
    console.log(result) // Log the retrieved customer
    res.render('user/edit', { MyTitle: 'Edit User', userData: result });
    }).catch((err) => {
      console.log(err)
    })
})

// Display the view user page
app.get('/view/:id', (req, res) => {
  MyData.findById(req.params.id)
    .then((result) => {
    console.log(result) // Log the retrieved customer
    res.render('user/view', { MyTitle: 'View User', userData: result });
    }).catch((err) => {
      console.log(err)
    })
})


// connect to MongoDB using Mongoose
mongoose.connect(process.env.DatabaseURL)
.then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
  });
})
.catch((err) => {
  console.log('Error connecting to the database: ', err)
})


// Add a new user to the database
app.post('/user/add.html', (req, res) => {
  console.log(req.body)
  const myData = new MyData(req.body) // Create a new instance of the MyData model
  myData.save().then(() => {
    res.redirect('/') // Redirect to the add page
  }).catch((err) => {
    res.status(400).send('Unable to save data')
  });
  
})

// Delete a user from the database
app.delete('/delete/:id', (req, res) => {
  MyData.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/') // Redirect to the add page
    }).catch((err) => {
      console.log(err)
    })
})

// Update a user in the database
app.put('/edit/:id', (req, res) => {
  MyData.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      console.log(result) // Log the updated customer
      res.redirect('/') // Redirect to the add page
    }).catch((err) => {
      console.log(err)
    })
} )


