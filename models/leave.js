const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
    type: String,
    fromDate: {
        type: Date,
        validate(value) {
            if (value < Date.now()) {
                throw new Error('From-Date should be later than today!')
            }
        }
    },
    toDate: {
        type: Date,
        validate(value) {
            if (value < this.fromDate) {
                throw new Error('To-Date cannot be earlier than From-Date!')
            }
        }
    },
    reason: String,
    status: {
        type: String,
        default: 'Pending'
    },
    author: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Leave', leaveSchema);