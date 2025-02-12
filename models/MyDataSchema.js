const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MyDataSchema = new Schema({
    userName: String
    });

module.exports = mongoose.model('MyData', MyDataSchema);