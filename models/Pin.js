const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        default: 'anonim'
    },
    title: {
        type: String,
        require: true,
        min: 3,
    },
    desc: {
        type: String,
        require: true,
        min: 6,
    },
    rating: {
        type: Number,
        require: true,
        min: 1,
        max: 5,
    },
    lat: {
        type: Number,
        require: true
    },
    long: {
        type: Number,
        require: true
    },
    pincolor: {
        type: String,
        require: true
    }

},
    { timestamps: true }

);

module.exports = mongoose.model("Pin", PinSchema);