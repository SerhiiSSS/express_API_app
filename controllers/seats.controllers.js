const Seat = require('../models/seat.model')

exports.getAllRecord = async (req, res) => {
  
  try {
    res.json(await Seat.find())
  } catch (err) {
    res.json(500).json({ message: err})
  }
}

exports.getRecordById = async (req, res) => {
  
  try {
    const seat = await Seat.findById(req.params.id)
    if(!seat)res.status(404).json({ message: 'Not found'})
    else res.status(seat)
  } catch (error) {
    res.status(500).json({ message: err})
  }
}

exports.addNewRecord = async (req, res) => {
  const {day, seat, client, email} = req.body

  try {
   const newSeat = new Seat({ day, seat, client, email})
   await newSeat.save()
   res.json({ message: 'Ok'}) 
  } catch (error) {
    res.status(500).json({ message: err}) 
  }
}

exports.editRecord = async (req, res) => {
  const {day, seat, client, email} = req.body

  try {
    const editSeat = await Seat.findById(req.params.id)
    if(editSeat){
      editSeat.day = day
      editSeat.seat = seat
      editSeat.client = client
      editSeat.email = email
      await editSeat.save()
      res.json(await Seat.find())
    }else res.status(404).json({ message: 'Not found' })
  } catch (err) {
    res.status(500).json({ message: err})
  }
}

exports.deleteRecord = async (req, res) => {
  
  try {
    const seat = Seat.findById(req.params.id)
    if(seat) {
      await Seat.deleteOne({_id: req.params.id})
      res.json(await Seat.find())
    }
    else res.status(404).json({ message: 'Not found'})
  } catch (err) {
    res.status(500).json({ message: err})
  }
}