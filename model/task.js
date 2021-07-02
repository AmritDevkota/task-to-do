const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String
    },

    body: {
        type: String
    },
    taskBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'user' 
    },
    visibility: {
        type: String,
        enum: ["public", "private", "circle"]
    }
})

module.exports = mongoose.model("task", taskSchema); 