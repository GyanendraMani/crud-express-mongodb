const mongoose = require("mongoose");

const QuoteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("quets", QuoteSchema);
