const express = require('express')
const router = express.Router()

const ConcertController = require('../controllers/concerts.controllers')

router.get('/concert', ConcertController.getAllRecord)
router.get('/concert/:id', ConcertController.getRecordById)
router.post('/concert', ConcertController.addNewRecord)
router.put('/concert/:id', ConcertController.editRecord)
router.delete('/concert/:id', ConcertController.deleteRecord)

module.exports = router;