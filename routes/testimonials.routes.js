const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials) /** показує всю табл*/
})

router.route('/testimonials/:id').get((req, res) => {
  const iteam = db.testimonials.filter((iteam) => iteam.id === req.params.id)
  res.json(iteam) /** показує один ел табл з id*/
})

router.route('/testimonials/random').get((req, res) => {
  let iteam = db.testimonials[Math.floor(db.testimonials.length * Math.random(req.params.id))]
  res.json(iteam) /** показує вибірковий ел табл з id*/
})

router.route('/testimonials').post((req, res) => {
  const newTestimonials = {
    author: req.body.author,
    text: req.body.text,
    id: uuidv4() 
  }
  db.testimonials.push(newTestimonials)
  res.json({
    message: 'OK'
  })
})

router.route('/testimonials/:id').put((req, res) => {
  const chooseTestimonials = db.testimonials.filter((iteam) => iteam.id === req.params.id)
  const indexOf = db.testimonials.indexOf
  (chooseTestimonials)

  const editedTestimonials = {
    ...chooseTestimonials,
    text: req.body.text,
    author:req.body.author
  }
  db.testimonials[indexOf] = editedTestimonials
  res.json({
    message: 'OK'
  })
})

router.route('/testimonials/:id').delete((req, res) => {
  const chooseTestimonials = db.testimonials.filter((iteam) => iteam.id === req.params.id)
  const indexOf = db.testimonials.indexOf(chooseTestimonials)
  db.testimonials.splice(indexOf, 1)
  res.json({
    message: 'OK'
  })
})

module.exports = router;