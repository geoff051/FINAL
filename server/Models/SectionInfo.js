const mongoose = require('mongoose')

const SectionSchema = new mongoose.Schema({
    SectionName: String,
    Gradelvl: Number,
    Adviser: String
})

const SectionModel = mongoose.model("sectioninfo", SectionSchema)
module.exports = SectionModel;