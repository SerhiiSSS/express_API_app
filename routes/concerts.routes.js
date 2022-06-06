const express = require('express')
const router = express.Router()

const ConcertController = require('../controllers/concerts.controllers')

router.get('/concerts', ConcertController.getAllRecord)
router.get('/concerts/:id', ConcertController.getRecordById)
router.post('/concerts', ConcertController.addNewRecord)
router.put('/concerts/:id', ConcertController.editRecord)
router.delete('/concerts/:id', ConcertController.deleteRecord)

module.exports = router;