const Concert = require('../models/concert.model')
const sanitize = require('mongo-sanitize')

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
    else res.json(concert)
  } catch (error) {
    res.status(500).json({ message: err})
  }
}

exports.addNewRecord = async (req, res) => {
  const {perfomer, genre, price, day, image } = req.body

  try {
   const newConcert = new Concert({ perfomer, genre, price, day, image })
   await newConcert.save()
   res.json({ message: 'Ok'}) 
  } catch (error) {
    res.status(500).json({ message: err}) 
  }
}

exports.editRecord = async (req, res) => {
  const sanit = sanitize(req.body)
  const {perfomer, genre, price, day} = sanit

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

  exports.getPerfomer = async (req, res) => {

    try {
      const perfomer = req.params.performer;
      const getPerfomer = await Concert.find({
        perfomer: perfomer
      });

      if(!getPerfomer) res.status(404).json({ message: 'Not found'})
      else {
        res.json(getPerfomer)
      }
      
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  exports.getGenre = async (req, res) => {

    try {
      const genre = req.params.genre
      const getGenre = await Concert.find({
        genre: genre
      });

      if(!getGenre) res.status(404).json({ message: 'Not found'})
      else {
        res.json(getGenre)
      }
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  exports.getPrice = async (req, res) => {

    try {
      const priceMin = req.params.price_min
      const priceMax = req.params.price_max
      const concertPrice = await Concert.find({
        price: {
          $gte: priceMin,
          $lte: priceMax
        }
      });

      if(!concertPrice) res.status(500).json({ message: 'Not found'})
      else {
        res.json(concertPrice)
      }
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  exports.getByDay = async (req, res) => {

    try {
      const day = req.params.day
      const getDay = await Concert.find({
        day: day
      });

      if(!getDay) res.status(500).json({ message: 'Not found'})
      else {
        res.json(getDay)
      }
    } catch (err) {
      res.status(500).json({ message: err})
    }
  }



