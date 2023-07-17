const morgan = require('morgan');
const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoute');
const globalErrorHandler = require('./controllers/errorController');
const messageRoute = require('./routes/messageRoute')

const app = express();

dotenv.config({ path: '.env' });

// / Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

// // MOUNTING THE ROUTER
app.use('/api/v1/users', userRouter);
app.use('/api/v1/message', messageRoute);


app.use(globalErrorHandler);

module.exports = app;
