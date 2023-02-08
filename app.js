const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// middleware
///app sẽ tuần tự đi qua từng middleware
app.use(express.json()); //here is middleware
// => Là một chức năng có thể sửa đổi dữ liệu yêu cầu (request) đến
//Cần phải có middleware

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});

//middleware này giúp client biết chính xác thời gian yêu cầu của request/response
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Mouting the router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
