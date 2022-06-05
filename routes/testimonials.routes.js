const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller')

router.get('/testimonials', TestimonialController.getAllRecords)
router.get('/testimonials/:id', TestimonialController.getRecordById)
router.get('/testimonials/random', TestimonialController.getRecordRandom)
router.post('/testimonials', TestimonialController.addNewRecord)
router.put('/testimonials/:id', TestimonialController.editRecord)
router.delete('/testimonials/:id', TestimonialController.deleteRecord)

module.exports = router;