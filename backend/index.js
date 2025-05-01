const connectToMongo = require('./db');
const express = require('express')

// Connect to MongoDB
connectToMongo().catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});

const app = express()
const port = 5000

// Middleware to parse JSON data
app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




