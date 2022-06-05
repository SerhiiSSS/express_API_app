const Testimonial = require('../models/testimonial.model')

exports.getAllRecords = async (req, res) => {

  try {
    res.json(await Testimonial.find())
  }
  catch(err){
    res.status(500).json({ message: err})
  } /** показує всю табл*/
}

exports.getRecordById = async (req, res) => {
  
  try {
    const tes = await Testimonial.findById(req.params.id)
    if(!tes)res.status(404).json({message: 'Not found'})
    else res.json(tes)
  }
  catch(err){
    res.status(500).json({ message: err})
  }/** показує один ел табл з id*/
}

exports.getRecordRandom = async (req, res) => {

  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Department.findOne().skip(rand);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
   /** показує вибірковий ел табл з id*/
}

exports.addNewRecord = async (req, res) => {
  const {author, text} = req.body

  try {
    const newTestimonial = new Testimonial({ author, text})
    await newTestimonial.save()
    res.json({ message: 'Ok'})
  }
  catch(err){
    res.status(500).json({ message: err })
  }
}

exports.editRecord = async (req, res) => {
  const {author, text} = req.body

  try {
    const tes = await Testimonial.findById(req.params.id);
    if(tes) {
      tes.author = author;
      tes.text = text
      await tes.save();
      res.json(await Testimonial.find());
    }
    else res.status(404).json({ message: 'Not found'})
  }
  catch(err){
    res.status(500).json({ message: err})
  }
}

exports.deleteRecord = async (req, res) => {

  try {
    const tes = Testimonial.findById(req.params.id)
    if(tes){
      await Testimonial.deleteOne({ _id: req.params.id })
      res.json(await Testimonial.find())
    }
    else res.status(404).json({ message: 'Not found'})
  } catch (err) {
    res.status(500).json({ message: err})
  }
}
