const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }))
const MyData = require('./models/CustomerSchema')
app.set('view engine', 'ejs')
app.use(express.static('public'))

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

app.get('/', (req, res) => {
MyData.find()
  .then((result) => {
    res.render('index', { MyTitle: 'Home', arr: result });
  }).catch((err) => {
  res.status(500).send('Error retrieving customers');
  })
})

app.get('/user/add.html', (req, res) => {
  MyData.find()
    .then((result) => {
      res.render('user/add', { MyTitle: 'Add User', arr: result });
    }).catch((err) => {
      console.log(err)
    })
})

app.get('/user/edit.html', (req, res) => {
  MyData.find()
    .then((result) => {
      res.render('user/edit', { MyTitle: 'Edit User', arr: result });
    }).catch((err) => {
      console.log(err)
    })
})

app.get('/user/view.html', (req, res) => {
  MyData.find()
    .then((result) => {
      res.render('user/view', { MyTitle: 'View User', arr: result });
    }).catch((err) => {
      console.log(err)
    })
})




mongoose.connect('mongodb+srv://MuhammedQC:123789456@cluster0.lnpqg.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
  });
})
.catch((err) => {
  console.log('Error connecting to the database: ', err)
})



app.post('/user/add.html', (req, res) => {
  console.log(req.body)
  const myData = new MyData(req.body) // Create a new instance of the MyData model
  myData.save().then(() => {
    res.redirect('/') // Redirect to the add page
  }).catch((err) => {
    res.status(400).send('Unable to save data')
  });
  
})

// app.get('/', (req, res) => {

//   MyData.find()
//     .then((result) => {
//       console.log(result); // Log the retrieved customers
//       // Render the customers in the response or send them as JSON
//       res.json(customers); // Send customers as JSON response
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send('Error retrieving customers');
//     });
// });