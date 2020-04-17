const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    admin: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    leaves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leave'
    }]
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);