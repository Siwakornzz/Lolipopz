const mongoose = require('mongoose');

const topupSchema = mongoose.Schema({
    username: {
        type: String
    },
    amount: {
        type: Number
    },
    ref: {
        type: String
    },
    status: {
        type: String,
        default: "waiting"
    },
}, {
    timestamps: true
})

const Topup = mongoose.model('topup', topupSchema)
module.exports = Topup