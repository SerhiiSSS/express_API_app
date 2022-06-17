const express = require('express')
const router = express.Router()

const ConcertController = require('../controllers/concerts.controllers')

router.get('/concerts', ConcertController.getAllRecord)
router.get('/concerts/:id', ConcertController.getRecordById)
router.post('/concerts', ConcertController.addNewRecord)
router.put('/concerts/:id', ConcertController.editRecord)
router.delete('/concerts/:id', ConcertController.deleteRecord)

router.get('/concerts/performer/:performer', ConcertController.getPerfomer)
router.get('/concerts/genre/:genre', ConcertController.getGenre)
router.get('/concerts/price/:price_min/:price_max', ConcertController.getPrice)
router.get('/concerts/day/:day', ConcertController.getByDay)

module.exports = router;