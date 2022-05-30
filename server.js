const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const socket = require('socket.io')

const testimonialsRoutes = require('./routes/testimonials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatRoutes = require('./routes/seats.routes')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(cors());


const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes)
app.use('/api', concertsRoutes)
app.use('/api', seatRoutes)


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