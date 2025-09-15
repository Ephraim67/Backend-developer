const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        reuiqured: true,
        unique: true,
    },

    phone: {
        type: String,
        required: true
    },

    loyaltyPoints: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Guest', guestSchema);