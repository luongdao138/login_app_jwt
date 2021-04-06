const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const authRouter = require('./routers/auth');
const todoRouter = require('./routers/todo');

mongoose.connect(process.env.CONNECT_DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.on('open', () => console.log('connected database successfully...'));

// parse data middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route middlewares
app.use('/api/auth', authRouter);
app.use('/api/todos', todoRouter);

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
