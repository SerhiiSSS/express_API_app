const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const db = require('../db')

router.route('/seats').get((req, res) => {
  res.json(db.seats)
})

router.route('/seats/:id').get((req, res) => {
  const iteam = db.seats.filter((iteam) => iteam.id === req.params.id)
  res.json(iteam)
})

router.route('/seats').post((req, res) => {
  const newSeats = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email
  }
  db.seats.push(newSeats)
  res.json({
    message: 'OK'
  })
})

router.route('/seats/:id').put((req, res) => {
  const chooseSeats = db.seats.filter((iteam) => iteam.id === req.params.id)
  const indexOf = db.seats.indexOf(chooseSeats)

  const editedSeats = {
    ...chooseSeats,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  }
  db.seats[indexOf] = editedSeats
  res.json({
    message: 'OK'
  })
})

router.route('/seats/:id').delete((req, res) => {
  const chooseSeats = db.seats.filter((iteam) => iteam.id === req.params.id)
  const indexOf = db.seats.indexOf(chooseSeats)
  db.seats.splice(indexOf, 1)
  res.json({
    message: 'OK'
  })
})

module.exports = router;