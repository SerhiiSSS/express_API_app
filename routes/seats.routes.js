const express = require('express')
const router = express.Router()

const SeatController = require('../controllers/seats.controllers')

router.get('/seats', SeatController.getAllRecord)
router.get('/seats/:id', SeatController.getRecordById)
router.post('/seats', SeatController.addNewRecord)
router.put('/seats/:id', SeatController.editRecord)
router.delete('/seats/:id', SeatController.deleteRecord)

module.exports = router;