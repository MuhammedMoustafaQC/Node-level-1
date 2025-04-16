const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String
    , lastName: String
    , email: String
    , phoneNumber: String
    , age: String
    , country: String
    , gender : String
}, { timestamps: true });

const user = mongoose.model('customer', userSchema);
module.exports = user;