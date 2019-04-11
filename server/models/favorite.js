const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;


const favoriteSchema = new Schema({
    joke: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})



const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;