const mongoose = require('mongoose')
const User = require('./models/user')

const userOne = {
    username: 'admin',
    password: 'admin',
    admin: true
}

function seedDB() {
    User.deleteMany({}, (err) => {
        if (err) return console.log(err)

        console.log('Removed all users!')

        User.register(new User({username: userOne.username, admin: true}), userOne.password, (err, user) => {
            if (err) return console.log(err)

            console.log('Added admin user!')
        })
    })
}

module.exports = seedDB;