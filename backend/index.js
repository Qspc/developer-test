const express = require('express');
const cors = require('cors');
const jobRoutes = require('./route/jobRoutes');
const loginRoutes = require('./route/login');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
const port = process.env.PORT ? process.env.PORT : 4000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/v1/', jobRoutes);
app.use('/api/v1/', loginRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
