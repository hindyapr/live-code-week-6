const mongoose = require('mongoose');
const Favorite = require('./favorite');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    favoriteJokes: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }]
})

userSchema.pre('create', function(next) {

})

const User = mongoose.model('User', userSchema);

module.exports = User;