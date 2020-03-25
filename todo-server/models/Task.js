const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const taskSchema = new Schema({
    title: { type: String },
    description: { type: String },
    complete: { type: Boolean }
});

module.exports = Task = model("Task", taskSchema);
