const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const testimonialsRoutes = require('./routes/testimonials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatRoutes = require('./routes/seats.routes')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.use('/api', testimonialsRoutes)
app.use('/api', concertsRoutes)
app.use('/api', seatRoutes)

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found...'
  })
})

// app.listen(8000, () => {
//   console.log('Server is runnig on port: 8000');
// })