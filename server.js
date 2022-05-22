const express = require('express')

const app = express()

const testimonialsRoutes = require('./routes/testimonials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatRoutes = require('./routes/seats.routes')

app.use(express.json());
app.use(express.urlencoded({ 
  extended: true 
}));

app.use('/api', testimonialsRoutes)
app.use('/api', concertsRoutes)
app.use('/api', seatRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found...'
  })
})

app.listen(8000, () => {
  console.log('Server is runnig on port: 8000');
})