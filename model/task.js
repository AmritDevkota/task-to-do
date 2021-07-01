const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String
    },

    body: {
        type: String
    }
})

module.exports = mongoose.model("task", taskSchema); 