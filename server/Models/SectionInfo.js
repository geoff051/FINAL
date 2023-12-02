const mongoose = require('mongoose')

const SectionSchema = new mongoose.Schema({
    SectionName: {type: String, unique: true},
    Gradelvl: Number,
    Adviser: String
})

const SectionModel = mongoose.model("sectioninfo", SectionSchema)
module.exports = SectionModel;