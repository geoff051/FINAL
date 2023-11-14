const express = require('express');
const router = express.Router()
const SectionModel = require('../Models/SectionInfo');


//get data from database 
router.get("/", (req, res) => {
    SectionModel.find({})
    .then(sectioninfo => res.json(sectioninfo))
    .catch(err => res.json(err))
  })
  
  //send section info data to database
router.post("/", (req, res) => {
    SectionModel.create(req.body)
    .then(sectioninfo => res.json(sectioninfo))
    .catch(err => res.json(err))
  })
  
  //To populate fields
router.put("/:id", (req, res) => {
      const id = req.params.id;
      SectionModel.findByIdAndUpdate({_id: id},
        {SectionName: req.body.SectionName,
        Gradelvl: req.body.Gradelvl,
         Adviser: req.body.Adviser,
        })
        .then(sectioninfo => res.json(sectioninfo))
        .catch(err => res.json(err))
  })
  
  //delete Section
router.delete("/:id", (req, res) => {
      const id = req.params.id;
      SectionModel.findByIdAndDelete({_id: id})
      .then(res => res.json(res))
      .catch(err => res.json(err))
  })
  
  //get specific data from database using id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    SectionModel.findById({_id:id})
    .then(sectioninfo => res.json(sectioninfo))
    .catch(err => res.json(err))
  })

  module.exports = router;