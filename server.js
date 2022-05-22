const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db) /** показує всю табл*/
})

app.get('/testimonials/:id', (req, res) => {
  const iteam = db.filter((iteam) => iteam.id === req.params.id)
  res.json(iteam) /** показує один ел табл з id*/
})

app.get('/testimonials/random', (req, res) => {
  let iteam = db[Math.floor(db.length * Math.random(req.params.id))]
  res.json(iteam) /** показує вибірковий ел табл з id*/
})

app.post('/testimonials', (req, res) => {
  const newTestimonials = {
    author: req.body.author,
    text: req.body.text,
    id: uuidv4() 
  }
  db.push(newTestimonials)
  res.json({message: 'OK'})
})

app.put('/testimonials/:id', (req, res) => {
  const chooseTestimonials = db.filter((iteam) => iteam.id === req.params.id)
  const indexOf = db.indexOf(chooseTestimonials)
  const editedTestimonials = {
    ...chooseTestimonials,
    text: req.body.text,
    author:req.body.author
  }
  db[indexOf] = [editedTestimonials]
  res.json({message: 'OK'})
})

app.delete('/testimonials/:id', (req, res) => {
  const chooseTestimonials = db.filter((iteam) => iteam.id === req.params.id)
  const indexOf = db.indexOf(chooseTestimonials)
  db.splice(indexOf, 1)
  res.json({message: 'OK'})
})

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'})
})

app.listen(8000, () => {
  console.log('Server is runnig on port: 8000');
})