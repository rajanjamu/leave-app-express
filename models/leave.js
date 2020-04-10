const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
    type: String,
    dateFrom: Date,
    dateTo: Date,
    reason: String,
    status: String,
    created: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('Leave', leaveSchema);