const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
    type: String,
    fromDate: {
        type: Date,
    },
    toDate: Date,
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