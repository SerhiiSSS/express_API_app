const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const db = require('../db')

router.route('/concerts').get((req, res) => {
  res.json(db.concerts)
})

router.route('/concerts/:id').get((req, res) => {
  const iteam = db.concerts.filter((iteam) => iteam.id === Number(req.params.id))
  res.json(iteam)
})

router.route('/concerts').post((req, res) => {
  const newConcerts = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  }
  db.concerts.push(newConcerts)
  res.json({
    message: 'OK'
  })
})

router.route('/concerts/:id').put((req, res) => {
  const chooseConcerts = db.concerts.filter((iteam) => iteam.id === req.params.id)
  const indexOf = db.concerts.indexOf(chooseConcerts)
  
  const editedConcerts = {
    ...chooseConcerts,
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  }
  db.concerts[indexOf] = editedConcerts
  res.json({
    message: 'OK'
  })
})

router.route('/concerts/:id').delete((req, res) => {
  const chooseConcerts = db.concerts.filter((iteam) => iteam.id === req.params.id)
  const indexOf = db.concerts.indexOf(chooseConcerts)
  db.concerts.splice(indexOf, 1)
  res.json({
    message: 'OK'
  })
})

module.exports = router;