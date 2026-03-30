const { Schema, model } = require("../connection");

const mySchema = new Schema({
    user: { type: String, require: true },
    score: { type: String, require: true },
    type: { type: String, require: true },
}, { timestamps: true });