const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    itemId: {type: Number, required: true},
    date: {type: Date, required: true, default: Date.now},
    mark: {type: Number, required: true},
    text: {type: String, required: true}
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review;