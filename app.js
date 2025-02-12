const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }))
const MyData = require('./models/MyDataSchema')

app.get('/', (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
})

app.get('/index.html', (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
})

mongoose.connect('mongodb+srv://MuhammedQC:UdZzbV9..ivZL2k@cluster0.lnpqg.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
  });
})
.catch((err) => {
  console.log('Error connecting to the database: ', err)
})

app.post('/', (req, res) => {
  console.log(req.body)
  const myData = new MyData(req.body) // Create a new instance of the MyData model
  myData.save().then(() => {
    res.redirect('/index.html') // Redirect to the home page
  }).catch((err) => {
    res.status(400).send('Unable to save data')
  });
  
})