const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');

app.get('/', (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
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