const Concert = require('../models/concert.model')

exports.getAllRecord = async (req, res) => {
  
  try {
    res.json(await Concert.find())
  } catch (err) {
    res.json(500).json({ message: err})
  }
}

exports.getRecordById = async (req, res) => {
  
  try {
    const concert = await Concert.findById(req.params.id)
    if(!concert)res.status(404).json({ message: 'Not found'})
    else res.status(concert)
  } catch (error) {
    res.status(500).json({ message: err})
  }
}

exports.addNewRecord = async (req, res) => {
  const {perfomer, genre, price, day} = req.body

  try {
   const newConcert = new Concert({ perfomer, genre, price, day })
   await newConcert.save()
   res.json({ message: 'Ok'}) 
  } catch (error) {
    res.status(500).json({ message: err}) 
  }
}

exports.editRecord = async (req, res) => {
  const {perfomer, genre, price, day} = req.body

  try {
    const editConcert = await Concert.findById(req.params.id)
    if(editConcert){
      editConcert.perfomer = perfomer
      editConcert.genre = genre
      editConcert.price = price
      editConcert.day = day
      await editConcert.save()
      res.json(await Concert.find())
    }else res.status(404).json({ message: 'Not found' })
  } catch (err) {
    res.status(500).json({ message: err})
  }
}

exports.deleteRecord = async (req, res) => {
  
  try {
    const concert = Concert.findById(req.params.id)
    if(concert) {
      await Concert.deleteOne({_id: req.params.id})
      res.json(await Concert.find())
    }
    else res.status(404).json({ message: 'Not found'})
  } catch (err) {
    res.status(500).json({ message: err})
  }
}